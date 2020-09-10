
import VueRouter from 'vue-router';
// import { BasicLayout, BlankLayout, PageView, RouteView } from 'zkey.webapp.pc/layouts/index';
// import { BasicLayout } from 'zkey.webapp.pc/layouts/index';
import Vue from 'vue';
import BasicLayout from '@/modules/common/layouts/BasicLayout';
Vue.use(VueRouter);

// 路由和组件间的映射
const routerMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        // redirect: cfg.homeIndex,
        redirect: '/dashboard', 
        meta: { title: '首页' },
        hidden: true,
        children: [{
            name: 'index1',
            path: '/dashboard',
            component:()=> import('@/modules/demo/Demo.vue'),
            meta: {
                title: '首页1'
            },
            // children:[
            //     {
            //         name: 'index12',
            //         path: '/dashboard1',
            //         component:()=> import('@/modules/demo/Demo.vue'),
            //         // redirect: '/dashboard',
            //         meta: {
            //             title: '首页12'
            //         }
            //     }
            // ]
        }]
    },
    // {
    //     path: '/sysManage',
    //     meta: {
    //         title: '系统管理',
    //         keepAlive: true,
    //         permission: ['dashboard']
    //     },
    //     component: PageView
    // },
    // {
    //     path: '/lighting',
    //     meta: {
    //         title: '照明控制',
    //         keepAlive: true,
    //         permission: ['dashboard']
    //     },
    //     component: RouteView
    // },
    // {
    //     path: '/404',
    //     component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    // }
];
// 没有在导航菜单中展示的页面即为具有路由的隐藏页面
const constantRouterMap = routerMap.filter(item => item.hidden==true);

export function createRouter() {
    return new VueRouter({
        // mode: 'history',
        routes: constantRouterMap
    })
}