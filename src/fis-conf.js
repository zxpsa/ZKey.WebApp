var ignoreList=[
	'*.bak',
	'**.bat',
	'**.md',
	'node_modules/**',
	'fis-conf.js'
];
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

//加载js css组件 (开发时使用)
fis.match('::packager', {
	postpackager: [fis.plugin('loadrequires')]
})

//添加查询字符串(保证发布缓存刷新)
fis.match('**.{vue,js,css,png,ico,jpg,mp4,json,html}', {
    query: '?_t=' + fis.get('nowDateTime')
})
//px to rem
//以37为基准点进行转换
fis.match('**.css', {
    postprocessor: fis.plugin('px2rem',{
        baseDpr: 1,             // base device pixel ratio (default: 2)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 37.5,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
    })
   });

/************************************************模块化包装js***************************************************/
//加载模块化解析插件
fis.hook('commonjs')

//开启自动模块化包装
fis.match('/**.js', {
	isMod: true
})
///**_routes.js,
//避免公共js被模块化包装失去自执行能力
fis.match('{/**/module_ctrl.js,/app_core/**,/libs/**,/config_info.js,/config.js}', {
	isMod: false
})
/************************************************压缩合并代码***************************************************/
//按大模块进行合并
fis.match('/modules/(*)/**.{vue,js}', {
	packTo: '/modules/$1/$1.js'
})
fis.match('/modules/(*)/**.css', {
	packTo: '/modules/$1/$1.css'
})
//合并路由
fis.match('/**_routes.{vue,js}', {
	packTo: '/app_index.js'
})
//合并app主控方法
fis.match('/common/js/app.{vue,js}', {
	packTo: '/app_index.js'
})

//压缩业务功能和公共部分JS
fis.match('/{modules}/**.{vue,js}', {
    // 压缩JS
    optimizer   : fis.plugin('uglify-js', {
      compress: {
        drop_console: true // 自动去除console.log等调试信息
      }
    })
})

//压缩和处理css
fis.match('**.css', {
// fis-optimizer-clean-css 插件进行压缩，已内置
	optimizer: fis.plugin('clean-css')
})

//启用插件 让所有文件，都使用相对路径。
fis.hook('relative')
.match('**', {
	relative: true
})
/************************************************开发模式***************************************************/
fis.media('debug')
.set('project.ignore', ignoreList)
.match('**.{vue,js,css,png}', {
  useSameNameRequire:true,
  useHash: false, 
  useSprite: false,
  optimizer: null
})
//开发模式load插件与相对路径插件冲突
//故关闭
.match('**', {
	relative: false
})
//关闭合并
.match('/modules/(*)/**.{vue,js}', {
	packTo: ''
})
.match('/modules/(*)/**.css', {
	packTo: ''
})
.match('/modules/**module_routes.{vue,js}', {
	packTo: '/app_index.js'
})

/************************************************测试模式***************************************************/
ignoreList.push('/mock/**');
fis.media("test")
.set('project.ignore', ignoreList)
.match('**.{vue,js,css,png}', {
  useSameNameRequire:true,
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
.match('**', {
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
.set('project.ignore',ignoreList)

//加载js css组件 并优化
.match('::packager', { 
	postpackager: fis.plugin('loader', {
		resourceType : "mod"
	})
})
//设置所有文件产出位置
.match('**', {
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


