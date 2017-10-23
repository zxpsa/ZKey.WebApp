// 实例化状态管理机
$log.info("app:装载index.js");
window.$App_store = new Vuex.Store(require('app_common/app_store'));
// var computed = Vuex.mapState({});
// 路由配置
var router={
	routes: require('app_common/app_routes'),
	base:"/"+$App.ProjectName+"/"
	// ,scrollBehavior (to, from, savedPosition) {
	// 	if (savedPosition) {
	// 		setTimeout(function(){
	// 			window.scrollTo(savedPosition.x, savedPosition.y);
	// 		},200);
	// 	} else {
	// 	  return { x: 0, y: 0 }
	// 	}
	// }
};
if ($Config.Env!="Dev"||$App.Info.isInHyApp) {
	router.mode='history';
}

module.exports = {
	el: '#app',
	data: {},
	router: new VueRouter(router),
	store: $App_store,
	created: function () {
		$App_SPA_Router = this.$router;
		this.$router.onReady(function(){

		});
		$log.info("app:created 完成");
	},
	// computed: computed,
	mounted:function(){
		$log.info("app:mounted 完成");
	}
};