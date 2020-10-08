<template>
  <div class="feedContents">
    <header>
      <h1>[2020.10.10] 배정규</h1>
    </header>
    <main>
      <aside>
        <button @click="checkStateData"><span>로그인</span></button>
      </aside>
      <section>
        <nav>
          <div class="navWrapper">
            <div class="orderFilter">
              <div
                :class="{ on: ascending, off: !ascending }"
                @click="ascendingActive"
              >
                <div class="circle"></div>
                <span>오름차순</span>
              </div>
              <div
                v-bind:class="{
                  on: $store.state.descending,
                  off: !$store.state.descending
                }"
                @click="descendingActive"
              >
                <div class="circle"></div>
                <span>내림차순</span>
              </div>
            </div>
            <FilterModal />
          </div>
        </nav>
        <article v-for="feed in $store.state.feedList" v-bind:key="feed.id">
          <div class="feedContainer">
            <div class="feedWrapper">
              <div class="metaInfo">
                <div class="categoryName">
                  {{
                    (feed.category_id === 1 && "apple") ||
                      (feed.category_id === 2 && "banana") ||
                      (feed.category_id === 3 && "coconut")
                  }}
                </div>
                <div class="contentsId">{{ feed.id }}</div>
              </div>
              <div class="userInfo">
                <div class="userId">{{ feed.user_id }}</div>
                <div class="divider"></div>
                <div class="createdAt">{{ feed.created_at.split("T")[0] }}</div>
              </div>
              <div class="feedInfo">
                <div class="title">{{ feed.title }}</div>
                <div class="contents">{{ feed.contents }}</div>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
import FilterModal from "./FilterModal.vue";

export default {
  name: "Home",
  components: {
    FilterModal
  },

  mounted() {
    axios
      .get(
        `https://problem.comento.kr/api/list?page=${this.page}&ord='asc'&limit=10&category[0]=1&category[1]=2&category[2]=3`
      )
      .then(res => {
        this.getListData((this.list = res.data.data.reverse()));
      });
    window.addEventListener("scroll", this.onScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
  },

  data() {
    return {
      page: 10,
      ascending: true
    };
  },

  methods: {
    ...mapMutations(["getListData", "checkStateData", "getDescending"]),
    onScroll() {
      if (this.ascending) {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          let request = {
            params: {
              category: this.$store.state.selectedCategory
            }
          };
          this.page--;
          axios
            .get(
              `https://problem.comento.kr/api/list?page=${this.page}&ord='asc'&limit=10`,
              request
            )
            .then(res => {
              console.log(res.data.data, this.$store.state.selectedCategory);
              res.data.data.reverse();
              for (let i = 1; i < res.data.data.length; i++) {
                this.$store.state.feedList.push(res.data.data[i]);
              }
            });
        }
      } else {
        if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
          this.page++;

          axios
            .get(
              `https://problem.comento.kr/api/list?page=${this.page}&ord='asc'&limit=10&category[0]=1&category[1]=2&category[2]=3`
            )
            .then(res => {
              res.data.data;
              for (let i = 1; i < res.data.data.length; i++) {
                this.$store.state.feedList.push(res.data.data[i]);
              }
            });
        }
      }
    },

    descendingActive() {
      this.$store.state.descending = true;
      this.ascending = false;
      this.page = 1;
      axios
        .get(
          `https://problem.comento.kr/api/list?page=${this.page}&ord='asc'&limit=10&category[0]=1&category[1]=2&category[2]=3`
        )
        .then(res => {
          this.$store.state.feedList = res.data.data;
        });
    },

    ascendingActive() {
      this.ascending = true;
      this.$store.state.descending = false;
      this.page = 10;
      axios
        .get(
          `https://problem.comento.kr/api/list?page=${this.page}&ord='asc'&limit=10&category[0]=1&category[1]=2&category[2]=3`
        )
        .then(res => {
          this.$store.state.feedList = res.data.data.reverse();
        });
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  padding-left: 390px;
  height: 70px;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.07);
  background-color: #ffffff;

  h1 {
    width: 205px;
    height: 19px;
    font-family: NotoSansCJKKR;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.56;
    letter-spacing: normal;
    text-align: left;
    color: #212529;
  }
}

