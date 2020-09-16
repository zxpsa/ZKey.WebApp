import VueRouter from 'vue-router';
import Vue from 'vue';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import BasicLayout from '@/modules/common/layouts/BasicLayout';
import { PageView, BlankLayout } from 'ZKey.WebApp.PC/dist/index.esm';
import { getDynamicRouter, logout } from '@/modules/common/service/base';
import { notification } from 'ant-design-vue';
import constantRouterMap from './constantRouterMap';
Vue.use(VueRouter);

// 路由和组件间的映射
// const routerMap = [
//     {
//         path: '/',
//         component: BasicLayout,
//         // redirect: cfg.homeIndex,
//         redirect: '/dashboard/index',
//         meta: { title: '首页' },
//         hidden: true,
//         children: [{
//             path: '/dashboard',
//             component: PageView,
//             redirect: '/dashboard/index',
//             meta: { title: '人员管理' },
//             children: [
//                 {
//                     path: '/dashboard/index',
//                     component: () => import('@/modules/demo/Demo.vue'),
//                     meta: { title: '人员管理列表' }
//                 }
//             ]
//         }]
//     },
//     {
//         path: '/404',
//         component: () => import(/* webpackChunkName: "fail" */ '@/modules/exception/404'),
//         hidden: true,
//         meta: { title: '错误' }
//     }
// ];
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // 免登录白名单
const loginPagePath = '/user/login';
// 首页
const defaultPagePath = '/dashboard/index';
export function createRouter() {
    const router = new VueRouter({
        // mode: 'history',
        routes: constantRouterMap
    });

    router.beforeEach((to, from, next) => {
        NProgress.start();
        if ('ACCESS_TOKEN') {
            // 已经登录则,直接前往首页
            if (to.path === loginPagePath) {
                next({ path: defaultPagePath })
                NProgress.done();
            } else {
                // 是否需要拉取最新动态路由信息
                if ("needGetDynamicRouter") {
                    getDynamicRouter().then((result) => {
                        console.log(result);
                        // 动态添加可访问路由表
                        // router.addRoutes(result);
                        // 请求带有 redirect 重定向时，登录后自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        // console.log(redirect);
                        // console.log(from.path,to.path,redirect);
                        if (to.path === redirect) {
                            next();
                            // next({ ...to, replace: true })
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect });
                        }
                    }).catch(() => {
                        // 拉取信息失败,清理登录信息重新登录
                        notification.error({
                            message: '错误',
                            description: '请求信息失败，请重试！'
                        });
                        logout().then(() => next({ path: loginPagePath, query: { redirect: to.fullPath } }))
                    })
                }else{
                    next();
                }
            }
        } else {

            if (whiteList.filter(item => item == to.path).length > 0) {
                // 在免登录白名单中，直接进入
                next();
            } else {
                next({ path: loginPagePath, query: { redirect: to.fullPath } })
                NProgress.done();
            }
        }
    })

    router.afterEach(() => {
        NProgress.done();
    });

    return router;
}