<template>
  <div>
    <AppHeader/>
    <!--
      <PeriodCalculator/>
      <DateAddCalculator/>
      <DDayCalculator/>
      <AnniversaryCalculator/>
    -->
    <!-- <AppFooter/> -->
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue';
// import PeriodCalculator from './components/PeriodCalculator.vue';
// import DateAddCalculator from './components/DateAddCalculator.vue';
// import DDayCalculator from './components/DDayCalculator.vue';
// import AnniversaryCalculator from './components/AnniversaryCalculator.vue';
// import AppFooter from './components/common/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    // PeriodCalculator,
    // DateAddCalculator,
    // DDayCalculator,
    // AnniversaryCalculator
    // , AppFooter
  }
}
</script>

<style>
  @import './css/reset.css';
  /* @import './css/common.css'; */
</style>
