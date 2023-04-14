import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// 导入我们创建的用于请求的request对象
import request from './api/index.js'

// 将请求对象，绑定到vue的原型上
// $request 这个是我们自定义的变量名称
Vue.prototype.$request = request

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
