<template>
  <section class="container">
    <div class="card mb-4">
      <div class="card-body">
        <div class="mb-3">
          <input type="date" class="form-control" id="baseDate" name="baseDate" v-model="baseDate">
        </div>
      </div>
    </div>

    <div v-if="baseDate" class="overflow-auto" style="max-height: 400px">
      <div class="list-group">
        <div v-for="(date, index) in anniversaryDates" 
          :key="index" 
          class="list-group-item list-group-item-action"
          :class="{ 'list-group-item-secondary': isPassed(date.date) }"
        >
          <div class="d-flex align-items-center">
            <h5 class="mb-0 me-6">{{ date.label }}</h5>
          </div>
          <div class="d-flex justify-content-end">
            <span class="">{{ formatDate(date.date) }} ({{ getDayOfWeek(date.date) }})</span>
          </div>
          <div class="d-flex justify-content-end">
            <span class="text-muted" :class="getTimeClass(date.date)">
              {{ getTimeText(date.date) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

const baseDate = ref('')

// 기념일 계산
const anniversaryDates = computed(() => {
  if (!baseDate.value) return []
  
  const base = dayjs(baseDate.value)
  const milestones = [
    { days: 100, label: '100일' },
    { days: 200, label: '200일' },
    { days: 300, label: '300일' },
    { days: 365, label: '1년' },
    { days: 400, label: '400일' },
    { days: 500, label: '500일' },
    { days: 700, label: '700일' },
    { days: 730, label: '2년' },
    { days: 1000, label: '1000일' },
    { days: 1095, label: '3년' },
    { days: 1460, label: '4년' },
    { days: 1825, label: '5년' },
    { days: 2190, label: '6년' },
    { days: 2555, label: '7년' },
    { days: 2920, label: '8년' },
    { days: 3285, label: '9년' },
    { days: 3650, label: '10년' },
    { days: 7300, label: '20년' },
    { days: 10950, label: '30년' }
  ]

  return milestones.map(milestone => ({
    label: milestone.label,
    date: base.add(milestone.days, 'day')
  }))
});

// 오늘 날짜 포맷팅 함수
const getTodayString = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// 컴포넌트 마운트 시 오늘 날짜로 초기화
onMounted(() => {
  const todayStr = getTodayString()
  baseDate.value = todayStr
})

// 날짜 포맷팅
const formatDate = (date) => {
  return date.format('YYYY년 MM월 DD일')
}

// 요일 구하기
const getDayOfWeek = (date) => {
  const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
  return days[date.day()]
}

// 지난 날짜 여부 확인
const isPassed = (date) => {
  return date.isBefore(dayjs().startOf('day'))
}

// 남은 기간 또는 지난 기간 텍스트
const getTimeText = (date) => {
  const today = dayjs().startOf('day')
  const diff = Math.abs(date.diff(today, 'day'))
  
  if (date.isSame(today)) {
    return '오늘입니다'
  }
  
  const weeks = Math.floor(diff / 7)
  const remainingDays = diff % 7
  let text = ''
  
  if (weeks > 0) text += `${weeks}주 `
  if (remainingDays > 0 || weeks === 0) text += `${remainingDays}일`
  
  return `${text} ${date.isAfter(today) ? '남았습니다' : '지났습니다'}`
}

// 시간에 따른 클래스
const getTimeClass = (date) => {
  const today = dayjs().startOf('day')
  if (date.isSame(today)) return 'today'
  return date.isAfter(today) ? 'future' : 'past'
}
</script>