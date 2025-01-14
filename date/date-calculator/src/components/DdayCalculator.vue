<template>
  <section class="container">
    <div class="card mb-4">
      <div class="card-body">
        <div class="row mb-3">
          <div class="form-group">
            <input type="date" class="form-control" id="targetDate" name="targetDate" v-model="targetDate">
          </div>
        </div>

        <div class="results" v-if="targetDate">
          <div class="card mb-3">
            <div class="card-body text-center">
              <p class="display-4 fw-bold" :class="ddayClass">
                {{ ddayText }}
              </p>
              <div class="detail-info">
                <p class="mb-1">{{ detailText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <div class="card-header">
        <div class="row mb-3">
          <div class="form-group">
            <input
              type="text" class="form-control" id="dateTitle" name="dateTitle"
              v-model="dateTitle"
              placeholder="D-Day의 이름을 입력하세요"
            />
          </div>
        </div>
        <button 
          @click="saveDday" 
          class="btn btn-primary w-100"
          :class="{ 'btn-secondary': !targetDate || !dateTitle }"
          :disabled="!targetDate || !dateTitle"
        >
          D-Day 저장하기
        </button>
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item d-flex justify-content-between align-items-center" 
            v-for="(dday, index) in savedDdaysWithCount" 
            :key="index">
          <div class="dday-info">
            <div class="fw-bold">{{ dday.dateTitle }}: {{ dday.date }}</div>
            <div :class="['badge', dday.className, 'bg-secondary', 'text-white']">
              {{ dday.ddayText }}
              <small>({{ dday.detailText }})</small>
            </div>
          </div>
          <button @click="removeDday(index)" class="btn btn-danger btn-sm">삭제</button>
        </li>
      </ul>
    </div>

  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'

// 오늘 날짜에서 100일 후로 초기화
const today = new Date()
const targetDate = ref(dayjs(today).add(100, 'day').format('YYYY-MM-DD'))
const dateTitle = ref('')
const savedDdays = ref([])

// D-Day 계산
const ddayCount = computed(() => {
  if (!targetDate.value) return 0
  const today = dayjs().startOf('day')
  const target = dayjs(targetDate.value)
  return target.diff(today, 'day')
})

// D-Day 텍스트 표시
const ddayText = computed(() => {
  if (!targetDate.value) return ''
  if (ddayCount.value === 0) return 'D-Day'
  return ddayCount.value > 0 ? `D-${ddayCount.value}` : `D+${Math.abs(ddayCount.value)}`
})

// CSS 클래스 동적 적용
const ddayClass = computed(() => {
  if (ddayCount.value === 0) return 'today'
  return ddayCount.value > 0 ? 'future' : 'past'
})

// 상세 정보 텍스트
const detailText = computed(() => {
  if (!targetDate.value) return ''
  const days = Math.abs(ddayCount.value)
  if (days === 0) return '오늘입니다'
  
  const weeks = Math.floor(days / 7)
  const remainingDays = days % 7
  
  let text = ''
  if (weeks > 0) text += `${weeks}주 `
  if (remainingDays > 0 || weeks === 0) text += `${remainingDays}일`
  
  return `${text} ${ddayCount.value > 0 ? '남았습니다' : '지났습니다'}`
})

// 목표일 포맷팅
const targetDateFormatted = computed(() => {
  if (!targetDate.value) return ''
  return dayjs(targetDate.value).format('YYYY년 MM월 DD일')
})

// 요일 표시
// const dayOfWeek = computed(() => {
//   if (!targetDate.value) return ''
//   const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일']
//   return days[dayjs(targetDate.value).day()]
// })

// 저장된 D-Day에 남은 일수 계산을 추가한 computed
const savedDdaysWithCount = computed(() => {
  return savedDdays.value.map(dday => {
    // dayjs로 날짜 파싱 (YYYY년 MM월 DD일 형식)
    const targetDate = dayjs(dday.date.replace(/년|월|일/g, '').trim(), 'YYYY MM DD')
    const today = dayjs().startOf('day')
    const diff = targetDate.diff(today, 'day')
    
    // D-Day 텍스트
    let ddayText = diff === 0 ? 'D-Day' : 
                  diff > 0 ? `D-${diff}` : `D+${Math.abs(diff)}`
    
    // 상세 텍스트
    let detailText = ''
    const days = Math.abs(diff)
    if (days === 0) {
      detailText = '오늘'
    } else {
      const weeks = Math.floor(days / 7)
      const remainingDays = days % 7
      
      if (weeks > 0) detailText += `${weeks}주 `
      if (remainingDays > 0 || weeks === 0) detailText += `${remainingDays}일`
      detailText += diff > 0 ? ' 남음' : ' 지남'
    }

    // CSS 클래스
    const className = diff === 0 ? 'today' : 
                     diff > 0 ? 'future' : 'past'

    return {
      ...dday,
      ddayText,
      detailText,
      className
    }
  })
})

// D-Day 저장
const saveDday = () => {
  savedDdays.value.push({
    date: targetDateFormatted.value,
    dateTitle: dateTitle.value
  });
  dateTitle.value = '';
  // localStorage에 저장 (선택사항)
  localStorage.setItem('savedDdays', JSON.stringify(savedDdays.value));
}

// D-Day 삭제
const removeDday = (index) => {
  savedDdays.value.splice(index, 1);
  // localStorage 업데이트 (선택사항)
  localStorage.setItem('savedDdays', JSON.stringify(savedDdays.value));
}

// 저장된 D-Day 불러오기 (선택사항)
const loadSavedDdays = () => {
  const saved = localStorage.getItem('savedDdays')
  if (saved) {
    savedDdays.value = JSON.parse(saved)
  }
}

// 컴포넌트 마운트 시 저장된 데이터 불러오기
loadSavedDdays()
</script>