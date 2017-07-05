//过滤文件
fis.set('project.ignore', [
	'*.bak',
	'**.bat',
	'**.md',
	'node_modules/**',
	'fis-conf.js',
//	'mock/**',
//	'test/**',
	'config.js' 
])

fis.set('nowDateTime', Date.now());

// vue组件本身配置
fis.match('/**.vue', {  
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
fis.match('::packager', {
	postpackager: [fis.plugin('loadrequires')]
})

//添加查询字符串(保证发布缓存刷新)
fis.match('**.{vue,js,css,png,ico,jpg,mp4,json,html}', {
    query: '?_t=' + fis.get('nowDateTime')
})
/************************************************合并公共js开始***************************************************/
//加载模块化解析插件
fis.hook('commonjs')

//开启自动模块化包装
fis.match('/modules/**.js', {
	isMod: true
})

/************************************************压缩代码***************************************************/
//按模块进行打包
fis.match('/modules/(*)/**.{vue,js}', {
	packTo: '/modules/$1/$1.js'
})
fis.match('/modules/(*)/**.css', {
	packTo: '/modules/$1/$1.css'
})
//压缩业务功能和公共部分JS 
fis.match('/{app,components,modules}/**.{vue,js}', {
    // 压缩JS
    optimizer   : fis.plugin('uglify-js', {
      compress: {
        drop_console: true // 自动去除console.log等调试信息
      }
    })
})

//fis.match('/app_core/core.js', {
//  domain: 'http://cdn.baidu.com/'
//}) 
//启用插件 让所有文件，都使用相对路径。
fis.hook('relative')
.match('**', {
	relative: true
})
/************************************************开发模式***************************************************/
fis.media('debug')
.match('**.{vue,js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})


//第三方服务器开发模式
fis.media('other-server')
.match('**.{vue,js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})


//设置所有文件产出位置
.match('**', { //解决VS中可访问
	useSameNameRequire:true,
    deploy: [ 
    	//过滤打包掉的文件
     	fis.plugin('skip-packed', {
	      skipPackedToPkg:false
	    }),
	    fis.plugin('local-deliver', {
	        to: '../release'
	    })
    ]
})
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
//加载js css组件 并优化
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
.set('project.ignore', [
	'*.bak',
	'**.bat',
	'**.md',
	'node_modules/**',
	'fis-conf.js',
	'mock/**',
	'test/**',
	'config.js' 
])
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
       		'/app_core/libs/mod/mod.js',
       		'/app_core/libs/jquery/jquery.js',
       		'/app_core/libs/bootstrap/js/bootstrap.js',
       		'/app_core/libs/layer/layer.min.js',
       		'/app_core/libs/vue/vue.js',
       		'/app_core/js/general.js',
       		'/app_core/js/bss_common.js',
       		'/app_core/index.js'
    	],
    	'/app_core/core.css':[
    		'/app_core/libs/bootstrap/css/bootstrap.css',
    		'/app_core/libs/font-awesome/font-awesome.css',
    		'/app_core/libs/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css',
    		'/app_core/index.css',
    	]
  	})
})
//移动layer的css至合适目录解决layer的兼容问题
.match('/app_core/libs/layer/(skin/**)', {
    release: "/app_core/$1" 
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
			to:'../../'
//	        to: '../../release'
			// to: 'E:\\XSF\\xsf-app\\branches\\lanzhong_20161024\\xingshoufu\\xingshoufu-web\\src\\main\\webapp\\statics'
	    })
    ]
})


