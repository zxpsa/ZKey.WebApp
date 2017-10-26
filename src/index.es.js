import headNav from 'app_common/components/head_nav.vue';
import appStore from 'app_common/app_store';
import routes from 'app_common/app_routes';

// 实例化状态管理机
$log.info("app:装载index.js");
window.$App_store = new Vuex.Store(appStore);
// var computed = Vuex.mapState({});
// 路由配置
const router={
	routes,
	base:"/"+$App.ProjectName+"/",
	//当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
	// scrollBehavior (to, from, savedPosition) {
	// 	if (savedPosition || typeof savedPosition == 'undefined') { //从第二页返回首页时savePosition为undefined
    //         //只处理设置了路由元信息的组件
    //         from.meta.isKeepAlive = typeof from.meta.isKeepAlive == 'undefined' ? undefined : false;
    //         to.meta.isKeepAlive = typeof to.meta.isKeepAlive == 'undefined' ? undefined : true;
    //         if(savedPosition) {
    //             return savedPosition;
    //         }
    //     } else {
    //         from.meta.isKeepAlive = typeof from.meta.isKeepAlive == 'undefined' ? undefined : true;
    //         to.meta.isKeepAlive = typeof to.meta.isKeepAlive == 'undefined' ? undefined : false;
    //     }
	// }
};
if ($Config.Env!="Dev"||$App.Info.isInHyApp) {
	router.mode='history';
}

export default {
	el: '#app',
	data:{},
	router: new VueRouter(router),
	store: $App_store,
	created,
	mounted,
	components:{
		headNav
	}
}

function created(params) {
	$App_SPA_Router = this.$router;
	this.$router.onReady(function(){
		// 页面初始化
	});

	console.log(this.$store.state.headNav);
	$log.info("app:created 完成");
}
function mounted() {
	$log.info("app:mounted 完成");
	
}
