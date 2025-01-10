<template>
  <div class="week-calculator">
    <div class="input-section">
      <div class="input-group">
        <label for="selectedDate">날짜 선택</label>
        <input type="date" id="selectedDate" name="selectedDate" v-model="selectedDate">
      </div>
    </div>

    <div class="results" v-if="selectedDate">
      <div class="result-item">
        <div class="week-info">
          <p class="week-number">
            {{ monthWeek }}
            <span class="sub-text">(이번 달 기준)</span>
          </p>
          <p class="week-number">
            {{ yearWeek }}
            <span class="sub-text">(올해 기준)</span>
          </p>
        </div>
      </div>

      <div class="month-calendar">
        <h3>{{ currentMonth }} 주차 정보</h3>
        <div class="calendar-grid">
          <div class="calendar-header">
            <span v-for="day in weekDays" 
              :key="day"
              :class="{ 'sunday': day === '일', 'saturday': day === '토' }"
            >{{ day }}
            </span>
          </div>
          <div class="calendar-body">
            <div v-for="week in monthCalendar" 
                 :key="week.weekNum" 
                 class="calendar-week"
                 :class="{ 'current-week': week.isCurrentWeek }">
              <div v-for="day in week.days" 
                   :key="day.date"
                   class="calendar-day"
                   :class="{
                     'other-month': !day.isCurrentMonth,
                     'selected': day.isSelected,
                     'today': day.isToday
                   }">
                {{ day.dayNum }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import isoWeek from 'dayjs/plugin/isoWeek'
import isoWeeksInYear from 'dayjs/plugin/isoWeeksInYear'
import isLeapYear from 'dayjs/plugin/isLeapYear'

// 필요한 플러그인들 추가
dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)
dayjs.extend(isoWeeksInYear)
dayjs.extend(isLeapYear)

const selectedDate = ref(dayjs().format('YYYY-MM-DD'))

// ISO 월 주차 계산
const monthWeek = computed(() => {
  if (!selectedDate.value) return ''
  const date = dayjs(selectedDate.value);
  let targetMonth = date.month();
  const targetDate = date.date();

  const startWeekDay = date.startOf('month').day();
  const originalWeek = Math.ceil((targetDate + startWeekDay - 1) / 7);

  let weekCorrection = 0;
  if (startWeekDay >= 1 && startWeekDay <= 4) {
    // 마지막 주라면 주차 조정
    if (originalWeek === 5) {
      // 월 종료일
      const endWeekDay = date.endOf('month').day(); 
      // 월-수
      if (endWeekDay >= 1 && endWeekDay <= 3) {
        // n + 1월
        targetMonth = date.add(1, 'month').month();
        weekCorrection = -4;
      }
    }
  } else if (startWeekDay === 0) {
    if (originalWeek === 0) {
      const lastDateOfPreviousMonth = date.subtract(1, 'month').endOf('month');
      const {week} = getWeekOfMonth(lastDateOfPreviousMonth);
      weekCorrection = week;
    } else if (originalWeek === 5) {
      targetMonth = date.add(1, 'month').month();
      weekCorrection = -4;
    }
  } else {
    if (originalWeek === 1) {
      const lastDateOfPreviousMonth = date.subtract(1, 'month').endOf('month');
      const {week} = getWeekOfMonth(lastDateOfPreviousMonth);
      targetMonth = lastDateOfPreviousMonth.month();
      weekCorrection = week - originalWeek;
    } else if (originalWeek === 6) {
      targetMonth = date.add(1, 'month').month();
      weekCorrection = -5;
    } else {
      weekCorrection = - 1;
    }
  }

  return `${targetMonth + 1}월 ${originalWeek + weekCorrection}주차`
});

const getWeekOfMonth = (date) => {
  const week = date.isoWeek();
  const month = date.month();
  return {week, month};
}

// ISO 연간 주차 계산
const yearWeek = computed(() => {
  if (!selectedDate.value) return ''
  const date = dayjs(selectedDate.value)
  const weekNum = date.isoWeek()
  const yearNum = date.year()
  
  // 1주차이면서 전년도에 속하는 경우
  if (weekNum === 1 && date.month() === 11) {
    return `${yearNum + 1}년 ${weekNum}주차`
  }
  // 52/53주차이면서 다음년도에 속하는 경우
  if (weekNum >= 52 && date.month() === 0) {
    return `${yearNum - 1}년 ${weekNum}주차`
  }
  
  return `${yearNum}년 ${weekNum}주차`
})