main {
  display: flex;
  margin: 50px 390px;

  aside {
    button {
      width: 235px;
      height: 60px;
      border-radius: 5px;
      background-color: #00c854;
      border: none;

      span {
        width: 57px;
        height: 27px;
        font-family: SpoqaHanSans;
        font-size: 22px;
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.14;
        letter-spacing: normal;
        text-align: left;
        color: #ffffff;
      }
    }
  }
  section {
    width: 100%;
    margin-left: 40px;

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .navWrapper {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }

      .orderFilter {
        display: flex;

        .on {
          display: flex;
          align-items: center;
          margin-right: 13px;
          cursor: pointer;

          span {
            vertical-align: middle;
            font-family: SpoqaHanSans;
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            color: #495057;
          }

          .circle {
            border-radius: 100%;
            width: 6px;
            height: 6px;
            margin-right: 5px;
            background-color: #00c854;
          }
        }

        .off {
          display: flex;
          align-items: center;
          margin-right: 13px;
          cursor: pointer;

          span {
            vertical-align: middle;
            font-family: SpoqaHanSans;
            font-size: 13px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: normal;
            color: #adb5bd;
          }

          .circle {
            border-radius: 100%;
            width: 6px;
            height: 6px;
            margin-right: 5px;
            background-color: #adb5bd;
          }
        }
      }
    }

    article {
      margin-top: 11px;
      width: 756px;

      .feedContainer {
        width: 100%;
        height: 179px;
        border-radius: 5px;
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        border: solid 1px #e1e4e7;
        background-color: #ffffff;

        .feedWrapper {
          padding: 20px 30px;

          .metaInfo {
            display: flex;
            justify-content: space-between;
            padding-bottom: 12px;
            border-bottom: 1px solid #e1e4e7;

            .categoryName {
              width: 90px;
              height: 20px;
              font-family: SpoqaHanSans;
              font-size: 13px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.92;
              letter-spacing: normal;
              text-align: left;
              color: #7e848a;
            }

            .contentsId {
              width: 66px;
              height: 20px;
              font-family: SpoqaHanSans;
              font-size: 13px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 1.92;
              letter-spacing: normal;
              text-align: right;
              color: #adb5bd;
            }
          }

          .userInfo {
            display: flex;
            align-items: center;
            margin-top: 17px;
            vertical-align: middle;

            .userId {
              font-family: SpoqaHanSans;
              font-size: 13px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 0.5;
              letter-spacing: normal;
              color: #00c854;
            }

            .divider {
              width: 1px;
              height: 15px;
              margin: 0 12px;
              background-color: #e1e4e7;
            }

            .createdAt {
              font-family: SpoqaHanSans;
              font-size: 13px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              line-height: 0.5;
              letter-spacing: normal;
              color: #495057;
            }
          }

          .feedInfo {
            margin-top: 17px;
            width: 100%;

            .title {
              width: 100%;
              font-family: SpoqaHanSans;
              font-size: 18px;
              font-weight: bold;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              text-align: left;
              color: #282c30;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .contents {
              width: 100%;
              margin-top: 15px;
              font-family: SpoqaHanSans;
              font-size: 16px;
              font-weight: normal;
              font-stretch: normal;
              font-style: normal;
              letter-spacing: normal;
              text-align: left;
              color: #495057;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .feedContents {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f4f5f7;

    header {
      width: 375px;
      height: 45px;
      padding: 0;
      box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.07);
      background-color: #ffffff;
      backdrop-filter: blur(3px);

      h1 {
        padding-left: 15px;
      }
    }

    main {
      width: 375px;
      margin-top: 1px;

      aside {
        display: none;
      }

      section {
        width: 375px;
        margin: 0;

        nav {
          width: 375px;
          height: 44px;
          background-color: #ffffff;
          border-bottom: solid 1px #e1e4e7;

          .navWrapper {
            width: 100%;
            padding: 0 15px;
            display: flex;
            justify-content: space-between;
          }
        }

        article {
          width: 375px;
          height: 179px;
          margin: 0 0 10px;
          box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
          background-color: #ffffff;

          .feedContainer {
            width: 100%;
            height: 179px;
            border: none;
            border-radius: 0;

            .feedWrapper {
              padding: 20px 15px;
            }

            .divider,
            .createdAt {
              display: none;
            }

            .feedInfo {
              .title {
                width: 316px;
                height: 18px;
                font-family: SpoqaHanSans;
                font-size: 18px;
                font-weight: bold;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: normal;
                text-align: left;
                color: #282c30;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }

              .contents {
                width: 324px;
                height: 16px;
                font-family: SpoqaHanSans;
                font-size: 16px;
                font-weight: normal;
                font-stretch: normal;
                font-style: normal;
                letter-spacing: normal;
                text-align: left;
                color: #495057;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
