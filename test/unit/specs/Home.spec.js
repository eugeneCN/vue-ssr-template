import Vue from 'vue'
import Home from 'views/Home'

describe('Home.vue', () => {
  it('正常渲染 - Home.vue', () => {
    const vm = new Vue(Home).$mount()
    expect(vm.$el.textContent).to.contain('Home')
  })
})
