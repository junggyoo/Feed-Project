import { createStore } from "vuex";

export default createStore({
  state: {
    feedList: [],
    selectedCategory: [1, 2, 3],
    descending: false,
    modalFilterState: false,
  },
  mutations: {
    getListData(state, feedList) {
      state.feedList = feedList;
    },

    getDescending(state, descending) {
      state.descending = descending;
    },

    checkStateData(state) {
      console.log("feedList: ", state.feedList);
      console.log("descending: ", state.descending);
    },
  },
  actions: {},
  modules: {},
});
