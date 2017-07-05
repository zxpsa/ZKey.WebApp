/**
 * 网路请求
 * 2017-04-14 14:43:15 
 * @author PS
 * @param {Object} appInfo app相关信息 
 */
function ZKHttp(userInfo, appInfo) {
	var token = userInfo.token;
	var userId = userInfo.userId;
	var mct = 9;
	if (appInfo.isInWebView) {
		if ($G.deviceInfo.isSystem.ios) {
			mct = 2;
		} else if ($G.deviceInfo.isSystem.android) {
			mct = 1;
		}
	}

	var mst = mct * 10 + 2;
	//最低Http版本为3.0.5
	var verStr = $App.lessAppVer("3.0.5") ? "3.0.5" : appInfo.appVersion;
	var appVerNumStr = $App.lessAppVer("3.0.5") ? "305" : appInfo.appVersion.replaceAll("\\.", "");
	$.ajaxSetup({
		contentType: "application/json;charset=utf-8",
		processData: false,
		headers: {
			"token": token,
			"m-nw": "",
			"m-iv": verStr,
			"m-cv": verStr,
			"m-ct": mct,
			"m-st": mst,
			"m-ui": userId,
			"m-cw": "",
			"m-ch": "",
			"m-ii": "",
			"m-ci": "",
			"m-lng": "108.2032",
			"m-lat": "31.1234",
			"m-up": "",
			"m-uc": "",
			"m-ud": "",
			"appVersion": appVerNumStr
		},
		dataType: "json"
	});

	window.$App_httpStack = {};
	/**
	 * ajax参数设置默认值
	 */
	$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
		if (options.commonDel == false) { //是否设置禁用公共 处理
			return false;
		}
		//若已存在相同域名请求则放弃已发起请求
		if ($App_httpStack[options.url]) {
			//放弃之后的请求
			jqXHR.abort();
			return false;
		}
		//记录当前请求对象
		$App_httpStack[options.url] = true;

		//发起请求时显示加载界面
		var loading = null;
		var timeIndex;
		if (options.loading != false) {
			timeIndex = setTimeout(function () {
				loading = $App.loading("加载中...");
			}, 500);
		}

		//自定义传输数据的格式
		if (typeof options.data == "object" && options.processData == false) {
			if (options.type == "get") {
				options.data = $G.toQueryString(options.data);
			} else {
				if (options.convertNull === false) {
					options.data = JSON.stringify(options.data);
				} else {
					options.data = JSON.stringify(options.data, handlePostSwitchData);
				}
			}
		}

		var complete = options.complete;
		options.complete = function (xhr, status) {
			delete $App_httpStack[options.url];
			//清除计时器
			clearTimeout(timeIndex);
			if (loading != null) {
				$App.closeLoding(loading);
			}
			if (!isEmpty(complete)) {
				complete(xhr, status);
			}
		}
		if (options.useSuccessDel != false) {
			var success = options.success;
			options.success = function (result, status, xhr) {
				if (result.status != undefined) {
					if (result.status == 1 || result.status == "1") {
						$App.msg(result.msg);

					} else if (result.status == -1 || result.status == "-1") {
						$App.msg("服务器异常,请联系管理员！");

					} else if (result.status == 2 || result.status == "2") {
						$App.msg(result.msg);

					} else if (result.status == 3) {
						$App.msg("无权限或者未登录！请重新登陆");
						setTimeout(function () {
							if ($App.Info.isInWebView) {
								if ($G.deviceInfo.isSystem.ios) {
									$App.go("XSFAPP://ClassName/XSFLoginViewController");
								} else {
									$App.go({
										path: "XSFAPP://com/shoufu/platform/activity/login/LoginActivity",
										query: {
											'is_relogin': true
										},
										isTopGo: true
									});
								}
							} else {
								$App.go({
									path: $App.RootUrl.replace("/collect_payment", ""),
									isTopGo: true
								});
							}
						}, 1000);
						return false;
					}
				} else {
					if (result.indexOf("请登录") >= 0) {
						$App.msg("无权限或者未登录！请重新登陆");
						setTimeout(function () {
							$App.go({
								path: $App.RootUrl.replace("/statics", ""),
								isTopGo: true
							});
						}, 1000);
						return false;
					}
				}
				if (success != undefined) {
					try {
						//执行自定义样式
						success(result, status, xhr);
					} catch (error) {
						//报错也去掉加载loading
						if (loading != null) {
							$App.closeLoding(loading);
						}
						console.log(error);
					}
				}
			};
		}

		var error = options.error;
		options.error = function (XMLHttpRequest, textStatus, errorThrown) {
			httpErrorCommonDel(XMLHttpRequest, textStatus, errorThrown);
			if (error != undefined) {
				try {
					//执行自定义样式
					error(XMLHttpRequest, textStatus, errorThrown);
				} catch (error) {
					//报错也去掉加载loading
					if (loading != null) {
						$App.closeLoding(loading);
					}
				}
			}
		};
	});

	function httpErrorCommonDel(XMLHttpRequest, textStatus, errorThrown) {
		var status = XMLHttpRequest.status;
		if (status >= 401 && status < 404) {
			$App.msg("未登录！请重新登陆");

			setTimeout(function () {
				$App.go({
					path: $App.RootUrl.replace("/statics", "") + '/login.html',
					isTopGo: true
				});
			}, 1000);
		} else if (status == 500) {
			$App.msg("服务器异常,请联系管理员!");
		} else if (status == 404) {
			$App.msg("服务器异常,请联系管理员!");
		} else if (status == 200) {
			if (XMLHttpRequest.responseURL != "") {
				window.top.location.href = XMLHttpRequest.responseURL
			} else {
				$App.msg("解析数据失败!");
			}
		} else {
			if (textStatus == "timeout") {
				$App.msg("网络超时！请稍后再试");
				return;
			}
			if (textStatus == "parsererror") {
				//错误或者解析异常
				$App.msg("网络或服务器异常,请稍候再试!");
				return;
			}

			if (textStatus == "abort") {
				//强行终止
			} else {
				$App.msg("错误请求");
			}
		}
	}

	/**
	 * 处理每一项提交的数据的
	 * @param {Object} key
	 * @param {Object} value
	 */
	function handlePostSwitchData(key, value) {
		if (value === "") {
			value = null;
		}
		return value;
	}
}