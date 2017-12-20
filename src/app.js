import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import * as uiv from 'uiv'
import titleMixin from './util/title'

Vue.mixin(titleMixin)

Vue.use(uiv)

export function createApp () {
  // 同步路由状态(route state)到 store
  sync(store, router)
  // 创建应用程序实例，将 router 和 store 注入
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  // 暴露 app, router 和 store。
  return {app, router, store}
}
