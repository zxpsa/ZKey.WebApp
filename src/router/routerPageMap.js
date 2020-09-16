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
    }
];
