<style scoped lang="less">
@import '../index.less';
</style>

<template>
  <div class="chart">
    <div class="title">>> 运行情况</div>
    <defender
      warningDomId="alarmBox2"
      :lately24Num="lately24Num"
      :defense25Num="defense25Num"
      :warning25Num="warning25Num"
      :runningInfo="runningInfo"
    ></defender>
  </div>
</template>

<script>
// import cvsApi from "@/services/impl/cvsApi";
import defender from "./common/defender";

export default {
  components: {
    defender
  },
  data() {
    return {
      lately24Num: 2511,
      defense25Num: 30,
      warning25Num: 60,
      myChart: null
    };
  },
  props: {
    runningInfo: {
      type: Object,
      default: {}
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


