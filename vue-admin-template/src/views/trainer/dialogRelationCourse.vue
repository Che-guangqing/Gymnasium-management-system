
<template>
  <el-dialog title="分配课程" :visible.sync="showModify" width="30%" center>
    <el-form ref="form" :model="fromData" label-width="100px" size="small">
      <el-form-item label="教练姓名">{{fromData.teacherName}}</el-form-item>
      <el-form-item label="联系方式">{{fromData.teacherTel}}</el-form-item>
      <el-form-item label="教练住址">{{fromData.address}}</el-form-item>

      <!-- <el-form-item label="分配课程">
        <el-cascader
          :options="courseList"
          v-model="fromData.courses"
          :props="{ multiple: true }"
          clearable
        ></el-cascader>
      </el-form-item>-->

      <el-form-item label="分配课程" prop="courseName">
        <el-select v-model="fromData.courses" placeholder="请选择所授課程">
          <el-option
            v-for="item in courseList"
            :key="item._id"
            :label="item.courseName"
            :value="item._id"
          ></el-option>
        </el-select>
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
  mounted() {
    this.fetchCourses();
  },
  data() {
    return {
      fromData: {},
      showModify: false,
      courseList: []
    };
  },
  methods: {
    realtionDialog(data = {}) {
      this.fromData = data;
      // console.log(this.fromData);
      this.showModify = true;
    },

    onModify() {
      this.$http
        .put(`teacher/edit/${this.fromData._id}`, this.fromData)
        .then(res => {
          console.log(res);
          this.$message.success("分配课程成功");
          //当数据添加/修改成功,触发change事件
          this.$emit("change");
          this.showModify = false;
        });
    },
    //获取课程数据
    fetchCourses() {
      this.loading = true;
      this.$http.get("course/list").then(res => {
        console.log(res.data);
        this.courseList = res.data;
        this.loading = false;
      });
    }
  },
  computed: {}
};
</script>