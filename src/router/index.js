import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from 'views/Home.vue'
import About from 'views/About.vue'
import Themes from 'views/Themes.vue'
import Widget from 'views/Widget.vue'
import Counter from 'views/Counter.vue'
import Theme from 'views/Theme.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'active',
  base: __dirname,
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/About',
    component: About
  }, {
    path: '/Themes',
    component: Themes
  }, {
    path: '/Widget',
    component: Widget
  }, {
    path: '/Counter',
    component: Counter
  }, {
    path: '/Theme/:id',
    component: Theme
  }]
})

export default router
