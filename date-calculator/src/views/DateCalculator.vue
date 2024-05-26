<template>
  <div>
    <section>
      <fieldset>

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

        <div>
          <label for="from_date">기준일</label>
          <input
            type="date"
            id="from_date"
          />
        </div>

        <div>
          <label for="to_date">목표일</label>
          <input
            type="date"
            id="to_date"
          />
        </div>
      </fieldset>
    </section>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      includeFirstDaySelected : true,
      includeFirstDayOptions : [
        {'idx' : 1, 'name' : 'isIncludeFirstDay', 'title' : '포함', 'value' : true},
        {'idx' : 2, 'name' : 'isIncludeFirstDay', 'title' : '불포함', 'value' : false},
      ],
    }
  },
  setup() {},
  created() {},
  mounted() {},
  unmounted() {},
  methods: {}
}
</script>