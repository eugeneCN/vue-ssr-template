<template>
  <div class="home">
    <ol class="breadcrumb">
      <li class="active">Home</li>
    </ol>
    <h3><a href="https://ssr.vuejs.org/en/api.html" target="_black">vue-server-renderer</a></h3>
    <br>
    <pre>

  const isProd = process.env.NODE_ENV === 'production'

  const app = express()

  let renderer
  if (isProd) {
    // 生产环境使用本地打包文件来渲染
    const bundle = require('./output/vue-ssr-bundle.json')
    const template = fs.readFileSync(resolve('./output/index.html'), 'utf-8')
    renderer = createRenderer(bundle, template)
  } else {
    // 开发环境使用webpack热更新服务
    require('./build/dev-server')(app, (bundle, template) => {
      renderer = createRenderer(bundle, template)
    })
  }

  function createRenderer(bundle, template) {
    return require('vue-server-renderer').createBundleRenderer(bundle, {
      template,
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    })
  }

  app.get('*', (req, res) => {
    if (!renderer) {
      return res.end('waiting for compilation... refresh in a moment.')
    }

    const s = Date.now()

    res.setHeader("Content-Type", "text/html")

    const errorHandler = err => {
      if (err && err.code === 404) {
        // 未找到页面
        res.status(404).sendfile('public/404.html');
      } else {
        // 页面渲染错误
        res.status(500).end('500 - Internal Server Error')
        console.error(`error during render : ${req.url}`)
        console.error(err)
      }
    }

    const context = {
      title: 'vue-ssr-template',
      url: req.url,
      cookies: req.cookies
    }

    renderer.renderToString(context, (err, html) => {
      if (err) {
        return errorHandler(err)
      }
      res.end(html)
      console.log(`whole request: ${Date.now() - s}ms`)
    })
  })
    </pre>
  </div>
</template>

<script>
export default {
  name: 'Home',
  title () {
    return {
      title: 'Home',
      keywords: 'vue-ssr服务端脚手架, home',
      description: 'vue-ssr-template, vue-server-renderer, home'
    }
  },
  created() {},
  computed: {},
  asyncData({ store }) {},
  methods: {}
}
</script>
