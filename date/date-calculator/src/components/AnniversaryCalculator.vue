<template>
  <div class="anniversary-calculator">
    <div class="input-section">
      <div class="input-group">
        <label for="baseDate">기준일</label>
        <input type="date" id="baseDate" name="baseDate" v-model="baseDate">
      </div>
    </div>

    <div class="results" v-if="baseDate">
      <h3>기념일 목록</h3>
      <div class="anniversary-list">
        <div v-for="(date, index) in anniversaryDates" 
             :key="index" 
             class="anniversary-item"
             :class="{ 'passed': isPassed(date.date) }">
          <div class="anniversary-info">
            <span class="day-count">{{ date.label }}</span>
            <span class="date">{{ formatDate(date.date) }}</span>
            <span class="day-of-week">({{ getDayOfWeek(date.date) }})</span>
          </div>
          <div class="remaining-info" :class="getTimeClass(date.date)">
            {{ getTimeText(date.date) }}
          </div>
        </div>
      </div>
    </div>
  </div>
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

<style scoped>
.anniversary-calculator {
  padding: 1rem;
}

.input-section {
  margin-bottom: 2rem;
}

.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-group input {
  /* width: 100%; */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.anniversary-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* 긴 목록을 위한 스타일 추가 */
.anniversary-list {
  max-height: 70vh;  /* 화면 높이의 70% */
  overflow-y: auto;  /* 스크롤 가능하도록 */
  padding-right: 1rem;  /* 스크롤바 공간 확보 */
}

/* 스크롤바 스타일링 (선택사항) */
.anniversary-list::-webkit-scrollbar {
  width: 8px;
}

.anniversary-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.anniversary-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.anniversary-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.anniversary-item {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.anniversary-info {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 0.5rem;
}

.day-count {
  font-weight: bold;
  font-size: 1.1rem;
}

.date {
  color: #666;
}

.day-of-week {
  color: #888;
  font-size: 0.9rem;
}

.remaining-info {
  font-size: 0.9rem;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
}

.remaining-info.future {
  color: #2196F3;
}

.remaining-info.today {
  color: #4CAF50;
}

.remaining-info.past {
  color: #F44336;
}

.anniversary-item.passed {
  opacity: 0.7;
}
</style>