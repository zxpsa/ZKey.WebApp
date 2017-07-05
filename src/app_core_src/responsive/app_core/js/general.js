/**
 * 常用类
 * @author 裴胜 zxpsa@126.com
 * 时间:2014-9-19下午1:16:00
 * V1.201
 * 修改:1.2015年07月18日 增加获取(标准格式)当前时间的方法
 * 新增Storage
 * 修改:1.2016年09月02日 Storage
 */

/**
 * 拓展--检测空方法
 * 兼容IE6,7,8,9
 * @param {array} param_name 待判断参数
 */
var isEmpty = function(obj) {
	var result;
	if(obj == undefined || obj == null || typeof(obj) == 'undefined' || obj === '') {
		result = true;
	} else if(typeof(obj) == 'string') {
		obj = obj.trim();
		if(obj == '') { //为空
			result = true;
		} else { //不为空
			obj = obj.toLowerCase();
			if(obj == 'null' || obj == 'undefined') {
				result = true;
			}
		}
	} else {
		result = false;
	}
	return result;
};

/**
 * 清除两边的空格
 */
String.prototype.trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 拓展--替换所有
 * @param {RegExp} reallyDo 旧内容
 * @param {Object} replaceWith 新内容
 * @param {Boolean} ignoreCase 是否忽略大小写
 */
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
	if(!RegExp.prototype.isPrototypeOf(reallyDo)) {
		return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
	} else {
		return this.replace(reallyDo, replaceWith);
	}
};

/**
 * 拓展--判断是否为数组方法
 * 兼容IE6,7,8,9
 * @param {Object} arr 待判断参数
 */
var isArray = function(arr) {
	if(arr instanceof Array) {
		return true;
	} else {
		return false;
	}
}

/**
 * 拓展--判断是否未常规JSON_Object
 * 兼容IE6,7,8,9
 * @param {Object} obj 待判断参数
 */
var isJSONObject = function(obj) {
	if(isArray(obj)) {
		return false;
	}
	if(typeof(obj) == "object") {
		return true;
	} else {
		return false;
	}
}

/**
 * 拓展--Date格式化
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，   
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)   
 * 例子：   
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
 * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18  
 * @param {Object} format
 */
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	var week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if(/(E+)/.test(format)) {
		format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[this.getDay() + ""]);
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return format;
}

/**
 *  拓展--获取字节长度
 */
String.prototype.getBytesLen = function() {
	var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
	if(regEx.test(this)) {
		return this.length * 2;
	} else {
		var oMatches = this.match(/[\x00-\xff]/g);
		var oLength = this.length * 2 - oMatches.length;
		return oLength;
	}
};

/**
 *  拓展--计算当前时间与目标时间差
 * @param {Date} objDate 目标时间
 * @param {String} interval 计算类型 s:秒 n:分钟 d:日 w:周 m:月 y:年
 */
