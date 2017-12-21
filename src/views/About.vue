<template>
  <div class="about">
    <ol class="breadcrumb">
      <li class="active">About</li>
    </ol>
    <div class="row">
      <div class="col-md-3">
        <form class="form-inline">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="输入 hello vue" v-model="input" @keyup="toInput">
            <h4 v-if="cases.length">{{this.cases}}</h4>
          </div>
        </form>
      </div>
      <div class="col-md-3">
        <btn type="success" @click="createUid">create uuid</btn>
      </div>
    </div>
  </div>
</template>
<script>
import { toUpperCase, uuid } from 'util/util'
export default {
  name: 'About',
  title () {
    return {
      title: 'About',
      keywords: 'vue-ssr服务端脚手架, about',
      description: 'vue-ssr-template, vue-server-renderer, about'
    }
  },
  data() {
    return {
      input: '',
      cases: ''
    }
  },
  methods: {
    createUid() {
      this.$alert({
        title: 'uuid',
        content: uuid()
      })
    },
    toInput() {
      this.cases = toUpperCase(this.input)
    }
  }
}

</script>
