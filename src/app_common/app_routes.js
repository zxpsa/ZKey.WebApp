"use strict";
/**
 * 应用路由配置
 */
var routes = [
    {
       path: '/',
       redirect: '/test/a'
    }
];
//添加业务模块
//测试demo模块
routes = routes.concat(require('modules/test/module_routes'));

routes.push(
    //未匹配到路由时 跳转至404页面
    { path: '/*', redirect: function(){
       	$App.go("/app_common/page/error.html");
        return false;
    }}
);
module.exports = routes;