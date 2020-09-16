/**
 * 生成异步路由
 * @param {Array} navMap 导航菜单配置 
 */
export function generateAsyncRouter(routerMap, routerPageMap) {
    return generateRouteByRouterMap([{
        path: '/',
        children: routerMap
    }, {
        path: '*', redirect: '/404'
    }], routerPageMap)
}

/**
 * 通过页面和路由间映射生成路由配置
 * @param {Array} routerMap 路由配置
 * @param {Array} routerPageMap 路由与页面配置
 */
export function generateRouteByRouterPageMap(routerMap, routerPageMap) {
    for (let index = 0, len = routerMap.length; index < len; index++) {
        let navItem = routerMap[index];
        // 从映射表中读取页面详细信息,组装出路由
        for (let index1 = 0, len1 = routerPageMap.length; index1 < len1; index1++) {
            const ele = routerPageMap[index1];
            //  仅从可能存在于导航菜单的路由中读取配置
            if (navItem.path === ele.path) {
                let meta = {};
                if (!navItem.meta) navItem.meta = {};
                if (!ele.meta) ele.meta = {};
                meta = Object.assign(meta, ele.meta, navItem.meta);
                navItem = Object.assign({
                    props: (route) => Object.assign(route.query, route.params)
                }, ele, navItem);
                if (!navItem.name && navItem.path) navItem.name = navItem.path;
                navItem.meta = meta;
                break;
            }
        }
        if (navItem.children) {
            navItem.children = generateRouteByRouterMap(navItem.children, routerPageMap);
            // 一级目录默认设置图标
            if (!navItem.meta.icon) navItem.meta.icon = 'dashboard';
        }
        routerMap[index] = navItem;
    }
    return routerMap;
}
