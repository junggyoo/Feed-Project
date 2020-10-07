<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{ category }}</h2>
  </div>
</template>

<script>
import axios from "axios";
export default {
  mounted() {
    this.getListData();
    console.log("hello");
  },

  data() {
    return {
      category: []
    };
  },

  methods: {
    getListData() {
      axios
        .get(`https://problem.comento.kr/api/view?id=2`)
        .then(res => console.log(res.data));
    }
  }
};
</script>
