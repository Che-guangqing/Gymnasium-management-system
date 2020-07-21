<template>
  <div class="container">
    <el-form ref="form" :model="userData" label-width="80px" size="small">
      <el-tabs value="class" type="border-card">

        <el-tab-pane label="课程信息" name="class"  style="padding:20px 50px ">
          <el-form-item label="用户名" prop="loginName">
            <el-input
              v-model="userData.loginName"
              placeholder="请修改用户名"
              maxlength="50"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-input
              v-model="userData.password"
              placeholder="请修改密码"
              show-word-limit
              clearable
              show-password
            ></el-input>
          </el-form-item>

          <el-form-item label="姓名" prop="name">
            <el-input v-model="userData.name" placeholder="请修改姓名" maxlength="50" clearable show-word-limit></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/admin/api/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img
                v-if="userData.avatar"
                :src="userData.avatar"
                class="avatar"
                style="width:100px;height:100px"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input  clearable v-model="userData.address" placeholder="请修改地址" maxlength="50" show-word-limit></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="userData.sex" placeholder="请修改性别">
              <el-option v-for="item in sexList" :key="item.id" :label="item.sex" :value="item.id"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="电话" prop=" userTel">
            <el-input
              v-model="userData.userTel"
              placeholder="请修改联系方式"
              maxlength="50"
              show-word-limit
              clearable
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onModify">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getUserData();
  },
  data() {
    return {
      userData: {},
      sexList: [{ id: 1, sex: "女" }, { id: 2, sex: "男" }]
    };
  },
  methods: {
    // 获取登陆用户得信息
    getUserData() {
      const data = this.$store.getters.user.user;
      this.userData = data;
    },
    // 头像
    afterUpload(res) {
      this.$set(this.userData, "avatar", res.url);
      // this.fromData.avatar = res.url;
      console.log(res.url);
    },

    // //修改用户 修改时弹出框 且当前用户的值要显示
    // this.$http.put(`user/edit/${row._id}`).then(res => {
    //   this.showModify = false;
    //   this.$message.success("修改成功");
    // });
    // },
    // this.$http.post("user/add", this.fromData).then(res => {
    //   console.log(res.data);
    //   this.$message.success("添加成功");
    //   this.showModify = false;
    //   //当数据添加/修改成功,触发一个change事件
    //   this.$emit("change");
    // });

    onModify() {
      this.$http
        .put(`user/edit/${this.userData._id}`, this.userData)
        .then(res => {
          // console.log(res);
          this.$message.success("修改成功");
          this.$router.push('/person/personInfo');
        });
    }
  }
};
</script>
<style scoped>
.container{
  background-color: aqua;
  margin: 30px 120px;
}
</style>