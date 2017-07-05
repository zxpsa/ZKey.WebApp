/*
 * app配置
 * @author PS
 * @date：2016-08-07
 * ================================
 *
 * 注:本js文件中不应写入任何新增功能代码,
 *  修改本js并不会应用到正式服中
 *
 * ================================
 * 
 */
var $App={};
var	$Config={
	// 默认环境 
	// 服务器模式自动识别,HyApp模式需要手动配置
	Env:"Dev"
};

/**
 * 开发服
 */
$Config.Dev = {
	/**
	 * 是否开启调试模式
	 */
	Debug: 0,
	/**
	 * 是否启用框架自带数据模拟
	 */
	EnableMock: true,
	/** 
	 * 当前项目名称 主要用于调试阶段 
	 * 路径中带有项目路径的兼容 通常出现在tomact Hbuilder等中
	 */
	ProjectName: "",
	/**
	 * 主接口地址
	 */
	// ApiRoot: "http://192.168.1.142:8090/api",
	ApiRoot: "http://api3.xsftest.com:88/api",
	
	/**
	 * 经营管理web地址
	 */
	OperWebRoot:'http://operation.xsftest.com:88',

	WebShopIndex:'http://api3.xsftest.com:88/shared/modules/shop/shop_index.html'
}

/**
 * 测试服
 */
$Config.Test = {
	/**
	 * 是否开启调试模式
	 */
	Debug: false,
	/**
	 * 是否启用框架自带数据模拟
	 */
	EnableMock: false,
	/**
	 * 当前项目名称 主要用于调试阶段 
	 * 路径中带有项目路径的兼容 通常出现在tomact Hbuilder等中
	 */
	ProjectName: "acti",
	/**
	 * 主接口地址
	 */
	ApiRoot: "http://api3.xsftest.com:88/api",
	
	/**
	 * 经营管理web地址
	 */
	OperWebRoot:'http://operation.xsftest.com:88',

	WebShopIndex:'http://api3.xsftest.com:88/shared/modules/shop/shop_index.html'
}
//150环境测试服
$Config.Test1 = {
	/**
	 * 是否开启调试模式
	 */
	Debug: false,
	/**
	 * 是否启用框架自带数据模拟
	 */
	EnableMock: false,
	/**
	 * 当前项目名称 主要用于调试阶段 
	 * 路径中带有项目路径的兼容 通常出现在tomact Hbuilder等中
	 */
	ProjectName: "acti",
	/**
	 * 主接口地址
	 */
	ApiRoot: "http://192.168.1.150:8003/api",
	/**
	 * 经营管理web地址
	 */
	OperWebRoot:'http://operation.xsftest.com:88',

	WebShopIndex:'http://api3.xsftest.com:88/shared/modules/shop/shop_index.html'
}
/**
 * 预发布
 */
$Config.Ready = {
	/**
	 * 是否开启调试模式
	 */
	Debug: false,
	/**
	 * 是否启用框架自带数据模拟
	 */
	EnableMock: false,
	/**
	 * 当前项目名称 主要用于调试阶段 
	 * 路径中带有项目路径的兼容 通常出现在tomact Hbuilder等中
	 */
	ProjectName: "acti",
	/**
	 * 主接口地址
	 */
	ApiRoot: "https://api3test.xsfapp.com/api",
	
	/**
	 * 经营管理web地址
	 */
	OperWebRoot:'https://oper.xsfapp.com',

	WebShopIndex:'https://api3.xsfapp.com/shared/modules/shop/shop_index.html'
}

/**
 * 正式服
 */
$Config.Formal = {
	/**
	 * 是否开启调试模式
	 */
	Debug: false,
	/**
	 * 是否启用框架自带数据模拟
	 */
	EnableMock: false,
	/**
	 * 当前项目名称 主要用于调试阶段 
	 * 路径中带有项目路径的兼容 通常出现在tomact Hbuilder等中
	 */
	ProjectName: "acti",
	/**
	 * 主接口地址
	 */
	ApiRoot: "https://api3.xsfapp.com/api",
	
	/**
	 * 经营管理web地址
	 */
	OperWebRoot:'https://oper.xsfapp.com',

	WebShopIndex:'https://api3.xsfapp.com/shared/modules/shop/shop_index.html'
}

var url=window.location.href;
if(url.indexOf("//d.xsfapp.com")>-1){
	$Config.Env="Formal";
	$Config.Formal.ApiRoot="https://d.xsfapp.com/api";
}else if(url.indexOf("//o.xsfapp.com")>-1){
	$Config.Env="Formal";
	$Config.Formal.ProjectName="";
}else if(url.indexOf("//s.xsfapp.com")>-1){
	$Config.Env="Formal";
}

$App=$Config[$Config.Env];