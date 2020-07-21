<template>
  <div class="login-container">
    <div class="article-page">
      <div class="lists">
        <div class="nav" @click="showList = !showList">系列文章</div>
        <div class="list">
          <el-collapse-transition v-for="(item,index) in announceList" :key="index">
            <div v-show="showList">
              <div class="transition-box" @click="onArticle(item)">
                {{item.title}}
                <span>{{item.time}}</span>
              </div>
            </div>
          </el-collapse-transition>
        </div>
      </div>

      <el-divider direction="vertical"></el-divider>
      <el-divider direction="vertical"></el-divider>

      <div class="content">
        <hr class="top" />
        <div class="desc">摘要：{{remark}}</div>
        <div v-html="article"></div>
        <!-- {{article}} -->
        <!-- <div class="article">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{article}} </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    // 获取最新的10条数据
    this.fetch();
  },
  data() {
    return {
      showList: true,
      announceList: [],
      article: "",
      remark: ""
    };
  },
  methods: {
    fetch() {
      this.$http.get("article/limitTen").then(res => {
        this.announceList = res.data;
      });
    },
    onArticle(item) {
      console.log(item);
      this.article = item.content;
      this.remark = item.desc;
    }
  }
};
</script>
<style lang="scss" scope>
.login-container {
  width: 100%;
  .article-page {
    width: 92%;
    margin: 30px auto;
    // background-color: aqua;
    .lists {
      float: left;
      background-color: #e6e6fa;
      width: 38%;
      .nav {
        background-color: #4a9ff9;
        color: #fff;
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
      }
      .list {
        margin: 10px;
        .transition-box {
          margin-bottom: 10px;
          width: 100%;
          height: 45px;
          line-height: 45px;
          border-radius: 4px;
          background-color: #fff;
          color: #000;
          padding-left: 5px;
          //   text-align: center;
          //   box-sizing: border-box;
          //   margin-left: 10px;
        }
        span {
          // padding-left: 320px;
          padding-right: 10px;
          font-size: 10px;
        }
      }
    }
    .content {
      position: relative;
      // height: 600px;
      float: right;
      width: 58%;
      padding: 0 20px;
      background-color: #e6e6fa;
      .top {
        position: relative;
        margin-top: 30px;
      }
      .desc {
        font-size: 13px;
        color: #2f4f4f;
      }
      .article {
        margin-top: 20px;
        line-height: 28px;
        margin-bottom: 460px;
        white-space: normal; //设置文字换行
        word-wrap: break-word; //设置数字强制换行
      }
    }
  }
}
</style>