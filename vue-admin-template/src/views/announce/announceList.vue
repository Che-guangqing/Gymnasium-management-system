<template>
  <div class="app-container">
    <!-- 头部部分 -->
    <div class="filter-container">
      <!-- 根据输入查找    -->  
      <!-- <el-input            
        placeholder="姓名"
        style=" width: 200px; margin:10px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-button
        class="filter-item"
        style="margin-left:310px"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >搜索</el-button> -->
    </div>
    <!--文章部分 -->
    <el-table :data="announceList" style="width: 100%" v-loading="loading" stripe>
      <el-table-column prop="title" label="标题" width="230"></el-table-column>
      <el-table-column prop="author" label="作者" width="180"></el-table-column>
      <el-table-column prop="desc" label="摘要" width="390"></el-table-column>
      <el-table-column prop="time" label="发表时间" width="130"></el-table-column>

      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="seeArticle(scope.row)" type="primary">查看详情</el-button>
          <el-button size="mini" type="danger" @click="deleteArticle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 查看详情 -->
    <el-dialog title="文章详情" :visible.sync="seeDialog" width="40%" center>
      <el-form
        ref="form"
        size="mini"
        :model="seeformData"
        label-width="80px"
      >
        <el-form-item label="文章标题">{{seeformData.title}}</el-form-item>
        <el-form-item label="文章作者">{{seeformData.author}}</el-form-item>
        <el-form-item label="文章内容">
          <!-- <el-input  v-html="seeformData.content" autofocus="true" rows="15"></el-input> -->
          <el-input type="textarea" v-model="seeformData.content" autofocus="true" rows="15"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="seeDialog=false" type="primary" right>关闭</el-button>
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
    this.getannounceListByPage();
  },
  data() {
    return {
      loading: false,

      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 7, // 每页条数

      announceList: [],
      seeDialog: false,
      seeformData: {},
      validateRules: []
    };
  },
  methods: {
    // 获取所有数据
    fetch() {
      this.loading = true;
      this.$http.get("article/list").then(res => {
        this.announceList = res.data;
        this.loading = false;
      });
    },
    // 查看详情按钮 弹出弹框
    seeArticle(row) {
      this.seeformData = row;
      this.seeDialog = true;
    },

    // 删除文章
    deleteArticle(row) {
      this.$confirm(`此操作将永久删除文章：${row.title}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`article/del/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // this.fetch();
            this.getannounceListByPage();
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
    getannounceListByPage() {
      this.loading = true;
      // 收集当前页码 和 每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      // 发送请求 把分页数据发送给后端
      this.$http
        .get("article/getPage", {
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
          this.announceList = data;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getannounceListByPage();
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
      this.getannounceListByPage();
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getannounceListByPage();
    },
    handleFilter() {
      console.log('cc')
    }
  }
};
</script>