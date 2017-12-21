function getTitle (vm) {
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function'
      ? title.call(vm)
      : title
  }
}

const serverTitleMixin = {
  created () {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = `${title.title} | vue-ssr-template`
      this.$ssrContext.keywords = title.keywords
      this.$ssrContext.description = title.description
    }
  }
}

const clientTitleMixin = {
  mounted () {
    const title = getTitle(this)
    if (title) {
      document.title = `${title.title} | vue-ssr-template`
      document.querySelector('meta[name="keywords"]').setAttribute('content', title.keywords)
      document.querySelector('meta[name="description"]').setAttribute('content', title.description)
    }
  }
}

export default process.env.VUE_ENV === 'server'
  ? serverTitleMixin
  : clientTitleMixin
