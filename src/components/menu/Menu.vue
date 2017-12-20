<template>
  <ul class="nav nav-pills">
    <li v-for="item in menus" :class="styleClass(item)" @click="toPath(item)">
      <a href="javascript:;">{{item.text}}</a>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'menus',
  data() {
    return {
      menus: [{
        text: 'Home',
        path: '/'
      }, {
        text: 'Themes',
        path: '/themes'
      }, {
        text: 'About',
        path: '/about'
      }, {
        text: 'Widget',
        path: '/widget'
      }, {
        text: 'Counter',
        path: '/counter'
      }]
    }
  },
  methods: {
    styleClass(item) {
      return { active: item.path === this.$route.path }
    },
    toPath(path) {
      this.$router.replace(path)
    }
  }
}
</script>
