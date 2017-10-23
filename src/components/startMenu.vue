<template>
  <div id="startMenu">
    <div class="menu-top">
      <Icon type="person" class="user-icon"></Icon>
      <span class="user-name">
        username
      </span>
    </div>
    <div class="menu-cont">
      <Carousel v-model="value1" :trigger="'hover'" :arrow="'never'" class="menu-cont-page">
        <CarouselItem v-for="num in menuList" class="menu-cont-page-item">
            <div v-for="item in num" class="menu-item" :style="item.color | formatColor" @click="startMenuItem(item.page)">
              <Icon :type="item.icon"></Icon>
              <div class="menu-item-text">
                <span>{{item.title}}</span>
              </div>
            </div>            
        </CarouselItem>
    </Carousel>
    </div>
    <div class="menu-bottom">
      <Button type="info">修改密码</Button>
    <Button type="error">退出系统</Button>
    </div>
  </div>
</template>

<script>
import test1 from "./sys1/Index.vue";
import test2 from "./sys2/Index.vue";

export default {
  props: [],
  components: {
    test1,
    test2
  },
  data() {
    return {
      value1: 0,
      menuList: [
        { icon: "settings", title: "系统菜单1", color: "#cb5a5e", page: test1 },
        { icon: "filing", title: "系统菜单2", color: "#30962d", page: test2 },
        { icon: "clipboard", title: "系统菜单3", color: "#ca8319", page: test1 },
        { icon: "pie-graph", title: "系统菜单4", color: "#ed3f14", page: test2 },
        {
          icon: "social-buffer",
          title: "系统菜单5",
          color: "#151c2d",
          page: "test1"
        },
        {
          icon: "android-contacts",
          title: "系统菜单6",
          color: "#2b85e4",
          page: "test1"
        },
        {
          icon: "android-share-alt",
          title: "系统菜单7",
          color: "#30962d",
          page: "test1"
        },
        {
          icon: "android-car",
          title: "系统菜单8",
          color: "#ca8319",
          page: "test1"
        },
        {
          icon: "android-map",
          title: "系统菜单9",
          color: "#ed3f14",
          page: "test1"
        },
        {
          icon: "android-options",
          title: "系统菜单10",
          color: "#151c2d",
          page: "test1"
        },
        {
          icon: "ios-speedometer",
          title: "系统菜单11",
          color: "#2b85e4",
          page: "test1"
        }
      ]
    };
  },
  filters: {
    formatColor: function(color) {
      return "background-color:" + color;
    }
  },
  mounted() {
    this.menuCalculate();
  },
  methods: {
    //格式化菜单数据,以6来均分
    menuCalculate: function() {
      var list = this.menuList;
      var arr = [];
      for (var i = 0; i < list.length; i += 6) {
        arr.push(list.slice(i, i + 6));
      }
      this.menuList = arr;
    },
    //点击一个菜单项事件
    startMenuItem: function(page) {
      console.log(page);
      // this.$layer.alert(page);
      this.$layer.iframe({
        content: {
          content: page, //传递的组件对象
          parent: this, //当前的vue对象
          data: [] //props
        },
        area: ["800px", "600px"],
        title: "editForm"
      });
    }
  }
};
</script>

<style>
#startMenu {
  position: absolute;
  left: 0px;
  bottom: 40px;
  width: 290px;
  height: 500px;
  display: block;
  background-color: rgba(15, 43, 76, 0.9);
  z-index: 999999;
}
.menu-top {
  width: 100%;
  height: 80px;
  padding: 15px 0px 20px 40px;
}
.menu-cont {
  width: 100%;
  height: 360px;
  border: 0.8px solid #888;
  border-width: 0.8px 0;
  padding: 15px 5px;
}
.menu-bottom {
  width: 100%;
  height: 60px;
  padding: 14px 0;
}
.menu-bottom button {
  margin: 0 10px;
}
.user-icon {
  border-radius: 25px;
  width: 45px;
  height: 45px;
  background-color: #666;
  float: left;
  color: #fff;
  font-size: 32px;
  line-height: 40px;
  transition: all 0.2s ease;
}
.user-icon:hover {
  cursor: pointer;
  background-color: #333;
  color: #bbb;
  transform: rotateY(180deg);
}
.user-name {
  float: left;
  color: #ddd;
  padding: 10px;
  font-size: 16px;
}
.menu-cont-page {
  width: 100%;
  height: 100%;
}
.menu-cont-page-item {
  padding: 10px 35px;
  width: 280px !important;
  height: 308px !important;
  overflow: hidden;
}
.menu-item {
  width: 90px;
  height: 90px;
  margin: 5px;
  color: #fff;
  font-size: 14px;
  float: left;
  border: 1.5px solid transparent;
  /* background-color: #cb5a5e; */
  transition: all 0.2s ease;
  line-height: 16px;
}
.menu-item:hover {
  border-color: #ddd;
  cursor: pointer;
  border-radius: 4px;
}
.menu-item i {
  font-size: 45px;
  padding: 5px 0;
  display: block;
  transition: all 0.25s ease;
}
.menu-item:hover i {
  transform: rotateY(180deg);
}
.menu-item:hover .menu-item-text span {
  font-weight: bold;
}
.menu-item-text {
  width: 86px;
  height: 35px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.menu-item .menu-item-text span {
  margin: 0 auto;
  text-align: center;
}
</style>

