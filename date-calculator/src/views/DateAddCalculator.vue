<template>
  <section>
    <fieldset>
      <div>
        <h2>날짜 더하기&middot;빼기 계산기</h2>
      </div>

      <div>
        <label for="from_date">기준일</label>
        <input type="date" id="from_date" v-model="fromDate" @change="getDateDiff"/>
      </div>

      <div>
        <label for="includeFirstDay">시작일</label>
        <select
          id="includeFirstDay"
          v-model="includeFirstDaySelected"
          @change="addDate"
        >
          <option
            v-for="(option, idx) in includeFirstDayOptions" :key="idx"
            :value="option.value"
          >
            {{ option.title }}
          </option>
        </select>
      </div>
      

      <!-- 
        /**
         * @TODO
         * 숫자가 음수로 넘어갈 수 있는 것은 어떻게 처리 할 것인지 정의 해야 할 듯.
         */
      -->
      <br>
      
      <div>
        <input type="number" id="yearsToCalc" v-model="yearsToCalc" @change="addDate"/>
        <label for="yearsToCalc">년</label>
      </div>
      
      <br>
      
      <div>
        <input type="number" id="monthsToCalc" v-model="monthsToCalc" @change="addDate"/>
        <label for="monthsToCalc">월</label>
      </div>
      
      <br>
      
      <div>
        <input type="number" id="daysToCalc" v-model="daysToCalc" @change="addDate"/>
        <label for="daysToCalc">일</label>
      </div>
      

      <br>

      <CalcTypesRadio />
      <div style="display: none;"></div>

      <br>

      <div>
        <span>
          {{ fromDateStr }}로 부터
        </span>
        <br>
        <span v-if="yearsToCalc != 0">
          {{ yearsToCalc }} 년
        </span>
        <span v-if="monthsToCalc != 0">
          {{ monthsToCalc }} 개월
        </span>
        <span v-if="daysToCalc != 0">
          {{ daysToCalc }} 일
        </span>
        {{ calcType == 'ADD' ? '후' : '전' }}
        <br>
        {{ resultDateStr }}
      </div>

    </fieldset>
  </section>
</template>

<script>
import CalcTypesRadio from '@/components/common/enum/calcType/CalcTypesRadio.vue'

import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export default {
  components : {
    CalcTypesRadio
  },
  data() {
    return {
      fromDate : '',
      fromDateStr : '',
      resultDate : '',
      resultDateStr : '',
      yearsToCalc : 0,
      monthsToCalc : 0,
      daysToCalc : 100,
      includeFirstDaySelected : true,
      includeFirstDayOptions : [
        {'idx' : 1, 'name' : 'isIncludeFirstDay', 'title' : '포함', 'value' : true},
        {'idx' : 2, 'name' : 'isIncludeFirstDay', 'title' : '불포함', 'value' : false},
      ],
      calcType : 'ADD',
    }
  },
  created() {
    const currentDate = dayjs();
    this.fromDate = currentDate.format('YYYY-MM-DD');
    this.fromDateStr = currentDate.format('YYYY-MM-DD (ddd)');
    this.addDate();
  },
  methods: {
    addDate() {
      const fromDate = dayjs(this.fromDate);
      let yearsToCalc = this.yearsToCalc
      let monthsToCalc = this.monthsToCalc
      let daysToCalc = this.daysToCalc
      
      if (this.calcType === 'MINUS') {
        yearsToCalc *= -1
        monthsToCalc *= -1
        daysToCalc *= -1
      }

      let resultDate = fromDate.add(yearsToCalc, 'year');
      resultDate = resultDate.add(monthsToCalc, 'month');
      resultDate = resultDate.add(daysToCalc, 'day');
      
      if (!this.includeFirstDaySelected) resultDate = fromDate.add(-1, 'day');

      this.resultDate = dayjs(resultDate).format('YYYY-MM-DD');
      this.resultDateStr = dayjs(resultDate).format('YYYY-MM-DD (ddd)');

      return this.resultDate;
    }
  },
}
</script>