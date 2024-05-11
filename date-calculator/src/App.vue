<template>
  <AppHeader/>
  <main>
    <router-view/>
  </main>
  <AppFooter/>
</template>

<script>
import AppHeader from '@/components/layouts/AppHeader.vue';
import AppFooter from '@/components/layouts/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
  @import './css/reset.css';
  /* @import './css/common.css'; */
</style>
