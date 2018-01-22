<template>
	<header id="header" class="header">
	  <top-header></top-header>
	  <top-menus></top-menus>
	</header>
</template>
<script>
import TopHeader from 'components/header/TopHeader.vue'
import TopMenus from 'components/menu/Menu.vue'

export default {
  components: {
    TopHeader,
    TopMenus
  }
}
</script>
<style>
.header {
  padding: 12px 20px 0;
}
</style>
