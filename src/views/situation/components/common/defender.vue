<style scoped lang="less">
@import '../../index.less';
</style>

<template>
  <div class="canves">
    <!-- <div class="t-box">
      <div class="t-box-left">
        <div class="t-box-title">设备正常率</div>
        <div class="t-box-cont" :id="warningDomId"></div>
      </div>
      <div class="t-box-center">
        <div class="t-box-title">设备故障数</div>
        <div class="t-box-cont">
          <div class="num">{{lately24Num}}</div>
        </div>
      </div>
      <div class="t-box-right">
        <div class="t-box-title">设备稳定值</div>
        <div class="t-box-cont">
          <gauge :domId="guageId"></gauge>
        </div>
      </div>
    </div>-->
    <div class="b-box">
      <div class="b-box-item">
        <div class="b-box-item-cont">
          <span>{{runningInfo['1000'] || 0}}</span>
        </div>
        <div class="b-box-item-title">正常设备</div>
      </div>
      <div class="b-box-item">
        <div class="b-box-item-cont">
          <span>{{runningInfo['2000'] || 0}}</span>
        </div>
        <div class="b-box-item-title">离线设备</div>
      </div>
      <div class="b-box-item">
        <div class="b-box-item-cont">
          <span>{{runningInfo['4000'] || 0}}</span>
        </div>
        <div class="b-box-item-title">建设中</div>
      </div>
      <div class="b-box-item">
        <div class="b-box-item-cont">
          <span>{{runningInfo['3000'] || 0}}</span>
        </div>
        <div class="b-box-item-title">未接入</div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import cvsApi from '@/services/impl/cvsApi'
import gauge from "../gauge";
import resize from "../../mixins/resize";

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
  components: {
    gauge
  },

  props: [
    "runningInfo",
    "warningDomId",
    "lately24Num",
    "defense25Num",
    "warning25Num"
  ],
  data() {
    return {
      chart: null,
      guageId: "guageId_" + Math.random()
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
    // this.chart = echarts.init(document.getElementById(this.warningDomId));
    // this.initChart();
  },
  methods: {
    initChart() {
      let option = {
        tooltip: {
          show: true,
          trigger: "item",
          formatter: "{b} : {c}%",
          position: ["50%", "50%"]
        },
        color: ["#59BBF8", "#A189B7"],
        series: [
          {
            name: "Windows",
            type: "pie",
            center: ["35%", "50%"],
            radius: [32, 40],
            label: {
              normal: {
                formatter: "35} \n ({c})"
              }
            },
            data: [
              {
                value: this.warning25Num,
                name: "正常"
              },
              {
                value: 100 - this.warning25Num,
                name: "invisible",
                itemStyle: placeHolderStyle,
                tooltip: {
                  show: false
                }
              }
            ]
          },
          {
            name: "Linux",
            type: "pie",
            center: ["35%", "50%"],
            radius: [16, 24],
            label: {
              normal: {
                formatter: "{b} \n ({c})"
              }
            },
            data: [
              {
                value: this.defense25Num,
                name: "故障"
              },
              {
                value: 100 - this.defense25Num,
                name: "invisible",
                itemStyle: placeHolderStyle,
                tooltip: {
                  show: false
                }
              }
            ]
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
      // const {success, data} = await cvsApi.resultJobInfoBarbaselineChart(options);
      // if(success){
      //     this.initChart();
      // }
    }
  }
};
</script>


