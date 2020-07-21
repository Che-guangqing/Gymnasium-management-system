<template>
  <el-dialog title="提示" :visible.sync="showModify" width="30%" center>
    <el-form ref="form" :model="fromData" label-width="80px" size="small">
      <el-form-item label="教练姓名" prop="teacherName">
        <el-input
          v-model="fromData.teacherName"
          placeholder="请输入教练姓名"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="fromData.sex" placeholder="请选择性别">
          <el-option v-for="item in sexList" :key="item.id" :label="item.sex" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="教练种类" prop="sex">
        <el-select v-model="fromData.kinds" placeholder="请选择教练种类">
          <el-option v-for="item in kindsList" :key="item.id" :label="item.sex" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <!--  -->
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/admin/api/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img
            v-if="fromData.teacherImg"
            :src="fromData.teacherImg"
            class="avatar"
            style="width:100px;height:100px"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="电话" prop="teacherTel">
        <el-input
          v-model="fromData.teacherTel"
          placeholder="请输入联系方式"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="住址" prop="address">
        <el-input v-model="fromData.address" placeholder="请输入住址" maxlength="50" show-word-limit></el-input>
      </el-form-item>

      <el-form-item label="上班时间" prop="workTime" >
        <el-date-picker
        :disabled="fromData.kinds === 2"
          v-model="fromData.workTime"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="教练描述" prop="teacherDes">
        <el-input
          v-model="fromData.teacherDes"
          type="textarea"
          placeholder="请输入教练描述"
          maxlength="50"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onModify">确定</el-button>
        <el-button @click="showModify=false">取消</el-button>
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
      kindsList: [{ id: 1, sex: "私教" }, { id: 2, sex: "公共课教练" }]

    };
  },
  methods: {
    afterUpload(res) {
      this.$set(this.fromData, "teacherImg", res.url);
      // this.fromData.teacherImg = res.url;
      console.log(res.url);
    },

    showDialog(data = {}) {
      this.fromData = data;
      console.log(this.fromData);
      this.showModify = true;
    },
    onModify() {
      console.log("弹框 中的确定按钮被触发");
      // console.log(this.fromData.id);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.fromData._id) {
            console.log("这是修改方法,调用修改方法");
            // 修改
            this.$http
              .put(`teacher/edit/${this.fromData._id}`, this.fromData)
              .then(res => {
                console.log(res);
                this.$message.success("修改成功");
                //当数据添加/修改成功,触发change事件
                this.$emit("change");
              });
          } else {
            console.log("这是增加方法,调用增加方法");
            //新增
            this.$http.post("teacher/add", this.fromData).then(res => {
              console.log(res.data);
              this.$message.success("添加成功");
              this.$emit("change");
            });
          }
          this.showModify = false;
        } else {
          console.log("验证失败");
        }
      });
    }
  }
};
</script>
