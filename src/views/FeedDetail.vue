<template>
  <div class="FeedDetail" v-if="feedDetailData">
    <header>
      <h1>[2020.10.10] 배정규</h1>
    </header>
    <section>
      <article class="feedContents">
        <div class="feedWrapper">
          <div class="title">
            {{ feedDetailData.title }}
          </div>
          <div class="contents">
            {{ feedDetailData.contents }}
          </div>
          <div class="createdAt">
            {{ feedDetailData.created_at.split("T")[0] }}
          </div>
        </div>
      </article>
      <article class="replyContents">
        <div class="replyCount">
          <span>답변</span>{{ feedDetailData.reply.length }}
        </div>
        <div class="replyContainer">
          <div class="replyBox" v-for="reply in replyData" :key="reply.id">
            <div class="replyWrapper">
              <div class="replyUserName">
                {{ reply.user.name }}
              </div>
              <div class="replyContent">{{ reply.contents }}</div>
              <div class="replyCreatedAt">
                {{ reply.created_at.split("T")[0] }}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    let request = {
      params: {
        id: this.$route.params.id
      }
    };
    axios
      .get(`https://problem.comento.kr/api/view`, request)
      .then(res =>
        (this.feedDetailData = res.data.data)(
          (this.replyData = res.data.data.reply)
        )
      );
  },

  data() {
    return {
      feedDetailData: null,
      replyData: null
    };
  },

  methods: {}
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  align-items: center;
  margin-bottom: 50px;
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

section {
  padding: 0 390px;

  .feedContents {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    -webkit-backdrop-filter: blur(30px);
    backdrop-filter: blur(30px);
    border: solid 1px #00c854;
    background-color: #ffffff;

    .feedWrapper {
      padding: 20px 93px 22px 30px;

      .title {
        width: 100%;
        height: 100%;
        margin-bottom: 15px;
        font-family: SpoqaHanSans;
        font-size: 18px;
        color: #282c30;
        user-select: none;
      }

      .contents {
        height: 100%;
        width: 100%;
        margin-bottom: 21px;
        font-size: 16px;
        color: #495057;
        user-select: none;
      }

      .createdAt {
        font-size: 13px;
      }
    }
  }

  .replyContents {
    margin-top: 30px;

    .replyCount {
      margin-bottom: 10px;
      color: #00c854;

      span {
        margin-right: 9px;
        font-size: 16px;
        color: #495057;
      }
    }

    .replyContainer {
      .replyBox {
        width: 100%;
        height: 100%;
        margin-bottom: 30px;
        border-radius: 5px;
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        border: solid 1px #e1e4e7;
        background-color: #ffffff;

        .replyWrapper {
          padding: 20px 30px 22px;

          .replyUserName {
            padding-bottom: 11px;
            border-bottom: 1px solid #e1e4e7;
            font-size: 16px;
            color: #7e848a;
          }

          .replyContent {
            padding-right: 63px;
            margin: 23px 0 21px;
            font-size: 16px;
            color: #495057;
          }

          .replyCreatedAt {
            font-size: 13px;
            color: #adb5bd;
          }
        }
      }
    }
  }
}

@media screen and(max-width: 765px) {
  header {
    height: 45px;
    h1 {
      display: none;
    }
  }

  section {
    width: 375px;
    padding: 0 15px;

    .feedContents {
      border: none;
      border-radius: 0;
      border-top: 1px solid #00c854;
      border-bottom: 1px solid #00c854;
    }

    .replyContents {
      .replyCount {
      }
      .replyContainer {
        .replyBox {
          border: none;
          border-radius: 0;
          border-top: 1px solid #e1e4e7;
          border-bottom: 1px solid #e1e4e7;

          .replyWrapper {
            padding: 28px 0 21px;
          }
        }
      }
    }
  }
}
</style>
