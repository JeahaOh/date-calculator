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
      
      <br>
      
      <div>
        <input type="number" id="daysToCalc" v-model="daysToCalc" @change="addDate"/>
        <label for="daysToCalc">일</label>
      </div>
      
      <br>

      <div
        v-for="(option, idx) in calcTypes" :key="idx"
      >
        <input
          type="radio"
          v-model="calcType"
          :name="option.name"
          :id="`${option.name}_${option.value}`"
          :value="option.value"
          :checked="option.value === calcType"
          @change="addDate"
        />
        <label :for="`${option.name}_${option.value}`">
          &ensp;{{ option.title }}
        </label>
      </div>

      <br>

      <div>
        {{ fromDateStr }}로 부터 {{ daysToCalc }}일 {{ calcType == 'ADD' ? '후는' : '전은' }} {{ resultDateStr }}
      </div>

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
    }
  },
}
</script>