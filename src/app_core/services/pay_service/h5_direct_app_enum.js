var h5DirectAppUrl = {
			android: {
				directBuyUrl: 'XSFAPP://com/shoufu/platform/activity/pay/FacePayActivity', //直接买单
				collectMoneyUrl: 'XSFAPP://com/shoufu/platform/activity/shouba/ShoubaCollectionActivity', //收吧
				balanceUrl: 'XSFAPP://com/shoufu/platform/activity/mine/MyBalanceActivity', //余额
				billUrl: 'XSFAPP://com/shoufu/platform/activity/bill/BillActivity', //账单
				indexUrl: 'XSFAPP://com/shoufu/platform/activity/main/HomeActivity', //首页
				loginUrl:'XSFAPP://com/shoufu/platform/activity/login/LoginActivity', //登录页
				realNameUrl:'XSFAPP://com/shoufu/platform/activity/auth/IDAuthActivity', //实名认证
				videoValidationUrl:'XSFAPP://com/shoufu/platform/activity/auth/FirstOutAuthActivity',  //视频认证
				beMerchantUrl:'XSFAPP://com/shoufu/platform/activity/merchant/BeMerchantActivity',//成为商户
				chooseServerUrl:'XSFAPP://com/shoufu/platform/activity/auth/ReSelectServerActivity',//选择服务商
				chooseTempServerUrl:'XSFAPP://com/shoufu/platform/activity/mine/SelectTempServerMerchantActivity', //选择临时服务商
				yBBandCardUrl:'XSFAPP://com/shoufu/platform/activity/mine/YBBankCardListActivity',//易宝银行卡
				rBBandCardUrl:'XSFAPP://com/shoufu/platform/activity/left/BankCardListActivity',//融宝银行卡
				merchantUpgradeUrl:$App.OperWebRoot +'/personalnformation.html', //升级服务商
				dealerManageUrl:$App.OperWebRoot +'/dealerManage.html',  //经营管理首页
				addYBBankUrl:'XSFAPP://com/shoufu/platform/activity/mine/YBBankCardAddActivity', //添加易宝银行卡（只有储蓄卡）
				addRBBankUrl:'XSFAPP://com/shoufu/platform/activity/left/BankCardAddActivity', //添加融宝银行卡
				storeAuthUrl:'XSFAPP://com/shoufu/platform/activity/store/StoreAuthActivity', //实体店审核已经提交过认证
				storeAuthCommitedUrl:'XSFAPP://com/shoufu/platform/activity/store/StoreAuthCommitedActivity' //实体店审核已经提交过认证
			},
			ios: {
				directBuyUrl: 'XSFAPP://ClassName/XSFDirectPayController',
				collectMoneyUrl: 'XSFAPP://ClassName/XSFSBMoneyViewController',
				balanceUrl: 'XSFAPP://ClassName/XSFMyBalanceViewController',
				billUrl: 'XSFAPP://ClassName/XSFMyBillController',
				indexUrl: 'XSFAPP://ClassName/XSFHomeController',
				loginUrl:'XSFAPP://ClassName/XSFLoginViewController',
				realNameUrl:'XSFAPP://ClassName/XSFRealNameUploadViewController',
				videoValidationUrl:'XSFAPP://ClassName/XSFVideoSubmitViewController',
				beMerchantUrl:'XSFAPP://ClassName/XSFTobeBusinessViewController',
				chooseServerUrl:'XSFAPP://ClassName/XSFEditForeverBusinessViewController',
				chooseTempServerUrl:'XSFAPP://ClassName/XSFEditForeverBusinessViewController',
				yBBandCardUrl:'XSFAPP://ClassName/XSFMyBankCardViewController',
				rBBandCardUrl:'XSFAPP://ClassName/XSFMyBankCardViewController',
				merchantUpgradeUrl:$App.OperWebRoot + '/personalnformation.html',
				dealerManageUrl:$App.OperWebRoot +'/dealerManage.html',
				addYBBankUrl:'XSFAPP://ClassName/XSFAddBankCardViewController',
				addRBBankUrl:'XSFAPP://ClassName/XSFAddBankCardViewController',
				storeAuthUrl:'XSFAPP://ClassName/XSFshopAuthenticationViewController',
				storeAuthCommitedUrl:'XSFAPP://ClassName/XSFShopAuthenticationStateViewController'
			},
			platform:$G.deviceInfo.isSystem.ios ? 'ios' : 'android'
		}

module.exports = h5DirectAppUrl;

//h5DirectAppUrl.platform =$G.deviceInfo.isSystem.ios ? 'ios' : 'android'; //平台信息

