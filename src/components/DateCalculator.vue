<template>
  <section class="container">
    <div class="card mb-4">
      <div class="card-body">
        <div class="row mb-3">
          <div class="form-group">
            <input type="date" id="baseDate" name="baseDate" v-model="baseDate" class="form-control">
          </div>
        </div>
        <div class="row g-2 align-items-center">
          <div class="col-4">
            <input 
            type="number" 
            v-model="amount" 
            min="1"
            class="form-control"
            >
          </div>
          <div class="col-4">
            <select v-model="unit" class="form-select">
              <option value="days">일</option>
              <option value="weeks">주</option>
              <option value="months">개월</option>
              <option value="years">년</option>
            </select>
          </div>
          <div class="col-4">
            <select v-model="direction" class="form-select">
              <option value="after">후</option>
              <option value="before">전</option>
            </select>
          </div>
        </div>
      </div>
    </div>
      
      <div v-if="baseDate">
        <div class="card">
        <div class="card-body text-center">
          <h4 class="card-title mb-3">{{ calculatedDate }}</h4>
          <p class="card-text text-muted">
            오늘로부터 {{ daysFromToday }}일 
            {{ direction === 'after' ? '후' : '전' }}
          </p>
        </div>
      </div>
    </div>
  </section>
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