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

fis.match('**.css', {
    postprocessor: fis.plugin('px2rem',{
        baseDpr: 1,             // base device pixel ratio (default: 2)
        remVersion: true,       // whether to generate rem version (default: true)
        remUnit: 37,            // rem unit value (default: 75)
        remPrecision: 6         // rem precision (default: 6)
    })
 });

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
fis.match('/{modules}/**.{vue,js}', {
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


//fis.match('**.css', {
//// fis-optimizer-clean-css 插件进行压缩，已内置
//	optimizer: fis.plugin('clean-css')
//})

//启用插件 让所有文件，都使用相对路径。
fis.hook('relative')
.match('**', {
	relative: true
})
/************************************************开发模式***************************************************/
fis.media('debug')
.match('**.{vue,js,css,png}', {
  useSameNameRequire:true,
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
	        to: '../shared'
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
	        to: '../shared'
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
	        to: '../shared'
	    })
    ]
})

//.match('*.png', {
//// fis-optimizer-png-compressor 插件进行压缩，已内置
//optimizer: fis.plugin('png-compressor')
//})


