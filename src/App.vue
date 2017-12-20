<template>
	<div id="app" class="container">
	  <win-header></win-header>
	  <router-view class="view"></router-view>
	</div>
</template>

<script>
import WinHeader from 'components/header/Header'
export default {
  name: 'App',
  components: {
    WinHeader
  }
}
</script>

<style>
@import 'assets/css/app.css';
@import 'assets/css/nprogress.css';
</style>
