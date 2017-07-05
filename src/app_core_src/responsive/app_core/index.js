/**
 * 作者：PS    
 * 日期：2016-08-12
 * ================================
 *
 *  本js为全局控制相关代码,若无必要,请不要改动或者新增该js中的内容
 * 
 * ================================
 * 
 * @require /app_core/libs/mod/mod.js
 * @require /app_core/libs/jquery/jquery.min.js
 * @require /app_core/libs/bootstrap/js/bootstrap.min.js
 * @require /app_core/libs/layer/layer.min.js
 * @require /app_core/libs/vue/vue.js
 * @require /app_core/js/general.js
 */
/************************************************App主控制代码*********************************************/
if (typeof $App=="undefined") {
	window.$App={
		Info:{
			
		}
	}
}else{
	if (typeof $App.Info=="undefined") {
		window.$App.Info={};
	}
}
/**
 * 数据中心
 */
$App.dataCenter={
	/**
	 * 字典
	 */
	Dictionary:{}
}
// 务必在加载 Vue 之后，立即同步设置以下内容
Vue.config.devtools = false;
/**
 * 当前页记录的登陆的用户信息
 */
$App.Info.userInfo = {
	userName:"",
	userAccount:"",
	token:"",
	customerPhoto:"",
	userTitle:"",
	/**
	 * 用户拥有的权限状态
	 */
	funcPermission:{},
	/**
	 * 是否记录有用户信息标记
	 */
	hasValTag:false
};

/**
 * app当前登陆的用户信息对象构造函数
 */
$App.UserInfo=function(){
	if ($App.Info.userInfo.hasValTag) {
		return $App.Info.userInfo;
	}else{
		return window.top.$App.Info.userInfo;
	}
};


/**
 * 视图对象
 */
