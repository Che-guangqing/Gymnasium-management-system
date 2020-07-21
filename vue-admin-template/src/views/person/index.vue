<template>
  <div class="app-container">
    <el-form ref="form" :model="fromData" label-width="80px" size="small">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:3000/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="fromData.avatar" :src="fromData.avatar" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form-item label="用户名" prop="loginName">
        <el-input v-model="fromData.loginName" placeholder="请输入登录名称" maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="fromData.password"
          placeholder="请输入密码"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="姓名" prop="name">
        <el-input v-model="fromData.name" placeholder="请输入姓名" maxlength="50" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="fromData.address" placeholder="请输入地址" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-input v-model="fromData.sex" placeholder="请输入地址" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="电话" prop=" userTel">
        <el-input v-model="fromData.userTel" placeholder="请输入联系方式" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onModify">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  mounted() {
    // 获取所有数据
    this.fetch();
  },
  data() {
    return {
      imageUrl: "",
      fromData: {}
    };
  },
  methods: {
    // 获取数据
    fetch() {
      this.loading = true;
      this.$http.get("user/list").then(res => {
        this.userList = res.data;
        this.loading = false;
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    onModify() {
      // 修改
      this.$http
        .put(`user/edit/${this.fromData._id}`, this.fromData)
        .then(res => {
          console.log(res);
          this.$message.success("修改成功");
        });
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>