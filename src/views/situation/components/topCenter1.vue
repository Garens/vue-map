<style scoped lang="less">
@box-height: 125px;
@box-top: calc(~'46% - 140px');
.background-img {
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
}
.cont {
  width: 100%;
  height: 100%;
  position: relative;
  .center-left {
    position: absolute;
    top: @box-top;
    left: 0;
    min-height: @box-height;
    z-index: 99;
  }

  .back-home {
    position: absolute;
    z-index: 990;
    top: 0;
    width: 40px;
    left: calc(~'50% - 160px');
    font-size: 32px;
    height: 50px;
    line-height: 50px;
    color: #1c7dbd;
    text-align: center;
    transition: all 0.1;
    &:hover {
      cursor: pointer;
      color: #3398db;
      font-size: 34px;
    }
  }
  .center-top {
    position: absolute;
    z-index: 899;
    top: 0;
    width: 400px;
    left: calc(~'50% - 200px');
    font-size: 30px;
    height: 50px;
    line-height: 50px;
    color: #fff;
    text-align: center;
    background: url(../images/center-top.png);
    background-size: 100% 100%;
  }
  .center-top1 {
    position: absolute;
    z-index: 899;
    top: 50px;
    width: 400px;
    left: calc(~'50% - 200px');
    font-size: 22px;
    height: 35px;
    line-height: 35px;
    color: #3398db;
    text-align: center;
  }
  .center-right {
    position: absolute;
    top: @box-top;
    right: 0;
    min-height: @box-height;
    z-index: 99;
  }
  ul.box {
    width: 150px;
    min-height: 125px;
    li {
      width: 100%;
      height: 65px;
      list-style-type: none;
      .box-title {
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        color: #88c2f7;
        text-align: center;
      }
      .box-cont {
        height: 40px;
        line-height: 40px;
        background: url('../images/rect.png');
        .background-img;
        font-size: 20px;
        color: yellow;
        text-align: center;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  #topCenter1 {
    width: 100%;
    height: 100%;
  }
  .box-desc {
    width: 150px;
    border: 1px solid #203458;
    margin-top: 10px;
    z-index: 699;
    background-color: rgba(15, 16, 41, 0.55);
    &-item {
      display: flex;
      padding: 3px 15px;
      border-bottom: 1px solid #203458;
      line-height: 20px;
      &-title {
        color: #88c2f7;
        flex: 0.6;
        text-align: left;
      }
      &-num {
        color: rgb(194, 194, 15);
        padding-left: 10px;
        text-align: left;
        font-size: 16px;
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.8s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
}
</style>

<template>
  <div class="cont">
    <div class="center-left">
      <ul class="box">
        <li>
          <div class="box-title">在线设备</div>
          <div
            class="box-cont"
            @click="resetMap"
          >{{(baseInfo.onlineDevice || 0) + '/' + (baseInfo.allDevice || 0)}}</div>
        </li>
        <li @click="clickBoxDesc(1)">
          <div class="box-title">在用设备</div>
          <div class="box-cont">{{(baseInfo.useDevice || 0) + '/' + (baseInfo.allDevice || 0)}}</div>
        </li>
      </ul>

      <transition name="fade">
        <div class="box-desc" v-if="showBoxDesc">
          <div class="box-desc-item">
            <div class="box-desc-item-title">正常</div>
            <div class="box-desc-item-num">{{(baseInfo.useDevice) || 0}}</div>
          </div>
          <div class="box-desc-item">
            <div class="box-desc-item-title">报修</div>
            <div class="box-desc-item-num">{{baseInfo.deviceRepairCount || 0}}</div>
          </div>
          <div class="box-desc-item">
            <div class="box-desc-item-title">停用</div>
            <div class="box-desc-item-num">{{baseInfo.deviceUnusedCount || 0}}</div>
          </div>
          <div class="box-desc-item">
            <div class="box-desc-item-title">报废</div>
            <div class="box-desc-item-num">{{baseInfo.deviceDestructionCount || 0}}</div>
          </div>
        </div>
      </transition>
    </div>

    <!-- <div class="back-home" @click="gotoBack">
      <i class="el-icon-s-home"></i>
    </div>-->
    <div class="center-top">万物互联</div>
    <div class="center-top1">物联网数据分析信息系统</div>

    <div class="center-right">
      <ul class="box">
        <li>
          <div class="box-title">客流量(平均/总数)</div>
          <div
            class="box-cont"
          >{{(baseInfo.avgStream || 0).toFixed(2) + '/' + (baseInfo.allStream || 0)}}</div>
        </li>
        <li>
          <div class="box-title">客流量(最大/最小)</div>
          <div class="box-cont">{{((baseInfo.maxStream) || 0) + '/' + (baseInfo.minStream || 0)}}</div>
        </li>
      </ul>
    </div>
    <div style="width: 100%;height:100%;">
      <div id="topCenter1" style="width: 100%;height:100%;" :key="chart1" ref="echarts1"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import "echarts/lib/chart/map";
// import "echarts/map/js/province/yunnan.js";
import "echarts/lib/component/geo.js";
import resize from "../mixins/resize";
import cityMap from "../js/china-main-city-map.js";
import "echarts/map/js/china.js";

export default {
  mixins: [resize],
  components: {
    // "v-chart": ECharts
  },
  data() {
    return {
      showBoxDesc: true,
      width: 600,
      height: 600,
      chart: null,
      interval: null,
      chart1: new Date().getTime() + 1,
      geoCoordMapYunnan: {
        北京市: [116.196247, 39.986119],
        云南省: [102.785402, 25.807342],
        昆明市: [102.818294, 24.793339],
        文山州: [104.231607, 23.399846],
        砚山县: [104.352997, 23.91651],
        富宁县: [105.638213, 23.632169],
        麻栗坡县: [104.71736, 23.127572],
        玉溪市: [102.549014, 24.365839],
        昆明市: [102.712251, 25.040609],
        曲靖市: [103.797851, 25.501557],
        玉溪市: [102.543907, 24.350461],
        保山市: [99.167133, 25.111802],
        昭通市: [103.717216, 27.336999],
        丽江市: [100.233026, 26.872108],
        普洱市: [100.972344, 22.777321],
        临沧市: [100.08697, 23.886567],
        楚雄州: [101.546046, 25.041988],
        红河州: [103.384182, 23.366775],
        文山州: [104.24401, 23.36951],
        西双版纳州: [100.797941, 22.001724],
        大理州: [100.225668, 25.589449],
        德宏州: [98.578363, 24.436694],
        怒江州: [98.854304, 25.850949],
        迪庆州: [99.706463, 27.826853]
      },
      pointData: [
        { name: "云南省", path: "1", value: 1 },
        { name: "昆明市", path: "kunming", value: 2 },
        { name: "文山州", path: "wenshan", value: 3 },
        { name: "砚山县", path: "yanshan", value: 4 },
        { name: "富宁县", path: "funing", value: 5 },
        { name: "麻栗坡县", path: "malipo", value: 6 },
        { name: "玉溪市", path: "yuxi", value: 7 }
        // { name: "基础地理信息中心", path: "xinxi", value: 9 }
      ],
      flowDataYunnan: [
        // { name: "云南省", value: 10 },
        // { name: "玉溪市", value: 32 },
        // { name: "文山州", value: 36 }
      ],
      mapData: {}
    };
  },
  props: {
    baseInfo: {
      type: Object,
      default: {}
    },
    klObj: {
      type: Object,
      default: {}
    },
    lobbyList: {
      type: Array,
      default: []
    },
    // regionId: {
    //   type: String,
    //   default: "100000"
    // },
    baseReginId: {
      type: String,
      default: ""
    }
  },
  watch: {
    lobbyList(newValue, oldValue) {
      this.initChart();
    },
    regionId(newValue, oldValue) {
      this.initChart();
    }
  },
  created() {
    // this.getData();
  },
  async mounted() {
    this.$nextTick(() => {
      this.chart = echarts.init(document.getElementById("topCenter1"));

      this.initChart();
    });
  },
  methods: {
    clickBoxDesc(flag) {
      if (flag == 1) {
        this.showBoxDesc = !this.showBoxDesc;
      } else {
        this.showBoxDesc = flag;
      }
    },
    resetMap() {
      // this.initChart();
      this.$emit("resetMap", true);
    },
    gotoBack() {
      this.$router.push({
        path: "/dashboard"
      });
    },
    //点击echartsMap事件
    clickMap(e) {
      // console.log(e);
      if (e.data && e.data.type == "point") {
        let item = e.data.data;
        this.$emit("lobbyInfo", item);
      }
    },
    convertFlowDataYunnan(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = this.geoCoordMapYunnan[dataItem.name];
        var toCoord = this.geoCoordMapYunnan["云南省"];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem.name,
            toName: "云南省",
            coords: [fromCoord, toCoord]
          });
        }
      }
      return res;
    },
    //定时模拟数据
    initSeriesData() {
      var flag = true;
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        const data1 = [
          { name: "云南省", value: 10 },
          { name: "玉溪市", value: 32 },
          { name: "临沧市", value: 53 },
          { name: "文山州", value: 36 },
          { name: "迪庆州", value: 5 }
        ];
        const data2 = [
          { name: "云南省", value: 20 },
          { name: "保山市", value: 11 },
          { name: "丽江市", value: 32 },
          { name: "普洱市", value: 53 },
          { name: "昭通市", value: 22 }
        ];
        this.flowDataYunnan = flag ? data1 : data2;
        flag = !flag;
        this.initChart();
        this.echarts1 = new Date() + 4;
      }, 51000);
    },

    formatterShowText(event) {
      // console.log(event);
      // let state = event.data.state;
      let state = event.data.data.status;
      let text = "";
      switch (state) {
        case "1000":
          text = "正常";
          break;
        case "2000":
          text = "离线";
          break;
        case "3000":
          text = "未接入";
          break;
        case "4000": //建设中
          text = "建设中";
          break;
        default:
          text = "异常";
          break;
      }

      let str = `
                  名称：${event.data.data.name} [${text}]</br>
                  编号：${event.data.data.orgCode}</br>
                  地址：${event.data.data.address}</br>`;
      return str;
    },
    async initChart() {
      this.chart.clear();
      let name = "china";
      // for (let key in cityMap) {
      //   if (this.regionId == cityMap[key]) {
      //     name = key;
      //   }
      // }
      this.regionId = "100000"
      if (this.regionId) {
        try {
          let response = await axios.get(
            "/static/map/" + this.regionId + ".json",
            {}
          );
          const mapJson = response.data;

          echarts.registerMap('china', mapJson);
        } catch (err) {
          console.log(err);
        }
      }
      // console.log("--->>>>", this.regionId);
      let size = 8;
      switch (true) {
        case 0 < this.lobbyList.length && this.lobbyList.length < 4:
          size = 18;
          break;
        case 3 < this.lobbyList.length && this.lobbyList.length < 6:
          size = 16;
          break;
        case 5 < this.lobbyList.length && this.lobbyList.length < 9:
          size = 14;
          break;
        case 8 < this.lobbyList.length && this.lobbyList.length < 14:
          size = 12;
          break;
        case 13 < this.lobbyList.length && this.lobbyList.length < 20:
          size = 10;
          break;
        default:
          size = 8;
          break;
      }
      let tooltipObj = {
        trigger: "item",
        formatter: this.formatterShowText
      };
      let seriesList = [
        {
          name: "点击跳转至",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 5,
          symbolSize: size,
          aspectScale: 1.0,
          label: {
            normal: {
              color: "#ccc",
              formatter: function (item) {
                return item.name;
              },
              position: "bottom",
              show: false,
              fontSize: 10
            }
          },
          tooltip: tooltipObj,
          itemStyle: {
            normal: {
              color: "#e4b810"
            }
          },
          data: this.lobbyList.map(item => {
            let state = item.status;
            return {
              name: item.name,
              type: "point",
              state: state,
              data: item,
              value: [item.dimensionality, item.longitude],
              itemStyle: {
                normal: {
                  color: this.setPointColor(state)
                }
              }
            };
          })
        },
        {
          name: "告警信息",
          type: "map",
          geoIndex: 0,
          zlevel: 1,
          itemStyle: {
            normal: {
              label: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: false
              }
            }
          },
          tooltip: {
            formatter: "{b}"
          },
          data: this.flowDataYunnan.map(dataItem => {
            return {
              name: dataItem.name,
              value: this.geoCoordMapYunnan[dataItem.name].concat([
                dataItem.value
              ])
            };
          })
        }
      ];

      // let { settingConfig } = this.$store.state.settings;
      // let { cityCode } = settingConfig;
      if (this.regionId) {
        let obj = {
          name: "网络链路异常流向",
          type: "lines",
          // coordinateSystem: "geo",
          zlevel: 4,
          aspectScale: 1.0,
          symbol: ["none", "arrow"],
          symbolSize: 10,
          tooltip: {
            formatter: (params, ticket, callback) => {
              // console.log(params);
              let str = "";
              switch (params.value) {
                case "1000": //正常
                  str = "网络链路正常";
                  break;
                case "2000": //离线
                  str = "网络离线";
                  break;
                case "3000": //未接入
                  str = "网络未接入";
                  break;
                case "4000": //建设中
                  str = "建设中";
                  break;
                default:
                  //未知
                  str = "异常";
                  break;
              }
              return str;
            }
          },
          lineStyle: {
            normal: {
              color: "#0f0",
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          // data: this.convertFlowDataYunnan(this.pointData)
          data: this.lobbyList.map(item => {
            let state = item.status;
            return {
              fromName: item.name,
              toName: "北京市",
              value: state,
              coords: [
                [item.dimensionality, item.longitude],
                this.geoCoordMapYunnan["北京市"]
              ],
              textStyle: {
                color: this.setPointColor(state)
              },
              lineStyle: {
                normal: {
                  color: this.setPointColor(state),
                  type: state == "1000" ? "solid" : "dotted"
                }
              }
            };
          })
        };
        let lineData = [];
        lineData = this.getLineData();
        let obj1 = {
          name: "线1",
          type: "lines",
          // coordinateSystem: "geo",
          zlevel: 3,
          aspectScale: 1.0,
          effect: {
            show: true,
            trailLength: 0.7,
            color: "#fff",
            symbolSize: 3,
            period: 3
          },
          lineStyle: {
            normal: {
              color: "#0f0",
              width: 0,
              curveness: 0.2
            }
          },
          // data: this.convertFlowDataYunnan(this.pointData)1
          data: lineData
        };
        seriesList.push(obj);
        seriesList.push(obj1);
      } else {
        let obj1 = {
          name: "线1",
          type: "lines",
          // coordinateSystem: "geo",
          zlevel: 3,
          aspectScale: 1.0,
          effect: {
            show: true,
            trailLength: 0.7,
            color: "#fff",
            symbolSize: 3,
            period: 3
          },
          lineStyle: {
            normal: {
              color: "#0f0",
              width: 0,
              curveness: 0.2
            }
          },
          // data: this.convertFlowDataYunnan(this.pointData)1
          data: []
        };
        seriesList.push(obj1);
      }

      let option = {
        visualMap: [
          {
            min: 0,
            max: 300,
            left: "left",
            top: "bottom",
            seriesIndex: [3],
            show: false,
            inRange: {
              color: ["#a22424", "#a50808"]
            },
            textStyle: {
              color: "#fff"
            }
          }
        ],
        geo: {
          map: name,
          silent: false,
          roam: true,
          // aspectScale: 1,
          scaleLimit: {
            min: 0.5,
            max: 5
          },
          label: {
            show: false,
            color: "#fff"
          },
          itemStyle: {
            normal: {
              areaColor: "rgba(10, 28, 76, 1)",
              borderColor: "#00aaf3"
            },
            emphasis: {
              areaColor: "#438dbd",
              borderColor: "#00aaf3",
              label: {
                show: false
              }
            }
          },
          nameMap: {
            大理白族自治州: "大理州",
            迪庆藏族自治州: "迪庆州",
            楚雄彝族自治州: "楚雄州",
            红河哈尼族彝族自治州: "红河州",
            文山壮族苗族自治州: "文山州",
            西双版纳傣族自治州: "西双版纳州",
            德宏傣族景颇族自治州: "德宏州",
            怒江傈僳族自治州: "怒江州"
          }
        },
        tooltip: {
          show: true
        },
        series: seriesList
      };
      this.chart.setOption(option, true);
      if (this.lobbyList.length == 1) {
        this.chart.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: 0
        });
      }
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.chart.resize();
        }, 200);
      });
      this.chart.off("click");
      this.chart.on("click", params => {
        this.clickMap(params);
      });

      setTimeout(() => {
        this.chart.resize();
      }, 200);
    },
    getLineData() {
      let arr = [];
      this.lobbyList.forEach(item => {
        let state = item.status;
        if (state == "1000") {
          let obj = {
            fromName: item.name,
            toName: "北京市",
            coords: [
              [item.dimensionality, item.longitude],
              this.geoCoordMapYunnan["北京市"]
            ],
            lineStyle: {
              normal: {
                color: this.setPointColor(state)
              }
            }
          };
          arr.push(obj);
        }
      });
      // console.log(arr);
      return arr;
    },
    setPointColor(state) {
      // console.log("1111");
      let str = "";
      switch (state) {
        case "1000": //正常
          str = "#00ff00";
          break;
        case "2000": //离线
          str = "#ffef00";
          // str = "red";
          break;
        case "3000": //未接入
          // str = "#ffef00";
          str = "red";
          break;
        case "4000": //搬迁
          str = "#ccc";
          break;
        default:
          //未知
          str = "red";
          break;
      }
      // console.log(str);
      return str;
    },
    async getData() {
      let options = {
        method: "get",
        params: {}
      };
      const { success, data } = await cvsApi.resultJobInfoBarbaselineChart(
        options
      );
      if (success) {
        this.initChart();
      }
    }
  }
};
</script>


