<style scoped lang="less">
@import './index.less';
.full-screen {
  font-size: 30px;
  color: #ccc;
}
</style>

<style lang="scss">
$baseColor: #82baef;
$baseBorderColor: #1f2b65;
$baseBgColor: #0a1d4c;
$baseBgColorHover: #1b3169;
.box-search {
  .el-cascader .el-input .el-input__inner {
    background-color: $baseBgColor;
    border-color: $baseBorderColor;
    color: $baseColor;
  }
  &-item {
    background-color: $baseBgColor;
    border-color: $baseBorderColor;
    color: $baseColor;
    .el-cascader-menu {
      color: $baseColor;
      border-color: $baseBorderColor;
    }
    .el-radio__inner {
      background-color: $baseColor;
      border-color: $baseBorderColor;
      color: $baseColor;
    }
    .el-cascader-node.is-selectable.in-active-path {
      color: $baseColor;
    }
    .el-cascader-node:not(.is-disabled):hover,
    .el-cascader-node:not(.is-disabled):focus {
      background-color: $baseBgColorHover;
    }
  }
}
</style>

<template>
  <div class="layout" ref="layout">
    <div class="full-screen" :title="fullScreenTitle" @click="fullScreen">
      <Icon v-if="!isFullScreen" type="ios-expand" size="34" />
      <Icon v-if="isFullScreen" type="ios-contract" size="34" />
    </div>
    <!-- 显示更多按钮 -->
    <div class="show-more" @click="clickShowMore">
      <i :class="showMore?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
    </div>
    <!-- 上半部分 -->
    <div class="top animate" :class="showMore?'min-box': ''">
      <!-- 上半部分-左边 -->
      <div class="top-left animate">
        <div class="top-left-1">
          <div class="top-left-1-box">
            <top-left-11 @locationId="locationId" :lobbyCount="lobbyCount"></top-left-11>
          </div>
        </div>
        <div class="top-left-2">
          <div class="top-left-2-box">
            <top-left-1 :deviceTypeCount="deviceTypeCount" @topLeft1Change="topLeft1Change"></top-left-1>
            <!-- <top-left-2></top-left-2> -->
          </div>
        </div>
      </div>
      <!-- 上半部分-中间 -->
      <div class="top-center animate">
        <div class="top-center-1">
          <div class="top-center-1-box">
            <top-center-1
              @lobbyInfo="showLobbyInfo"
              @resetMap="resetMap"
              :lobbyList="lobbyList"
              :klObj="klObj"
              :baseInfo="baseInfo"
              :regionId="regionId"
              :baseReginId="baseReginId"
            ></top-center-1>
          </div>
        </div>
        <div class="top-center-2">
          <div class="top-center-2-box">
            <top-center-2 :lineChartData="lineChartData" :day="day" @setDay="setDay"></top-center-2>
          </div>
        </div>
      </div>
      <!-- 上办部分-右边 -->
      <div class="top-right animate">
        <div class="top-right-1">
          <div class="top-right-1-box">
            <top-right-1 :klTopList="klTopList"></top-right-1>
          </div>
        </div>
        <div class="top-right-2">
          <div class="top-right-2-box">
            <!-- <top-right-2></top-right-2> -->
            <bottom-left :lotteryList="lotteryList"></bottom-left>
          </div>
        </div>
        <div class="top-right-3">
          <div class="top-right-3-box">
            <!-- <top-right-2></top-right-2> -->
            <!-- <bottom-left :lotteryList="lotteryList"></bottom-left> -->
            <top-left-2 :runningInfo="runningInfo"></top-left-2>
          </div>
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="bottom animate" :class="showMore?'min-box': ''">
      <!-- 下半部分-左边 -->
      <div class="bottom-left animate">
        <div class="bottom-left-box">
          <!-- <bottom-left></bottom-left> -->
          <top-right-2 :employeeList="employeeList" @topRight2Change="topRight2Change"></top-right-2>
        </div>
      </div>
      <!-- 下半部分-中间 -->
      <div class="bottom-center animate">
        <div class="bottom-center-box">
          <!-- <bottom-center :systemMsgList="systemMsgList"></bottom-center> -->
          <div class="bottom-center-box-top">
            <msg-item :msgList="systemMsgList"></msg-item>
          </div>
          <!-- <div class="bottom-center-box-bottom"> -->
          <!-- <videoItem :lobbyList="lobbyList" @showVideo="gotoVideo"></videoItem> -->
          <!-- </div> -->
        </div>
      </div>
      <!-- 下半部分-右边 -->
      <div class="bottom-right animate">
        <div class="bottom-right-box">
          <bottom-right :lobbySafetyCheckList="lobbySafetyCheckList"></bottom-right>
        </div>
      </div>
    </div>
    <!-- 上办部分-右边-隐藏 -->
    <div v-if="showMore" class="right-other animate" :class="showMore?'min-box-right': ''">
      <div class="right-other-box">
        <right-other :allOrgList="allOrgList" :nowOrgId="orgId" @showInfo="showInfo"></right-other>
      </div>
    </div>
    <show-model
      :infoModel="infoModel"
      :width="modelWidth"
      :modalTitle="modalTitle"
      @closeInfoModel="closeInfoModel"
    >
      <div slot="container">
        <div class="info-modal-wrap" v-if="modelType == 1">
          <div
            class="info-modal-item"
            v-for="(item, index) in lobbyListShow"
            :key="item.lobbyInfoId"
            @click="showLobbyInfo(item)"
          >
            <!-- <span class="info-modal-title">销售厅名称:</span> -->
            <span
              class="info-modal-cont1"
            >{{index + 1}}. {{item.lobbyName + " [" + item.lobbyNum + "]"}}</span>
          </div>
        </div>

        <div class="info-modal-wrap" v-if="modelType == 2">
          <div class="info-modal-item" v-for="(item, index) in topLeft1List" :key="index">
            <!-- <span class="info-modal-title">销售厅名称:</span> -->
            <span
              class="info-modal-cont1"
            >{{index + 1}}. {{item.orgName + " [" + item.deviceCount + "]"}}</span>
          </div>
        </div>

        <div class="info-modal-wrap" v-if="modelType == 3">
          <div class="info-modal-item" v-for="(item, index) in topRight2List" :key="index">
            <div>
              <span class="info-modal-cont1">{{index + 1}}.{{item.orgName}}</span>
            </div>
            <div>
              <span class="info-modal-title">经理:</span>
              <span class="info-modal-cont">{{item.managerCount}}</span>
              <span class="info-modal-title">主管:</span>
              <span class="info-modal-cont">{{item.logisticsCount}}</span>
              <span class="info-modal-title">财务:</span>
              <span class="info-modal-cont">{{item.financialCount}}</span>
              <span class="info-modal-title">技术人员:</span>
              <span class="info-modal-cont">{{item.technologyCount}}</span>
              <span class="info-modal-title">服务:</span>
              <span class="info-modal-cont">{{item.serveCount}}</span>
              <span class="info-modal-title">后勤:</span>
              <span class="info-modal-cont">{{item.directorCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="info" size="small" @click="closeInfoModel">关闭</Button>
      </div>
    </show-model>

    <show-model
      :infoModel="infoModel1"
      :width="600"
      :modalTitle="modalTitle1"
      @closeInfoModel="closeInfoModel1"
    >
      <div slot="container">
        <div class="info-modal-wrap">
          <div class="info-modal-item">
            <span class="info-modal-title">销售厅名称:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.orgName|| "-"}}</span>
            <span class="info-modal-title">销售厅编号:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.orgCode|| "-"}}</span>
          </div>
          <div class="info-modal-item">
            <span class="info-modal-title">座机:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.telephone || "-"}}</span>
            <span class="info-modal-title">销售厅面积:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.area|| "-"}}</span>
          </div>
          <div class="info-modal-item">
            <span class="info-modal-title">经理:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.principal|| "-"}}</span>
            <span class="info-modal-title">经理电话:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.principalPhone|| "-"}}</span>
          </div>
          <div class="info-modal-item">
            <span class="info-modal-title">负责人:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.leader|| "-"}}</span>
            <span class="info-modal-title">负责人电话:</span>
            <span class="info-modal-cont">{{lobbyInfoShow.leaderPhone|| "-"}}</span>
          </div>
          <div class="info-modal-item">
            <span class="info-modal-title">详细地址:</span>
            <span class="info-modal-cont2">{{lobbyInfoShow.address|| "-"}}</span>
          </div>
        </div>
        <!-- <div v-else>暂无信息</div> -->
      </div>
      <div slot="footer">
        <Button type="success" size="small" @click="gotoVideo(lobbyInfoShow)">查看视频</Button>
        <Button type="info" size="small" @click="closeInfoModel1">关闭</Button>
      </div>
    </show-model>

    <videoModal ref="videoModal"></videoModal>
  </div>
