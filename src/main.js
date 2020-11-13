// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import BaiduMap from 'vue-baidu-map'
import axios from 'axios'
import VueSocketio from 'vue-socket.io'
import config from '../config/config'
import store from './store/index'
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '8b57785f1670a429e62d583a417955d3',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});

Vue.use(VueSocketio, config.restful.host || 'ws://127.0.0.1:3000', store);

Vue.config.productionTip = false
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '6niQQjUGqGF9BlXEOibxA01kbgLGAORd'
})

import layer from 'vue-layer-map'
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$http = axios;

Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
