<template>
  <div class="container">
    <el-form ref="form" :model="userData" label-width="80px" size="small">
      <el-row type="flex" style="justify-content:space-around ">
        <el-col :md="10">
          <el-tabs value="person" type="border-card" style="padding:20px 30px ">
            <!-- 个人信息 -->
            <el-tab-pane label="个人信息" name="person">
              <p>
                <span class="t">用户名 :</span>
                <span>{{userData.loginName}}</span>
              </p>
              <div>
                <p class="t">头像 :</p>
                <img :src="userData.avatar" style="height :7rem" alt />
              </div>
              <p>
                <span class="t">姓名 :</span>
                <span>{{userData.name}}</span>
              </p>
              <p>
                <span class="t">地址 :</span>
                <span>{{userData.address}}</span>
              </p>
              <p>
                <span class="t">性别 :</span>
                <span>{{userData.sex}}</span>
              </p>
              <p>
                <span class="t">电话 :</span>
                <span>{{userData.userTel}}</span>
              </p>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :md="12">
          <el-tabs value="class" type="border-card" style="padding:20px 15px ">
            <!-- 课程信息 -->
            <el-tab-pane label="课程信息" name="class">
              <!-- {{userData.myCourse}} -->
              <div >
                <p>
                  <span class="t">我的团课 :</span>
                  <span>{{userData.myCourse.courseName }}</span>
                </p>
                <div>
                  <div style="float:left ; margin-right:10px">
                    <img :src="userData.myCourse.courseImg" style="height :6rem" alt />
                  </div>
                  <div>
                    <p>
                      <span class="t">课程地点：</span>
                      {{userData.myCourse.courseAddress}}
                    </p>
                    <p>
                      <span class="t">时间：</span>
                      {{userData.myCourse.courseTime}}:{{userData.myCourse.startTime}}-{{userData.myCourse.endTime}}
                    </p>
                    <p>
                      <span class="t">课程描述：</span>
                      {{userData.myCourse.courseDes}}
                    </p>
                  </div>
                </div>
              </div>
              <div class="c"></div>
              <!-- {{userData}} -->
              <div>
                <p>
                  <span class="t">我的私教 :</span>
                  <span>{{userData.myTeacher.teacherName}}</span>
                </p>
                <div>
                  <div style="float:left ; margin-right:30px; ">
                    <img :src="userData.myTeacher.teacherImg" style="height :6rem" alt />
                  </div>
                  <div>
                    <p>
                      <span class="t">教练电话：</span>
                      {{userData.myTeacher.teacherTel}}
                    </p>
                    <p>
                      <span class="t">课程日期：</span>
                      {{userData.myTeacher.workTime}}
                    </p>
                    <p>
                      <span class="t" >教练描述:</span>
                      {{userData.myTeacher.teacherDes}}
                    </p>
                  </div>
                  <!-- <div class="des">
                    <p>
                      <span>教练描述:</span>
                      {{userData.myTeacher.teacherDes}}
                    </p>
                  </div> -->
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
// import {mapState,mapMutations} from 'vuex'

export default {
  data() {
    return {
      userData: {
        myCourse: {},
        myTeacher: {}
      },
    };
  },
  methods: {

    // 登陆者信息
    getUserData() {
      const data = this.$store.getters.user.user;
      // console.log(data._id)
      // this.$http
      //   .post("user/findById", { _id: data._id })
      //   .then(res => {
      //     // console.log(res.data);
      //      this.userData = data;
      //   });
      this.userData = data;
      // console.log(data)
    }
  },
  mounted() {
    this.getUserData();
  }
};
</script>
<style scoped>
.container {
  margin: 50px;
}
.t {
  font-size: 15px;
  color: #6b6b6b;
  font-family: "Arial";
  /* Microsoft Yahei */
}
.c {
  width: 450px;
  margin: 30px auto;
  height: 1.5px;
  background-color: #b4cdcd;
}
.des {
  margin-top: 30px;
}
</style>