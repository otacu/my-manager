import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { getToken } from '@/utils/auth'
import Live2d from './components/Live2d'

Vue.use(Live2d);

Vue.use(ElementUI)

Vue.config.productionTip = false

const whiteList = ['/login']
router.beforeEach(async(to, from, next) => {
    const hasToken = getToken()
    if (hasToken) {
        next()
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
