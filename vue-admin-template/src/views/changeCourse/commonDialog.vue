<template>
  <el-dialog title="详情" :visible.sync="showModify" width="40%" center>
    <el-form ref="form" :model="fromData" label-width="80px" size="small">
      <el-tabs value="courseDetails" type="border-card">
        <!-- 课程详情 -->
        <el-tab-pane label="课程详情" name="courseDetails">
          <p class="title">{{fromData.courseName}}</p>
          <p class="small">{{fromData.userNum}}人小团课 (满1人开课)</p>
          <p class="small">当前人数：{{currentNum}}</p>

          <div style="margin:30px 0">
            <div v-for="item in fromData.teachers" :key="item._id" style="width:150px">
              <img :src="item.teacherImg" style="height :5rem ;float:left;margin-right:20px" alt />
              <div style="width:300px">
                <p class="title">{{item.teacherName}}</p>
                <p class="small">{{item.teacherDes}}</p>
              </div>
            </div>
          </div>

          <p class="t">
            <span>
              <span class="el-icon-time" style="margin-right:7px"></span> 课程时间 :
            </span>
            <span>{{`${fromData.courseTime} : ${fromData.startTime} ~ ${fromData.endTime}` }}</span>
          </p>
          <p class="t">
            <span>
              <span class="el-icon-map-location" style="margin-right:7px"></span> 课程地点 :
            </span>
            <span>{{fromData.courseAddress}}</span>
          </p>
          <div style="margin:30px 0" class="t">
            <p>
              <span class="el-icon-document" style="margin-right:7px"></span>
              <span>课程介绍</span>
            </p>
            <p>{{fromData.courseDes}}</p>
          </div>
        </el-tab-pane>
        <div style="float:right">
          <el-button type="primary" @click="onModify">预约</el-button>
        </div>
      </el-tabs>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      fromData: {},
      showModify: false,
      currentNum: 0,
      userData: {}
    };
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    showDialog(data = {}) {
      this.fromData = data;
      console.log(this.fromData);
      this.showModify = true;
    },

    // 当前登陆的用户信息
    getUserData() {
      const data = this.$store.getters.user.user;
      // console.log(data)
      this.userData = data;
    },

    // 用户选择了课程 当前课程人数+1
    // ！！！ 每个课程记录当前人数的变量分开
    onModify() {
      // this.$emit("change");
      if (this.currentNum < this.fromData.userNum) {
        // this.currentNum = this.currentNum + 1;
        this.currentNum++;
        // console.log(this.currentNum, this.fromData.userNum);
        // console.log(this.fromData, "选中的课程信息");
        // console.log(this.userData, "当前登陆的用户信息");
        // 给当前登陆的用户 userDate 的myCourse添加此课程
        this.userData.myCourse = this.fromData
        // console.log(this.userData)
        this.$http
          .put(`user/edit/${this.userData._id}`, this.userData)
          .then(res => {
            this.$message.success("预约成功");
            this.$emit("change");
          });        
        // this.$http
        //   .put(`user/edit/${this.userData._id}`, this.userData.myCourse = this.fromData)
        //   .then(res => {
        //     console.log(res);
        //     console.log(this.userData,'选课后')
        //     this.$message.success("预约成功");
        //     this.$emit("change");
        //   });
      } else {
        this.currentNum = this.fromData.userNum;
        this.$message({
          message: "该课程已满员，请选择其他课程",
          type: "warning"
        });
      }
      this.showModify = false;
    }
  }
};
</script>
<style scoped>
.title {
  font-size: 19px;
  font-weight: 500;
  color: black;
}
.small {
  font-size: 14px;
  color: #adadad;
}
.t {
  font-size: 16px;
  color: #6b6b6b;
  font-family: "Arial";
  /* Microsoft Yahei */
}
</style>