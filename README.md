# vue-ssr-template

> Vue.js2.x 服务端渲染脚手架，拿来即用。

### 核心模块
- [express](https://github.com/expressjs/express)
- [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)
- [vue](https://github.com/vuejs/vue)
- [vue-router](https://github.com/vuejs/vue-router)
- [vuex](https://github.com/vuejs/vuex)
- [vuex-router-sync](https://github.com/vuejs/vuex-router-sync)
- [vue-server-renderer](https://github.com/vuejs/vue-ssr-docs/)

## Node 版本

```bash
node 6.x
node 7.x
```

## 本地运行

```bash
npm install or yarn install
npm run dev
```

## 打包项目

``` bash
npm install or yarn install
npm run build
npm start
```

## 删除已打包项目

``` bash
npm run del
```

## 项目部署
> 个人建议生产环境不放源代码，so .. 做了一些打包脚本 npm run build 后生成dist文件夹，将dist文件夹放在我们的生产服务器，安装依赖后通过npm run pm2 来启动项目(确保你已经安装了pm2)，了解[pm2](https://github.com/Unitech/pm2)。

``` bash
npm install or yarn install
npm run pm2
```

## 参考资源

[vue-hackernews-2.0](https://github.com/vuejs/vue-hackernews-2.0)
