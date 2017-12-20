<template>
  <div id="TopHeader">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <avator></avator>
        <p class="navbar-text">
          <a v-bind:href="href" target="_blank">{{title}}</a>
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
import avator from 'components/avator/Avator.vue'

export default {
  name: 'TopHeader',
  data() {
    return {
      href: 'https://github.com/eugeneCN/vue-ssr-template',
      title: 'vue-ssr-template'
    }
  },
  components: {
    avator
  }
}
</script>

