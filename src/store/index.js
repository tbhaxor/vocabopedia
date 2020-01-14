import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { logged: false, data: [] },
  strict: true,
  mutations: {
    LOG(state, payload) {
      state.logged = payload;
    },
    DATA(state, payload) {
      state.data = payload;
    },
    AP_DATA(state, payload) {
      state.data.unshift(payload);
    }
  },
  actions: {
    set_Login({ commit, state }, payload) {
      commit("LOG", payload);
      return state.logged;
    },
    set_Data({ commit, state }, payload) {
      commit("DATA", payload);
      return state.data;
    },
    prepend_Data({ state, commit }, payload) {
      commit("AP_DATA", payload);
      return state.data;
    }
  },
  getters: {
    get_Login: ({ logged }) => logged,
    get_Data: ({ data }) => data
  }
});
