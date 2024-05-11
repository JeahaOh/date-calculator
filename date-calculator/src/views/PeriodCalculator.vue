<template>
  <section>
    <fieldset>
      <div>
        <h2>날짜 차이 계산기</h2>
      </div>

      <div>
        <label for="from_date">기준일</label>
        <input
          type="date"
          id="from_date"
          v-model="fromDate"
          @change="getDateDiff"
        />
      </div>

      <div>
        <label for="to_date">비교일</label>
        <input type="date" id="to_date" v-model="toDate" @change="getDateDiff"/>
      </div>

      <div>
        <label for="includeFirstDay">시작일</label>
        <select
          id="includeFirstDay"
          v-model="includeFirstDaySelected"
          @change="getDateDiff"
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
        {{ fromDateStr }} ~ {{ toDateStr }}
        <br>
        일차 : {{ diffDate }}일
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
      toDate : '',
      toDateStr : '',
      diffDate : '',
      includeFirstDaySelected : true,
      includeFirstDayOptions : [
        {'idx' : 1, 'name' : 'isIncludeFirstDay', 'title' : '포함', 'value' : true},
        {'idx' : 2, 'name' : 'isIncludeFirstDay', 'title' : '불포함', 'value' : false},
      ],
    }
  },
  created() {
    const currentDate = dayjs();
    this.fromDate = currentDate.format('YYYY-MM-DD');
    this.fromDateStr = currentDate.format('YYYY-MM-DD (ddd)');
    this.toDate = dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD');
    this.toDateStr = dayjs(currentDate).add(1, 'month').format('YYYY-MM-DD (ddd)');
    this.diffDate = this.getDateDiff(this.fromDate, this.toDate);
  },
  methods: {
    getDateDiff() {
      const from = dayjs(this.fromDate);
      const to = dayjs(this.toDate);
      const diff = to.diff(from, 'day');
      this.diffDate = this.includeFirstDaySelected ? diff + 1 : diff;

      return this.diffDate;
    }
  }
}
</script>