// 달력 데이터 생성 (월요일부터 시작)
const monthCalendar = computed(() => {
  if (!selectedDate.value) return []
  
  const date = dayjs(selectedDate.value)
  const today = dayjs().startOf('day')
  const firstDay = date.startOf('month')
  const lastDay = date.endOf('month')
  const selectedDay = dayjs(selectedDate.value).startOf('day')
  
  let calendar = []
  let week = []
  let weekNum = 1
  
  // 이전 달의 날짜 채우기 (월요일부터 시작)
  const firstDayOfWeek = firstDay.day() || 7 // 일요일은 7로 변환
  for (let i = 1; i < firstDayOfWeek; i++) {
    const prevDate = firstDay.subtract(firstDayOfWeek - i, 'day')
    week.push({
      date: prevDate,
      dayNum: prevDate.date(),
      isCurrentMonth: false,
      isSelected: prevDate.isSame(selectedDay),
      isToday: prevDate.isSame(today)
    })
  }
  
  // 현재 달의 날짜 채우기
  for (let i = 1; i <= lastDay.date(); i++) {
    const currentDate = date.date(i)
    week.push({
      date: currentDate,
      dayNum: i,
      isCurrentMonth: true,
      isSelected: currentDate.isSame(selectedDay),
      isToday: currentDate.isSame(today)
    })
    
    if (week.length === 7) {
      calendar.push({
        weekNum: weekNum++,
        days: week,
        isCurrentWeek: week.some(day => day.isSelected)
      })
      week = []
    }
  }
  
  // 다음 달의 날짜 채우기
  if (week.length > 0) {
    const remainingDays = 7 - week.length
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = lastDay.add(i, 'day')
      week.push({
        date: nextDate,
        dayNum: nextDate.date(),
        isCurrentMonth: false,
        isSelected: nextDate.isSame(selectedDay),
        isToday: nextDate.isSame(today)
      })
    }
    calendar.push({
      weekNum: weekNum,
      days: week,
      isCurrentWeek: week.some(day => day.isSelected)
    })
  }
  
  return calendar
})

// 달력 헤더 (월요일부터 시작)
const weekDays = ['월', '화', '수', '목', '금', '토', '일']
</script>

<style scoped>
.week-calculator {
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
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.result-item {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fff;
}

.week-info {
  margin-top: 1rem;
}

.week-number {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0.5rem 0;
}

.sub-text {
  font-size: 0.9rem;
  color: #666;
  font-weight: normal;
  margin-left: 0.5rem;
}

.month-calendar {
  margin-top: 2rem;
}

.calendar-grid {
  margin-top: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: #f8f9fa;
  padding: 0.5rem;
  text-align: center;
  font-weight: bold;
}

.calendar-header span:first-child {
  color: #dc3545;  /* 일요일 색상 */
}

.calendar-header span:last-child {
  color: #0d6efd;  /* 토요일 색상 */
}

.calendar-header .sunday {
  color: #dc3545;
}

.calendar-header .saturday {
  color: #0d6efd;
}

.calendar-body {
  background-color: #fff;
}

.calendar-week {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border-top: 1px solid #eee;
}

.calendar-week.current-week {
  background-color: #e8f4ff;
}

.calendar-day {
  padding: 0.8rem;
  text-align: center;
  position: relative;
}

.calendar-day.other-month {
  color: #ccc;
}

.calendar-day.selected {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.calendar-day.today {
  border: 2px solid #28a745;
  font-weight: bold;
}
</style>
<!--
# N월 N주차 구하기

- 국제 표준 ISO-8601에 따르면 주는 월요일부터 시작합니다.
- 매월의 첫 주는 4일 이상이 포함된 주를 기준으로 합니다.
- 쉽게 말해 계산의 기준은 목요일 입니다.

## 주차를 구하는 식을 세우고 다음 날짜는 몇월 몇주차인지 결과를 출력해보시오

- 2022년 2월 1일 : 2월 1주차
- 2025년 1월 10일 : 1월 2주차
- 2024년 12월 30일 : 1월 1주차
- 2022년 1월 5일 : 1월 1주차
- 2021년 7월 1일 : 7월 1주차
- 2021년 7월 30일 : 7월 5주차차
-->