</template>

<script>
import echarts from "echarts";

import theme from "./theme.js";
echarts.registerTheme("dark", theme); // 注册主题

import topLeft1 from "./components/topLeft1";
import topLeft11 from "./components/topLeft11";
import topLeft2 from "./components/topLeft2";
import topRight1 from "./components/topRight1";
import topRight2 from "./components/topRight2";
import topCenter1 from "./components/topCenter1";
import topCenter2 from "./components/topCenter2";
import bottomLeft from "./components/bottomLeft";
import bottomCenter from "./components/bottomCenter";
import bottomRight from "./components/bottomRight";
import rightOther from "./components/right-other";

import showModel from "./components/common/showModel";

import msgItem from "./components/msgItem";
import videoModal from "./components/common/videoModal";

import { fetchItem } from "@/api/manage";

import {
  getAllOrgBranchList,
  getShowIndexStatistics,
  getPassengerFlowVos,
  getOrgDistribution,
  getDeviceStatistics,
  getStaffStatistics,
  getShowMessageList,
  getSafetyCheckStatistics,
  getAwards,
  getTopStream,
  getOperation,
  getOrgDeviceStatistics,
  getOrgStaffStatistics,
  getOrgAllStatisticsVo
} from "@/api/datacenter";
import {
  fetchList as fetchLobbyList,
  getLobbyListWithoutRight
} from "@/api/map";
import { fetchList as fetchSystemMsgList } from "@/api/map";
import {
  getCompareKl4,
  getCompareKl5,
  getEmployeeStatistics,
  getLobbySafetyCheckCount,
  getLobbySmarterStatistics,
  getLobbyAssistStatistics,
  getLobbyEquipmentStatistics,
  getLobbyEmployeeStatistics,
  getSumDayByMonth
} from "@/api/map";

