<template>
  <div class="login-container">
    <el-card header=" 请先登陆" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("user/login", this.userInfo);
      // 把返回的token存入localStorage
      localStorage.token = res.data.token;
      console.log(res.data);
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功"
      });
    }
  }
};
</script>
<style>
.login-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>