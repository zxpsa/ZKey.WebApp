/**
 * 作者：PS    
 * 日期：2016-08-12
 * ================================
 *
 *  本js为全局控制相关代码,若无必要,请不要改动或者新增该js中的内容
 * 
 * ================================
 */
/************************************************App主控制代码*********************************************/
if (typeof $App == "undefined") {
	window.$App = {
		Info: {}
	}
} else {
	if (typeof $App.Info == "undefined") {
		window.$App.Info = {};
	}
}

/**
 * App单页路由对象(由VueRouter实现)
 */
window.$App_SPA_Router = {
	currentRoute: {
		params: {},
		query: {}
	}
};

/**
 * 数据中心
 */
$App.dataCenter = {
	/**
	 * 字典
	 */
	Dictionary: {}
};
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = false;

/**
 * 获取用户Token
 * 作者：PS    
 * 日期：2016-12-15
 */
$App.getUserToken = function () {
	var token = $G.getUrlParam("__token");
	if (token) {
		var doc = document.querySelector("meta[name='token']");
		if (doc) {
			token = doc.getAttribute("content");
		}
	}
	if (!token) {
		token = "";
	}
	return token;
};


/**
 * 获取用户UserId
 * 作者：PS    
 * 日期：2016-12-15
 */
$App.getUserId = function () {
	var val = $G.getUrlParam("__userid");
	if (val) {
		var doc = document.querySelector("meta[name='userid']");
		if (doc) {
			val = doc.getAttribute("content");
		}
	}
	if (!val) {
		val = "-1";
	}
	return val;
};

/**
 * app当前登陆的用户信息
 */
$App._userInfo = (function () {
	var token = $App.getUserToken();
	var userId = $App.getUserId();
	//解密后的UserId(兼容经营管理有效 3.0.5) 后期去除
	var deUserId = $G.getUrlParam("__deuserid");
	var session = $G.Session();
	var info = session.get("XSF_UserInfo");
	if (info) {
		if (token) {
			info.token = token;
		}
		if (userId != "-1") {
			info.userId = userId;
		}
		if (deUserId) {
			info.deUserId = deUserId;
		}
	} else {
		info = {
			userName: null,
			userAccount: null,
			token: token,
			userId: userId,
			userHeadUrl: null,
			psId: null,
			//店铺名称
			psName: null,
			psHeadUrl: null,
			//			视频认证状态：0-未提交 1-审核中 2-成功 9-失败
			videoStatus: null,
			//			实名认证状态：1-未认证 2-成功 3-失败 4-认证中
			realNameStatus: null,
			//			实体店是否已认证：0-否 1-是
			storeAuthStatus: null,
			deUserId: deUserId,
			isInWebView: token ? true : false
		};

		session.set("XSF_UserInfo", info);
	}
	//通过是否一开始就存在token 判断是否在私有App内嵌游览器中
	$App.Info.isInWebView = info.isInWebView;
	return info;
})();

/**
 * 用户信息对象
 */
$App.UserInfo = function () {
	$App._userInfo.update = function (info) {
		$App._userInfo = $G.objSetDefaultVal(info, $App._userInfo);
		$G.Session().set("XSF_UserInfo", $App._userInfo);
	}
	return $App._userInfo;
}

/**
 * 视图对象
 */
