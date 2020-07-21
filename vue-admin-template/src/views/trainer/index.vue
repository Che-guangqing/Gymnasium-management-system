<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <div class="filter-container">
      <!-- 根据输入查找   -->
      <el-input
        v-model="trainerList.teacherName"
        placeholder="请输入要查找的教练姓名"
        style=" width: 200px; margin:10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getTeacherListByPage()"
      >All</el-button>
      <el-button
        class="filter-item"
        style="margin-left:570px"
        type="primary"
        icon="el-icon-edit"
        @click="addTrainer"
      >添加教练</el-button>
    </div>

    <!--教练列表部分  -->
    <el-table
      center
      :data="trainerList"
      style="width: 100%"
      v-loading="loading"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="teacherName" label="姓名" width="100"></el-table-column>
      <!-- <el-table-column prop="sex" label="性别" width="80"></el-table-column> -->
      <el-table-column prop="kinds" label="教练种类" width="80"></el-table-column>

      <el-table-column prop="teacherImg" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.teacherImg" style="width:48px;height:48px" alt />
        </template>
      </el-table-column>
      <el-table-column prop="teacherTel" label="电话" width="120"></el-table-column>
      <!-- <el-table-column prop="address" label="住址" width="140"></el-table-column> -->
      <el-table-column prop="workTime" label="上班时间" width="240"></el-table-column>

      <!-- <el-table-column prop="teacherDes" label="教练描述" width="240"></el-table-column> -->

      <el-table-column prop="courses.courseName" label="课程" width="100"></el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="primary"
            plain
            size="mini"
            @click="relationCourse(scope.row)"
            :disabled="scope.row.kinds === 1"
          >分配课程</el-button>
          <el-button size="mini" @click="updateTrainer(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteTrainer(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--修改、新增弹框  -->
    <dialogTrainer ref="dialogTrainer" @change="userChanged"></dialogTrainer>
    <!-- 分配课程弹框 -->
    <dialogRelationCourse ref="dialogRelationCourse" @change="userChanged"></dialogRelationCourse>
    <!-- 页码 -->
    <div class="fotter" style="margin-top: 40px; text-align:center;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5  ,7, 10, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import dialogTrainer from "./dialogTrainer";
import dialogRelationCourse from "./dialogRelationCourse";
export default {
  mounted() {
    // 获取所有数据
    // this.fetch();
    // 获取分页后的数据
    this.getTeacherListByPage();
  },
  data() {
    return {
      loading: false,
      listQuery: {
        title: undefined
      },

      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 7, // 每页条数

      trainerList: []
      // trainerList: [
      //   {
      //     teacherName: "张十三",
      //     sex: 1,
      //     address: "上海市普陀区金沙江路 1518 弄",
      //     teacherTel: 16767523452,
      //     teacherDes: "减肥教练"
      //   }
      // ]
    };
  },
  components: { dialogTrainer, dialogRelationCourse },
  methods: {
    // 获取数据
    fetch() {
      this.loading = true;
      this.$http.get("teacher/list").then(res => {
        // this.trainerList = res.data;
        this.trainerList = Object.assign({}, this.trainerList, res.data);
        this.loading = false;
      });
    },

    //添加教练 添加时弹出框
    addTrainer() {
      this.$refs.dialogTrainer.showDialog();
    },
    //修改教练 修改时弹出框 且当前教练的值要显示
    updateTrainer(row) {
      this.$refs.dialogTrainer.showDialog(row);
    },
    // 给教练分配课程
    relationCourse(row) {
      this.$refs.dialogRelationCourse.realtionDialog(row);
    },
    //删除教练
    deleteTrainer(row) {
      this.$confirm(
        `此操作将永久删除教练：${row.teacherName}, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          this.$http.delete(`teacher/del/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // this.fetch();
            this.getTeacherListByPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 获取进行分页的数据
    // 按照分页显示数据的函数
    getTeacherListByPage() {
      this.loading = true;
      // 收集当前页码 和 每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      // 发送请求 把分页数据发送给后端
      this.$http
        .get("teacher/getPage", {
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
          this.trainerList = data;

          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getTeacherListByPage();
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
      this.getTeacherListByPage();
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getTeacherListByPage();
    },

    //搜索
    handleFilter(e) {
      if (!this.trainerList.teacherName) {
        this.$message({
          message: "请输入教练姓名再搜索",
          type: "warning"
        });
      } else {
        this.$http
          .post("teacher/getInfoByteacherName", {
            teacherName: this.trainerList.teacherName
          })
          .then(res => {
            // console.log(this.trainerList.teacherName)
            // console.log(res.data);
            if (!res.data) {
              this.$message({
                message: "没有这个教练噢",
                type: "warning"
              });
            } else {
              this.trainerList = [res.data];
            }
          });
      }
    },
    //当子控件改变了数据后(添加/修改成功),通过该方法重新加载数据
    userChanged() {
      //这里应该调用加载数据的方法
      // this.fetch();
      this.getTeacherListByPage();
    }
  }
};
</script>

