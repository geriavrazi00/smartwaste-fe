<template class="">
  <Sidebar v-if="$route.name !== 'Login'"/>
  <router-view/>
</template>

<script>
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: { Sidebar },
}
</script>

<style>
  #app, #modals {
    font-family: ttcommons-regular, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
  }
</style>
