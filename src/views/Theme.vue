<template>
  <div class="themes">
    <ol class="breadcrumb">
      <li class="active">Theme</li>
      <li><a @click="$router.go(-1)" href="javascript:;">back</a></li>
    </ol>
    <pre>{{jsons}}</pre>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Theme',
  title () {
    return {
      title: this.theme.name,
      keywords: this.theme.description,
      description: this.theme.description
    }
  },
  data() {
    return {
      open: false,
      jsons: {}
    }
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme'
    })
  },
  created () {
    this.jsons = JSON.stringify(this.theme, null, 2)
  },
  methods: {},
  asyncData({ store, route }) {
    return store.dispatch('getTheme', route.params.id)
  }
}

</script>