$App.screen={
	/**
	 * 是否是大于等于手机屏幕
	 * @param {Object} val 屏幕大小
	 */
	lessXS:function(val){
		if (val<768) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 是否是大于等于平板屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualSM:function(val){
		if (val>=768) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 是否是大于等于桌面小屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualMD:function(val){
		if (val>=992) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 是否是大于等于桌面正常屏幕
	 * @param {Object} val 屏幕大小
	 */
	greaterEqualLG:function(val){
		if (val>=1199) {
			return true;
		}else{
			return false;
		}
	},
	/**
	 * 获取当前窗口宽度
	 */
	getNowDOMWidth:function(){
		return $(document).width();
	},
	/**
	 * 显示或隐藏侧边菜单
	 */
	clickNavLeftBtn:function(){
		var $dom=$("#ik_aside_menue");
		if ($dom.hasClass("ik-aside-menue-show")) {
			$dom.removeClass("ik-aside-menue-show");
		}else{
			$dom.addClass("ik-aside-menue-show");
			$dom.css("height","300px");
		}
	}
};


/**
 * 应用全局编号启始数
 * 注:该编号仅在对同一个Html唯一
 */
$App.code=1;

/**
 * 获取新编号
 */
$App.getCode = function(){
	$App.code++;
	return $App.code;
};

/**
 * 构造健在
 */
$App.ViewModel=function(vm){
	return new Vue(vm);
};

/**
 * 当前生成的弹出层栈
 * 注:主要用于缓存弹出层,实现复用
 */
$App.LayerStack=[];

/**
 * 创建模态窗
 * @return {Object} component组件视图模型构造参数
 */
$App.Modal=function(vmOptions){
	
//	if (window.top!=window.self) {
//		return window.top.$App.Modal(vmOptions);
//	}
	if (isEmpty(vmOptions.methods)) {
		vmOptions.methods={};
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
	vmOptions.methods.$_Show=function(options){
		if (!options) {
			options={
				backdrop:'static'
			};
		}
		options.show=true;
		var modalView=this.$el.querySelector(".modal");
		if (!modalView) {
			modalView=this.$el;
		}
//		modalView.setAttribute("tabindex",)
		$(modalView).modal(options);
	}
		
	/**
	 * 隐藏
	 */
	vmOptions.methods.$_Hide=function(){
		var modalView=this.$el.querySelector(".modal");
		if (!modalView) {
			modalView=this.$el;
		}
		$(modalView).modal('hide');
	}
		
	var component = Vue.extend(vmOptions);
	var vm = new component().$mount();
	//若页面没有模态弹出层容器则创建容器
	if (docId('curLayer')==null) {
		$("body").append('<div id="curLayer" style="displa:none;"></div>');
	}
	docId("curLayer").appendChild(vm.$el);
	$App.LayerStack.push(vm);
	if ($App.LayerStack.length>5) {
		//栈中最多缓存5个窗口
		$App.LayerStack.splice(0,1);
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
$App.alert=function(content,option,collback){
	var opt={
		skin: 'layui-layer-molv'
	};
	//给选项设置默认值
	option=$G.objSetDefaultVal(option,opt);
	return layer.alert(content,option,collback);
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
$App.confirm=function(content,options,yes,cancel){
	//参数兼容
	if (typeof options=="function") {
		cancel=yes;
		yes=options;
		options={};
	}
	var defOpt={
		skin: 'layui-layer-molv',
		//是否自动关闭
		autoHide:true
	}
	options=$G.objSetDefaultVal(options,defOpt);
	if (options.autoHide) {
		var _yes=yes;
		yes=function(index){
			if (_yes) {
				_yes(index);
			}
			$App.closeLayer(index);
		}
	}
	return layer.confirm(content,options,yes,cancel);
};

/**
 * 自定义消息提示
 */
$App.msg=layer.msg;

/**
 * 加载窗
 * @param {Object} opt 
 * 显示时间,遮罩层透明度,点击遮罩层是否关闭
 * {time: 10 * 1000,shade: 0.3,shadeClose: true}
 */
$App.loading=function(opt){
	var defOpt={
		time: 30 * 1000,
		shade: 0.3
	}
	//给选项设置默认值
	opt=$G.objSetDefaultVal(opt,defOpt);
//	layer.msg('加载中', {icon: 16});
	return layer.load(1,opt);
};

/**
 * 打开层
 */
$App.openLayer=layer.open;

/**
 * 关闭弹出层【最顶层】
 */
$App.closeLayer=layer.close;

/**
 * 关闭弹出层【当前层】
 */
$App.closeLoding=layer.close;

/**
 * 时间or日期控件初始化
 * @param {Object} opt
 */
$App.dateControlInit = function(opt) {
	var defOpt = {
		istime: true,
		format: 'YYYY-MM-DD hh:mm:ss'
	};
	
	opt=$G.objSetDefaultVal(opt,defOpt);
	if (typeof laydate=="undefined") {
		throw  "本方法依赖 /libs/layer/laydate/laydate.js 请在声明其依赖";
	}
	laydate(opt);
//	return laydate(opt);
}

/**
 * 图片查看器
 * @param {Object} id
 * @param {Object} opt
 */
$App.ImgViewer = function(id,opt){
	var viewer = new Viewer(document.getElementById(id),opt);
	this.refresh=function(){
		viewer.update();
	};
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
 *  isTopGo:bool 是否是最顶层跳转
 */
$App.go=function(val){
	if (typeof val == 'string'){
		val={
			path:val
		};
	}
	
	//为相对路径时
	if (val.path.indexOf('/')==0) {
		//基于根目录的路径时 修正为绝对路径 兼容file://协议
		val.path=$App.RootUrl+val.path;
	}
	//url链接携带参数
	if (!isEmpty(val.query)) {
		val.path=val.path+"?"+$.param(val.query);
	}
	//非url连接携带参数
	if (!isEmpty(val.params)) {
		//参数存入session中
		$G.Session().set("NowPageParams",val.params);
	}else{
		//去除session中参数 保持对应的session中参数和页面保持一致
		$G.Session().remove("NowPageParams");
	}
	if (val.isTopGo) {
		window.top.location.href=val.path;	
	}else{
		window.location.href=val.path;
	}
};

/**
 * 框架UI控制
 */
$UI={};

/**
 * 删除View容器
 * @param {Object} _element  触发事件的dom节点
 */
$UI.removeZKView = function(_element) {
	var zkView = $UI.upQueryZKViewNode(_element);
	if(zkView) {
		var _parentElement = zkView.parentNode;	
		_parentElement.removeChild(zkView);

	}
};

/**
 * 向上找第一个ZKView节点
 * @param {Object} _element 起始节点
 */
$UI.upQueryZKViewNode = function(dom){
	if (dom.className.indexOf("zk-view")>=0) {
		return dom;
	}else{
		var _parentElement = dom.parentNode;
		if(_parentElement) {
			return $UI.upQueryZKViewNode(_parentElement);
		}else{
			return false;
		}
	}

};
/**
 * 折叠zkView容器
 * @param {Object} _element 触发事件的dom节点
 */
$UI.foldZKView = function(_element){
	var zkView = $UI.upQueryZKViewNode(_element);
	if (zkView) {
		var panel=zkView.querySelector(".panel");
		var heading=zkView.querySelector(".panel-heading");
		var headingHeight=heading.offsetHeight+2+"px";
		if (panel.style.height==headingHeight) {
			panel.style.height="";
		}else{
			panel.style.height=headingHeight;
		}
	}
};

(function(){
	
$.ajaxSetup({
	contentType:"application/json;charset=utf-8",
	processData:false
});	
window.$App_httpStack={};
/**
 * ajax参数设置默认值
 */
$.ajaxPrefilter(function(options, originalOptions, jqXHR){
	if (options.commonDel==false) {//是否设置禁用公共 处理
		return false;
	}
	//发起请求时显示加载界面
	var loading=null;
	var timeIndex;
	//若已存在相同域名请求则放弃已发起请求
	if($App_httpStack[options.url]){
		//放弃之前请求
		$App_httpStack[options.url].abort();
	}
	//记录当前请求对象
	$App_httpStack[options.url]=jqXHR;

	if (options.loading!=false) {
		timeIndex=setTimeout(function(){
			loading=$App.loading();
		},200);
	}
	
	//自定义传输数据的格式
	if (typeof options.data=="object"&&options.processData==false) {
		options.data = JSON.stringify(options.data,handlePostSwitchData);
	}
	
	var complete=options.complete;
	options.complete=function(xhr,status){
		//清除计时器
		clearTimeout(timeIndex);
		delete $App_httpStack[options.url];
		if (loading!=null) {
			$App.closeLoding(loading);
		}
		if (!isEmpty(complete)) {
			complete(xhr,status);	
		}
	}
	if (options.useSuccessDel!=false) {
		var success=options.success;
		options.success=function(result, status, xhr){
			if (result.status!=undefined) {
				if (result.status==1||result.status==2) {
					$App.msg(result.msg);
					return false;
				}else if(result.status==-1){
					$App.msg("服务器异常，请联系管理员！");
					return false;
				}else if(result.status==3){
					$App.msg("无权限或者未登录！请重新登陆");
					setTimeout(function(){
						$App.go({
							path:$App.RootUrl.replace("/statics",""),
							isTopGo:true
						});
					},1000); 
					return false;
				}
			}else{
				if (result.indexOf("请登录")>=0) {
					$App.msg("无权限或者未登录！请重新登陆");
					setTimeout(function(){
						$App.go({
							path:$App.RootUrl.replace("/statics",""),
							isTopGo:true
						});
					},1000);
					return false;
				}
			}
//			if (result.status!=undefined&&result.status==1) {
//				$App.msg(result.Desc);
//				return false;
//			}
			
			if (success!=undefined) {
				//执行自定义样式
				success(result, status, xhr);
			}
		};	
	}
	
	var error=options.error;
	options.error=function(XMLHttpRequest, textStatus, errorThrown){
		httpErrorCommonDel(XMLHttpRequest, textStatus, errorThrown);
		if (error!=undefined) {
			//执行自定义样式
			error(XMLHttpRequest, textStatus, errorThrown);
		}
	};
});

function httpErrorCommonDel(XMLHttpRequest, textStatus, errorThrown) {
	var status = XMLHttpRequest.status;
	if (status >= 401 && status < 404) {
		$App.msg("未登录！请重新登陆");
		
		setTimeout(function(){
			$App.go({
				path:$App.RootUrl.replace("/statics","") + '/login.html',
				isTopGo:true
			});
		},1000);
	} else if (status == 500) {
		$App.msg("服务器异常,请联系管理员！");
	} else if (status == 404) {
		$App.msg("服务器异常,请联系管理员！");
    } else if (status == 200) {
        if (XMLHttpRequest.responseURL != "") {
            window.top.location.href = XMLHttpRequest.responseURL
		} else {
            $App.msg("解析数据失败！");
        }
    }else{
    	if (textStatus=="timeout") {
	    	$App.msg("网络超时！请稍后再试");
	    	return;
	    }
	    if (textStatus=="parsererror") {
	    	//错误或者解析异常
	    	$App.msg("网络或服务器异常，请稍候再试！");
	    	return;
	    }
	    if(textStatus=="abort"){
	    	//强行终止
	    }else{
	    	$App.msg("错误请求");
	    }
	    
    }
}

/**
 * 处理每一项提交的数据的
 * @param {Object} key
 * @param {Object} value
 */
function handlePostSwitchData(key,value){
	if (value==="") {
		value=null;
	}
	return value; 
}

//转化为时间字符串
var reg=new RegExp("T|(\.\d*$)", "g");
Vue.filter('dateTimeStr', function (value) {
  return value.replace(reg," ");
})
	
//Vue.directive('zk-va', {
//	update :function(el,binding,vnode){
//		var vm=vnode.context;
//		console.log(binding);
//		if (!vm.zk_va) {
//			vm.zk_va={
//				dataa:{
//					failed:function(el,binding,validateType){
//						console.log(validateType);
//					},
//					sucess:function(el,binding,validateType){
//						
//					}
//				}
//			};
//		}
//			
//		if (binding.expression.indexOf('num')>=0) {
//			var reg=new RegExp("[^0-9|\.]");
//			if (!vm.zk_va[binding.arg]) {
//				vm.zk_va[binding.arg]={};
//			}
//			if(reg.test(el.value)){
//				vm.zk_va[binding.arg].val=true;
//				vm.zk_va[binding.arg].sucess(el,binding,"num");
//			}else{
//				vm.zk_va[binding.arg].val=false;
//				vm.zk_va[binding.arg].failed(el,binding,"num");
//			}
//		}
//	}
//});
	
var $document=$(document);

/**
 * View初始化
 */
function pageInit(){
	//关闭zkView
	$('.close-link').on('click',function () {
	    $UI.removeZKView(this);
	});
	//折叠zkView
	$('.fold-zkview').on('click',function () {
	    $UI.foldZKView(this);
	});
	//输入框仅输入数字校验
//	$("input[zk-input=num]").on('keyup',function(){
//		this.value=this.value.replace(/[^0-9|\.]/g,'')
//	});
//	$("input[zk-input=num]").on('afterpaste',function(){
//		this.value=this.value.replace(/[^0-9|\.]/g,'')
//	});
}

/**
 * Dom渲染完毕后执行
 */
$document.ready(function(){
	pageInit();
});

var loca=document.location;
var rootUrl=loca.protocol+"//"+loca.host;

/**
 * 初始化设置app资源根路径
 */
if ($App.ProjectName!=undefined&&$App.ProjectName!=null&&$App.ProjectName!="") {
	rootUrl=rootUrl+"/"+$App.ProjectName; 
}
/**
 * 调试启用框架自带数据模拟模式
 */
if ($App.EnableMock) {
	$App.ApiRoot = rootUrl+"/web";
}
$App.RootUrl=rootUrl;

//3.0前端项目未独立部署时使用 独立部署时去除
$App.RootUrl=$App.RootUrl+"/statics";
})();