export default {
  components: {
    showModel,
    topLeft1,
    topLeft11,
    topLeft2,
    topRight1,
    topRight2,
    topCenter1,
    topCenter2,
    bottomLeft,
    bottomCenter,
    bottomRight,
    msgItem,
    videoModal,
    rightOther
  },
  watch: {
    isFullScreen(newValue, oldValue) {
      let element = document.documentElement;
      if (newValue) {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
        this.fullScreenTitle = "退出全屏";
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
        this.fullScreenTitle = "全屏";
      }
    }
  },
  data() {
    return {
      showMore: false,
      modelWidth: 350,
      runningInfo: {},
      baseInfo: {},
      infoModel1: false,
      modalTitle1: "销售厅档案",
      lobbyInfoShow: {},
      modalTitle: "销售厅列表",
      infoModel: false,
      modelType: 1,
      lobbyListShow: [],
      isFullScreen: false,
      fullScreenTitle: "全屏",
      lineChartData: [],
      klObj: {},
      lobbyList: [],
      lobbyListVideo: [],
      systemMsgList: [],
      deviceTypeCount: {},
      klTopList: [],
      allOrgList: [],
      orgId: "",
      regionId: "530000", //地图显示区域
      baseReginId: "", //所属机构最高级别的地市ID
      orgLevel: "0", //当前用户获取到的组织级别 0:省级 1:非省级
      lobbyCount: [],
      employeeList: [],
      lotteryList: [],
      topLeft1List: [],
      topRight2List: [],
      lobbySafetyCheckList: [],
      searchFormInline: {
        departId: ""
      },
      day: 1
    };
  },
  created() {
    this.getLobbyCount();
    this.getData();
  },
  mounted() {
    // console.log(this.$refs.layout.offsetWidth);
    // 更多显示
    // this.setShowMore();
    window.onresize = () => {
      this.setShowMore();
    };
  },
  methods: {
    //恢复最初地图
    async resetMap() {
      this.orgId = "";
      await this.getLobbyCount();
      await this.getData();
    },
    setShowMore() {
      if (this.$refs.layout.offsetWidth > 1400) {
        this.showMore = true;
      } else {
        this.showMore = false;
      }
    },
    clickShowMore() {
      this.showMore = !this.showMore;
    },
    async topRight2Change(data) {
      this.modelType = 3;
      this.modelWidth = 500;
      this.modalTitle = "销售厅员工分布";
      await this.getLobbyEmployeeStatistics();
      this.infoModel = true;
    },
    async topLeft1Change(data) {
      let { id, name } = data;
      this.modelWidth = 400;
      this.modelType = 2;
      this.modalTitle = name;
      await this.getLobbyEquipmentStatistics(data);
      this.infoModel = true;
    },
    closeInfoModel1() {
      this.lobbyInfoShow = [];
      this.infoModel1 = false;
    },
    showInfo(item) {
      this.showLobbyInfo(item);
    },
    async showLobbyInfo(item) {
      try {


        let params = {
          orgId: item.orgId
        };
        let { resultObject } = await fetchItem(params);
        this.lobbyInfoShow = resultObject;
        // console.log(item);
        this.modalTitle1 = `${resultObject.orgName}-档案信息`;
        this.infoModel1 = true;
      } catch (err) {
      }
    },
    gotoVideo(item) {
      // this.$router.push({
      //   path: `/video/index`,
      //   query: {
      //     id: item.lobbyInfoId,
      //     name: item.lobbyName
      //   }
      // });
      this.$refs.videoModal.openModal(item);
      // this.showVideoModal();
    },
    //关闭对话框
    closeInfoModel() {
      this.lobbyListShow = [];
      this.infoModel = false;
    },
    //点击分布统计图时，进行全部信息的筛选
    locationId(item) {
      if (this.orgLevel == "0") {
        this.regionId = item.data.data.regionId;
      }
      // console.log(item.data.data.regionId, this.orgLevel, this.regionId);
      this.orgId = item.data.data.orgId;
      this.getData();
      // this.getLobbyList(item.data.data.orgId);
      return;

      // this.getLobbyListShow(id);
      let name = item.data.name;
      let list = item.data.data.appIndexLobbyDtoList;
      this.modalTitle = `${name}-销售厅列表`;
      this.lobbyListShow = list;
      this.modelType = 1;
      this.modelWidth = 400;
      this.infoModel = true;
    },
    async getLobbyListShow(id) {
      let params = {
        address: id,
        currPage: 1, //当前页数
        pageSize: 1000 //每页记录数
      };
      try {
        let { data } = await getAllOrgBranchList(params);
        // console.log(data);
        this.lobbyListShow = data;
        this.modelType = 1;
        this.modelWidth = 400;
        this.infoModel = true;
      } catch (err) {
        // this.lobbyList = [];
      }
    },
    setDay(num) {
      this.day = num;
      this.getKlList();
    },
    selectChange(val) {
      // console.log(val);
      this.searchFormInline.departId = val;
      // this.getLobbyListVideo();
    },
    // 点击全屏
    fullScreen() {
      this.isFullScreen = !this.isFullScreen;
    },

    async getLotteryMsg() {
      try {
        let params = {};
        // if (this.orgLevel == "1" && this.orgId) {
        //   params.orgId = this.orgId;
        // } else if (this.orgId) {
        //   params.parentOrgId = this.orgId;
        // }
        let { resultObject } = await getAwards(params);
        // console.log(data);
        // return;
        this.lotteryList = resultObject;
      } catch (err) {
        this.lotteryList = [];
      }
    },
    async getSystemMsg() {
      let params = {};
      if (this.orgId) {
        params.parentOrgId = this.orgId;
      }
      try {
        let { resultObject } = await getShowMessageList(params);
        // console.log(data);
        // return;
        this.systemMsgList = resultObject;
      } catch (err) {
        this.systemMsgList = [];
      }
    },
    async getLobbyCount() {
      try {
        let { resultObject } = await getOrgDistribution();
        // console.log(data);
        // let arr = [];
        // if (resultObject.orgLevel == "0") {
        //   arr = resultObject.orgList;
        // } else {
        //   resultObject.orgList.forEach(item => {
        //     if (item.orgLevel == 2) {
        //       item.orgCount = 1;
        //       arr.push(item);
        //     }
        //   });
        // }
        this.lobbyCount = resultObject;
        // this.orgLevel = resultObject.orgLevel;
        // this.baseReginId = resultObject.regionId;
        // this.regionId = resultObject.regionId;
      } catch (err) {

      }

    },
    async getKlList() {
      try {
        let { resultObject } = await getPassengerFlowVos();
        this.lineChartData = resultObject;
      } catch (err) {

      }

    },
    async getKlData() {
      try {
        let { data } = await fetchList();
        // console.log(data);
        this.dataObj = data;
        this.klObj = data;

      } catch (err) {

      }
    },
    // async getLobbyListVideo() {
    //   let params = {
    //     currPage: 1, //当前页数
    //     pageSize: 1000 //每页记录数
    //   };
    //   if (this.searchFormInline.departId) {
    //     params.departId = this.searchFormInline.departId;
    //   }
    //   try {
    //     let { data } = await getLobbyListWithoutRight(params);
    //     // console.log(data);
    //     this.lobbyListVideo = data.lists;
    //   } catch (err) {
    //     this.lobbyListVideo = [];
    //   }
    // },
    async getLobbyList(id) {
      let params = {};
      if (this.orgLevel == "1" && this.orgId) {
        params.orgId = this.orgId;
      } else if (this.orgId) {
        params.parentOrgId = this.orgId;
      }
      try {
        let { resultObject } = await getAllOrgBranchList(params);
        // console.log(data);
        this.lobbyList = resultObject;
      } catch (err) {
        this.lobbyList = [];
      }
    },
    async getKlTop10() {
      try {
        let params = {};
        // if (this.orgLevel == "1" && this.orgId) {
        //   // params.orgId = this.orgId;
        // } else if (this.orgId) {
        //   params.parentOrgId = this.orgId;
        // }
        let { resultObject } = await getTopStream(params);
        this.klTopList = resultObject;
        // console.log(data);
      } catch (err) {
        this.klTopList = [];
      }
    },
    async getDeviceTypeCount() {
      try {
        let params = {};
        if (this.orgLevel == "1" && this.orgId) {
          params.orgId = this.orgId;
        } else if (this.orgId) {
          params.parentOrgId = this.orgId;
        }
        let { resultObject } = await getDeviceStatistics(params);
        this.deviceTypeCount = resultObject;
        // console.log(data);
      } catch (err) {
        this.deviceTypeCount = {};
      }
    },
    async getEmployeeStatistics() {
      try {
        let params = {};
        if (this.orgLevel == "1" && this.orgId) {
          params.orgId = this.orgId;
        } else if (this.orgId) {
          params.parentOrgId = this.orgId;
        }
        let { resultObject } = await getStaffStatistics(params);
        // console.log(data);
        this.employeeList = resultObject || [];
      } catch (err) {

      }

    },
    async getLobbySafetyCheckCount() {
      try {
        let params = {};
        if (this.orgLevel == "1" && this.orgId) {
          params.orgId = this.orgId;
        } else if (this.orgId) {
          params.parentOrgId = this.orgId;
        }
        let { resultObject } = await getSafetyCheckStatistics(params);
        // console.log(data);
        this.lobbySafetyCheckList = resultObject;
      } catch (err) {
      }
    },
    async getLobbySmarterStatistics() {
      try {
        let params = {};
        if (this.orgLevel == "1" && this.orgId) {
          params.orgId = this.orgId;
        } else if (this.orgId) {
          params.parentOrgId = this.orgId;
        }
        let { resultObject } = await getShowIndexStatistics(params);
        // console.log(data);
        this.baseInfo = resultObject;

      } catch (err) {
      }
    },
    async getLobbyAssistStatistics() {
      try {
        let params = {};
        // if (this.orgLevel == "1" && this.orgId) {
        //   params.orgId = this.orgId;
        // } else if (this.orgId) {
        //   params.parentOrgId = this.orgId;
        // }
        let { resultObject } = await getOperation(params);
        // console.log(1111, data);
        this.runningInfo = resultObject;

      } catch (err) {
      }
    },
    async getLobbyEquipmentStatistics(data) {
      try {
        let { item } = data;
        let params = {};
        if (item.device_type) {
          params.deviceType = item.device_type;
        }
        if (this.orgId) {
          params.parentOrgId = this.orgId;
        }
        let { resultObject } = await getOrgDeviceStatistics(params);
        // console.log(1111, data);
        this.topLeft1List = resultObject;

      } catch (err) {
      }
    },
    async getLobbyEmployeeStatistics() {
      try {
        let params = {};
        if (this.orgId) {
          params.parentOrgId = this.orgId;
        }
        let { resultObject } = await getOrgStaffStatistics(params);
        // console.log(222, data);
        this.topRight2List = resultObject;
      } catch (err) {
      }
    },
    async getAllOrgList() {
      try {
        let { resultObject } = await getOrgAllStatisticsVo();
        this.allOrgList = resultObject;
      } catch (err) {
      }
    },
    getData() {
      this.getKlList();
      // this.getKlData();
      // this.getLobbyCount();
      this.getLobbyList();
      // this.getLobbyListVideo();
      this.getSystemMsg();
      this.getKlTop10();
      this.getDeviceTypeCount();
      this.getEmployeeStatistics();
      this.getLobbySafetyCheckCount();
      this.getLotteryMsg();
      this.getLobbySmarterStatistics();
      this.getLobbyAssistStatistics();
      this.getAllOrgList(); //
      // this.getLobbyEquipmentStatistics();
      // this.getLobbyEmployeeStatistics();
    }
  }
};
</script>