Date.prototype.diff = function(objDate, interval) {
	//若参数不足或 objDate 不是日期类型則回传 undefined
	if(arguments.length < 2 || objDate.constructor != Date) {
		return undefined;
	}
	switch(interval) {
		//计算秒差
		case 's':
			return parseInt((objDate - this) / 1000);
			//计算分差
		case 'n':
			return parseInt((objDate - this) / 60000);
			//计算時差
		case 'h':
			return parseInt((objDate - this) / 3600000);
			//计算日差
		case 'd':
			return parseInt((objDate - this) / 86400000);
			//计算周差
		case 'w':
			return parseInt((objDate - this) / (86400000 * 7));
			//计算月差
		case 'm':
			return(objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
			//计算年差
		case 'y':
			return objDate.getFullYear() - this.getFullYear();
			//输入有误
		default:
			return undefined;
	}
};

//function htmlDecode ( str ) {
//    var _str = '';
//    if ( str.length == 0 ) return '';
//    _str = str .replace(/&/g, '&');
//    _str = _str.replace(/</g, '<');     _str = _str.replace(/>/g, '>');
//    _str = _str .replace(/"/g, '"');

//    return _str;
//}

/**
 * 通过Id获取Doc元素
 * @param {String} id
 * @return {Document} 原生dom对象
 */
var docId = function(id) {
	return document.getElementById(id);
}

/**
 * 通用工具类
 */
var General = {
		/**
		 * General数据存储中心
		 */
		dataCenter: {
			basePath: null,
			jsList: [],
			cssList: [],
			HeadTag: null
		},
		/**
		 * dom选择器
		 * @param {String} selector 选择表达式
		 * @param {Object} win window 对象
		 * @param {Boolean} UseJquery 强制使用Jquery
		 *
		 */
		queryDom: function(selector, win, UseJquery) {
			// IE6 7 8使用jquery选择器做兼容
			if(!document.querySelectorAll || UseJquery) {
				return $(selector);
			}
			//选择使用的Window
			if(!win) {
				win = window;
			}
			return win.document.querySelector(selector);
		},
		/**
		 * doms选择器
		 * @param {String} selector 选择表达式
		 * @param {Object} win window 对象
		 * @param {Boolean} UseJquery 强制使用Jquery
		 *
		 */
		queryDoms: function(selector, win, UseJquery) {
			// IE6 7 8使用jquery选择器做兼容
			if(!document.querySelectorAll || UseJquery) {
				return $(selector);
			}
			//选择使用的Window
			if(!win) {
				win = window;
			}
			return win.document.querySelectorAll(selector);
		},
		/**
		 * 默认进行初始化
		 */
		init: function() {
			//兼容<IE8不支持console
			if(console == undefined) {
				var noop = function() {};
				var methods = [
					'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
					'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
					'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
					'timeStamp', 'trace', 'warn'
				];
				var length = methods.length;
				var console = window.console || {};
				while(length--) {
					// Only stub undefined methods.
					console[methods[length]] = console[methods[length]] || noop;
				}
			};
			//检测jquery是否引用,引用则使用jquery 部分非优先使用jquery
			if(isEmpty(typeof $)) {
				$ = {};
				$.ajax = function() {

				};
			}
		},
		/**
		 * 获取当前时间(yyyy-MM-dd HH:mm:ss)
		 */
		nowTime: function() {
			var now = new Date();
			var year = now.getFullYear(); //年
			var month = now.getMonth() + 1; //月
			var day = now.getDate(); //日
			var hh = now.getHours(); //时
			var mm = now.getMinutes(); //分
			var ss = now.getSeconds(); //秒
			var clock = year + "-";
			if(month < 10)
				clock += "0";
			clock += month + "-";
			if(day < 10)
				clock += "0";
			clock += day + " ";
			if(hh < 10)
				clock += "0";
			clock += hh + ":";
			if(mm < 10) clock += '0';
			clock += mm + ":";

			if(ss < 10) clock += '0';
			clock += ss;
			return(clock);
		},
		/**
		 * 获取当前日期(yyyy-MM-dd 00:00:00)
		 */
		nowDay: function() {
			var now = new Date();
			var year = now.getFullYear(); //年
			var month = now.getMonth() + 1; //月
			var day = now.getDate(); //日
			var hh = now.getHours(); //时
			var mm = now.getMinutes(); //分
			var ss = now.getSeconds(); //秒
			var clock = year + "-";
			if(month < 10)
				clock += "0";
			clock += month + "-";
			if(day < 10)
				clock += "0";
			clock += day + " ";
			clock += "00:00:00"
			return(clock);
		},
		/**
		 * 时间字符串转换为时间对象
		 * @return Date
		 */
		timeStrToTime: function(str) {
			var rege = new RegExp("T|(\\..*$)", "g");
			str = str.replace(rege, " ");
			str = str.replace(/-/g, "/");
			var date = new Date(str);
			return date;
		},
		/**
		 * 时间字符串转换为展示字符串(精确到秒)
		 * 注:低于微秒级以下精确时间不可用此方法
		 * @return DateStr
		 */
		toShowTimeStr: function(str) {
			var rege = new RegExp("T|(\\..*$)", "g");
			str = str.replace(rege, " ");
			return str;
		},
		/**
		 * 注入页面数据
		 * 根据json数据按key为domId寻找对应dom赋值
		 * @param {Object} json 数据
		 */
		setViewData: function(json) {
			for(var key in json) {
				var docItem = docId(key);
				if(json[key] == null) {
					json[key] = "";
				}
				if(docItem != undefined && docItem != null) {
					if(docItem.tagName == "INPUT") {
						if(docItem.type == "text" || docItem.type == "hidden") {
							docItem.value = json[key];
							continue;
						}
						if(docItem.type == "checkbox" && docItem.value == json[key]) {
							docItem.checked = "checked";
						} else {
							docItem.checked = "";
						}
					}
					if(docItem.tagName == "SELECT") {
						docItem.value = json[key];
						continue;
					}
					if(docItem.tagName == "TD") {
						docItem.innerHTML = json[key];
						continue;
					}
				}
			}
		},
		/**
		 * 界面加载完毕后执行方法
		 * @param {Object} func 被执行的方法
		 */
		windowReady: function(func) {
			if(window.onload != null) {
				var _func = window.onload;
				window.onload = function() {
					_func();
					func();
				}
			} else {
				window.onload = function() {
					func();
				}
			}
		},
		/**
		 * 删除空白Html节点
		 * @param {DOM} oEelement
		 */
		cleanWhitespace: function(oEelement) {
			for(var i = 0; i < oEelement.childNodes.length; i++) {
				var node = oEelement.childNodes[i];
				if(node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
					node.parentNode.removeChild(node);
				}
			}
			//		  for(var i=0;i<oEelement.childNodes.length;i++){
			//		  var node=oEelement.childNodes[i];
			//		  console.log("类型:"+node.nodeType);
			//		  }
		},
		/**
		 * 转换为html页面中属性值字符串
		 * @param {Object} obj
		 */
		objToHtmlAttrStr: function(obj) {
			var str = JSON.stringify(obj);
			str = str.replace(/"/g, "'");
			return str;
		},
		/**
		 * html页面中属性值字符串转换为js对象
		 * @param {String} str
		 */
		htmlAttrStrToObj: function(str) {
			str = str.replace(/'/g, "\"");
			var obj = JSON.parse(str);
			return obj;
		},
		/**
		 *  克隆对象
		 */
		cloneObj: function(obj) {
			//			var objStr=JSON.stringify(obj);
			//			return JSON.parse(objStr);

			return cloneItem(obj);
			//克隆节点
			function cloneItem(node) {
				var retObj;
				if(isArray(node)) {
					retObj = [];
					for(var item in node) {
						var it = cloneItem(node[item]);
						retObj.push(it);
					}
					return retObj;
				}
				if(isObject(node)) {
					retObj = {};
					for(var item in node) {
						var it = cloneItem(node[item]);
						retObj[item] = it;
					}
					return retObj;
				}
				return node;
			};
		},
		/**
		 * 作者：PS    日期：2016-01-15
		 * 获取当前域名地址
		 */
		getNowDomain: function(win) {
			if(win == undefined) {
				win = window;
			}
			var domain = win.location.host;
			if(isEmpty(domain)) {
				domain = win.document.domain;
			}
			if(domain.indexOf("http://") != 0) {
				domain = "http://" + domain;
			}
			return domain;
		}
	}
	//初始化执行
General.windowReady(function() {
		//loadAllJS(General.dataCenter.jsList);
		General.init();
	})
	/**
	 * 比较数组是否相同
	 * @param {Object} array1
	 * @param {Object} array2
	 */
General.compArray = function(array1, array2) {
	var result = false;
	if(!isEmpty(array1) && !isEmpty(array2)) {
		if(array1.length != array2.length) {
			return false;
		}
		for(var i = 0, len = array1.length; i < len; i++) {
			array1[i] == array2[i];
			if((typeof array1[i]) == "object" && (typeof array2[i]) == "object") {
				return General.compObj(array1[i], array2[i]);
			} else if((typeof array1[i]) != "object" && (typeof array2[i]) != "object") {
				if(array1[i] == array2[i]) {
					result = true;
				} else {
					return false;
				}
			} else {
				return false;
			}
		}
		return result;
	} else if(isEmpty(array1) && isEmpty(array2)) {
		throw new Error("比对参数不为数组");
	} else {
		return false;
	}
};

/**
 * 比较两个对象是否相等，不包含原形上的属性计较
 * @param {Object} obj1
 * @param {Object} obj2
 */
General.compObj = function(obj1, obj2) {
	var type1 = typeof obj1;
	var type2 = typeof obj2;
	if(type1 == type2) {
		if(type1 == "object") {
			var isArray1 = obj1 instanceof Array;
			var isArray2 = obj2 instanceof Array;
			if(isArray1 && isArray2) {
				return General.compArray(obj1, obj2);
			} else if(!isArray1 && !isArray2) {
				for(var item in obj1) {
					if(obj2.hasOwnProperty(item)) {
						return General.compObj(obj1[item], obj2[item]);
					} else {
						return false;
					}
				}
			} else {
				return false;
			}
		} else {
			if(obj1 == obj2) {
				return true;
			} else {
				return false;
			}
		}
	} else {
		return false;
	}
};

/**
 * 在URL中获取参数
 * @param {string} name
 */
General.getUrlParam = function(name) {
	var search = window.location.search;
	if(search.indexOf("?") > -1) {
		search = search.substring(1);
		var parArr = search.split("&");
		for(var i = 0; i < parArr.length; i++) {
			if(parArr[i].split("=")[0] == name) {
				return decodeURIComponent(parArr[i].split("=")[1]);
			}
		}
	}
	return null;
}

/**
 * Json数据组装成的URL
 * @return JSON
 */
General.dataToUrl = function(data) {
	var urlDataArray = [];
	for(var item in data) {
		if(item != "" || item != "count") {
			urlDataArray.push(item + "=" + data[item]);
		}
	}
	urlDataArray = urlDataArray.join("&");
	return urlDataArray;
}

General.toQueryString = function(obj,url) {
	var paramStr = [];
	for(var item in obj) {
		var type = typeof obj[item];
		if(type == "string" || type == "boolean" || type == "number") {
			var str = encodeURIComponent(obj[item]);
			paramStr.push(item + "=" + str);
		}
	}
	var str=paramStr.join("&");
	if(url){
		if(url.indexOf("?")>=0){
			str=url+str;
		}else{
			str=url+"?"+str;
		}
	}

	return str;
}

/**
 * 获取域中input集合JSON
 * @param {Object} id 域id
 * @param {Object} attrStr 属性作为键值时,属性值,默认以Id作为键
 * @param {Object} windows
 */
General.getAllData = function(id, attrStr, windows) {
		if(docId(id) == null) {
			return null;
		}
		var vm = this;
		var keyIsAttribute = false;
		if(windows == undefined || windows == null) {
			var windows = window;
		}
		if(attrStr != undefined && attrStr != null) {
			keyIsAttribute = true;
		}
		/**
		 * 获取input集合键值对字符串
		 * @param {Object} Id
		 * @param {Object} windows
		 */
		var inputsDataStr = function(Id, windows) {
			//var Controls = 0; //总计数器
			var count = 0;
			var data = new Array();
			//获取区域内所有input控件
			var cs0 = windows.document.getElementById(Id).getElementsByTagName("input");
			for(var i = 0, len = cs0.length; i < len; i++) {
				var key;
				if(keyIsAttribute) {
					key = cs0[i].getAttribute(attrStr);
				} else {
					key = cs0[i].id;
				}
				if(key == null) {
					continue;
				}
				var val;
				if(cs0[i].type == "checkbox") {
					if(cs0[i].checked) {
						val = 1;
					} else {
						val = 0;
					}
				} else {
					val = cs0[i].value;
				}
				data.push("'" + key + "':'" + cs0[i].value + "'");
			}
			//获取区域内所有select控件
			var cs1 = windows.document.getElementById(Id).getElementsByTagName("select");
			for(var i = 0, len = cs1.length; i < len; i++) {
				var key;
				if(keyIsAttribute) {
					key = cs1[i].getAttribute(attrStr);
				} else {
					key = cs1[i].id;
				}
				if(key == null) {
					continue;
				}
				data.push("'" + key + "':'" + cs1[i].value + "'");
			}
			//获取区域内所有textarea控件
			var cs2 = windows.document.getElementById(Id).getElementsByTagName("textarea");
			for(var i = 0, len = cs2.length; i < len; i++) {
				var key;
				if(keyIsAttribute) {
					key = cs2[i].getAttribute(attrStr);
				} else {
					key = cs2[i].id;
				}
				if(key == null) {
					continue;
				}
				var val = cs2[i].value.replace(/(\n)+|(\r\n)+/g, "\\n"); //<br/>;
				data.push("'" + key + "':'" + val + "'");
			}
			data.push("'count':'" + (data.length) + "'");
			data = data.join(",");
			data = "({" + data + "})";
			return data;
		};
		var data = eval(inputsDataStr(id, windows));
		return data;
	}
	/**
	 * 对象变更监听器
	 * @param {Object} obj 对象
	 * @param {Object} prop 属性
	 * @param {Object} desc 描述/配置等
	 * desc：
	 *  1.configurable，属性是否可配置。可配置的含义包括：是否可以删除属性（ delete  ），是否可以修改属性的  writable  、  enumerable  、  configurable  属性。
	 *	2.enumerable，属性是否可枚举。可枚举的含义包括：是否可以通过 for...in  遍历到，是否可以通过 Object.keys()  方法获取属性名称。
	 *	3.writable，属性是否可重写。可重写的含义包括：是否可以对属性进行重新赋值。
	 *	4.value，属性的默认值。
	 *	5.set，属性的重写器（暂且这么叫）。一旦属性被重新赋值，此方法被自动调用。
	 *	6.get，属性的读取器（暂且这么叫）。一旦属性被访问读取，此方法被自动调用。
	 */
General.observe = function(obj, prop, desc) {
	Object.defineProperty(obj, prop, desc);
}

/**
 * 作者：PS    
 * 日期：2016-09-05
 * JSON对象属性设置默认属性
 * 注:通常为某些对象设置默认属性
 * @param {Object} Obj 目标对象
 * @param {Object} defaultObj 默认值对象
 */
General.objSetDefaultVal = function(obj, defaultObj) {
	if(!obj) {
		obj = defaultObj;
	} else {
		for(var key in defaultObj) {
			if(!obj.hasOwnProperty(key)) {
				obj[key] = defaultObj[key];
			}
		}
	}
	return obj;
}

/**
 * 获取token
 * @param {Object} key
 */
General.getCookie = function(key) {
	var arr, reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

/**
 * 删除cookies
 * @param {Object} key
 */
General.delCookie = function(key) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = this.getCookie(name);
	if(cval != null)
		document.cookie = key + "=" + cval + ";expires=" + exp.toGMTString();
}

//屏幕对象
//General.screen=$App.screen;

/**
 * 游览器session对象
 * 作者：PS    
 * 日期：2016-09-02
 */
General.Session = function() {
	var session = {};
	if(window.sessionStorage) {
		/**
		 * 保存数据到游览器session中
		 * @param {Object} key
		 * @param {Object} value
		 * @param {string} expireTime 超时时间
		 */
		session.set = function(key, value, expireTime) {
			var val = {
				expireTime: expireTime,
				data: value
			};
			sessionStorage.setItem(key, JSON.stringify(val));
		};
		/**
		 * 获取游览器session中数据
		 * @param {Object} key
		 * @param {Object} valType
		 */
		session.get = function(key, valType) {
			var val = {};
			val = sessionStorage.getItem(key);
			if(val != null) {
				val = JSON.parse(val);
			} else {
				val = {};
				val.data = null;
			}
			return val.data;
		};
		/**
		 * 删除游览器中session对象
		 * @param {Object} key
		 */
		session.remove = function(key) {
				sessionStorage.removeItem(key);
			}
			/**
			 * 清空所有数据
			 */
		session.clear = function() {
			sessionStorage.clear();
		}
		return session;
	}
}

/**
 * 游览器localStorage对象
 * 作者：PS    
 * 日期：2016-09-02
 */
General.Local = function() {
	var local = {};
	if(window.localStorage) {
		/**
		 * 保存数据到游览器localStorage中
		 * @param {Object} key
		 * @param {Object} value
		 * @param {string} expireTime 超时时间
		 */
		local.set = function(key, value, expireTime) {
			var val = {
				expireTime: expireTime,
				data: value
			};
			val = JSON.stringify(val);
			localStorage.setItem(key, val);
		};
		/**
		 * 获取游览器localStorage中数据
		 * @param {Object} key
		 * @param {Object} valType
		 */
		local.get = function(key, valType) {
			var val = {},
				val = localStorage.getItem(key);
			if(val != null) {
				val = JSON.parse(val);
			} else {
				val = {};
				val.data = null;
			}
			return val.data;
		};
		/**
		 * 删除游览器中localStorage对象
		 * @param {Object} key
		 */
		local.remove = function(key) {
				localStorage.removeItem(key);
			}
			/**
			 * 清空所有数据
			 */
		local.clear = function() {
			localStorage.clear();
		}
		return local;
	}
};

//提供通用方法 简写
window.$G = General;

//try {
// var _ajax = $.ajax;
// if (jQuery!=undefined&&jQuery!=null) {
// 	   jQuery.support.cors = true;
// }
// $.ajax = function(opt){
//	   	var fn = {
//	   		successFn : function(data,textStatus){},
//	   		errorFn : function(XMLHttpRequest, textStatus, errorThrown){}
//	   	}
////	   	 if(opt.progressBar){
////	   	 	var oProgressBar = ProgressBar.init(opt.progressBar);
////	   	 	oProgressBar.showProgressBar();
////		   	  if(opt.success){
////		   	  	fn.successFn = opt.success;
////		   	 	opt.success = function(data,textStatus){
////		   	 		oProgressBar.hiddenProgressBar();
////		   	 		fn.successFn(data,textStatus);
////		   	 	}
////		   	 }
////		   	 if(opt.error){
////		   	 	fn.errorFn = opt.error;
////		   	 	opt.error = function(XMLHttpRequest, textStatus, errorThrown){
////		   	 		oProgressBar.hiddenProgressBar();
////		   	 		fn.errorFn(XMLHttpRequest, textStatus, errorThrown);
////		   	 	}
////		   	 }
////	   	 }
////		if (!opt.contentType) {
////			opt.contentType="application/json";
////		}
//	   	 //新增跨域Token兼容
//	   	var nowUserInfo = $G.Session().get("NowUserInfo");
//	   	var token=nowUserInfo?nowUserInfo.Token:null;
//	   	$G.delCookie('token');
//	   	if(token!=null&&$App.Debug){
//	   		token=encodeURIComponent("token="+token);
//	   		if(opt.url.indexOf("?")>0){
//	   			opt.url=opt.url+"&__h="+token;
//	   		}else{
//	   			opt.url=opt.url+"?__h="+token;
//	   		}
//	   	}
//	   	return _ajax(opt);
// }
//}
// catch (e) {
// 	
// }

/**
 * JSON序列化兼容
 */
var JSON;
JSON || (JSON = {}), (function() {
	"use strict";

	function i(n) {
		return n < 10 ? "0" + n : n
	}

	function f(n) {
		return o.lastIndex = 0, o.test(n) ? '"' + n.replace(o, function(n) {
			var t = s[n];
			return typeof t == "string" ? t : "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
		}) + '"' : '"' + n + '"'
	}

	function r(i, e) {
		var h, l, c, a, v = n,
			s, o = e[i];
		o && typeof o == "object" && typeof o.toJSON == "function" && (o = o.toJSON(i)), typeof t == "function" && (o = t.call(e, i, o));
		switch(typeof o) {
			case "string":
				return f(o);
			case "number":
				return isFinite(o) ? String(o) : "null";
			case "boolean":
			case "null":
				return String(o);
			case "object":
				if(!o) return "null";
				n += u, s = [];
				if(Object.prototype.toString.apply(o) === "[object Array]") {
					for(a = o.length, h = 0; h < a; h += 1) s[h] = r(h, o) || "null";
					return c = s.length === 0 ? "[]" : n ? "[\n" + n + s.join(",\n" + n) + "\n" + v + "]" : "[" + s.join(",") + "]", n = v, c
				}
				if(t && typeof t == "object")
					for(a = t.length, h = 0; h < a; h += 1) typeof t[h] == "string" && (l = t[h], c = r(l, o), c && s.push(f(l) + (n ? ": " : ":") + c));
				else
					for(l in o) Object.prototype.hasOwnProperty.call(o, l) && (c = r(l, o), c && s.push(f(l) + (n ? ": " : ":") + c));
				return c = s.length === 0 ? "{}" : n ? "{\n" + n + s.join(",\n" + n) + "\n" + v + "}" : "{" + s.join(",") + "}", n = v, c
		}
	}
	typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
		return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + i(this.getUTCMonth() + 1) + "-" + i(this.getUTCDate()) + "T" + i(this.getUTCHours()) + ":" + i(this.getUTCMinutes()) + ":" + i(this.getUTCSeconds()) + "Z" : null
	}, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
		return this.valueOf()
	});
	var e = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		o = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
		n, u, s = {
			"\b": "\\b",
			"\t": "\\t",
			"\n": "\\n",
			"\f": "\\f",
			"\r": "\\r",
			'"': '\\"',
			"\\": "\\\\"
		},
		t;
	typeof JSON.stringify != "function" && (JSON.stringify = function(i, f, e) {
		var o;
		n = "", u = "";
		if(typeof e == "number")
			for(o = 0; o < e; o += 1) u += " ";
		else typeof e == "string" && (u = e);
		t = f;
		if(f && typeof f != "function" && (typeof f != "object" || typeof f.length != "number")) throw new Error("JSON.stringify");
		return r("", {
			"": i
		})
	}), typeof JSON.parse != "function" && (JSON.parse = function(n, t) {
		function r(n, i) {
			var f, e, u = n[i];
			if(u && typeof u == "object")
				for(f in u) Object.prototype.hasOwnProperty.call(u, f) && (e = r(u, f), e !== undefined ? u[f] = e : delete u[f]);
			return t.call(n, i, u)
		}
		var i;
		n = String(n), e.lastIndex = 0, e.test(n) && (n = n.replace(e, function(n) {
			return "\\u" + ("0000" + n.charCodeAt(0).toString(16)).slice(-4)
		}));
		if(/^[\],:{}\s]*$/.test(n.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return i = eval("(" + n + ")"), typeof t == "function" ? r({
			"": i
		}, "") : i;
		throw new SyntaxError("JSON.parse");
	})
})()