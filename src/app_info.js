/**
 * 作者：PS    
 * 日期：2016-10-09
 * App基础信息配置
 * 
 */
$App.Info = {
    //h5版本号
    h5Version:'{%version%}',
    //处于混合App环境中
    isInHyApp:'{%isInHyApp%}'.indexOf("isInHyApp")>-1?false:true,
    //处于其他App中
    isInWebView:false
};

$App.Page={
    // webapp首页地址
    HomeIndex:null,
    // 订单列表地址
    OrderListUrl:'/order/order_list'
}

/**
 * 左侧菜单配置
 */
$App.Info.AsideMenueList = [
];

/**
 * 应用需要检测的权限功能列表
 */
$App.FuncPermissions=[

];