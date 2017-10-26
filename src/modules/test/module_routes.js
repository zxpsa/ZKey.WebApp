/**
 * 本模块单页路由配置
 */
module.exports = [{
	path: '/test/a', //页面
	component: function (resolve) {
		require.async('modules/test/page/a.vue', resolve);
	}
},{
	path: '/test/b', //页面
	component: function (resolve) {
		require.async('modules/test/page/b.vue', resolve);
	}
},
{
	path: '/test', //页面
	component: function (resolve) {
		require.async('modules/test/page/index.vue', resolve);
	}
},{
	path: '/test/c', //页面
	component: function (resolve) {
		require.async('modules/test/page/c.vue', resolve);
	}
}];