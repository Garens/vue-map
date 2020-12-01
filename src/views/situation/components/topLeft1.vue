<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 各类型设备数统计</div>
    <div id="topLeft1" class="canves"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import resize from "../mixins/resize";
// import cvsApi from '@/services/impl/cvsApi'

var dataStyle = {
  normal: {
    label: { show: false },
    labelLine: { show: false }
  }
};
var placeHolderStyle = {
  normal: {
    color: "#2B2F56",
    label: { show: false },
    labelLine: { show: false }
  },
  emphasis: {
    color: "#2B2F56",
    label: { show: false },
    labelLine: { show: false }
  }
};

export default {
  mixins: [resize],
  data() {
    return {
      chart: null
    };
  },
  props: {
    deviceTypeCount: {
      type: Object,
      default: {}
    }
  },
  watch: {
    deviceTypeCount(newValue, oldValue) {
      this.initChart();
    }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("topLeft1"), "dark");
      if (this.deviceTypeCount.data) {
        this.initChart();

      }

    })
  },
  methods: {
    formatData() {
      let legendData = [];
      let seriesData = [];
      let list = this.deviceTypeCount.data;
      let types = this.deviceTypeCount.types;
      for (let i = 0; i < list.length; i++) {
        legendData.push(types[i])
        let obj = {
          id: i + 1,
          name: types[i],
          value: list[i]
        };
        seriesData.push(obj);
      }
      return { legendData, seriesData };
      // console.log(this.deviceTypeCount, arr, names);
    },
    initChart() {
      let { legendData, seriesData } = this.formatData();
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },
        legend: {
          orient: "horizontal", //"vertical",
          // right: 1,
          top: 25,
          itemGap: 20,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 13,
            color: "#C1D5EC"
          },
          data: legendData
        },
        // color: ["#59BBF8", "#FEA375"],
        series: [
          {
            type: "pie",
            center: ["50%", "65%"],
            radius: ["30%", "55%"],
            label: {
              normal: {
                formatter: "{b} \n ({c})"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },
            data: seriesData
          }
        ]
      };
      this.chart.setOption(option);
      // 解决第一次初始化是高度占不满问题
      this.chart.off("click");
      this.chart.on("click", params => {
        let id = params.data.id;
        let name = params.data.name;
        // // console.log(id);
        this.$emit("topLeft1Change", params.data);
      });
    },
    async getData() {
      let options = {
        method: "get",
        params: {}
      };
      // const {success, data} = await cvsApi.resultJobInfoBarbaselineChart(options);
      // if(success){
      //     this.initChart();
      // }
    }
  }
};
</script>


