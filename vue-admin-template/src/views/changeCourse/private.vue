<template>
  <div class="app-container">
    <!-- 搜索部分 -->
    <div class="filter-container">
      <el-form :inline="true" size="mini">
        <!-- 根据时间查找   -->
        <el-form-item label="课程日期">
          <el-date-picker
            v-model="privateList.workTime"
            type="date"
            placeholder="选择日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            @change="timeFilter"
            :picker-options="pickerOptions0"
          >></el-date-picker>
        </el-form-item>
        <!-- 根据输入查找   -->
        <el-form-item>
          <el-input
            v-model="privateList.teacherName"
            placeholder="请输入要查找的教练姓名"
            style=" width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
        </el-form-item>

        <el-form-item>
          <el-button
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >搜索</el-button>
          <el-button class="filter-item" type="primary" icon="el-icon-search" @click="fetch()">All</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--教练列表部分  -->
    <el-table
      center
      :data="privateList"
      style="width: 100%"
      v-loading="loading"
      :default-sort="{prop: 'date', order: 'descending'}"
    >
      <el-table-column prop="teacherName" label="姓名" width="100px"></el-table-column>
      <el-table-column prop="teacherImg" label="教练" width="150px">
        <template slot-scope="scope">
          <el-image
            style="width:60px;height:60px"
            :src="scope.row.teacherImg"
            :preview-src-list="[scope.row.teacherImg]"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="teacherTel" label="电话" width="120px"></el-table-column>
      <el-table-column prop="workTime" label="上班时间" width="120px"></el-table-column>
      <el-table-column prop="teacherDes" label="教练描述" width="450px"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="choose(scope.row)">选择</el-button>
          <el-button type="primary" plain size="mini" @click="order(scope.row)">预约</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 选课弹框  -->
    <el-dialog title="选择时间" :visible.sync="chooseDialog" width="50%">
      <!-- {{formDate}} -->
      <el-row type="flex" :model="formDate" class="wrap">
        <!-- {{formDate.one}} -->
        <el-col>
          <button
            class="item"
            prop="one"
            :class="{false:!formDate.one,true:formDate.one}"
            @click="formDate.one = !formDate.one"
          >9:00-10:00</button>
          <!--  :disabled="formDate.one === true" -->
        </el-col>
        <el-col>
          <button
            class="item"
            prop="two"
            :class="{false:!formDate.two,true:formDate.two}"
            @click="formDate.two = !formDate.two"
          >11:00-12:00</button>
        </el-col>
        <el-col>
          <button
            class="item"
            prop="three"
            :class="{false:!formDate.three,true:formDate.three}"
            @click="formDate.three = !formDate.three"
          >14::00-15:00</button>
        </el-col>
        <el-col>
          <button
            class="item"
            prop="fore"
            :class="{false:!formDate.fore,true:formDate.fore}"
            @click="formDate.fore = !formDate.fore"
          >16:00-17:00</button>
        </el-col>
        <el-col>
          <button
            class="item"
            prop="five"
            :class="{false:!formDate.five,true:formDate.five}"
            @click="formDate.five = !formDate.five"
            :disabled="formDate.five === true"
          >18:00-19:00</button>
        </el-col>
      </el-row>
      <el-row>
        <el-button
          type="primary"
          @click="changeTime(formDate)"
          style="margin-left:500px"
          size="small"
        >确定</el-button>
        <el-button @click="chooseDialog=false" size="small">取消</el-button>
      </el-row>

      <!-- <el-form ref="form" :model="formDate" size="small">
        <p>注：每节私教课上课时间为1小时</p>

        <el-form-item label="选择上课起始时间">
          <el-time-select
            placeholder="起始时间"
            v-model="formDate.startTime"
            :picker-options="{start: '09:00',step: '00:120',end: '18:00'}"
          ></el-time-select>
        </el-form-item>
        <el-form-item style="margin-left:500px">
          <el-button type="primary" @click="order(formDate)">预约</el-button>
          <el-button @click="chooseDialog=false">取消</el-button>
        </el-form-item>
      </el-form>-->
    </el-dialog>
  </div>
</template>
<script>
export default {
  mounted() {
    // 获取所有数据
    this.getUserData();
    this.fetch();
  },
  data() {
    return {
      loading: false,
      privateList: [],
      formDate: {},
      chooseDialog: false,
      userData: {},
      pickerOptions0: {
        // 不能选择今天以前的日期
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7; //如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
    };
  },
  methods: {
    // 获取数据
    async fetch() {
      this.loading = true;
      const res = await this.$http.get("teacher/getInfoByteacherKinds");
      this.privateList = res.data;
      console.log(res.data);
      this.loading = false;
    },

    // 选教练
    choose(row) {
      this.formDate = row;
      this.chooseDialog = true;
    },
    // 当前登陆的用户信息
    getUserData() {
      const data = this.$store.getters.user.user;
      this.userData = data;
      // console.log(this.userData)
    },
    // 选择教练后 选择具体时间
    changeTime() {
      // console.log(this.userData, "用户信息");
      // console.log(this.formDate, "教练信息");
      // 发送请求 修改状态
      this.$http
        .put(`teacher/edit/${this.formDate._id}`, this.formDate)
        .then(res => {
          this.$message.success("选择成功");
          this.chooseDialog = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    order(row) {
      this.userData.myTeacher = row;
      console.log(this.userData);
      this.$http
        .put(`user/edit/${this.userData._id}`, this.userData)
        .then(res => {
          console.log(res);
          // console.log(this.userData, "选课后");
          this.$message.success("预约成功");
          // this.$emit("change");
        });
    },
    //根据名称搜索
    handleFilter(e) {
      if (!this.privateList.teacherName) {
        this.$message({
          message: "请输入教练姓名再搜索",
          type: "warning"
        });
      } else {
        this.$http
          .post("teacher/getInfoByteacherName", {
            teacherName: this.privateList.teacherName
          })
          .then(res => {
            if (!res.data) {
              this.$message({
                message: "没有这个教练噢",
                type: "warning"
              });
            } else {
              this.privateList = [res.data];
            }
          });
      }
    },
    // 根据时间
    timeFilter(e) {
      this.$http
        .post("teacher/getInfoByteacherTime", {
          workTime: this.privateList.workTime
        })
        .then(res => {
          console.log(res.data);
          if (!res.data) {
            this.$message({
              message: "这天没有私教上班哦",
              type: "warning"
            });
            this.privateList = [];
          } else {
            this.privateList = [res.data];
          }
        });
    },
    //当子控件改变了数据后(添加/修改成功),通过该方法重新加载数据

    userChanged() {
      //这里应该调用加载数据的方法
      this.fetch();
    }
  }
};
</script>
<style scoped>
.wrap {
  display: flex;
  justify-content: space-around;
  text-align: center;
  margin-bottom: 30px;
}
.item {
  height: 40px;
  line-height: 40px;
  width: 90px;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  outline: none;
}
.false {
  background-color: aliceblue;
}
.true {
  background-color: #bebebe;
}
/* .item:active {
  background-color: aquamarine;
} */
</style>
