<template>
  <div>
    <AppHeader/>
    <!-- <AppNav/> -->
    <PeriodCalculator/>
    <DateAddCalculator/>
    <!-- <AppFooter/> -->
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue';
import PeriodCalculator from './components/PeriodCalculator.vue';
import DateAddCalculator from './components/DateAddCalculator.vue';
// import AppFooter from './components/common/AppFooter.vue';
// import AppNav from './components/common/AppNav.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    //  AppNav
    PeriodCalculator,
    DateAddCalculator,
    // , AppFooter
  }
}
</script>

<style>
  @import './css/reset.css';
  /* @import './css/common.css'; */
</style>
