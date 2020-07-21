<template>
  <el-dialog title="提示" :visible.sync="showModify" width="30%" center>
    <el-form ref="form" :model="fromData" label-width="80px" size="small">
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
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/admin/api/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="fromData.avatar"
            :src="fromData.avatar"
            class="avatar"
            style="width:100px;height:100px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="fromData.address" placeholder="请输入地址" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="fromData.sex" placeholder="请选择性别">
          <el-option v-for="item in sexList" :key="item.id" :label="item.sex" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="角色" prop="role">   
        <el-select v-model="fromData.role" placeholder="请选择性别"> 
          <el-option v-for="(item,i) in roleList" :key="i" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="电话" prop=" userTel">
        <el-input v-model="fromData.userTel" placeholder="请输入联系方式" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onModify">确定</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      fromData: {},
      showModify: false,
      sexList: [{ id: 1, sex: "女" }, { id: 2, sex: "男" }],
      roleList: ['admin','user']
      // roleList: ['user'="普通用户" , 'admin' = "管理员" ],
    
    }
  },
  methods: {
    afterUpload(res) {
      this.$set(this.fromData, "avatar", res.url);
      // this.fromData.avatar = res.url;
      console.log(res.url);
    },

    showDialog(data = {}) {
      this.fromData = data;
      console.log(this.fromData);
      this.showModify = true;
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
      console.log("弹框中的确定按钮被触发");
      // console.log(this.fromData._id);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.fromData._id) {
            // console.log("这是修改方法,调用修改方法" + this.fromData._id);
            // 修改
            this.$http
              .put(`user/edit/${this.fromData._id}`, this.fromData)
              .then(res => {
                console.log(res);
                this.$message.success("修改成功");
                this.$emit("change");
              });
          } else {
            console.log("这是增加方法,调用增加方法");
            //新增
            this.$http.post("user/add", this.fromData).then(res => {
              console.log(res.data);
              this.$message.success("添加成功");
              this.$emit("change");
            });
          }
          // 彈框消失
          this.showModify = false;
          //当数据添加/修改成功,触发一个change事件
          // this.$emit("change");
        } else {
          console.log("验证失败");
        }
      });
    }
  }
};
</script>