import Vue from 'vue'
import Router from 'vue-router'
import DeskTop from '@/components/DeskTop'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DeskTop',
      component: DeskTop
    }
  ]
})
