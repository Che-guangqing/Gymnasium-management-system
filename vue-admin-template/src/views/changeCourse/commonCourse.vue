<template>
  <div class="app-container" style="position: relative;">
    <!-- 头部搜索 -->
    <div class="filter-container">
      <el-form :inline="true" size="mini">
        <!-- 根据时间查找   -->
        <el-form-item label="课程日期">
          <el-date-picker
            v-model="courseList.courseTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="timeFilter"
            :picker-options="pickerOptions0"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetch()">All</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 课程主页 -->
    <el-table :data="courseList" style="width: 100%" v-loading="loading" stripe center>
      <el-table-column prop="courseName" label="课程名称" width="140px"></el-table-column>

      <el-table-column prop="courseImg" label="课程照片" width="170px">
        <template slot-scope="scope">
          <el-image style :src="scope.row.courseImg" :preview-src-list="[scope.row.courseImg]"></el-image>
        </template>
      </el-table-column>

      <!-- <el-table-column prop="courseAddress" label="授课地点" width="130px"></el-table-column> -->
      <!-- <el-table-column prop="courseDes" label="课程描述"></el-table-column> -->
      <el-table-column prop="courseTime" label="课程日期" width="180px"></el-table-column>

      <el-table-column prop="startTime" label="开始时间" width="140px"></el-table-column>
      <el-table-column prop="endTime" label="结束" width="140px"></el-table-column>
      <el-table-column prop="userNum" label="课程总人数" width="160px"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-menu"
            @click="chooseCourse(scope.row)"
          >选择课程</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 详情弹框 -->
    <commonDialog ref="commonDialog" @change="userChanged"></commonDialog>
  </div>
</template>
<script>
import commonDialog from "./commonDialog";
export default {
  mounted() {
    // 获取所有数据
    this.fetch();
  },
  components: { commonDialog },
  data() {
    return {
      loading: false,

      formData: {},
      showModify: false,
      typeList: [
        { typeId: 1, couseType: "公共课" },
        { typeId: 2, couseType: "私教课" }
      ],
      courseList: [],
      pickerOptions0: {
        // 不能选择今天以前的日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      },

      //当前选课人数
      currentNum: 0
    };
  },
  //   computed: {
  //       currentNum() {

  //       }
  //   },
  methods: {
    // 获取课程数据
    fetch() {
      this.loading = true;
      this.$http.get("course/list").then(res => {
        this.courseList = res.data;
        this.loading = false;
      });
    },

    chooseCourse(row) {
      this.$refs.commonDialog.showDialog(row);
    },

    // 根据时间
    timeFilter(e) {
      this.$http
        .post("course/getInfoByCourseTime", {
          courseTime: this.courseList.courseTime
        })
        .then(res => {
          console.log(res.data);
          if (!res.data) {
            this.$message({
              message: "这天没有团课哦",
              type: "warning"
            });
            this.courseList = [];
          } else {
            this.courseList = [res.data];
          }
        });
    },

    // 用户选择课程之后 当前课程人数+1
    userChanged() {}
  }
};
</script>



