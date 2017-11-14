import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import realData from './modules/realData'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'//在非生产环境下，使用严格模式

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        realData
    },
    strict: debug
})
