<template>
  <div class="counter">
    <ol class="breadcrumb">
      <li class="active">Counter</li>
    </ol>
    <button @click='increment' class="btn btn-info">Increment +1</button>
    <button @click='decrement' class="btn btn-info">Decrement -1</button>
    <h3>Count is {{ count }}</h3>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Counter',
  title () {
    return {
      title: 'Counter',
      keywords: 'vue-ssr服务端脚手架, counter',
      description: 'vue-ssr-template, vue-server-renderer, counter'
    }
  },
  computed: {
    ...mapGetters({
      count: 'getCount'
    })
  },
  methods: {
    ...mapActions([
      'increment',
      'decrement'
    ])
  }
}
</script>
