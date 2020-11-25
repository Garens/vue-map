<template>
  <div class="main-cont" :style="mainContStyle">
    <div class="main-map" id="main-map" @click="hideMenu" :style="mainMapStyle">
      <map-view></map-view>
    </div>
    <div class="desktop">
      <Row class="desktop-row">
        <Col span="20" class="desktop-item" @click.native="hideMenu">
          <div class="bottom-menu-item">
            <div
              class="icon-menu"
              :class="sysId == item.sysId?'active' : ''"
              v-for="(item, index) in startMenuList"
              :key="index"
              @click="changePageShow(item)"
            >
              <Icon :type="item.icon"></Icon>
            </div>
          </div>
          <div class="copyright">xxxx1综合管理系统</div>
        </Col>
        <Col span="2" class="desktop-time" @click.native="hideMenu">
          <div>{{sysTime.date}}</div>
          <div>{{sysTime.time}}</div>
        </Col>
        <Col span="2" class="start">
          <Button type="text" @click="startMenu">
            <Icon type="social-windows" size="16" color="#ffb848" class="start-icon"></Icon>
            <span class="start-text">系统菜单</span>
          </Button>
        </Col>
      </Row>
    </div>
    <transition name="fade">
      <startMenu v-if="isShowMenu"></startMenu>
    </transition>
  </div>
</template>

<script>
import mapView from "./map.vue";
import startMenu from "./startMenu.vue";

export default {
  name: "hello",
  components: {
    mapView,
    startMenu
  },
  data() {
    return {
      isShowMenu: false,
      sysTime: {
        // date: new Date().toLocaleDateString(),
        // time: new Date().toLocaleTimeString()
      },
      mainMapStyle: {},
      mainContStyle: {},
      startMenuList: []
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    opend: function (data) {
      console.log(data);
    }
  },
  computed: {},
  mounted() {
    this.setDesktopTime();
    this.setWindowSize();
    window.addEventListener(
      "resize",
      () => {
        this.setWindowSize();
      },
      false
    );

    this.$socket.on("opend", function (data) {
      console.log(data);
    });
  },
  methods: {
    //点击切换下面的小图标时候
    changePageShow: function (item) {
      let sysId = item.sysId;
      this.$layer.taggel(sysId);
    },
    //设置地图层div的宽度高度
    setWindowSize: function () {
      this.mainContStyle = {
        width: document.documentElement.clientWidth + "px",
        height: document.documentElement.clientHeight + "px"
      };
      this.mainMapStyle = {
        width: document.documentElement.clientWidth + "px",
        height: document.documentElement.clientHeight - 38 + "px"
      };
    },
    //点击其他地方，隐藏开始菜单
    hideMenu: function () {
      this.isShowMenu = false;
    },
    //设置右下角时间
    setDesktopTime() {
      if (this.timeInterval) {
        clearInterval(this.timeInterval);
      }
      this.timeInterval = setInterval(() => {
        this.sysTime = {
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString()
        };
      }, 1000);
    },
    //开始菜单点击事件
    startMenu: function (e) {
      this.isShowMenu = !this.isShowMenu;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import '~@/less/index.less';

.desktop {
  width: 100%;
  height: 40px;
  display: block;
  position: absolute;
  bottom: 0px;
  background: @backColor;
  z-index: 9999;
}

.desktop-row {
  height: 40px;
  line-height: 40px;
  color: @backTextColor;
  overflow: hidden;
}

.start {
  background: @activeBackColor;
  transition: all 0.2s ease-in;
  width: 110px;
  z-index: 100;
  &:hover {
    background-color: @activeBackColorHover;
    .start-icon {
      transform: rotateY(330deg);
      color: @textColorHover;
    }
  }
}

.start-icon {
  padding: 5px;
  transition: all 0.4s ease-in;
}

.start-text {
  color: @backTextColor;
}

.desktop-item {
  min-width: 300px;
  width: 100%;
  position: absolute;
  padding: 0px 100px 0px 110px;
}

.desktop-time {
  display: inline;
  position: absolute;
  height: 40px;
  width: 100px;
  padding: 4px 0px 0px 5px;
  bottom: 0px;
  right: 0px;
  text-align: center;
  color: @backTextColor;
  transition: all 0.2s ease;
  &:hover {
    cursor: pointer;
    background-color: @backColorHover;
  }
  > div {
    height: 16px;
    line-height: 16px;
  }
}

.copyright {
  float: right;
  padding: 0 20px;
}
.bottom-menu-item {
  min-width: 200px;
}
.main-map {
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
.main-cont {
  display: block;
  overflow: hidden;
}
.icon-menu {
  width: 46px;
  height: 40px;
  cursor: pointer;
  float: left;
  margin: 0 6px;
  border-bottom: 2px solid @borderColor;
  transition: all 0.2s ease;
  &:hover {
    width: 50px;
    margin: 0 4px;
    background-color: @backColorHover;
    border-bottom: 2px solid @borderColor;
    i {
      font-size: 34px;
    }
  }
  i {
    font-size: 32px;
    line-height: 40px;
    color: @backTextColor;
  }
}
</style>
