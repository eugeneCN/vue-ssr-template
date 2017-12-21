/**
 *  纯异步nodejs文件夹(目录)复制
 *  http://faylai.iteye.com/blog/1924523
 *  zhangWuQiang
 */
const fs = require('fs')
const path = require('path')
const async = require('async')
const resolve = file => path.resolve(__dirname, file)
// cursively make dir
function mkdirs(p, mode, f, made) {
  if (typeof mode === 'function' || mode === undefined) {
    f = mode;
    mode = 0777 & (~process.umask());
  }
  if (!made)
    made = null;

  var cb = f || function () {};
  if (typeof mode === 'string')
    mode = parseInt(mode, 8);
  p = path.resolve(p);

  fs.mkdir(p, mode, function (er) {
    if (!er) {
      made = made || p;
      return cb(null, made);
    }
    switch (er.code) {
      case 'ENOENT':
        mkdirs(path.dirname(p), mode, function (er, made) {
          if (er) {
            cb(er, made);
          } else {
            mkdirs(p, mode, cb, made);
          }
        });
        break;

        // In the case of any other error, just see if there's a dir
        // there already.  If so, then hooray!  If not, then something
        // is borked.
      default:
        fs.stat(p, function (er2, stat) {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (er2 || !stat.isDirectory()) {
            cb(er, made);
          } else {
            cb(null, made)
          };
        });
        break;
    }
  });
}
// single file copy
function copyFile(file, toDir, cb) {
  async.waterfall([
    function (callback) {
      fs.exists(toDir, function (exists) {
        if (exists) {
          callback(null, false);
        } else {
          callback(null, true);
        }
      });
    },
    function (need, callback) {
      if (need) {
        mkdirs(path.dirname(toDir), callback);
      } else {
        callback(null, true);
      }
    },
    function (p, callback) {
      var reads = fs.createReadStream(file);
      var writes = fs.createWriteStream(path.join(path.dirname(toDir), path.basename(file)));
      reads.pipe(writes);
      //don't forget close the  when  all the data are read
      reads.on("end", function () {
        writes.end();
        callback(null);
      });
      reads.on("error", function (err) {
        console.log("error occur in reads");
        callback(true, err);
      });

    }
  ], cb);

}

// cursively count the  files that need to be copied

function _ccoutTask(from, to, cbw) {
  async.waterfall([
    function (callback) {
      fs.stat(from, callback);
    },
    function (stats, callback) {
      if (stats.isFile()) {
        cbw.addFile(from, to);
        callback(null, []);
      } else if (stats.isDirectory()) {
        fs.readdir(from, callback);
      }
    },
    function (files, callback) {
      if (files.length) {
        for (var i = 0; i < files.length; i++) {
          _ccoutTask(path.join(from, files[i]), path.join(to, files[i]), cbw.increase());
        }
      }
      callback(null);
    }
  ], cbw);

}
// wrap the callback before counting
function ccoutTask(from, to, cb) {
  var files = [];
  var count = 1;

  function wrapper(err) {
    count--;
    if (err || count <= 0) {
      cb(err, files)
    }
  }

  wrapper.increase = function () {
    count++;
    return wrapper;
  }
  wrapper.addFile = function (file, dir) {
    files.push({
      file: file,
      dir: dir
    });
  }

  _ccoutTask(from, to, wrapper);
}


function copyDir(from, to, cb) {
  if (!cb) {
    cb = function () {};
  }
  async.waterfall([
    function (callback) {
      fs.exists(from, function (exists) {
        if (exists) {
          callback(null, true);
        } else {
          console.log(from + " not exists");
          callback(true);
        }
      });
    },
    function (exists, callback) {
      fs.stat(from, callback);
    },
    function (stats, callback) {
      if (stats.isFile()) {
        // one file copy
        copyFile(from, to, function (err) {
          if (err) {
            // break the waterfall
            callback(true);
          } else {
            callback(null, []);
          }
        });
      } else if (stats.isDirectory()) {
        ccoutTask(from, to, callback);
      }
    },
    function (files, callback) {
      // prevent reaching to max file open limit
      async.mapLimit(files, 10, function (f, cb) {
        copyFile(f.file, f.dir, cb);
      }, callback);
    }
  ], cb);
}

// 给dist添加依package.json文件
const file = resolve(`../dist/package.json`)
const packageJson = `{
  "name": "vue-ssr-template",
  "version": "1.0.0",
  "description": "A Vue.js project 2.0 for server side rendering.",
  "author": "zwq <obj_ee@163.com>",
  "license": "MIT",
  "scripts": {
    "start": "cross-env NODE_ENV=production node server",
    "pm2": "cross-env NODE_ENV=production pm2 start processes.json"
  },
  "dependencies": {
    "axios": "^0.13.1",
    "cookie-parser": "^1.4.3",
    "cross-env": "^3.1.4",
    "express": "^4.14.0",
    "lru-cache": "^4.0.1",
    "nprogress": "^0.2.0",
    "serialize-javascript": "^1.3.0",
    "serve-favicon": "^2.3.0",
    "uiv": "^0.14.3",
    "vue": "^2.3.4",
    "vue-router": "^2.7.0",
    "vue-server-renderer": "^2.3.4",
    "vuex": "^2.3.0",
    "vuex-router-sync": "^4.1.2",
    "http-proxy-middleware": "^0.17.3"
  }
}`

// 把打包后的文件放在dist目录文件夹
const dirArr = ['output/', 'public/', 'config/', 'processes.json', 'server.js']
dirArr.forEach(function (item) {
  let src = resolve(`../${item}`)
  let dst = resolve(`../dist/${item}`)
  copyDir(src, dst, (err) => {
    if (err) return console.error(err)
    if (item === dirArr[dirArr.length - 1]) {
      fs.writeFile(file, packageJson, (err) => {
        if (err) throw err
        console.log('build ok!')
      })
    }
  })
})
