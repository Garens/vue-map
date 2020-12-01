<style scoped lang="less">
@import '../index.less';
.msg-cont {
  padding: 20px;
  height: calc(~'100% - 32px');
  .msg-item {
    font-size: 14px;
    line-height: 30px;
    color: #aabcd3;
    &:hover {
      color: #acb3bd;
      cursor: pointer;
      font-weight: 500;
    }
  }
  .no-text {
    color: #b5c7df;
    text-align: center;
  }
}
</style>

<template>
  <div class="chart">
    <div class="title">>> 最新访问信息</div>
    <!-- <defender
      warningDomId="alarmBox1"
      :lately24Num="lately24Num"
      :defense25Num="defense25Num"
      :warning25Num="warning25Num"
    ></defender>-->
    <div class="msg-cont">
      <!-- <div class="msg-item" v-for="(item, index) in lotteryList" :key="index">{{item.messageTitle}}</div> -->
      <my-marquee :lists="lotteryList" v-if="lotteryList.length > 0"></my-marquee>
      <div v-else class="no-text">暂无信息</div>
    </div>
  </div>
</template>

<script>
// import cvsApi from "@/services/impl/cvsApi";
// import defender from "./common/defender";
import myMarquee from "./common/marque";

export default {
  components: {
    myMarquee
  },
  data() {
    return {
      lately24Num: 2568,
      defense25Num: 20,
      warning25Num: 50,
      myChart: null
    };
  },
  props: {
    lotteryList: {
      type: Array,
      default: []
    }
  },
  watch: {
    lotteryList(newValue, oldValue) {
      // console.log(newValue);
    }
  },
  created() {
    // this.getData();
  },
  mounted() { },
  methods: {
    async getData() {
      let options = {
        method: "get",
        params: {}
      };
      // const { success, data } = await cvsApi.resultJobInfoBarbaselineChart(
      //   options
      // );
      // if (success) {
      //   // this.initChart();
      // }
    }
  }
};
</script>


