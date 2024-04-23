<template>
  <div>
    <AppHeader/>
    <!--
      <DDayCalculator/>
      <PeriodCalculator/>
      <DateAddCalculator/>
    -->
    <AnniversaryCalculator/>
    <!-- <AppFooter/> -->
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue';
// import PeriodCalculator from './components/PeriodCalculator.vue';
// import DateAddCalculator from './components/DateAddCalculator.vue';
// import DDayCalculator from './components/DDayCalculator.vue';
// import AppFooter from './components/common/AppFooter.vue';
import AnniversaryCalculator from './components/AnniversaryCalculator.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AnniversaryCalculator
    // PeriodCalculator,
    // DateAddCalculator,
    // DDayCalculator,
    // , AppFooter
  }
}
</script>

<style>
  @import './css/reset.css';
  /* @import './css/common.css'; */
</style>
