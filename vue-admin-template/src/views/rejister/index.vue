

<template>
  <div class="login-container">
    <el-card header=" 注册" class="rejister-card">
      <el-form @submit.native.prevent="onRejiter">
        <el-form-item label="用户名">
          <el-input v-model="userInfo.loginName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">注册</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {}
    };
  },
  methods: {

    onRejiter() {
           this.$http.post("user/reg", this.userInfo).then(res => {
              console.log(res.data);
              this.$message.success("注册成功");
              this.$emit("change");
            });
    }

  }
};
</script>
<style>
.rejister-card {
  width: 25rem;
  margin: 5rem auto;
}
</style>