import { PageView, BlankLayout } from '@zkey-webapp/pc';
import BasicLayout from '@/modules/common/layouts/BasicLayout';

/**
 * 路由和页面映射
 */
export default [
    {
        path: '/dashboard/index',
        component: () => import('@/modules/demo/Demo.vue'),
        meta: { title: '人员管理列表' }
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/modules/exception/404'),
        meta: { title: '错误' }
    },
    /** 目录容器组件 */
    {
        path: '/',
        component: BasicLayout,
        redirect: '/dashboard/index',
        meta: { title: '首页' }
    },
    {
        path: '/dashboard',
        component: PageView,
        meta: { title: '工作台' }
    }
];
