/**
 * 作者：PS    
 * 日期：2016-10-09
 * App基础信息配置
 * 
 * @require /app/js/general.js
 */
$App.Info = {
	//首页页面地址
	HomeUrl:__uri("modules/demo/main.html"),
	//左侧菜单配置
	AsideMenueList:null,
	//页脚内容
	Footer:'<div class="pull-right">&copy;2016 <a href="http://www.inkey.com/" target="_blank">inkey</a></div>'
};

/**
 * 左侧菜单配置
 */
$App.Info.AsideMenueList = [{
		//自定义行样式(若不为空自动覆盖全部行样式)
//		html: '<a style="color:red"> 啊盛大速度1 </a>',
		//前置图标
		iconClass: "fa fa-home",
		//菜单关联的功能点名称(用于控制自动检测用户是否有该功能/功能集权限)
		FuncName:"asdf",
		//行名称
		name: "测试",
		//点击时跳转链接
		link: "#",
		//子菜单
		submenu: [{
			html: "",
			iconClass: "glyphicon glyphicon-yen",
			name: "测试的啊1",
			link: __uri("http://www.baidu.com"),
			submenu: ""
		}]
	}, {
		iconClass: "fa fa-home",
		name: "菜单展示_第一层",
		link: "#",
		submenu: [{
			name: "第二层",
			link: "#",
			submenu: [{
				name: "第三层",
				link: "#"
			}, {
				name: "第三层_常规列",
				link: __uri("http://www.baidu.com")
			}]
		}, {
			name: "第二层_常规列",
			link: __uri("http://www.baidu.com")
		}]
	}, {
		iconClass: "fa fa-home",
		name: "推荐Demo",
		link: "#",
		submenu: [{
			html: "",
			iconClass: "fa fa-home",
			name: "常用功能Demo",
			link: __uri("modules/demo/main.html"),
			submenu: ""
		},{
			html: "",
			iconClass: "fa fa-home",
			name: "普通列表",
			link: __uri("modules/demo/list.html"),
			submenu: ""
		},{
			html: "",
			iconClass: "fa fa-home",
			name: "树形列表",
			link: __uri("modules/demo/main.html"),
			submenu: ""
		}]
	}
];

/**
 * 应用需要检测的权限功能列表
 */
$App.FuncPermissions=[
	"asdf",
	"asdf1",
	"asdf2"
];