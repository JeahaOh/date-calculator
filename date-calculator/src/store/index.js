import { createStore } from 'vuex';

const store = createStore({
  state: {
    calcType : 'ADD',
    calcTypes : [
      {'idx' : 1, 'name' : 'calcType', 'title' : '후', 'value' : 'ADD'},
      {'idx' : 2, 'name' : 'calcType', 'title' : '전', 'value' : 'MINUS'},
    ],
  },
  getters : {
    getCalcType : (state) =>  state.selectedCalcType,
    getCalcTypes : (state) => state.calcTypes,
  },
  mutations : {
    TOGGLE_CALC_TYPE(state) {
      switch (state.selectedCalcType) {
        case 'ADD' : 
          state.selectedCalcType = 'MINUS';
          return;
        case 'MINUS' :
          state.selectedCalcType = 'ADD';
          return;
      }
    },
    SET_CALC_TYPE(state, value) {
      state.selectedCalcType = value;
    },
  },
  actions : {
    toggleCalcType({commit}) {
      commit('TOGGLE_CALC_TYPE');
    },
    setCalcType({commit}, value) {
      commit('SET_CALC_TYPE', value);
    }
  }
});

export default store;