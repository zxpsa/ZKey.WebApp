/**
 * 本模块单页路由配置
 */
module.exports = [{
	path: '/test', //页面
	component: function(resolve) {
		require.async('modules/test/page/index.vue', resolve);
	}
}];