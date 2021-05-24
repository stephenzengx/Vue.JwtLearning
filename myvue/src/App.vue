
<template>
  <div id="app">
    <router-view></router-view> 
  <!-- 一个待放置内容的 router-view，router-view 的内容将由 router 配置决定。 -->
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
