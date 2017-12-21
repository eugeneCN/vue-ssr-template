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
    <modal v-model="open" title="Modal" ref="modal">
      <h4>JSON</h4>
      <pre>{{jsons}}</pre>
    </modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import api from 'src/api'
export default {
  name: 'Themes',
  title () {
    return {
      title: 'Themes',
      keywords: 'vue-ssr服务端脚手架, themes',
      description: 'vue-ssr-template, vue-server-renderer, themes'
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
      themes: 'getThemes'
    })
  },
  methods: {
    themeView(id) {
      api.get(`/theme/${id}`).then((response) => {
        if (response) {
          this.open = !this.open
          this.jsons = JSON.stringify(response, null, 2)
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  asyncData({ store }) {
    return store.dispatch('getThemes')
  }
}

</script>
