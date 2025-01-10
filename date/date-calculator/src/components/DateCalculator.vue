<template>
  <div class="date-calculator">
    <div class="calculator-section">
      <div class="input-group">
        <label for="baseDate">기준일</label>
        <input type="date" id="baseDate" name="baseDate" v-model="baseDate" class="date-input">
      </div>
      <div class="calculation-inputs">
        <input 
          type="number" 
          v-model="amount" 
          min="1" 
          class="number-input"
        >
        <select v-model="unit" class="select-input">
          <option value="days">일</option>
          <option value="weeks">주</option>
          <option value="months">개월</option>
          <option value="years">년</option>
        </select>
        <select v-model="direction" class="select-input">
          <option value="after">후</option>
          <option value="before">전</option>
        </select>
      </div>
    </div>

    <div class="results" v-if="baseDate">
      <div class="result-card">
        <h3>계산 결과</h3>
        <div class="result-content">
          <p class="calculated-date">{{ calculatedDate }}</p>
          <p class="days-info">
            오늘로부터 {{ daysFromToday }}일 
            {{ direction === 'after' ? '후' : '전' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

// 오늘 날짜 포맷팅 함수
const getTodayString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const baseDate = ref('')
const amount = ref(100)
const unit = ref('days')
const direction = ref('after')

// 컴포넌트 마운트 시 오늘 날짜로 초기화
onMounted(() => {
  baseDate.value = getTodayString()
})

// 계산된 날짜의 dayjs 객체를 반환하는 computed
const calculatedDateObj = computed(() => {
  if (!baseDate.value) return null
  
  const date = dayjs(baseDate.value)
  const method = direction.value === 'after' ? 'add' : 'subtract'
  
  return date[method](amount.value, unit.value)
})

// 포맷된 날짜 문자열을 반환하는 computed
const calculatedDate = computed(() => {
  return calculatedDateObj.value?.format('YYYY년 MM월 DD일') || ''
})

// 오늘부터의 일수 차이 계산
const daysFromToday = computed(() => {
  if (!calculatedDateObj.value) return 0
  return Math.abs(dayjs().startOf('day').diff(calculatedDateObj.value, 'day'))
})
</script>

<style scoped>
.date-calculator {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.calculator-section {
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.input-group label {
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
}

.date-input {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  width: 100%;
}

.date-input:focus {
  outline: none;
  border-color: #2196F3;
}

.calculation-inputs {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.number-input {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100px;
  transition: border-color 0.2s;
}

.number-input:focus {
  outline: none;
  border-color: #2196F3;
}

.select-input {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.2s;
  min-width: 100px;
}

.select-input:focus {
  outline: none;
  border-color: #2196F3;
}

.results {
  margin-top: 2rem;
}

.result-card {
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
}

.result-card h3 {
  margin: 0 0 1rem 0;
  color: #333;
  font-size: 1.3rem;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.calculated-date {
  font-size: 1.4rem;
  color: #1976D2;
  font-weight: 500;
  margin: 0;
}

.days-info {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

@media (max-width: 480px) {
  .date-calculator {
    padding: 1rem;
  }

  .calculation-inputs {
    flex-direction: column;
    gap: 0.8rem;
  }

  .number-input,
  .select-input {
    width: 100%;
  }
}
</style>