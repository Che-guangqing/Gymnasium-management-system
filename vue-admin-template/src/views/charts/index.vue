<template>
  <div class="app-container">
    <div class="header">健身房信息总览</div>
    <div class="chart1"></div>
    <div class="chart2"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
import _ from "lodash";

export default {
  data() {
    return {
      option1: {
        title: {
          // text: "柱状图 "
        },
        legend: {},

        dataset: {
          source: [
            ["people", "教练人数", "学员人数", "器材总数"],
            ["2017", "10", "33", "89"],
            ["2018", "21", "70", "100"],
            ["2019", "32", "88", "123"],
            ["2020", "50", "120", "144"]
          ]
        },
        xAxis: {
          // data: ["羊毛衫", "牛仔裤", "高跟鞋"]
          type: "category"
        },
        yAxis: {},
        series: [
          { type: "bar" },
          { type: "bar" },
          { type: "bar" },
          { type: "bar" }
        ]
      },
      option2: {
        title: {
          text: "健生状况饼图",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["经常锻炼", "合理健身并健康饮食", "健身知识匮乏", "暴饮暴食", "偶尔跑步"]
        },
        series: [
          {
            name: "健身情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "经常锻炼" },
              { value: 310, name: "合理健身并健康饮食" },
              { value: 234, name: "健身知识匮乏" },
              { value: 135, name: "暴饮暴食" },
              { value: 1548, name: "偶尔跑步" }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    const myChart1 = echarts.init(document.getElementsByClassName("chart1")[0]);
    // 指定图表的配置项和数据
    // 使用刚指定的配置项和数据显示图表。
    // const result = _.merge(data.data, this.option);
    myChart1.setOption(this.option1);

    const myChart2 = echarts.init(document.getElementsByClassName("chart2")[0]);
    myChart2.setOption(this.option2);

    // app.currentIndex = -1;

    // setInterval(function() {
    //   var dataLen = this.option2.series[0].data.length;
    //   // 取消之前高亮的图形
    //   myChart.dispatchAction({
    //     type: "downplay",
    //     seriesIndex: 0,
    //     dataIndex: app.currentIndex
    //   });
    //   app.currentIndex = (app.currentIndex + 1) % dataLen;
    //   // 高亮当前图形
    //   myChart.dispatchAction({
    //     type: "highlight",
    //     seriesIndex: 0,
    //     dataIndex: app.currentIndex
    //   });
    //   // 显示 tooltip
    //   myChart.dispatchAction({
    //     type: "showTip",
    //     seriesIndex: 0,
    //     dataIndex: app.currentIndex
    //   });
    // }, 1000);

    // const { data } = await this.$http.get("reports/type/1");
    // if (data.meta.status !== 200) {
    //   return this.$message.error(data.meta.msg);
    // }
    // // 指定图表的配置项和数据
    // // 使用刚指定的配置项和数据显示图表。
    // const result = _.merge(data.data, this.option);
    // myChart.setOption(result);
  }
};
</script>

<style  lang="scss" scoped>
.app-container {
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: #DCDCDC;
  .header {
    width: 93%;
    margin: 30px auto;
    height: 50px;
    padding: 20px
  }
  .chart1 {
    width: 93%;
    margin: 0 auto;
    background-color: #fff;
    height: 500px;
    padding: 20px
  }
  .chart2 {
    width: 93%;
    margin: 30px auto;
    background-color: #fff;
    height: 500px;
    padding: 50px

  }
}
</style>
