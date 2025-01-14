<template>
  <section class="container">
    <div class="card mb-4">
      <div class="card-body">
        <div class="row mb-3">
          <div class="form-group">
            <input type="date" class="form-control" id="fromDate" name="fromDate" v-model="fromDate">
          </div>
        </div>
        <div class="row mb-3">
          <div class="form-group d-flex justify-content-center align-items-center">
            <span class="text-center">~</span>
          </div>
        </div>
        <div class="row mb-3">
          <div class="form-group">
            <input type="date" class="form-control" id="toDate" name="toDate" v-model="toDate">
          </div>
        </div>
        <div class="row">
          <div class="form-group">
            <input type="checkbox" class="form-check-input me-2" id="includeFirstDay" v-model="includeFirstDay">
            <label class="form-check-label" for="includeFirstDay">
              초일 포함
            </label>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isValidDates">
      <div class="card mb-3">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 mb-4">
              <p class="card-text">{{ daysDifference }}일</p>
            </div>
            <div class="col-md-6 mb-4" v-if="weeksDifference > 0">
              <p class="card-text">{{ weeksDifference }}주 {{ remainingDays }}일</p>
            </div>
            <div class="col-md-6 mb-4" v-if="monthsDifference > 0">
              <p class="card-text">{{ monthsDifference }}개월 {{ remainingDaysInMonth }}일</p>
            </div>
            <div class="col-md-6 mb-4" v-if="yearsDifference > 0">
              <p class="card-text">{{ yearsDifference }}년 {{ remainingMonths }}개월 {{ remainingDaysInYear }}일</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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
  const remainingDays = calculateTotalDays(yearEnd, toDate.value, includeFirstDay.value);

  // 남은 일수가 음수면 한 해를 빼고, 양수면 현재 해 유지
  return remainingDays < 0 ? years - 1 : years;
});

const remainingMonths = computed(() => {
  if (!isValidDates.value) return 0
  const totalMonths = monthsDifference.value
  return totalMonths % 12
})
const remainingDaysInYear = computed(() => remainingDaysInMonth.value)
</script>