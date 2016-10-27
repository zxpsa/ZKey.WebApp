//过滤文件
fis.set('project.ignore', [
	'*.bak',
	'**.bat',
	'**.md',
	'node_modules/**',
	'fis-conf.js'
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

//加载js css组件 开发时
fis.match('::packager', {
	postpackager: [fis.plugin('loadrequires')]
})
//添加查询字符串(保证发布缓存刷新)
fis.match('**.{vue,js,css,png,ico,jpg,mp4,json,html}', {
    query: '?_t=' + fis.get('nowDateTime')
})
//过滤首页html
fis.match('{index.html,login.html}', {
    query: ''
})
/************************************************合并公共js开始***************************************************/
//加载模块化解析插件
fis.hook('commonjs')

//开启自动模块化包装
fis.match('/modules/**.js', {
	isMod: true
})

//合并公共基础js
fis.match('/libs/mod/mod.js', {
	packTo:'/common.js',
	packOrder: -100
})

fis.match('/libs/vue/vue.js', {
	packTo:'/common.js',
	packOrder: -99
})

//fis.match('/libs/jquery.min/jquery.js', {
//	packTo:'/common.js',
//	packOrder: -98
//})

//fis.match('/libs/layer/layer.min.js', {
//	query:"",
//	packTo:'/common.js',
//	packOrder: -97
//})

fis.match('/app/js/general.js', {
	packTo:'/common.js',
	packOrder: -96  
})

fis.match('/libs/bootstrap.min/bootstrap.min.js', {
	packTo:'/common.js',
	packOrder: -95  
})

fis.match('/config_info.js', {
	packTo:'/common.js',
	packOrder: -94  
})

fis.match('/app/js/app.js', {
	packTo:'/common.js',
	packOrder: -93  
})

////合并公共基础样式
//fis.match('/libs/bootstrap.min/bootstrap.min.css', {
//	packTo:'/common.css',
//	packOrder: -100
//})
//
//fis.match('/libs/font-awesome/font-awesome.css', {
//	packTo:'/common.css',
//	packOrder: -99
//})
//
//fis.match('/libs/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css', {
//	packTo:'/common.css',
//	packOrder: -98
//})
//fis.match('/libs/animate/animate.css', {
//	packTo:'/common.css',
//	packOrder: -97
//})
//fis.match('/libs/hplus/css/style.css', {
//	packTo:'/common.css',
//	packOrder: -96 
//})
//fis.match('/app/css/app.css', {
//	packTo:'/common.css',
//	packOrder: -95
//})
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
fis.match('/config.js', {
    // 压缩JS
    optimizer   : fis.plugin('uglify-js', {
      compress: {
        drop_console: true // 自动去除console.log等调试信息
      }
    })
})

//压缩常用未压缩libs
fis.match('{mod,vue,vuex,jquery}.{vue,js}', {
    // 压缩JS
    optimizer   : fis.plugin('uglify-js', {
      compress: {
        drop_console: true // 自动去除console.log等调试信息
      }
    })
})
//fis.match('**.css', {
//// fis-optimizer-clean-css 插件进行压缩，已内置
//	optimizer: fis.plugin('clean-css')
//})

////启用插件 让所有文件，都使用相对路径。
//fis.hook('relative')
//.match('**', {
//	relative: true
//})
/************************************************开发模式***************************************************/
fis.media('debug')
.match('**.{vue,js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})
.match('/modules/(*)/**.{vue,js}', {
	packTo: ''
})
.match('/modules/(*)/**.css', {
	packTo: ''
})


//第三方服务器开发模式
fis.media('other-server')
.match('**.{vue,js,css,png}', {
  useHash: false, 
  useSprite: false,
  optimizer: null
})

//取消所有包合并
.match('**.{vue,js}', {
	packTo: ''
})
.match('**.css', {
	packTo: ''
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

//.match('*.png', {
//// fis-optimizer-png-compressor 插件进行压缩，已内置
//optimizer: fis.plugin('png-compressor')
//})


