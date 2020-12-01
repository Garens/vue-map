<template>
  <div class="video-cont">
    <div class="wrapper" ref="wrapper">
      <ul class="content" :style="styleObj" ref="content">
        <li
          v-for="(item, index) in lobbyList"
          :key="item.id"
          @click="handleCard(item, index)"
          class="list-item"
        >
          <div class="list-item-bg">
            <img :src="item.livePicturesUrl?item.livePicturesUrl[0]: defaultImg" alt />

            <div class="list-item-cover">
              <img src="../images/play.png" alt />
            </div>
          </div>
          <div class="list-item-title">{{item.orgName}}</div>
        </li>
      </ul>
      <div
        class="control-cont control-pre"
        v-if="lobbyList.length > 3"
        @click="prePage"
        @mouseout="changeMove"
      >
        <i class="el-icon-d-arrow-left"></i>
      </div>
      <div
        class="control-cont control-next"
        v-if="lobbyList.length > 3"
        @click="nextPage"
        @mouseout="changeMove"
      >
        <i class="el-icon-d-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
// import BScroll from "better-scroll";
import BScroll from "@better-scroll/core";
// import BScroll from "better-scroll";
import ObserveDom from "@better-scroll/observe-dom";
BScroll.use(ObserveDom);
import defaultImg from "../images/ready.png";

export default {
  data() {
    return {
      defaultImg: defaultImg,
      interval: null,
      x: 0,
      y: 0,
      bs: null,
      nowIndex: 0,
      styleObj: {},
      doMove: true
    };
  },
  props: {
    lobbyList: {
      type: Array,
      default: []
    }
  },
  watch: {
    lobbyList(newValue, oldValue) {
      //   console.log(newValue);
      //   this.getData();
      this.$nextTick(() => {
        this.resetBS();
        this.init();
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      this.resetBS();
      // this.startInterval();
      this.move();
    });
  },

  beforeDestroy() {
    if (this.bs) {
      this.bs.destroy();
    }
  },
  updated() {
    this.move();
  },
  methods: {
    changeMove() {
      this.doMove = true;
    },
    move() {
      let box = this.$refs.content; //document.getElementById("box");
      if (this.interval) {
        clearInterval(this.interval);
      }
      if (this.lobbyList.length < 5) {
        box.style.transform = "translateX(0px)";
        return;
      }
      // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      let width = this.$refs.content.getBoundingClientRect().width;
      // document.getElementById("node").getBoundingClientRect().width;
      // let copy = document.getElementById("copy");
      // copy.innerText = this.text; // 文字副本填充
      let distance = 0; // 位移距离
      // console.log(box);
      //设置位移

      this.interval = setInterval(() => {
        if (this.doMove) {
          this.x -= 1;
          // 如果位移超过文字宽度，则回到起点
          if (-this.x >= width) {
            this.x = 1;
          }
          box.style.transform = "translateX(" + this.x + "px)";
        }
      }, 20);
    },
    resetBS() {
      this.bs.refresh();
      this.x = 0;
      this.y = 0;
      this.bs.scrollTo(0, 0, 300);
    },
    init() {
      this.bs = new BScroll(this.$refs.wrapper, {
        observeDom: true,
        scrollX: true,
        probeType: 3 // listening scroll hook
      });
      this._registerHooks(["scroll", "scrollEnd"], pos => {
        // console.log("done", pos);
        this.x = pos.x;
        this.y = pos.y;
        setTimeout(() => {
          this.bs.stop();
        }, 500);
      });
    },
    _registerHooks(hookNames, handler) {
      hookNames.forEach(name => {
        this.bs.on(name, handler);
      });
    },
    prePage() {
      //   console.log(this.bs);
      this.doMove = false;
      this.bs.scrollBy(500, 0, 300);
    },
    nextPage() {
      this.doMove = false;
      this.bs.scrollBy(-500, 0, 300);
      // console.log(1111111, this.$refs.content.style.transform.translateX);
    },
    handleCard(item, index) {
      //   console.log(item);
      this.$emit("showVideo", item);
      // this.$router.push({
      //   path: `/video/index`,
      //   query: {
      //     id: item.lobbyInfoId,
      //     name: item.lobbyName
      //   }
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
@media screen and (max-height: 800px) {
  .video-cont {
    padding: 1px 0 0 0;
  }
}
@media screen and (min-height: 850px) {
  .video-cont {
    padding: 20px 0 5px 0;
  }
}
.video-cont {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  overflow: auto;
  position: relative;
  .wrapper {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .content {
      display: flex;
      flex-direction: row;
      .list-item {
        // flex: 1;
        width: 140px;
        margin: 0 auto;
        height: 100%;
        padding-left: 10px;
        overflow: hidden;

        &-bg {
          width: 100%;
          height: calc(100% - 30px);
          position: relative;
          img {
            width: 100%;
            height: 100%;
          }
          transition: all 0.3s;
          &:hover {
            box-shadow: 2px 3px 8px #313146;
            cursor: pointer;
          }
        }
        &-cover {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            height: 90%;
            width: auto;
            max-width: 60px;
            max-height: 60px;
            transition: all 0.2s;
            &:hover {
              width: 44%;
              height: auto;
            }
          }
        }
        &-title {
          width: 100%;
          height: 30px;
          text-align: center;
          font-size: 14px;
          padding-top: 5px;
          color: #c6cad1;
        }
      }
    }
  }
  .control-cont {
    width: 35px;
    height: 100%;
    position: absolute;
    top: 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 32px;
    background-color: rgba(9, 28, 76, 0.1);
    transition: all 0.1s;
    color: #a5a5a5;

    i {
      flex: 1;
    }
    &:hover {
      background-color: rgba(9, 28, 76, 0.6);
      cursor: pointer;
      color: #c6cad1;
    }
  }
  .control-pre {
    left: 0px;
  }
  .control-next {
    right: 0px;
  }
}
</style>