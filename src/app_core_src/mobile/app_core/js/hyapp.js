/**
 * 前端与Native通信中间件
 * 2017-04-12 13:54:18 
 * @author PS
 */
function HyApp() {
	var _self = this;
	var requests = {};
	//方法超时时间
	var timeOut = 5000;

	/**
	 * 
	 * @param {String} className 类名
	 * @param {String} methodName 方法名
	 * @param {Object} params 参数
	 * @param {Function} sucessCallback
	 * @param {Function} errorCall(错误编码,描述)
	 */
	_self.excute = function (className, methodName, params, sucessCallback, errorCallback) {
		//		请求唯一标识ID
		var id = "HyApp_re_" + $App.getCode();
		if ($App.Info.isInWebView) {
			//			将请求信息保存到请求队列中
			requests[id] = {
				className: className,
				methodName: methodName,
				sucessCallback: function(result){
					if (sucessCallback) {
						$log("原生返回:", result);
						sucessCallback(result);
					}
				},
				errorCallback: function (code, result) {
					$log(code, result);
					clearTimeout(requests[id].timer);
					if (errorCallback) {
						errorCallback(code, result);
					}
				}
			};
			setTimeout(function () {
				try {
					if ($G.deviceInfo.isSystem.ios) {
						var body = {
							className: className,
							methodName: methodName,
							id: id,
							params: params
						};
						$log("调用原生:", body);
						window.webkit.messageHandlers.HyAppNative.postMessage(JSON.stringify(body));
					} else {
						if (typeof params != "object") {
							throw new Error("params 必须是对象");
						} else {
							params = JSON.stringify(params);
						}
						$log("调用原生:", params);
						window.HyAppNative.excute(className, methodName, id, params);
					}
				} catch (e) {
					$log(e);
					requests[id].errorCallback(404, "调用原生Api失败！请求Id:"+id);
				}
			}, 1);


			requests[id].timer = setTimeout(function () {
				requests[id].errorCallback(504,"请求Native超时！请求Id:"+id);
				delete requests[id];
			}, timeOut);
		} else {
			$log("请在内嵌App中运行该程序！");
		}
	}

	/**
	 * 原生返回结果
	 * @param {Object} id	唯一标识ID
	 * @param {Object} stateEnum 
	 * @param {Object} result
	 */
	_self.nativeSendResult = function (id, result) {
		setTimeout(function () {
			try {
				if (!requests.hasOwnProperty(id)) {
					throw new Error("请求不存在");
				}
				clearTimeout(requests[id].timer);
				if (typeof result != "string") {
					throw new Error("result 必须是JSON字符串");
				} else {
					result = JSON.parse(result);
				}
				requests[id].sucessCallback(result);
			} catch (e) {
				requests[id].errorCallback(500,e);
			}
		}, 1);
	}

	/**
	 * 发送通知
	 * @param {Object} key
	 * @param {Object} result
	 */
	_self.publish = function (key, result) {
		setTimeout(function () {
			if (typeof result != "string") {
				throw new Error("result 必须是JSON字符串");
			} else {
				$log(result);
				result = JSON.parse(result);
				$Observer.publish(key, result);
			}
		}, 1);
	};


}