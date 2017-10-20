<template>
  <div id="mymap">

  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap: function() {
      var map = new BMap.Map("mymap");
      var point = new BMap.Point(100.28788, 25.723454);
      map.centerAndZoom(point, 15);
      map.enableScrollWheelZoom(true);    //设置可缩放
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

