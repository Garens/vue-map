<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 人员岗位情况</div>
    <div id="topRight2" class="canves"></div>
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
  created() { },
  props: {
    employeeList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    employeeList(newValue, oldValue) {
      this.initChart();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("topRight2"));
      if (this.employeeList.length > 0) {
        this.initChart();
      }
    })
  },
  methods: {
    formatData() {
      let xData = [];
      let yData = [];
      let list = this.employeeList;
      let max = 0;
      for (let i = 0; i < list.length; i++) {
        yData.push(list[i].count);
        if (list[i].count > max) {
          max = list[i].count;
        }
      }

      for (let i = 0; i < list.length; i++) {
        let obj = {
          name: list[i].name,
          max: max
        }
        xData.push(obj)
      }
      return { xData, yData };
    },
    initChart() {
      let { xData, yData } = this.formatData();
      let option = {
        tooltip: {},
        grid: {
          left: 150,
          right: "10%",
          bottom: 50,
          containLabel: true
        },
        radar: {
          radius: "65%",
          // shape: 'circle',
          name: {
            textStyle: {
              // color: "#fff",
              color: "#51baef",
              borderRadius: 2,
              padding: [2, 5]
            }
          },
          indicator: xData,

          splitArea: {
            show: false
          },
          splitLine: {
            lineStyle: {
              color: [
                "rgba(52, 170, 220, 0.5)",
                "rgba(52, 170, 220, 0.8)",
                "rgba(52, 170, 220, 1)"
              ].reverse()
            }
          },
          axisLine: {
            lineStyle: {
              color: "#34abdc"
            }
          }
        },

        series: [
          {
            name: "人员岗位情况",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: yData
              }
            ],
            itemStyle: {
              normal: {
                color: "#34abdc"
              }
            },
            symbol: "none",
            areaStyle: {
              normal: {
                opacity: 0.5,
                color: new echarts.graphic.RadialGradient(0.3, 0.8, 1, [
                  {
                    color: "#cfb954",
                    offset: 0
                  },
                  {
                    color: "#482b3f",
                    offset: 1
                  }
                ])
              }
            },
            lineStyle: {
              normal: {
                color: "#cfb954"
              }
            }
          }
        ]
      };
      this.chart.setOption(option, true);
      this.chart.off("click");
      this.chart.on("click", params => {
        this.$emit("topRight2Change", params);
      });
    }
  }
};
</script>