$App.screen = {
	/**
	 * 是否是大于等于手机屏幕
	 * @param {Object} val 屏幕大小
	 */
	lessXS: function (val) {
		if (val < 768) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 是否是大于等于平板屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualSM: function (val) {
		if (val >= 768) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 是否是大于等于桌面小屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualMD: function (val) {
		if (val >= 992) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 是否是大于等于桌面正常屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualLG: function (val) {
		if (val >= 1199) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 获取当前窗口宽度
	 */
	getNowDOMWidth: function () {
		return $(document).width();
	}
};

/**
 * 应用全局编号启始数
 * 注:该编号仅在对同一个Html唯一
 */
$App.code = 1;

/**
 * 获取新编号
 */
$App.getCode = function () {
	$App.code++;
	return $App.code;
};

/**
 * App准备完成状态
 */
$App.readyState = false;
/**
 * 2017-04-14 18:46:57 
 * @author PS
 * 
 * app准备完成执行方法
 */
$App.ready = function (_func) {
	if (document.all) {
		window.attachEvent('onload', readyFunc);
	} else {
		window.addEventListener('load', readyFunc, false);
	}
	function readyFunc() {
		//app已准备完成 直接执行
		if ($App.readyState) {
			_func();
		} else {
			//未准备完成添加到观察者列表中等待执行
			$Observer.addObserver("app-ready", _func);
		}
	}
};
/**
 * 构造实例
 */
$App.ViewModel = function (vm) {
	$App.ready(function () {
		new Vue(vm);
	});
};

/**
 * 当前生成的弹出层栈
 * 注:主要用于缓存弹出层,实现复用
 */
$App.LayerStack = [];

/**
 * 创建模态窗
 * @return {Object} component组件视图模型构造参数
 */
$App.Modal = function (vmOptions) {

	//	if (window.top!=window.self) {
	//		return window.top.$App.Modal(vmOptions);
	//	}
	if (isEmpty(vmOptions.methods)) {
		vmOptions.methods = {};
	}

	/**
	 * 显示
	 * @param {Object} options 显示选项
	 * options:--------------------------------
	 * backdrop:"true 点击背景关闭模态窗"
	 * keyboard:"true 键盘上的 esc 键被按下时关闭模态框。"
	 * show:"true 模态框初始化之后就立即显示出来。"
	 * 
	 */
	vmOptions.methods.$_Show = function (options) {
		if (!options) {
			options = {
				backdrop: 'static'
			};
		}
		options.show = true;
		var modalView = this.$el.querySelector(".modal");
		if (!modalView) {
			modalView = this.$el;
		}
		//		modalView.setAttribute("tabindex",)
		$(modalView).modal(options);
	}

	/**
	 * 隐藏
	 */
	vmOptions.methods.$_Hide = function () {
		var modalView = this.$el.querySelector(".modal");
		if (!modalView) {
			modalView = this.$el;
		}
		$(modalView).modal('hide');
	}

	var component = Vue.extend(vmOptions);
	var vm = new component().$mount();
	//若页面没有模态弹出层容器则创建容器
	if (docId('curLayer') == null) {
		$("body").append('<div id="curLayer" style="displa:none;"></div>');
	}
	docId("curLayer").appendChild(vm.$el);
	$App.LayerStack.push(vm);
	if ($App.LayerStack.length > 5) {
		//栈中最多缓存5个窗口
		$App.LayerStack.splice(0, 1);
	}
	return vm
};

/**
 * 自定义alert方法
 * @param {Object} content 文本内容
 * @param {Object} option 选项  
 * @param {Object} collback
 * 
 * option: icon:1[成功],2[错误],3[警告]
 */
$App.alert = function (content, option, collback) {
	//参数兼容
	if (typeof option == "function") {
		collback = option;
		options = {};
	}

	var _collback = function (index) {
		var result = true;
		if (collback) {
			result = collback(index);
		}
		if (result != false) {
			$App.closeLayer(index);
		}
	}
	var opt = {
		content: content,
		btn: '确定',
		className: 'zk-layer',
		yes: _collback
	};
	//给选项设置默认值
	option = $G.objSetDefaultVal(option, opt);
	return layer.open(option);
};

/**
 * 自定义confirm
 * @param {string} content
 * @param {Object} options
 * @param {Function} yes 确定按钮回调
 * @param {Function} cancel 取消按钮回调
 * 注:
 * $App.confirm(content,yes,cancel)
 * $App.confirm(content,options,yes,cancel)
 */
$App.confirm = function (content, options, yes, cancel) {
	//参数兼容
	if (typeof options == "function") {
		cancel = yes;
		yes = options;
		options = {};
	}


	var _yes = yes;
	yes = function (index) {
		if (_yes) {
			var result = _yes(index);
			//返回结果不为false时自动关闭弹窗
			if (result != false) {
				$App.closeLayer(index);
			}
		} else {
			$App.closeLayer(index);
		}
	}
	var defOpt = {
		content: content,
		shadeClose: false,
		className: 'zk-layer',
		btn: ['确定', '取消'],
		yes: yes,
		no: cancel
	}
	options = $G.objSetDefaultVal(options, defOpt);
	return layer.open(options);
};

/**
 * 自定义消息提示
 */
$App.msg = function (content, option) {
	var opt = {
		content: content,
		skin: 'msg',
		time: 2 //2秒后自动关闭
	};
	//给选项设置默认值
	option = $G.objSetDefaultVal(option, opt);
	return layer.open(option);
}

/**
 * 加载窗
 * @param {Object} opt 
 * 显示时间,遮罩层透明度,点击遮罩层是否关闭
 * {time: 10秒,shade: 0.3,shadeClose: true}
 */
$App.loading = function (content, option) {
	var opt = {
		type: 2,
		content: content,
		shadeClose: false,
		time: 20, //2秒后自动关闭,
	};
	//给选项设置默认值
	option = $G.objSetDefaultVal(option, opt);
	return layer.open(option);
};

/**
 * 打开层
 */
//$App.openLayer=layer.open;

/**
 * 关闭弹出层【最顶层】
 */
$App.closeLayer = layer.close;

$App.closeLoding = layer.close;

/**
 * 时间or日期控件初始化
 * @param {Object} opt
 */
$App.dateControlInit = function (opt) {
	var defOpt = {
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss'
	};

	opt = $G.objSetDefaultVal(opt, defOpt);
	if (typeof laydate == "undefined") {
		throw "本方法依赖 /libs/layer/laydate/laydate.js 请在声明其依赖";
	}
	laydate(opt);
	//	return laydate(opt);
}

/**
 * 比对NativeApp版本 是否小于目标版本
 * 2017-04-14 14:19:26 
 * @author PS
 * version: 版本号
 */
$App.lessAppVer = function (version) {
	if (!version) {
		$log("$App.lessAppVer:版本号不存在!");
		return true;
	}
	var array = version.split(".");
	for (var index = 0; index < array.length; index++) {
		if (array[index].length < 2) {
			array[index] = "0" + array[index];
		}
	}
	version = array.join("");
	version = parseInt(version);
	//不存在版本号的版本
	if (!$App.Info.appVersionNum) {
		return true;
	} else {
		if (version > $App.Info.appVersionNum) {
			return true;
		} else {
			return false;
		}
	}
};

/**
 * 图片查看器
 * @param {Object} id
 * @param {Object} opt
 */
$App.ImgViewer = function (id, opt) {
	var viewer = new Viewer(document.getElementById(id), opt);
	//	return viewer;
}

/**
 * 导航到一个新页面
 * @param {Object|string} val
 * val可为绝对路径或者相对路径
 * val为对象时: 
 *	path: '...',
 *	// params 和 query 可选
 *	params: { ... },非链接中的参数
 *	query: { ... }
 * 	goBeforeCallback:function 跳转前回调
 *  isTopGo:bool 是否是最顶层跳转
 */
$App.go = function (val) {
	var type = typeof val;
	if (type == 'string'||type == 'number') {
		val = {
			path: val.toString()
		};
	}

	if (val.goBeforeCallback) {
		val.goBeforeCallback();
	}

	//刷新当前页面
	if (val.path == 0) {
		window.location.href = window.location.href;
		window.location.reload(true);
		return true;
	}


	var isSPA = false;
	//无.html结尾 为动态页面多半为单页
	if (val.path.indexOf(".html") < 0) {
		isSPA = true;
	}
	//没有http or xsfapp前缀则确定为单页 否则为多页(项目中应不存在单页以外的动态页若存在也应使用绝对路径)
	if (val.path.indexOf("://") > 0) {
		isSPA = false;
	}
	//将将要跳转的地址压入栈中
	var session = $G.Session();
	var historyStack = session.get("zk_url_stack");
	if (!historyStack) {
		historyStack = [];
	}
	//检测是否跳转到到栈中记录的历史地址
	if (val.gotoHistory) {
		var index = -1;
		for (var i = 0, len = historyStack.length; i < len; i++) {
			if (item.path == val.path) {
				index = i;
				break;
			}
		}
		if (index != -1) {
			//删掉多余的url记录
			historyStack.splice(index);
		}
	}
	historyStack.push(val);
	session.set("zk_url_stack", historyStack);
	
	//单页时处理
	if (window.$App_SPA_Router && isSPA) {
		//为负数时为 回退步数 或者前进步数
		if (typeof val.path == 'number') {
			$App_SPA_Router.go(val);
		} else {
			$App_SPA_Router.push(val);
		}
		return true;
	}

	//多页路由跳转
	//为相对路径时
	if (val.path.indexOf('/') == 0) {
		//基于根目录的路径时 修正为绝对路径 兼容file://协议
		val.path = $App.RootUrl + val.path;
	}
	//url链接携带参数
	if (!isEmpty(val.query)) {
		val.path = val.path + "?" + $G.toQueryString(val.query);
	}
	//非url连接携带参数
	if (!isEmpty(val.params)) {
		//参数存入session中
		$G.Session().set("NowPageParams", val.params);
	} else {
		//去除session中参数 保持对应的session中参数和页面保持一致
		$G.Session().remove("NowPageParams");
	}
	if (val.isTopGo) {
		window.top.location.href = val.path;
	} else {
		window.location.href = val.path;
	}
};

/**
 * 获取当前页面参数
 * @param {Object} key
 */
$App.getPageParam = function (key) {
	//优先从Url中获取 不存在则尝试在单页路由中获取
	var val = $G.getUrlParam(key);
	//	从session中尝试获取参数
	var nowPageParams = $G.Session().get("NowPageParams");
	if (nowPageParams) {
		if (nowPageParams[key]) {
			val = nowPageParams[key];
		}
	}
	if (!val) {
		if ($App_SPA_Router) {
			var nowPageRoute = $App_SPA_Router.currentRoute;
			val = nowPageRoute.params[key];
			if (!val) {
				val = nowPageRoute.query[key];
				if (!val) {
					return null;
				}
			}
		} else {

		}
	}
	return val;
};

(function () {

	/**
	 * 字数限制 指令
	 * 注:用于限制字数 超过字数超出部分自动换为...
	 */
	Vue.directive('zk-limit', {
		inserted: zkLimit,
		// 当绑定元素插入到 DOM 中。
		update: zkLimit
	});

	function zkLimit(el, binding, vnode, oldVnode) {
		if (typeof binding.value == "number") {
			if (el.innerHTML.length > binding.value) {
				el.innerHTML = el.innerHTML.substr(0, binding.value) + "...";
			}
		}
	}

	var $document = $(document);

	/**
	 * View初始化
	 */
	function pageInit() {

	}

	/**
	 * Dom渲染完毕后执行
	 */
	$document.ready(function () {
		pageInit();
	});

	var loca = document.location;
	var rootUrl = loca.protocol + "//" + loca.host;

	/**
	 * 初始化设置app资源根路径
	 */
	if ($App.ProjectName != undefined && $App.ProjectName != null && $App.ProjectName != "" && $App.EnableMock == false) {
		rootUrl = rootUrl + "/" + $App.ProjectName;
	}
	/**
	 * 调试启用框架自带数据模拟模式
	 */
	if ($App.EnableMock) {
		$App.ApiRoot = rootUrl + "/api";
	}
	//主动设置后优先用设置的
	if (!$App.RootUrl) {
		$App.RootUrl = rootUrl;
	}

	// 通知中心实例化
	window.$Observer = new ZKObserver();
	// HyApp实例化
	window.$HyApp = new HyApp();
	window.$ZKCache = new ZKCache();
	//App信息初始化
	ZKAppInfo(function (info) {
		$App.Info = info;
		// 网路请求插件实例化
		new ZKHttp($App.UserInfo(), info);
		$App.readyState = true;
		// 发布已App已准备完成
		$Observer.publish("app-ready");
		//存在H5版本号标志则进行检测
		if($App.Info&&$App.Info.h5Version){
			$ZKCache.checkH5Version($App.Info.h5Version);
		};
	});

	//3.0前端项目未独立部署时使用 独立部署时去除
	//	$App.RootUrl = $App.RootUrl + "/statics";
})();