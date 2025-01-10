<template>
  <div class="container">
    <h1>날짜 계산기</h1>
    <div class="calculator-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
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
  { id: 'lunar', name: '음력 변환', component: LunarCalculator }
]

const currentTab = ref('period')

// computed를 사용하여 현재 컴포넌트 결정
const currentComponent = computed(() => {
  const tab = tabs.find(tab => tab.id === currentTab.value)
  return tab ? tab.component : PeriodCalculator
})
</script>

<style scoped>
.calculator-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

button:hover {
  background-color: #007bff;
  color: white;
}

button.active {
  background: #007bff;
  color: white;
  border-color: #0056b3;
}

.calculator-content {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

input[type="date"],
input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus,
select:focus {
  outline: none;
  border-color: #2196F3;
}

.result-card,
.section,
.result-item {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  margin-bottom: 1rem;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .calculator-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }

  .container {
    padding: 1rem;
  }
}
</style>