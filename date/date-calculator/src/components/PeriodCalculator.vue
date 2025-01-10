<template>
  <div class="period-calculator">
    <div class="input-section">
      <div class="date-inputs">
        <div class="input-group">
          <label for="fromDate">시작일</label>
          <input type="date" id="fromDate" name="fromDate" v-model="fromDate">
        </div>
        <div class="input-group">
          <label for="toDate">종료일</label>
          <input type="date" id="toDate" name="toDate" v-model="toDate">
        </div>
      </div>
      <div class="options">
        <label>
          <input type="checkbox" v-model="includeFirstDay">
          초일 포함하여 계산
        </label>
      </div>
    </div>

    <div class="results" v-if="isValidDates">
      <div class="result-item">
        <p>{{ daysDifference }}일</p>
      </div>
      <div class="result-item">
        <p>{{ weeksDifference }}주 {{ remainingDays }}일</p>
      </div>
      <div class="result-item">
        <p>{{ monthsDifference }}개월 {{ remainingDaysInMonth }}일</p>
      </div>
      <div class="result-item">
        <p>{{ yearsDifference }}년 {{ remainingMonths }}개월 {{ remainingDaysInYear }}일</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

// 날짜 포맷팅 함수
const getTodayString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 오늘로부터 N일 후 날짜 포맷팅 함수
const getFutureDateString = (days) => {
  const futureDate = dayjs().add(days, 'day')
  return futureDate.format('YYYY-MM-DD')
}

const fromDate = ref('')
const toDate = ref('')
const includeFirstDay = ref(true)

// 컴포넌트 마운트 시 날짜 초기화
onMounted(() => {
  fromDate.value = getTodayString()
  toDate.value = getFutureDateString(100)
})

const isValidDates = computed(() => fromDate.value && toDate.value)
const calculateTotalDays = (start, end, includeFirst) => {
  const days = dayjs(end).diff(dayjs(start), 'day')
  return includeFirst ? days + 1 : days
}
const daysDifference = computed(() => {
  if (!isValidDates.value) return 0
  const days = dayjs(toDate.value).diff(dayjs(fromDate.value), 'day')
  return includeFirstDay.value ? days + 1 : days
})

const weeksDifference = computed(() => Math.floor(daysDifference.value / 7))
const remainingDays = computed(() => daysDifference.value % 7)

const monthsDifference = computed(() => {
  if (!isValidDates.value) return 0
  const months = dayjs(toDate.value).diff(dayjs(fromDate.value), 'month')
  const monthEnd = dayjs(fromDate.value).add(months, 'month')

  // 마지막 달의 일수 차이 계산
  const remainingDays = calculateTotalDays(monthEnd, toDate.value, includeFirstDay.value)

  // 남은 일수가 음수면 한 달을 빼고, 양수면 현재 달 유지
  return remainingDays < 0 ? months - 1 : months
})

const remainingDaysInMonth = computed(() => {
  if (!isValidDates.value) return 0
  const months = monthsDifference.value
  const monthEnd = dayjs(fromDate.value).add(months, 'month')
  return calculateTotalDays(monthEnd, toDate.value, includeFirstDay.value)
})

const yearsDifference = computed(() => {
  if (!isValidDates.value) return 0
  const years = dayjs(toDate.value).diff(dayjs(fromDate.value), 'year')
  const yearEnd = dayjs(fromDate.value).add(years, 'year')

  // 마지막 년의 일수 차이 계산
  const remainingDays = calculateTotalDays(yearEnd, toDate.value, includeFirstDay.value)

  // 남은 일수가 음수면 한 해를 빼고, 양수면 현재 해 유지
  return remainingDays < 0 ? years - 1 : years
})
const remainingMonths = computed(() => {
  if (!isValidDates.value) return 0
  const totalMonths = monthsDifference.value
  return totalMonths % 12
})
const remainingDaysInYear = computed(() => remainingDaysInMonth.value)
</script>

<style scoped>
.period-calculator {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.input-section {
  margin-bottom: 2rem;
}

.date-inputs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.input-group input[type="date"] {
  height: 45px;
  padding: 0 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  background-color: white;
  transition: all 0.2s ease;
  width: 100%;
  font-family: inherit;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.input-group input[type="date"]:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.input-group input[type="date"]:hover {
  border-color: #90CAF9;
}

.options {
  margin-top: 1rem;
}

.options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #666;
  cursor: pointer;
}

.options input[type="checkbox"] {
  width: 18px;
  height: 18px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  cursor: pointer;
}

.results {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.result-item {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.result-item h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.1rem;
}

.result-item p {
  margin: 0;
  color: #1976D2;
  font-size: 1.3rem;
  font-weight: 500;
}

@media (max-width: 480px) {
  .period-calculator {
    padding: 1rem;
  }

  .date-inputs {
    flex-direction: column;
  }

  .results {
    grid-template-columns: 1fr;
  }
}
</style>