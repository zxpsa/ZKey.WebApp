"use strict";
//实例化状态管理机
/**
 * @require app_common/app.css
 */
window.$App_store = new Vuex.Store(require('app_common/app_store'));
var computed = Vuex.mapState({
	pageTitle: function (state) {
		return state.commonNav.pageTitle;
	},
	btnClickCallback:function(state){
		return state.commonNav.btnClickCallback;
	}
});
// 路由配置
var router={
	routes: require('app_routes'),
	base:"/"+$App.ProjectName+"/"
};

if ($Config.Env!="Dev"||$App.Info.isInHyApp) {
	router.mode='history';
}

module.exports = {
	el: '#app',
	data: {},
	methods: {},
	router: new VueRouter(router),
	store: $App_store,
	created: function () {
		$App_SPA_Router = this.$router;
		window.$App_SPA_Router.afterEach(function(route){
			// console.log(route);
		});
	},
	components: {
		commonNav: require('app_common/components/nav.vue')
	},
	computed: computed
};
