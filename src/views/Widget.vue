<template>
  <div class="widget">
    <ol class="breadcrumb">
      <li class="active">Widget</li>
    </ol>
    <div class="row">
      <div class="col-md-3">
        <btn @click="alert" type="primary">Click to open an alert modal</btn>
      </div>
      <div class="col-md-3">
        <btn type="warning" id="btn">Hover me!</btn>
        <tooltip text="Static tooltip content goes here" target="#btn" />
      </div>
      <div class="col-md-3">
        <btn @click="notify" type="info">Simplest Notification</btn>
      </div>
      <div class="col-md-3">
        <dropdown ref="dropdown">
          <btn type="success" class="dropdown-toggle">Dropdown <span class="caret"></span></btn>
          <template slot="dropdown">
            <li><a role="button">Action</a></li>
            <li><a role="button">Another action</a></li>
            <li><a role="button">Something else here</a></li>
            <li role="separator" class="divider"></li>
            <li><a role="button">Separated link</a></li>
          </template>
        </dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Widget',
  title () {
    return {
      title: 'Widget',
      keywords: 'vue-ssr服务端脚手架, widget',
      description: 'vue-ssr-template, vue-server-renderer, widget'
    }
  },
  methods: {
    alert() {
      this.$alert({
        title: 'Title',
        content: 'This is an alert message.'
      }, (msg) => {
        // callback after modal dismissed
        this.$notify(`You selected ${msg}.`)
      })
    },
    notify() {
      this.$notify('This is a simple notify msg.', () => {
        // callback after dismissed
        console.log('dismissed')
      })
    }
  }
}

</script>
