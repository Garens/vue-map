<template>
  <div class="msg-cont chart">
    <div class="title">>> 系统告警信息</div>
    <!-- <transition :duration="1000"> -->
    <!-- <transition appear> -->
    <!-- <transition name="slide-fade"> -->
    <!-- <template v-if="msgList.length > 0" :key="index">
      <div class="msg-cont-item" :key="_index" v-for="(item, _index) in playList">
        <div class="msg-cont-item-title">{{obj.name || ""}}</div>
        <div class="msg-cont-item-date">{{obj.time || ""}}</div>
      </div>
    </template>-->
    <div class="msg-cont-item" v-if="msgList.length > 0">
      <my-marquee :lists="msgList"></my-marquee>
    </div>
    <div v-else class="no-text">暂无信息</div>
    <!-- </transition> -->
    <!-- <div v-if="msgList.length < 1" class="no-text">暂无消息</div> -->
  </div>
</template>

<script>
import myMarquee from "./common/msgItem";
export default {
  components: {
    myMarquee
  },
  data() {
    return {
      interval: null,
      obj: {},
      obj1: {},
      obj2: {},
      index: 0,
      playList: []
    };
  },
  props: {
    msgList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  mounted() {
    // this.setMsg();
  },
  methods: {
    setMsg() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(() => {
        if (this.index > this.msgList.length - 9) {
          this.index = 0;
        }
        let arr = this.msgList.splice(this.index, 9);
        this.playList = arr;
        this.index++;
      }, 3000);
    }
  }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
<style lang="scss" scoped>
.msg-cont {
  //   transition: all 0.1s ease;
  padding: 10px 20px;
  color: #c6cad1;
  font-size: 14px;
  line-height: 25px;
  height: 100%;

  &-item {
    height: calc(100% - 32px);
    padding: 15px 0;
  }
  .no-text {
    text-align: center;
    color: #c6cad1;
    line-height: 100px;
  }
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>