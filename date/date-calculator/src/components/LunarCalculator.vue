<template>
  <div class="converter">
    <!-- 첫 번째 섹션: 월/일 변환 -->
    <div class="section">
      <h3><label for="solarDate">양력 변환</label></h3>
      <div class="date-input">
        <input 
          type="date" 
          id="solarDate"
          name="solarDate"
          v-model="solarDate"
          :min="'1900-01-01'"
          :max="'2100-12-31'"
        >
      </div>
      <div class="result" v-if="solarToLunarResult">
        <p>
          음력으로 
          {{ solarToLunarResult.month }}월 
          {{ solarToLunarResult.day }}일
          입니다.
        </p>
      </div>
    </div>

    <!-- 두 번째 섹션: 양력/음력 전체 변환 -->
    <div class="section">
      <h3><label for="convertDate">양력/음력 변환</label></h3>
      <div class="date-input">
        <select v-model="dateType" class="date-type">
          <option value="solar">양력</option>
          <option value="lunar">음력</option>
        </select>
        <input 
          type="date" 
          id="convertDate"
          name="convertDate"
          v-model="convertDate"
          :min="'1900-01-01'"
          :max="'2100-12-31'"
        >
      </div>
      <div class="result" v-if="convertResult">
        <p>
          {{ dateType === 'solar' ? '음력' : '양력' }}으로 
          {{ formatResult(convertResult) }}
          입니다.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Solar, Lunar } from 'lunar-javascript'

// 오늘 날짜로 초기화
const today = new Date()
const solarDate = ref(today.toISOString().split('T')[0])
const convertDate = ref(today.toISOString().split('T')[0])
const dateType = ref('solar')

// 음력 변환 헬퍼 함수
const getLunarDate = (solar) => {
  const lunar = solar.getLunar()
  const lunarYear = lunar.getYear()
  let lunarMonth = lunar.getMonth()
  const lunarDay = lunar.getDay()
  
  // 음수 월이 나오면 이전 연도의 양력 날짜로 다시 계산
  if (lunarMonth < 0) {
    const prevYearSolar = Solar.fromYmd(solar.getYear() - 1, solar.getMonth(), solar.getDay())
    const prevYearLunar = prevYearSolar.getLunar()
    return {
      year: prevYearLunar.getYear(),
      month: prevYearLunar.getMonth(),
      day: prevYearLunar.getDay(),
    }
  }
  
  return {
    year: lunarYear,
    month: lunarMonth,
    day: lunarDay,
  }
}

// 첫 번째 섹션: 양력 → 음력 변환 결과
const solarToLunarResult = computed(() => {
  if (!solarDate.value) return null
  
  try {
    const [year, month, day] = solarDate.value.split('-').map(Number)
    const solar = Solar.fromYmd(year, month, day)
    return getLunarDate(solar)
  } catch (error) {
    console.error('변환 오류:', error)
    return null
  }
})

// 두 번째 섹션: 양력/음력 변환 결과
const convertResult = computed(() => {
  if (!convertDate.value) return null
  
  try {
    const [year, month, day] = convertDate.value.split('-').map(Number)
    
    if (dateType.value === 'solar') {
      // 양력 → 음력
      const solar = Solar.fromYmd(year, month, day)
      return getLunarDate(solar)
    } else {
      // 음력 → 양력
      const lunar = Lunar.fromYmd(year, month, day)
      const solar = lunar.getSolar()
      return {
        year: solar.getYear(),
        month: solar.getMonth(),
        day: solar.getDay()
      }
    }
  } catch (error) {
    console.error('변환 오류:', error)
    return null
  }
})

const formatResult = (result) => {
  if (!result) return ''
  let text = `${result.year}년 ${result.month}월 ${result.day}일`
  return text
}
</script>

<style scoped>
.converter {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.date-input {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 15px 0;
}

.date-input input[type="date"] {
  padding: 8px;
  font-size: 16px;
  flex: 1;
}

.date-type {
  padding: 8px;
  font-size: 16px;
  min-width: 80px;
}

.result {
  margin-top: 15px;
  color: #666;
}

h3 {
  margin: 0;
  color: #333;
}
</style>