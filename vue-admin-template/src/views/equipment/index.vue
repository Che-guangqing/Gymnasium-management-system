<template>
  <div class="app-container">
    <!-- 头部部分 -->
    <div class="filter-container">
      <el-button
        class="filter-item"
        style="margin:10px"
        type="primary"
        icon="el-icon-edit"
        @click="addQc"
      >添加器材</el-button>
    </div>
    <!-- 器材部分 -->
    <el-table :data="qcList" style="width: 100%" v-loading="loading" stripe>
      <el-table-column prop="qcName" label="器材名称"></el-table-column>
      <el-table-column prop="getTime" label="购入时间"></el-table-column>
      <el-table-column prop="qcNum" label="器材数量"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="editQc(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteQc(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹框 -->
    <el-dialog title="器材修改" :visible.sync="editDialog" width="30%">
      <el-form ref="form" :model="formDate" label-width="80px" size="small">
        <el-form-item label="器材数量" prop="qcNum">
          <el-input-number v-model="formDate.qcNum" :min="1" :max="100" :step="2" label="请修改器材数量"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="edit(formDate)">确定</el-button>
          <el-button @click="editDialog=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 新增弹框 -->
    <el-dialog title="器材修改" :visible.sync="addDialog" width="30%">
      <el-form ref="form" :model="addFormDate" label-width="80px" size="small">
        <el-form-item label="器材名称" prop="qcName">
          <el-input
            v-model="addFormDate.qcName"
            placeholder="请输入器材名称"
            maxlength="50"
            show-word-limit
          ></el-input>
        </el-form-item>
        <el-form-item label="器材数量" prop="qcNum">
          <el-input-number
            v-model="addFormDate.qcNum"
            :min="1"
            :max="100"
            :step="2"
            label="请输入器材数量"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="购入时间" prop="getTime">
          <el-date-picker
            :disabled="addFormDate.kinds === 2"
            v-model="addFormDate.getTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="add">确定</el-button>
          <el-button @click="addDialog=false">取消</el-button>
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
// import {mapActions} from 'vuex';

export default {
  mounted() {
    // 获取所有数据
    // this.fetch();
    // 获取分页后的数据
    this.getQcListByPage();
  },
  data() {
    return {
      loading: false,

      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 7, // 每页条数

      qcList: [
        // { qcName: "杠铃", getTime: "2020/1/3", qcNum: 10 },
        // { qcName: "双杠", getTime: "2020/1/3", qcNum: 10 },
        // { qcName: "跑步机", getTime: "2020/1/3", qcNum: 20 }
      ],
      editDialog: false,
      addDialog: false,
      formDate: {},
      addFormDate: {}
    };
  },
  methods: {
    // 获取所有数据
    fetch() {
      this.loading = true;
      this.$http.get("qc/list").then(res => {
        this.qcList = res.data;
        this.loading = false;
      });
    },

    // 新增按钮 弹出弹框
    addQc() {
      this.addDialog = true;
    },
    // 编辑按钮 弹出弹框
    editQc(row) {
      this.formDate = row;
      this.editDialog = true;
    },
    // 添加器材
    add() {
      this.$http.post("qc/add", this.addFormDate).then(res => {
        console.log(res.data);
        this.$message.success("添加成功");
        this.addDialog = false;
        // this.fetch();
        this.getQcListByPage();
      });
    },
    // 修改器材
    edit(formDate) {
      console.log(formDate);
      this.$http.put(`qc/edit/${formDate._id}`, this.formDate).then(res => {
        console.log(res);
        this.$message.success("修改成功");
        this.editDialog = false;
        // this.fetch();
        this.getQcListByPage();
      });
    },
    // 删除器材
    deleteQc(row) {
      this.$confirm(`此操作将永久删除器材：${row.qcName}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http.delete(`qc/del/${row._id}`).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            // this.fetch();
            this.getQcListByPage();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 编辑或新增后 重新渲染页面
    onModify() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.formData.id) {
            console.log("这是修改方法,调用修改方法");
          } else {
            console.log("这是新增方法");
          }
          this.showModify = false;
        } else {
          console.log("验证失败");
        }
      });
    },

    // 获取进行分页的数据
    // 按照分页显示数据的函数
    getQcListByPage() {
      this.loading = true;
      // 收集当前页码 和 每页显示条数
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;
      // 发送请求 把分页数据发送给后端
      this.$http
        .get("qc/getPage", {
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
          this.qcList = data;
          // 如果当前页没有数据 且 排除第一页
          if (!data.length && this.currentPage !== 1) {
            // 页码减去 1
            this.currentPage -= 1;
            // 再调用自己
            this.getQcListByPage();
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
      this.getQcListByPage();
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange(val) {
      // 保存当前页码
      this.currentPage = val;
      // 调用分页函数
      this.getQcListByPage();
    }
  }
};
</script>
