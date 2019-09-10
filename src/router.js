import Vue from "vue";
import Router from "vue-router";

Vue.use(Router)

export default new Router({
    mode: 'hash',
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
                    path: '/myanimelist',
                    name:'MyAnimeList',
                    component: () => import('@/views/MyAnimeList')
                }
            ]
        },
        {
            path: '/login',
            component: () => import('@/views/Login')
        }
    ]
})
