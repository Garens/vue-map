<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 设备异常排行</div>
    <div id="bottomRight" class="canves"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize";
// import cvsApi from '@/services/impl/cvsApi'
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
    lobbySafetyCheckList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created() { },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("bottomRight"));
      if (this.lobbySafetyCheckList.length > 0) {
        this.initChart();
      }
    })
  },
  watch: {
    lobbySafetyCheckList(newValue, oldValue) {
      this.initChart();
    }
  },
  methods: {
    formatData() {
      let yData = [];
      let seriesData = [];
      this.lobbySafetyCheckList.forEach(item => {
        yData.push(item.name);
        seriesData.push(item.count);
      });
      return { yData, seriesData };
    },
    initChart() {
      let { yData, seriesData } = this.formatData();
      let option = {
        grid: {
          top: 10,
          left: 10,
          right: "10%",
          bottom: 50,
          containLabel: true
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ["#c6a429"],
        textStyle: {
          color: "#C1D5EC"
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: yData
        },
        series: [
          {
            data: seriesData,
            type: "bar"
          }
        ]
      };
      if (seriesData.length == 0) {
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
      // this.myChart.setOption(option, true);
      this.chart.setOption(option, true);
    }
  }
};
</script>


