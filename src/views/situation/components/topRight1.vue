<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 访问量排行榜</div>
    <div id="topRight1" class="canves"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize";
// import cvsApi from "@/services/impl/cvsApi";
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
    klTopList: {
      type: Array,
      default: []
    }
  },
  watch: {
    klTopList(newValue, oldValue) {
      this.initChart();
    }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("topRight1"));
      if (this.klTopList.length > 0) {
        this.initChart();
      }
    })
  },
  methods: {
    formatData() {
      let xData = [];
      let seriesData = [];
      this.klTopList.forEach(item => {
        xData.push(item.days);
        seriesData.push(item.count);
      });
      return { xData, seriesData };
    },
    initChart() {
      let { xData, seriesData } = this.formatData();
      let option = {
        color: ["#3398DB"],
        textStyle: {
          color: "#C1D5EC"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: true
            },
            name: "日期",
            nameLocation: "end",
            axisLabel: {
              interval: 0,
              rotate: 20 // 20度角倾斜显示(***这里是关键)
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "访问量",
            type: "bar",
            barWidth: "60%",
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#3398db"
                },
                {
                  offset: 1,
                  color: "#11132f"
                }
              ])
            },
            data: seriesData
          }
        ]
      };
      this.chart.setOption(option);
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


