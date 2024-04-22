<template>
  <div class="app">
    <AppHeader/>
    <AppNav/>
    <div class="app-contents">
      <section>
        content
      </section>
    </div>
    <!-- <AppFooter/> -->
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue';
// import AppFooter from './components/common/AppFooter.vue';
import AppNav from './components/common/AppNav.vue';

export default {
  name: 'App',
  components: {
    AppHeader, AppNav
    // , AppFooter
  }
}
</script>

<style>
@import './css/reset.css';
@import './css/common.css';
</style>
