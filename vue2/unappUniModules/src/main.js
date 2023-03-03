import Vue from 'vue'
import App from './App'
// main.js
// uView全局组件使用：
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
// vuex 引入
import store from './store/index.js'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,store //在全局vue实例挂载store
})
app.$mount()
