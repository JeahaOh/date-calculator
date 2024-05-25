<template>
  <div
  >
    <span v-for="(option, idx) in calcTypes" :key="idx">
      <input
      type="radio"
      v-model="calcType"
      :name="option.name"
      :id="`${option.name}_${option.value}`"
      :value="option.value"
      :checked="option.value === calcType"
      :change="toggleCalcType"
      @change="addDate"
      />
      <label :for="`${option.name}_${option.value}`">
        &ensp;{{ option.title }}
      </label>
    </span>
  </div>
</template>
<script>
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      calcType : store.state.calcType,
      calcTypes : store.state.calcTypes,
      toggleCalcType : store._actions.toggleCalcType
    }
  },
}
</script>
<style scoped>

span {
  padding: 0 1rem;
}
</style>