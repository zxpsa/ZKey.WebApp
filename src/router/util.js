/**
 * 生成异步路由
 * @param {Array} navMap 导航菜单配置 
 */
export function generateAsyncRouter(navMap){
    return generateRouteByRouterMap([{
        path: '/',
        children: navMap
    },{
        path: '*', redirect: '/404', hidden: true
    }])
}

function generateRouteByRouterMap(navMap) {
    for (let index = 0, len = navMap.length; index < len; index++) {
        let navItem = navMap[index];
        // 从映射表中读取页面详细信息,组装出路由
        for (let index1 = 0, len1 = routerMap.length; index1 < len1; index1++) {
            const ele = routerMap[index1];
            //  仅从可能存在于导航菜单的路由中读取配置
            if (ele.hidden !=true && navItem.path === ele.path) {
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
            navItem.children = generateRouteByRouterMap(navItem.children);
            // 一级目录默认设置图标
            if(!navItem.meta.icon) navItem.meta.icon = 'dashboard';
        }
        navMap[index] = navItem;
    }
    // for (let index = 0,len = navMap.length; index < len; index++) {
    //     const item = navMap[index];
    //     if (!item.component) {
    //         console.log('页面不存在,请检测导航栏配置!',item);
    //         navMap.splice(index,1);
    //         index--;
    //         len --;
    //     }
    // }
    return navMap;
}
