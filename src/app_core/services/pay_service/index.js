var PayCannelTypeEnum = require('app_core/services/pay_service/enum/pay_cannel_enum');
var local = $G.Session();
//支付服务 支付是否处于等待结果中
var localKey = "XSF_pay_service_waiting_" + $App.UserInfo().token;
//延长显示确认结果时间 /ms
var delayShowTime = 10000;


function PayService() {
	this.pay = pay;

	/**
	 * 支付
	 * @param {Object} scenesId
	 * @param {Object} orderNo
	 * @param {Object} cannel 
	 * @param {Object} remark
	 * @param {Object} amount 金额
	 * @param {Number} userRoleType 用户角色类型 0.用户 1.商户
	 * @param {Component} selectBankCardComponent 选择银行卡组件
	 * @param {Object} options 选项 userConfirmComplete:用户确认完成回调(已选择通道)
	 * cannel:
	 * {"aisleId":14,"aisleName":"建行直连","maxLimit":0,"minLimit":0.01,"aisleType":5,"aisleApiType":1,"usingQrCode":0,"usingDC":0,"iconUrl":"http://file.xsfapp.com/images/pay/bank_pay.png","webPayInjectCode":null,"errPageUrl":null,"payRate":"-0.111","limitStr":"单笔限额 不限","payRateStr":"费率-11.10%"}
	 */
	function pay(scenesId, orderNo, cannel, remark, amount, userRoleType, selectBankCardComponent, options) {
		if (!cannel) {
			$App.alert("当前支付方式不可用！请换一种支付方式再试试吧");
			return false;
		}
		scenesId = scenesId + "";
		orderNo = orderNo + "";
		amount = amount + "";

		//		易宝支付使用单独支付方式
		if (cannel.aisleType == PayCannelTypeEnum.YBScan || cannel.aisleType == PayCannelTypeEnum.YBPay || cannel.aisleType == PayCannelTypeEnum.YBBankCard) {
			ybPay(scenesId, cannel, amount, userRoleType, options);
		} else {
			//api类型支付方式
			if (cannel.aisleApiType == 1) {
				httpApiPay(scenesId, orderNo, cannel, remark, userRoleType, selectBankCardComponent, options);
			} else { //web类型支付
				httpWebPay(scenesId, orderNo, cannel, remark, userRoleType,selectBankCardComponent,options);
			}
		}
	}

	/**
	 * 调用支付web支付接口 获取支付处理链接
	 * @param {Object} orderNo
	 * @param {Number} userRoleType 用户角色类型 0.用户 1.商户
	 */
	function httpWebPay(scenesId, orderNo, cannel, remark, userRoleType,selectBankCardComponent, options) {
		var data = {
			aisleId: cannel.aisleId,
			orderNo: orderNo,
			scenesId: scenesId,
			remark: remark,
			ubId:null
		};
		var url = $G.toQueryString(data, $App.ApiRoot + "/pay/webPay");
		//		微信正扫在非微信中时显示二维码
		if (cannel.aisleType == PayCannelTypeEnum.WeiFuTongWXScan && !$G.deviceInfo.isBrowser.wx) {
			$App.go({
				path: "/app_core/services/pay_service/page/pay_qr_code_page.html",
				query: {
					userRoleType: userRoleType,
					hasNav: false,
					qrUrl: url
				}
			});
		} else if (cannel.aisleType == PayCannelTypeEnum.WeiFuTongAliScan && $G.deviceInfo.isBrowser.wx) {
			//		支付宝正扫在微信中时显示二维码
			$App.go({
				path: "/app_core/services/pay_service/page/pay_qr_code_page.html",
				query: {
					userRoleType: userRoleType,
					hasNav: false,
					qrUrl: url
				}
			});
		} else if (cannel.aisleType == PayCannelTypeEnum.UBH5Pay) {
			// 银联综合通道支付 / 荣宝H5支付

			/**
			 * 选中银行卡回调
			 * @param {Object} bankInfo 
			 */
			function selectBankCallback(bankInfo) {
				data.ubId=bankInfo.ubId ? bankInfo.ubId : null;
				url = $G.toQueryString(data, $App.ApiRoot + "/pay/webPay");
				// 获取实名信息
				$.post($App.ApiRoot + "/user/getUserRealName", null, function (result, status, xhr) {
					if (result.status != 0) {
						return false;
					}

					// 通知Native开始注入
					if (cannel.webPayInjectCode) {
						$HyApp.excute("HYAInjectWebView", "start", {
							contentCode: cannel.webPayInjectCode,
							ubBankNo:bankInfo.realCardNo,
							userRealName:result.data.userRealName,
							idCardNo:result.data.idCardNo,
							userAccount:result.data.userAccount,
							termOfValidity:bankInfo.ubCreditValid,
							cvv2:bankInfo.ubCreditCvv2,
							errPageUrl:cannel.errPageUrl
						}, function (result) {
							if (result.status != 0) {
								$App.msg(result.msg);
								return false;
							}
							// 跳转到支付WebPay支付页面进行支付
							var index = $App.loading("正在支付中...");
							setTimeout(function () {
								$App.alert("支付确认", function () {
									//					local.remove(localKey);
									$App.closeLoding(index);
									options.userConfirmComplete(cannel);
									return true;
								});
							}, delayShowTime);
							window.location.href = url;
							//隐藏选择界面
							// history.go(-1);
						});
					}
				});
			}
			//			[实现]输入验证码确认回调
			function smsSuer(smsCode) {

			}
			//			[实现]重新获取验证码
			function reSendSMS() {

			}

			//荣宝H5支付允许 所有银行卡
			var canSelectBankType = 1;
			selectBankCardComponent.show(selectBankCallback, smsSuer, reSendSMS, null, canSelectBankType,cannel);
		} else {
			if (cannel.isChooseBank) {
				/**
				 * 选中银行卡回调
				 * @param {Object} bankInfo 
				 */
				function selectBankCallback(bankInfo) {
					data.ubId=bankInfo.ubId ? bankInfo.ubId : null;
					url = $G.toQueryString(data, $App.ApiRoot + "/pay/webPay");
					window.location.href = url;
				}

				//[实现]输入验证码确认回调
				function smsSuer(smsCode) {

				}
				//[实现]重新获取验证码
				function reSendSMS() {

				}
				//支持所有银行卡
				var canSelectBankType = 1;
				var bankType=null;
				if(cannel.isChooseBank==2){
					bankType=0;
				}else if(cannel.isChooseBank==3){
					bankType=1;
				}
				selectBankCardComponent.show(selectBankCallback, smsSuer, reSendSMS, bankType, canSelectBankType,cannel);
			} else {
				//			标记正在支付中状态
				//			local.set(localKey, true);

				var index = $App.loading("正在支付中...");
				setTimeout(function () {
					$App.alert("支付确认", function () {
						//					local.remove(localKey);
						$App.closeLoding(index);
						options.userConfirmComplete(cannel);
						return true;
					});
				}, delayShowTime);
				window.location.href = url;
			}			
		}
	}

	/**
	 *  荣宝Api支付
	 * 2017-03-29 00:56:07 
	 * @author PS
	 * @param {String} scenesId 场景id
	 * @param {String} orderNo 订单号
	 * @param {Object} cannel 通道信息
	 * @param {String} remark 备注
	 * @param {Object} userRoleType  用户角色类型 0.用户 1.商户
	 * @param {Object} selectBankCardComponent
	 */
	function httpApiPay(scenesId, orderNo, cannel, remark, userRoleType, selectBankCardComponent, options) {
		//		[实现]选择银行卡支付
		if (cannel.isChooseBank!=0&&cannel.payType==1) {
			function selectBankCallback(bankInfo) {
				//当点击的为不支持的银行卡类型时 阻止
				if (!bankInfo.support) {
					return false;
				}

				$.post($App.ApiRoot + "/pay/apiPay", {
					aisleId: cannel.aisleId,
					orderNo: orderNo,
					scenesId: scenesId,
					remark: remark,
					authCode: null,
					ubBindId: bankInfo.ubBind ? bankInfo.ubBind : null,
					ubId: bankInfo.ubId ? bankInfo.ubId : null,
					idCardNo: null,
					bankCardNo: null,
					userName: null,
					bankPhoneNo: null,
					cvv2: null,
					validthru: null,
					bankCardType: null
				}, function (result, status, xhr) {
					if (result.status != 0) {
						return false;
					}

					//显示输入验证码框
					selectBankCardComponent.showSMSVerify();
				});
			};
			//			[实现]输入验证码确认回调
			function smsSuer(smsCode) {
				if (!smsCode) {
					$App.msg("请输入短信验证码！");
					return false;
				}
				var index = $App.loading("正在支付中...");
				$.ajax({
					type: 'POST',
					url: $App.ApiRoot + "/pay/confirmPay",
					loading: false,
					data: {
						orderNo: orderNo,
						smsCode: smsCode
					},
					success: function (result, status, xhr) {
						if (result.status != 0) {
							$App.closeLoding(index);
							return false;
						}
						//隐藏输入验证码框
						selectBankCardComponent.hideSMSVerify();

						var time = setTimeout(function () {
							httpQueryOrderPayStatus(orderNo, function (data) {
								//1未支付 3支付失败 4支付成功 5代扣
								if (data == 4 || data == 5) {
									//								支付成功
									//成功后跳转回通道选择页面
									history.go(-1);
								} else {
									$App.alert("由于第三方支付通道延迟！请稍候再查看余额", function () {
										history.go(-1);
									});
								}
								$App.closeLoding(index);
								if (time) {
									//清除计时器
									clearTimeout(time);
								}
							});
							//隐藏输入验证码框
							//							selectBankCardComponent.hideSMSVerify();
							$App.closeLoding(index);
						}, 3000);

					}
				});

			};

			//			[实现]重新获取验证码
			function reSendSMS() {
				if (selectBankCardComponent.sendSMSTime > 0 && selectBankCardComponent.sendSMSTime != 60) {
					return false;
				}
				$.post($App.ApiRoot + "/pay/reSendSmsCode", {
					orderNo: orderNo
				}, function (result, status, xhr) {
					if (result.status != 0) {
						return false;
					}
					selectBankCardComponent.showSMSVerify();
				});
			};
			var canSelectBankType = 0;
			if (cannel.aisleType == PayCannelTypeEnum.UBPay || cannel.aisleType == PayCannelTypeEnum.UBH5Pay) {
				canSelectBankType = 1;
			} else {
				canSelectBankType = 2;
			}
			var bankType=null;
			if(cannel.isChooseBank==2){
				bankType=0;
			}else if(cannel.isChooseBank==3){
				bankType=1;
			}
			selectBankCardComponent.show(selectBankCallback, smsSuer, reSendSMS, bankType, canSelectBankType,cannel);
		} else {
			//匿名支付
			$App.go({
				path: "/app_core/services/pay_service/page/input_bank_card.html",
				query: {
					aisleId: cannel.aisleId,
					orderNo: orderNo,
					scenesId: scenesId,
					remark: remark,
					hasNav: false
				}
			});
		}
	}

	/**
	 * 易宝支付
	 * @param {Object} scenesId 场景Id
	 * @param {Object} cannel 通道
	 * @param {Object} amount 金额
	 * @param {Number} userRoleType 用户角色类型 0.用户 1.商户
	 */
	function ybPay(scenesId, cannel, amount, userRoleType, options) {

		$.post($App.ApiRoot + "/yb/goPay", {
			userId: $App.UserInfo().userId,
			amount: amount,
			type: cannel.aisleType == PayCannelTypeEnum.YBScan ? "W" : "B",
			aisleId: cannel.aisleId,
			scenesId: scenesId
		}, function (result, status, xhr) {
			if (result.status != 0) {
				return false;
			}
			if (cannel.aisleType == PayCannelTypeEnum.YBScan) {
				$App.go({
					path: "/app_core/services/pay_service/page/pay_qr_code_page.html",
					query: {
						userRoleType: userRoleType,
						hasNav: false
					},
					params: {
						qrData: result.data.url
					}
				});
			} else {
				var index = $App.loading("正在支付中...");
				// 通知Native开始注入
				if (cannel.webPayInjectCode) {
					$HyApp.excute("HYAInjectWebView", "start", {
						contentCode: cannel.webPayInjectCode
					}, function (result) {
						if (result.status != 0) {
							$App.msg(result.msg);
							return false;
						}
					});
				}
				setTimeout(function () {
					$App.alert("支付确认", function () {
						$App.closeLoding(index);
						options.userConfirmComplete(cannel);
						return true;
					});
				}, delayShowTime);
				//跳转到支付页面
				window.location.href = result.data.url;
			}
		});
	}
}

/**
 * 
 * 查询订单支付状态
 * 
 * 2017-03-29 19:53:35 
 * @author PS
 * @param {String} orderNo 订单编号
 * @param {Function} callback(data) data:1未支付 3支付失败 4支付成功 5代扣
 */
function httpQueryOrderPayStatus(orderNo, callback) {
	$.post($App.ApiRoot + "/pay/queryOrderPayStatus", {
		orderNo: orderNo
	}, function (result, status, xhr) {
		if (result.status != 0) {
			return false;
		}
		callback(result.data);
	});
}

module.exports = PayService;