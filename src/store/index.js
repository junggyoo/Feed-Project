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
  },
  actions: {},
  modules: {},
});
