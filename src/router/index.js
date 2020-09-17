import VueRouter from 'vue-router';
import Vue from 'vue';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';
import { getDynamicRouter, logout } from '@/modules/common/service/base';
import { notification } from 'ant-design-vue';
import constantRouterMap from './constantRouterMap';
Vue.use(VueRouter);

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/user/login'] // 免登录白名单
const loginPagePath = '/user/login';
// 首页
const defaultPagePath = '/dashboard/index';
/**
 * 生成路由对象
 * @param {Store} store 状态管理机
 */
export function createRouter(store) {
    const router = new VueRouter({
        // mode: 'history',
        routes: constantRouterMap
    });

    router.beforeEach((to, from, next) => {
        NProgress.start();
        // asyncRouter
        if ('ACCESS_TOKEN') {
            // 已经登录则,直接前往首页
            if (to.path === loginPagePath) {
                next({ path: defaultPagePath })
                NProgress.done();
            } else {
                // 是否需要拉取最新动态路由信息
                if (!store.state.dynamicRouter) {
                    getDynamicRouter().then((result) => {
                        console.log(result);
                        store.commit('UpdateDynamicRouter',result);
                        // 动态添加可访问路由表
                        router.addRoutes(store.state.dynamicRouter);
                        // 请求带有 redirect 重定向时，登录后自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        console.log(from.path,to.path,redirect);
                        if (to.path === redirect) {
                            // next();
                            next({ ...to, replace: true })
                        } else {
                            // 跳转到目的路由
                            next({ path: redirect });
                        }
                    }).catch((err) => {
                        // 拉取信息失败,清理登录信息重新登录
                        notification.error({
                            message: '错误',
                            description: '请求信息失败，请重试！'
                        });
                        // 退出登录
                        // logout().then(() => next({ path: loginPagePath, query: { redirect: to.fullPath } }))
                        // 代码异常则抛出错误
                        if(err)throw Error(err);
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