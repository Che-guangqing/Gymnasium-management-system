<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin:10px"
        type="primary"
        icon="el-icon-edit"
        @click="addCourse"
      >添加课程</el-button>
    </div>

    <!-- 课程主页 -->
    <el-table :data="courseList" style="width: 100%" v-loading="loading" stripe>
      <el-table-column prop="courseName" label="课程名称"></el-table-column>

      <el-table-column prop="courseAddress" label="授课地点"></el-table-column>

      <!-- <el-table-column prop="courseImg" label="课程照片">
        <template slot-scope="scope">
          <img :src="scope.row.courseImg" style="width:48px;height:48px" alt />
        </template>
      </el-table-column>-->
      <el-table-column prop="courseTime" label="授课日期"></el-table-column>
      <el-table-column prop="startTime" label="开始时间 "></el-table-column>
      <el-table-column prop="endTime" label="结束时间"></el-table-column>

      <el-table-column prop="userNum" label="限制人数"></el-table-column>

      <el-table-column label="授课教练" width="180">
        <template slot-scope="scope">
          <el-popover
            trigger="hover"
            placement="top"
            v-for="item in scope.row.teachers"
            :key="item._id"
          >
            <p>姓名: {{ item.teacherName }}</p>
            <p>联系方式: {{ item.teacherTel }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ item.teacherName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="updateCourse(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteTrainer(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 弹框 -->
    <el-dialog title="课程修改" :visible.sync="showModify" width="30%" :key="formData._id">
      <el-form ref="form" :model="formData" label-width="80px" size="small">
        <el-form-item label="课程名称" prop="courseName">
          <el-input
            v-model="formData.courseName"
            placeholder="请输入课程名称"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="课程照片">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/admin/api/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img
              v-if="formData.courseImg"
              :src="formData.courseImg"
              class="avatar"
              style="width:200px;height:100px"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <!-- <el-form-item label="课程类型" prop="sex">
          <el-select v-model="formData.typeId" placeholder="请选择课程类型">
            <el-option
              v-for="item in typeList"
              :key="item.typeId"
              :label="item.couseType"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="课程地点" prop="courseAddress">
          <el-input
            v-model="formData.courseAddress"
            placeholder="请输入课程地点"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>

        <el-form-item label="限制人数" prop="userNum">
          <el-input-number v-model="formData.userNum" :min="1" :max="50" :step="2" label="请输入限制人数"></el-input-number>
        </el-form-item>


        <el-form-item label="课程日期" prop="courseTime">
          <el-date-picker
            v-model="formData.courseTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-time-select
            placeholder="开始时间"
            v-model="formData.startTime"
            :picker-options="{
              start: '09:00',
              step: '00:60',
              end: '18:00'
            }"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="formData.endTime"
            :picker-options="{
              start: '10:00',
              step: '00:60',
              end: '19:00',      
            }"
          ></el-time-select>
        </el-form-item>

        <el-form-item label="课程描述" prop="courseDes">
          <el-input
            v-model="formData.courseDes"
            placeholder="请输入课程描述"
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

    <!-- 页码 -->
    <div class="fotter" style="margin-top: 40px; text-align:center;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,4 ,7, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    // 获取所有数据
    // this.fetch();
    // 获取分页后的数据
    this.getCourseListByPage();
  },
  data() {
    return {
      loading: false,

      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 7, // 每页条数

      formData: {},
      showModify: false,
      typeList: [
        { typeId: 1, couseType: "公共课" },
        { typeId: 2, couseType: "私教课" }
      ],
      courseList: []

    };
  },
  methods: {
    // 上传图片
    afterUpload(res) {
      this.$set(this.formData, "courseImg", res.url);
      // this.formData.courseImg = res.url;
      console.log(res.url);
    },

    // 获取数据
    fetch() {
      this.loading = true;
      this.$http.get("course/list").then(res => {
        // console.log(res.data)
        this.courseList = res.data;
        this.loading = false;
      });
    },
    // 新增按钮 弹出弹框
    addCourse() {
      this.showModify = true;
    },
    // 编辑按钮 弹出弹框
    updateCourse(row) {
      console.log(row);
      this.formData = row;
      this.showModify = true;
    },
    // 删除课程
    deleteTrainer(row) {
      this.$confirm(`此操作将永久删除团课：${row.courseName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`course/del/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // this.fetch();
            this.getCourseListByPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加、修改 课程
    onModify() {
      console.log("弹框中的确定按钮被触发");
      // console.log(this.formData._id);
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.formData._id) {
            console.log("这是修改方法,调用修改方法" + this.formData._id);
            // 修改
            this.$http
              .put(`course/edit/${this.formData._id}`, this.formData)
              .then(res => {
                console.log(res);
                this.$message.success("修改成功");
                // this.fetch();
                this.getCourseListByPage();
              });
          } else {
            console.log("这是增加方法,调用增加方法");
            //新增
            this.$http.post("course/add", this.formData).then(res => {
              console.log(res.data);
              this.$message.success("添加成功");
              // this.fetch();
              this.getCourseListByPage();
            });
          }
          // 彈框消失
          this.showModify = false;
        } else {
          console.log("验证失败");
        }
      });
    },

    // 获取进行分页的数据
    // 按照分页显示数据的函数
    getCourseListByPage() {
      this.loading = true;
      // 收集当前页码 和 每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      // 发送请求 把分页数据发送给后端
      this.$http
        .get("course/getPage", {
          params: {
            pageSize,
            currentPage
          }
        })
        .then(res => {
          // console.log(res)
          console.log("对应页码的数据:", res.data);
          // 接收后端返回的数据总条数 total 和 对应页码的数据 data
          let { total, data } = res.data;
          // 赋值给对应的变量
          this.total = total;
          this.courseList = data;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getCourseListByPage();
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 每页显示条数改变 就会触发这个函数
    handleSizeChange(val) {
      // 保存每页显示的条数
      this.pageSize = val;
      // 调用分页函数
      this.getCourseListByPage();
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getCourseListByPage();
    }
  }
};
</script>
