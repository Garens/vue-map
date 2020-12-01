<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 实时访问量分析</div>
    <!-- <div class="title-bar">
      <div class="title-bar-item" :class="day == 2 ? 'active' : ''" @click="setDay(2)">上月/本月</div>
      <div class="title-bar-item" :class="day == 1 ? 'active' : ''" @click="setDay(1)">昨日/今日</div>
    </div>-->
    <div id="topCenter2" class="canves"></div>
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
      yData: [],
      legendData: [
        "上月入客流量",
        "上月出客流量",
        "本月入客流量",
        "本月出客流量"
      ]
    };
  },
  props: {
    lineChartData: {
      type: Array,
      default: []
    },
    day: {
      type: Number,
      default: 1
    }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("topCenter2"));
      this.initChart();
    });
  },
  watch: {
    lineChartData: function (newVal, oldVal) {
      // console.log(1111111, newVal);
      this.initChart();
    }
  },
  methods: {
    setDay(num) {
      this.$emit("setDay", num);
    },
    formatData() {
      let list = this.lineChartData;
      let xAxisData = [],
        seriesData = [];
      // console.log(1111, list);
      let data = [];
      for (var i = 0; i < list.length; i++) {
        xAxisData.push(list[i].days);
        data.push(list[i].count)
      }
      let obj = {
        name: '站点访问量',
        type: "line",
        areaStyle: {},
        data: data
      };
      seriesData.push(obj);
      return { xAxisData, seriesData };
    },
    initChart() {
      let colors = [""];
      let { xAxisData, seriesData } = this.formatData();
      let option = {
        xAxis: {
          data: xAxisData,
          boundaryGap: ["10%", "10%"],
          axisTick: {
            show: false
          },
          name: "时间(日)",
          nameLocation: "end"
        },
        grid: {
          top: 30,
          left: 20,
          right: 60,
          bottom: 10,
          containLabel: true
        },
        // color: ["#75D5A7"],
        textStyle: {
          color: "#C1D5EC"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          },
          name: "访问量(次)",
          nameLocation: "end"
        },
        legend: {
          textStyle: {
            color: "#C1D5EC"
          },
          data: this.legendData
        },
        series: seriesData
      };

      this.chart.setOption(option, true);
      // 解决第一次初始化是高度占不满问题
      setTimeout(() => {
        this.chart.resize();
      }, 200);
      window.addEventListener("resize", () => {
        this.chart.resize();
      });
    }
  }
};
</script>


