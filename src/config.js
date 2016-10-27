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
	Env:"Dev"
};

/**
 * 开发服
 */
$Config.Dev = {
	/**
	 * 是否开启调试模式
	 */
	Debug: true,
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
	ApiRoot: "http://10.10.7.89:10000/api"
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
	ProjectName: "",
	/**
	 * 主接口地址
	 */
	ApiRoot: "http://10.10.7.89:10000/api"
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
	ProjectName: "",
	/**
	 * 主接口地址
	 */
	ApiRoot: "http://10.10.7.89:10000/api"
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
	ProjectName: "",
	/**
	 * 主接口地址
	 */
	ApiRoot: "http://10.10.7.89:10000/api"
}
$App=$Config[$Config.Env];