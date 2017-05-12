/**
 * 模块内状态管理
 */
$App_store.registerModule('modules/demo', {
	state: {
		count: 0
	},
	mutations: require('modules/demo/mutations'),
	actions: require('modules/demo/actions')
})