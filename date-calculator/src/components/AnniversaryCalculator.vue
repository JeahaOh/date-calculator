<template>
  <section>
    <fieldset>
      <div>
        <h2>기념일 계산기</h2>
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
      
      <br>
      
      <div>

      </div>
      
      <br>

    </fieldset>
  </section>
</template>

<script>
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export default {
  data() {
    return {
      fromDate : '',
      fromDateStr : '',
      resultDate : '',
      resultDateStr : '',
      daysToCalc : 100,
      includeFirstDaySelected : true,
      includeFirstDayOptions : [
        {'idx' : 1, 'name' : 'isIncludeFirstDay', 'title' : '포함', 'value' : true},
        {'idx' : 2, 'name' : 'isIncludeFirstDay', 'title' : '불포함', 'value' : false},
      ],
      calcType : 'ADD',
      calcTypes : [
        {'idx' : 1, 'name' : 'calcType', 'title' : '후', 'value' : 'ADD'},
        {'idx' : 2, 'name' : 'calcType', 'title' : '전', 'value' : 'MINUS'},
      ],
      anni : {},
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
      let daysToCalc = this.daysToCalc
      if (!this.includeFirstDaySelected) daysToCalc++;

      if (this.calcType === 'MINUS') daysToCalc = daysToCalc * -1
      
      const resultDate = fromDate.add(daysToCalc, 'day');
      this.resultDate = dayjs(resultDate).format('YYYY-MM-DD');
      this.resultDateStr = dayjs(resultDate).format('YYYY-MM-DD (ddd)');

      return this.resultDate;
    },
    // createDaysArr() {
    //   let anni = {};
    //   let i = 1;
    //   while (i <= 11) {
    //       console.log(i * 100);
    //       this.anni[i * 100] = {name : `${i * 100}일`, days : (i * 100)}
    //       i++;
    //   }
    //   i = 1;
    //   while (i <= 3) {
    //       console.log(i * 100);
    //       anni[i * 365] = {name : `${i}주년`, days : (i * 365)}
    //       i++;
    //   }

    //   // anni = Object.keys(anni)
    //   //     .sort()
    //   //     .reduce((newObj, key) => {
    //   //         newObj[key] = anni[key];
    //   //         return newObj;
    //   //     }, {}
    //   // );

    //   this.anni = anni;
    // }
  },
}
</script>