<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 数据节点分布统计</div>
    <div id="topLeft11" class="canves"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize";
// import cvsApi from "@/services/impl/cvsApi";
// import theme from "../theme.json";
// import theme from "./theme.js";

export default {
  mixins: [resize],
  data() {
    return {
      chart: null,
      xData: [],
      yData: []
    };
  },
  props: {
    lobbyCount: {
      type: Array,
      default: []
    }
  },
  watch: {
    lobbyCount(newValue, oldValue) {
      this.formatData();
    }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("topLeft11"), "dark");
      this.formatData();

    })
  },
  methods: {
    formatData() {
      // this.xData = [];
      // this.lobbyCount.forEach(item => {
      //   if (item.location != "总计") {
      //     this.xData.push({
      //       name: item.orgName.replace("福彩中心", ""),
      //       value: item.orgCount,
      //       data: item
      //       // selected: true
      //     });
      //   }
      // });
      this.initChart();
    },
    initChart() {
      if (!this.chart) {
        return
      }
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}个 ({d}%)"
        },
        grid: {
          left: 60,
          right: 60,
          bottom: 30,
          top: 160,
          containLabel: true
        },
        series: [
          {
            name: "数据节点分布",
            // type: "bar",
            type: "pie",
            radius: "50%",
            center: ["50%", "55%"],
            // roseType: "radius",
            data: this.lobbyCount,
            label: {
              normal: {
                show: true,
                formatter: "{b}({c})"
              }
            }
          }
        ]
      };
      this.chart.off("click");
      this.chart.on("click", params => {
        // console.log(params);
        // let id = params.data.data.locationKey;
        // let name = params.data.name;
        // console.log(id);
        this.$emit("locationId", params);
      });

      if (this.lobbyCount.length == 0) {
        option.title = {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            color: "#88C2F7",
            fontWeight: "normal",
            fontSize: 16
          }
        };
      }

      this.chart.setOption(option, true);

      // 解决第一次初始化是高度占不满问题
      setTimeout(() => {
        this.chart.resize();
      }, 200);
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    },
    async getData() {
      let options = {
        method: "get",
        params: {}
      };
      // const { success, data } = await cvsApi.resultJobInfoBarbaselineChart(
      //   options
      // );
      // if (success) {
      //   this.initChart();
      // }
    }
  }
};
</script>


