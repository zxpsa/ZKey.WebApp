import routerPageMap from '@/router/routerPageMap';
import { generateAsyncRouter } from '@/router/util';

/**
* 拉取动态路由信息
*/
export function getDynamicRouter() {
    // 开发阶段拉取本地模拟全量的导航菜单配置
    return import('@/router/navMenus').then((result) => {
        const arr = result.default;
        return generateAsyncRouter(arr, routerPageMap);;
    });
}

/**
 * 退出登录
 */
export function logout() {
    return Promise.resolve();
}