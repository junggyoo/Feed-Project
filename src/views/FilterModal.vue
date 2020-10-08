<template>
  <div>
    <button @click="openModal">
      <span>필터</span>
    </button>
    <div v-if="showModal" class="modalFilter">
      <div class="modalContainer">
        <span @click="closeModal">
          <i class="fas fa-times"></i>
        </span>
        <div class="modalHeader">
          <span>필터</span>
        </div>
        <div class="modalBody" v-for="(cate, idx) in category" :key="idx">
          <div class="categoryBox">
            <input
              type="checkbox"
              :checked="cate.id"
              :name="cate.name"
              :id="cate.id"
              :value="cate.id"
              v-model="this.$store.state.selectedCategory"
            />
            <label :for="cate.name">{{ cate.name }}</label>
          </div>
        </div>
        <div class="modalFooter">
          <button @click="saveFilter"><span>저장히기</span></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      showModal: false,
      category: []
    };
  },

  methods: {
    ...mapMutations(["getListData"]),

    openModal() {
      this.showModal = true;
      axios
        .get(`https://problem.comento.kr/api/category`)
        .then(res => (this.category = res.data.category));
    },

    closeModal() {
      this.showModal = false;
    },

    saveFilter() {
      if (this.$store.state.descending === true) {
        let request = {
          params: {
            category: this.$store.state.selectedCategory
          }
        };
        axios
          .get(
            `https://problem.comento.kr/api/list?page=1&ord=%27asc%27&limit=10&`,
            request
          )
          .then(res => (this.$store.state.feedList = res.data.data));
        this.showModal = false;
        this.$store.state.modalFilterState = true;
      } else {
        let request = {
          params: {
            page: 1,
            ord: "asc",
            limit: 10,
            category: this.$store.state.selectedCategory
          }
        };
        axios
          .get(`https://problem.comento.kr/api/list`, request)
          .then(res => (this.$store.state.feedList = res.data.data));
        this.showModal = false;
        this.$store.state.modalFilterState = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  width: 48px;
  height: 24px;
  border-radius: 3px;
  border: solid 1px #e1e4e7;
  background-color: #ffffff;
  text-align: center;

  span {
    width: 22px;
    height: 16px;
    padding: 0;
    font-family: SpoqaHanSans;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #adb5bd;
  }
}

.modalFilter {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;

  .modalContainer {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 30px;
    width: 460px;
    height: 268px;
    background-color: #ffffff;
    transition: all 0.3s ease;

    .fas {
      position: absolute;
      width: 12px;
      height: 12px;
      top: 12px;
      right: 12px;
      color: #adb5bd;
    }
    .modalHeader {
      font-family: SpoqaHanSans;
      font-size: 22px;
      font-weight: bold;
      text-align: left;
      color: #212529;
    }

    .modalBody {
      display: flex;
      flex-direction: column;

      .categoryBox {
        display: flex;
        align-items: center;
        margin-bottom: 15px;

        input {
          width: 20px;
          height: 20px;
          margin-right: 5px;
        }

        label {
          width: 110px;
          height: 16px;
          font-family: SpoqaHanSans;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          letter-spacing: normal;
          text-align: left;
          color: #495057;
        }
      }
    }

    .modalFooter {
      display: flex;
      flex-direction: row-reverse;
      margin-top: 32px;

      button {
        width: 99px;
        height: 40px;
        border-radius: 3px;
        background-color: #00c854;

        span {
          width: 55px;
          height: 19px;
          font-family: SpoqaHanSans;
          font-size: 16px;
          font-weight: normal;
          font-stretch: normal;
          font-style: normal;
          line-height: 1;
          letter-spacing: normal;
          text-align: left;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
