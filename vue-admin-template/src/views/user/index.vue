<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <div class="filter-container">
      <!-- 根据输入查找   -->
      <el-input
        v-model="userList.name"
        placeholder="请输入要查找的用户姓名"
        style=" width: 200px; margin:10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>

      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="getUserListByPage()"
      >All</el-button>
      <el-button
        class="filter-item"
        style="margin-left:570px"
        type="primary"
        icon="el-icon-edit"
        @click="addUser"
      >添加用户</el-button>
    </div>

    <!--用户列表部分  -->
    <el-table
      :data="userList"
      style="width: 100%"
      v-loading="loading"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="loginName" label="用户名" width="130px"></el-table-column>
      <el-table-column prop="name" label="姓名" width="130px"></el-table-column>
      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width:55px;height:55px" alt />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <!-- <el-table-column prop="sex" label="性别" width="120px"></el-table-column> -->
      <el-table-column prop="userTel" label="电话" width="140px"></el-table-column>
      <el-table-column prop="role" label="角色" width="130px"></el-table-column>

      <el-table-column label="操作" width="160px">
        <template slot-scope="scope">
          <el-button size="mini" @click="updataUser(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--弹框  -->
    <dialogUser ref="dialogUser" @change="userChanged"></dialogUser>

    <!-- 页码 -->
    <div class="fotter" style="margin-top: 40px; text-align:center;">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,5, 9, 14, 20, 50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
// import Page from "@/components/Page/index";
import dialogUser from "./dialogUser";

export default {
  mounted() {
    // 获取所有数据
    // this.fetch();
    // 获取分页后的数据
    this.getUserListByPage();
  },
  data() {
    return {
      loading: false,

      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 7, // 每页条数

      userList: [],
      // userList: [
      //   {
      //     loginName: "cc",
      //     password: null,
      //     name: '李佳琪',
      //     address:'陕西省西安市临潼区8号',
      //     sex: 1,
      //     userTel: 13423456785,
      //     startTime: "2020/6/4",
      //     cardNum: 111234,
      //     endTime: "2020 / 8 / 4",
      //     avatar: ""
      //   },
      // ]
      listQuery: []
    };
  },

  components: { dialogUser },
  methods: {
    // 获取数据
    fetch() {
      this.loading = true;
      this.$http.get("user/list").then(res => {
        this.userList = res.data;
        this.loading = false;
      });
    },

    //添加用户 添加时弹出框
    addUser() {
      this.$refs.dialogUser.showDialog();
    },
    //修改用户 修改时弹出框 且当前用户的值要显示
    updataUser(row) {
      this.$refs.dialogUser.showDialog(row);
    },
    //删除用户的值
    deleteUser(row) {
      this.$confirm(`此操作将永久删除会员：${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`user/del/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // this.fetch();
            this.getUserListByPage();
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
    getUserListByPage() {
      this.loading = true;
      // 收集当前页码 和 每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      // 发送请求 把分页数据发送给后端
      this.$http
        .get("user/getPage", {
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
          this.userList = data;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getUserListByPage();
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
      this.getUserListByPage();
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getUserListByPage();
    },

    //搜索
    handleFilter(e) {
      if (!this.userList.name) {
        this.$message({
          message: "请输入用户姓名再搜索",
          type: "warning"
        });
      } else {
        this.$http
          .post("user/getInfoByName", { name: this.userList.name })
          .then(res => {
            // console.log(this.userList.name);
            // console.log(res.data);
            if (!res.data) {
              this.$message({
                message: "没有这个学员噢",
                type: "warning"
              });
            } else {
              this.userList = [res.data];
            }
          });
      }
    },
    //当子控件改变了数据后(添加/修改成功),通过该方法重新加载数据
    userChanged() {
      //加载数据
      // this.fetch();  title
      this.getUserListByPage();
    }
  }
};
</script>
<style  lang="scss" scoped>
// .app-container{
//   background-color: #e6e6fa;
//   height: 700px;
//   width: 100%;
//   overflow: hidden;
// }
</style>
