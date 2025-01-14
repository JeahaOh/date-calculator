<template>
  <div class="container">
    <h1 class="text-center my-2">날짜 계산기</h1>
    
    <div class="nav nav-pills nav-fill mb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="nav-link"
        :class="{ active: currentTab === tab.id }"
        @click="currentTab = tab.id"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="calculator-content">
      <KeepAlive>
        <component :is="currentComponent" />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'  // shallowRef 대신 computed 사용

import PeriodCalculator from './components/PeriodCalculator.vue'
import DateCalculator from './components/DateCalculator.vue'
import DdayCalculator from './components/DdayCalculator.vue'
import AnniversaryCalculator from './components/AnniversaryCalculator.vue'
import WeekCalculator from './components/WeekCalculator.vue'
import LunarCalculator from './components/LunarCalculator.vue'

const tabs = [
  { id: 'period', name: '기간 계산', component: PeriodCalculator },
  { id: 'date', name: '일수 계산', component: DateCalculator },
  { id: 'dday', name: 'D-Day', component: DdayCalculator },
  { id: 'anniversary', name: '기념일', component: AnniversaryCalculator },
  { id: 'week', name: '주차 계산', component: WeekCalculator },
  { id: 'lunar', name: '음력/양력 변환', component: LunarCalculator }
]

const currentTab = ref('period')

// computed를 사용하여 현재 컴포넌트 결정
const currentComponent = computed(() => {
  const tab = tabs.find(tab => tab.id === currentTab.value)
  return tab ? tab.component : PeriodCalculator
})
/**/
</script>
