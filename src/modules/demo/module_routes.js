"use strict";
/**
 * 本模块单页路由配置
 */
module.exports = [{
	path: '/spa',
	name:'spa',
	component: function(resolve) {
		require.async('modules/demo/spa', resolve);
	}
}, {
	path: '/spa1/AAA/:userId',
//	name:'spa1',
	component:function(resolve) {
		require.async('modules/demo/spa1.vue', resolve);
	}
}];
//function(resolve) {
//		require.async('modules/demo/spa1.vue', resolve);
//	}