"use strict";
//实例化状态管理机
window.$App_store=new Vuex.Store(require('app_common/app_store'));
module.exports = {
	el: '#app',
	data: {},
	methods: {
		confirm: function() {
			$App.confirm("测试的", function(index) {
				alert("按钮1回调!");
			});
		},
		toSpa1:function(){
			console.log("啊速度发");
			this.$router.push("/spa1");
		}
	},
	router: new VueRouter({
		routes:[{
			path: '/spa',
			component: function(resolve) {
				require.async('modules/demo/spa', resolve);
			}
		}, {
			path: '/spa1/AAA/:userId',
			component:function(resolve) {
				require.async('modules/demo/spa1.vue', resolve);
			}
		}]
	}),
	store:$App_store,
	created:function(){
		$App_SPA_Router=this.$router;
	},
	mounted:function(){
//		window.$App_SPA_Router=this.$router;	
	}
};
// require('app_routes')