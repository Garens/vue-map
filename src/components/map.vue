<template>
  <!-- <baidu-map class="bm-view" id="mymap" :center="{lng: 116.404, lat: 39.915}" :zoom="15" :scroll-wheel-zoom="true">
    <bm-marker :position="markerPoint" :dragging="true" animation="BMAP_ANIMATION_BOUNCE" @mouseout="infoWindowClose" @mouseover="infoWindowOpen" :icon="{url: 'http://developer.baidu.com/map/jsdemo/img/fox.gif', size: {width: 300, height: 157}}">
      <bm-info-window :show="show" @close="infoWindowClose" @open="infoWindowOpen">我爱北京天安门</bm-info-window>
    </bm-marker>
  </baidu-map>-->

  <el-amap class="bm-view" vid="amapDemo" :zoom="zoom" :center="center" :mapStyle="mapStyle"></el-amap>

  <!-- <baidu-map class="bm-view" id="mymap" :scroll-wheel-zoom="true" ak="6niQQjUGqGF9BlXEOibxA01kbgLGAORd">
  </baidu-map>-->
</template>
<script>
import { BaiduMap } from "vue-baidu-map";
export default {
  data() {
    return {
      zoom: 15,
      center: [116.397428, 39.90923],
      mapStyle: 'amap://styles/grey',
      show: false,
      markerPoint: { lng: 116.404, lat: 39.915 }
    };
  },
  components: {
    BaiduMap
  },
  mounted() {
    // this.initMap();
    console.log(this)
  },
  methods: {
    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      this.show = true;
    },
    initMap: function () {
      var map = new BMap.Map("mymap");
      var point = new BMap.Point(100.28788, 25.723454);
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true); //设置可缩放
    }
  }
};
</script>
<style>
#mymap {
  width: 100%;
  height: 100%;
  display: block;
}
.anchorBL {
  display: none;
}
</style>

