//过滤文件
var ignoreList=[
	'*.bak',
	'**.bat',
	'**.md',
	'node_modules/**',
	'fis-conf.js',
	'**.sh'
];
fis.set('nowDateTime', Date.now());
//加载模块化解析插件 开发时 手动开启
//fis.hook('commonjs')
//
////开启自动模块化包装
//fis.match('/**.js', {
//	isMod: true
//})
//为零散启动执行的js／以及第三方库关闭自动打包功能
//fis.match('{/app_core/index.js,/app_core/js/**.js,/app_core/libs/**,/config.js}', {
//	isMod: false
//})
/************************************************开发模式***************************************************/
fis.media('debug')
.hook('commonjs')
//开启自动模块化包装
.match('/**.js', {
	isMod: true
})
.match('{/app_core/index.js,/app_core/js/**.js,/app_core/libs/**,/config.js}', {
	isMod: false
})
// vue组件本身配置 
.match('/**.vue', {  
	isMod: true, 
	rExt: 'js', 
	useSameNameRequire: true,
	parser: fis.plugin('vue-component', {
 		cssScopedFlag: '_vuec', // 组件scoped占位符 
    	cssScopedIdPrefix: '_v-',   // hash前缀：_v-23j232jj 
    	cssScopedHashType: 'sum',   // hash生成模式，num：使用`hash-sum`, md5: 使用`fis.util.md5` 
    	cssScopedHashLength: 8,     // hash 长度，cssScopedHashType为md5时有效 
    	styleNameJoin: ''     
	})
})

//加载js css组件 并优化
//fis.match('::packager', { 
//	postpackager: fis.plugin('loader', {
//		resourceType : "mod"
//	})
//})
//加载js css组件 开发时
.match('::packager', {
	postpackager: [fis.plugin('loadrequires')]
})

//添加查询字符串(保证发布缓存刷新)
.match('**.{vue,js,css,png,ico,jpg,mp4,json,html}', {
    query: '?_t=' + fis.get('nowDateTime')
})
.match('**.css', {
    postprocessor: fis.plugin('px2rem',{
        baseDpr: 1,             // base device pixel ratio (default: 2)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 37.5,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
    })
 });
/************************************************合并公共js开始***************************************************/


/************************************************压缩代码***************************************************/
//按模块进行打包

//fis.match('/app_core/core.js', {
//  domain: 'http://cdn.baidu.com/'
//}) 




/************************************************测试模式***************************************************/

fis.media("test")
.match('**.{vue,js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})
//加载js css组件 并优化
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
//设置所有文件产出位置
.match('**', { //解决VS中可访问
	useSameNameRequire:true,
    deploy: [ 
    	//过滤打包掉的文件
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:true
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})

/************************************************正式服务***************************************************/
fis.media("pro")
/* 
 * ================================
 *
 *  合并生成核心core.js core.css
 * 
 * ================================
 * 
 */
.match('::package', {
  	packager: fis.plugin('map', {
    	useSourceMap : false, // 合并后开启 SourceMap 功能。
    	'/app_core/core.js': [
			'/app_core/libs/es6-promise/promise.js',
    		'/app_core/libs/layer_mobile/layer.js',
       		'/app_core/libs/mod/mod.js',
       		'/app_core/libs/jquery/jquery.js',
       		'/app_core/libs/fastclick/fastclick.js',
       		'/app_core/libs/vue/vue.js',
       		'/app_core/libs/vue/vue-router.js',
       		'/app_core/libs/vue/vuex.js',
       		'/app_core/js/general.js',
			'/app_core/js/zk_app_info.js',
       		'/app_core/js/zk_http.js',
			'/app_core/js/zk_observer.js',
			'/app_core/js/hyapp.js',
       		'/app_core/js/bss_common.js',
			'/app_core/js/zk_cache.js',
       		'/app_core/index.js'
    	],
    	'/app_core/core.css':[
    		'/app_core/libs/layer_mobile/layer.css',
    		'/app_core/css/avatar.css',
    		'/app_core/css/zk_reset.css',
    		'/app_core/css/xsf_layer.css',
    		'/app_core/index.css'
    	]
  	})
})
.set('project.ignore', ignoreList.concat([
	'test/**', 
	'mock/**',
	'config.js',
	'app_common/**'
]))
//设置所有文件产出位置
.match('/app_core/**', { //解决VS中可访问
	useSameNameRequire:true,
    deploy: [ 
    		//过滤打包掉的文件
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:true
	    }),
	    fis.plugin('replace', {
            from: '<!--<link rel="import" href="/app_common/head.html?__inline">-->',
            to: function ($0, $1) {
                return '<link rel="import" href="/app_common/head.html?__inline">';
            }
        }),
//	    发布位置
	    fis.plugin('local-deliver', {
			to:'../../'
	        // to: '../../release'
//			to: 'E:\\PS_WP\\星辰CODE\\ZKey.WebApp\\src'
			// WebView--无
			// to:'/Users/ps/CODE/xsf-web/branches/3.1.0_fix/webview_webapp/src'
			// 收付款
			// to:'/Users/ps/CODE/xsf-web/branches/3.1.0_fix/collect-payment-webapp/src'
			// 活动acti
			//  to: '/Users/ps/CODE/xsf-web/branches/3.1.0_fix/acti-webapp/src',
			 // 分享
			// to:'/Users/ps/CODE/xsf-web/branches/3.1.0_fix/shared_webapp/src'
	    })
    ]
})


