<template>
  <section>
    <fieldset>
      <div>
        <h2>기념일 계산기</h2>
      </div>

      <div>
        <label for="from_date">기준일</label>
        <input type="date" id="from_date" v-model="fromDate" @change="calculateDates"/>
      </div>

      <div>
        <label for="includeFirstDay">시작일</label>
        <select
          id="includeFirstDay"
          v-model="includeFirstDaySelected"
          @change="calculateDates"
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
        <table>
          <caption></caption>
          <thead>
            <tr>
              <th>+</th>
              <th>날짜</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(anni, idx) in anniversary" :key="idx">
              <td>
                {{ anni.name }}
                {{ anni.isYear ? `(${anni.days})` : ''}}
              </td>
              <td>{{ anni.dateStr }}</td>
            </tr>
          </tbody>
        </table>
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
      includeFirstDaySelected : true,
      includeFirstDayOptions : [
        {'idx' : 1, 'name' : 'isIncludeFirstDay', 'title' : '포함', 'value' : true},
        {'idx' : 2, 'name' : 'isIncludeFirstDay', 'title' : '불포함', 'value' : false},
      ],
      anniversary : [],
    }
  },
  created() {
    const currentDate = dayjs();
    this.fromDate = currentDate.format('YYYY-MM-DD');
    this.calculateDates();
  },
  methods: {
    calculateDates() {
      let seedDate = dayjs(this.fromDate);
      if (!this.includeFirstDaySelected) seedDate = dayjs(seedDate).add(-1, 'day');
  
      let anni = [];
      let i = 1;
      while (i <= 11) {
        anni.push({
          'days' : (i * 100),
          'name' : `${i * 100} 일`,
          'dateStr' : dayjs(seedDate).add((i * 100), 'day').format('YYYY-MM-DD (ddd)'),
          'isYear' : false,
        })
        i++;
      }
      i = 1;
      while (i <= 3) {
        anni.push({
          'days' : (i * 365),
          'name' : `${i} 주년`,
          'dateStr' : dayjs(seedDate).add((i * 100), 'day').format('YYYY-MM-DD (ddd)'),
          'isYear' : true,
        })
        i++;
      }
  
      anni = anni.sort((a, b) => a.days - b.days);
      this.anniversary = anni;
      return anni;
    },
  },
}
</script>