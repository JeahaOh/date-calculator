<template>
  <div class="hello">
    <VueDatePicker
      locale="ko"
      v-model="date"
      :enable-time-picker="false"
      :esc-close="true"
      :space-confirm="true"
      arrow-navigation
      cancel-text="Close"
      text-input
    />
      : format="format"
  </div>
</template>

<script setup>
import {ref} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const date = ref(new Date());
// const format = (date) => {
//   const YYYY = date.getFullYear();
//   let MM = date.getMonth() + 1;
//   MM = MM < 10 ? '0' + MM : MM;
//   let DD = date.getDate();
//   DD = DD < 10 ? '0' + DD : DD;

//   return `${YYYY}.${MM}.${DD}`;
// }

// const onKeypress = (date) => {
//   return date;
// }
</script>
