import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            component: () => import('@/views/Layout'),
            children:[
                {
                    path: '/home',
                    name:'首页',
                    component: () => import('@/views/Home')
                },
                {
                    path: '/test',
                    name:'测试页',
                    component: () => import('@/views/Testview')
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/Login')
        }
    ]
})
