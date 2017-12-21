<template>
  <div class="themes">
    <ol class="breadcrumb">
      <li class="active">Themes</li>
    </ol>
    <div class="media" v-for="item in themes">
      <div class="media-left">
        <a href="javascript:;" @click="themeView(item.id)">
          <img class="media-object" width="52" :src="item.thumbnail" :alt="item.name">
        </a>
      </div>
      <div class="media-body">
        <h4 class="media-heading">{{item.name}}</h4>
        <p>{{item.description}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Theme',
  title() {
    return {
      title: 'Themes',
      keywords: 'vue-ssr服务端脚手架, themes',
      description: 'vue-ssr-template, vue-server-renderer, themes'
    }
  },
  computed: {
    ...mapGetters({
      themes: 'getThemes'
    })
  },
  methods: {
    themeView(id) {
      this.$router.push({ path: '/theme/' + id, params: { id } })
    }
  },
  asyncData({ store }) {
    return store.dispatch('getThemes')
  }
}

</script>
