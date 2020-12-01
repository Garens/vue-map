<template>
  <div class="wrap" id="wrap">
    <!-- // 外框，固定宽度 -->
    <div id="box">
      <!-- // 内部滚动框 -->
      <div id="marquee">
        <div
          class="msg-item"
          v-for="(item, index) in lists"
          :key="index"
        >{{item.type}}用户在{{item.datetime}}访问了本站点，IP为【{{item.ip}}】</div>
      </div>
      <!-- //展示的文字 -->
      <!-- <div id="copy"></div> -->
      <!-- // 文字副本，为了实现无缝滚动 -->
    </div>
    <!-- <div id="node">{{text}}</div> -->
    <!-- //为了获取text实际宽度 -->
  </div>
</template>
<script>
export default {
  name: "Marquee",
  props: ["lists"], // 父组件传入数据， 数组形式 [ "连雨不知春去"，"一晴方觉夏深"]
  data() {
    return {
      interval: null,
      text: "" // 数组文字转化后的字符串
    };
  },
  methods: {
    move() {
      // 获取文字text 的计算后宽度  （由于overflow的存在，直接获取不到，需要独立的node计算）
      let maxHieght = document.getElementById("wrap").getBoundingClientRect()
        .height;
      let height = document.getElementById("box").getBoundingClientRect()
        .height;
      let box = document.getElementById("box");
      //   let copy = document.getElementById("copy");
      //   copy.innerText = this.text; // 文字副本填充
      let distance = 0; // 位移距离
      //设置位移
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.interval = setInterval(function () {
        distance = distance - 1;
        // 如果位移超过文字宽度，则回到起点
        if (-distance >= height) {
          distance = maxHieght + 15;
        }
        box.style.transform = "translateY(" + distance + "px)";
      }, 35);
    }
  },
  // 把父组件传入的arr转化成字符串
  mounted: function () {
    // for (let i = 0; i < this.lists.length; i++) {
    //   this.text += " " + this.lists[i].messageTitle;
    // }
    this.move();
  },
  // 更新的时候运动
  updated: function () {
    this.move();
  }
};
</script>
<style scoped lang="scss">
/* // 限制外框宽度，隐藏多余的部分 */
.wrap {
  overflow: hidden;
  height: 100%;
}
.msg-item {
  width: 100%;
  font-size: 14px;
  line-height: 26px;
  color: #aabcd3;
  &:hover {
    color: #acb3bd;
    cursor: pointer;
    font-weight: 500;
  }
}
/* // 移动框宽度设置 */
#box {
  width: 100%;
}
/* // 设置前后间隔 */
#marquee {
  //   margin: 0 16px 0 0;
}
/* // 获取宽度的节点，隐藏掉 */
#node {
  position: absolute;
  z-index: -999;
  top: -999999px;
}
</style>