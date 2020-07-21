<template>
  <div class="app-container report">
    <el-form :model="announceList" label-width="80px" label="left">
      <el-form-item label="标题：" style="width: 500px">
        <el-input v-model="announceList.title"></el-input>
      </el-form-item>

      <el-row type="flex" >
        <el-col :md="10" style="margin-right:70px">
          <el-form-item label="作者：" >
            <el-input v-model="announceList.author"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="10">
          <el-form-item label="发表时间" prop="time">
            <el-date-picker
              :disabled="announceList.kinds === 2"
              v-model="announceList.time"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="摘要：" style="width: 800px">
        <el-input type="textarea" v-model="announceList.desc" ></el-input>
      </el-form-item>

      <!-- <el-form-item label="文章：" style="width: 800px">
        <el-input type="textarea" v-model="announceList.content" autofocus="true" rows="12"></el-input>
      </el-form-item>-->

      <!--  npm install --save vue2-editor 富文本编辑器-->
      <!--    useCustomImageHandler  @image-added="handleImageAdded" -->
      <el-form-item label="文章：">
        <vue-editor v-model="announceList.content" id="editor"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onPeport">发表</el-button>
        <el-button @click="onCancle">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      announceList: {
        // time: 2020 / 4,
        // title: "如何合理健身",
        // author: "车车",
        // desc: "健身应该注意哪些东西",
        // content: ""
      }
    };
  },
  components: {
    VueEditor
  },
  methods: {
    // // 自定义上传图片
    // async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
    //   var formData = new FormData();
    //   formData.append("file", file);

    //   const res = await this.$http.post("upload", formData);
    //   Editor.insertEmbed(cursorLocation, "image", res.data.url);
    //   resetUploader();
    // },

    // 添加文章
    onPeport() {
      this.$http.post("article/add", this.announceList).then(res => {
        console.log(res.data);
        this.$message.success("添加成功");
        // 添加成功后要跳转到文章查看页
        this.$router.push("/information/notice");
      });
    },
    // 取消
    onCancle() {
      console.log();
      this.announceList.title = "";
      this.announceList.author = "";
      this.announceList.desc = "";
      this.announceList.content = "";
    }
  }
};
</script>

<style lang="scss" scope>
.app-container.report {
  background-color: #e6e6fa;
  margin: 30px;
  width: 1070px;
  border-radius: 20px;
}
</style>