
var h5DirectAppUrl = require("app_core/services/app_router/h5_direct_app_enum");

var h5DirectApp = {
		goDirectBuy: function(obj) { //跳转直接买单
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].directBuyUrl;
			if(h5DirectAppUrl.platform === 'android') {
				var tradeInfo = {
					'className': 'com.shoufu.platform.entity.TradeInfo',
					'shopHeadPic': obj.psHeadUrl, //动态获取
					'shopName': obj.psName, //动态获取
					'paymentUserId': obj.userId, //psUserId
					'incomeUserId': obj.userId,
					'scenesId': '07571db6-a5aa-4872-bca8-e5aa4d6ccfe8'
				}
				var tradeInfoStr = encodeURIComponent(JSON.stringify(tradeInfo));
				tradeInfoStr = '?tradeInfo=' + tradeInfoStr;
				_url = _url + tradeInfoStr;
			} else {
				var store = {
					'psUserId': obj.userId, //商户用户Id 
					'psName': obj.psName, //收款标题 
					'psHeadUrl': obj.psHeadUrl //商户图片
				}
				var storeStr = encodeURIComponent(JSON.stringify(store));
				storeStr = '?store=' + storeStr;
				_url = _url + storeStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},       
		//跳转收吧
		goCollectMoney:function(obj){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].collectMoneyUrl;
			if(h5DirectAppUrl.platform === 'ios') {
		      var param = 'psUserId=' + encodeURIComponent(obj.userId) + '&userId='+ encodeURIComponent(obj.userId);
			  _url = _url + '?' + param;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转余额
		goBalance:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].balanceUrl;
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转账单
		goBill:function(obj){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].billUrl;
			if(h5DirectAppUrl.platform === 'ios') {
				var category = {
					'billCategoryId':obj.billCategoryId,
					'billCategoryName':obj.billCategoryName
			}
			var categoryStr = encodeURIComponent(JSON.stringify(category));
//			var locationStr = '?category=' + categoryStr +'&isH5=true';
			var locationStr = '?category=' + categoryStr;
			_url = _url + locationStr;
			} else {  
				//var locationStr = '?type=1&default_key_word=' + encodeURIComponent(obj.billCategoryName) +'&default_category_id='+encodeURIComponent(obj.billCategoryId) + '&need_jump=true';
				var locationStr = '?type=1&default_key_word=' + encodeURIComponent(obj.billCategoryName) +'&default_category_id='+encodeURIComponent(obj.billCategoryId);
				_url = _url + locationStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		goBillAll:function(obj){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].billUrl;
//			if(h5DirectAppUrl.platform === 'ios') {
//				var category = {
//					'billCategoryId':obj.billCategoryId,
//					'billCategoryName':obj.billCategoryName
//			}
//			var categoryStr = encodeURIComponent(JSON.stringify(category));
//			var locationStr = '?category=' + categoryStr;
//			_url = _url + locationStr;
//			} else {
//				var locationStr = '?type=1&default_key_word=' + encodeURIComponent(obj.billCategoryName) +'&default_category_id='+encodeURIComponent(obj.billCategoryId);
//				_url = _url + locationStr;
//			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转首页
		goIndex:function (){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].indexUrl;
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转登录
		goLogin:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].loginUrl;
			if(h5DirectAppUrl.platform === 'android') {
				_url = _url + '?is_relogin=true';
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转实名认证		
		goRealName:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].realNameUrl;
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转视频认证
		goVideoValidation:function(obj){
			//视频认证
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].videoValidationUrl;
			if(h5DirectAppUrl.platform === 'android') {
				var userVideoStatusInfo = {
					className:'com.shoufu.platform.entity.mine.UserVideoStatusInfo',
					action:obj.action,
					continuedTime:obj.continuedTime,
					userServerPic:obj.userServerPic,
					userServerVideo:obj.userServerVideo,
					userUrgent:obj.userUrgent,
					videoStatus:obj.videoStatus,
					videoAction:obj.videoAction,
					videoHint:obj.videoHint,
					videoStatement:obj.videoStatement,
					msg:obj.msg
				}
				var userVideoStatusInfoStr = encodeURIComponent(JSON.stringify(userVideoStatusInfo));
				userVideoStatusInfoStr = '?userVideoStatusInfo=' + userVideoStatusInfoStr;
				_url = _url + userVideoStatusInfoStr;
			}
			else{
				_url = _url + '?action='+ encodeURIComponent(obj.action) +'&userUrgent='+encodeURIComponent(obj.userUrgent) + '&continuedTime=' + encodeURIComponent(obj.continuedTime);
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//商家入驻
		goBeMerchant:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].beMerchantUrl;
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//选择服务商
		goChooseServer:function(obj){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].chooseServerUrl;
			if(h5DirectAppUrl.platform === 'android') {
				//服务商信息
				var serverInfo = {
					className:'com.shoufu.platform.entity.merchant.ServerInfo',
					serverUserId:obj.serverUserId,
					serverType:obj.serverType,
					serverPhone:obj.serverPhone,
					serverRealName:obj.serverRealName,
					serverHeadPic:obj.serverHeadPic
				}
				var serverInfoStr = encodeURIComponent(JSON.stringify(serverInfo));
				serverInfoStr = '?serverInfo=' + serverInfoStr;
				_url = _url + serverInfoStr;
			} 
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//选择临时服务商
		goChooseTempServer:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].chooseTempServerUrl;
			if(h5DirectAppUrl.platform === 'ios') {
				_url = _url + '?bFromCheques=1';
			} 
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//易宝银行卡列表
		goYBBankCard:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].yBBandCardUrl;
			if(h5DirectAppUrl.platform === 'ios') {
				var locationStr = '?bYBBankCard=1';
				_url = _url + locationStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//融宝储蓄卡列表
		goRBBankCard:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].rBBandCardUrl;
			if(h5DirectAppUrl.platform === 'android') {
				var locationStr = '?type=0';
				_url = _url + locationStr;
			}
			else{
				var locationStr = '?bOnlyShowCXCard=1';
				_url = _url + locationStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//融宝储蓄卡和信用卡列表
		goRBBankCardAll:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].rBBandCardUrl;
			if(h5DirectAppUrl.platform === 'ios') {
				var locationStr = '?bOnlyShowCXCard=0';
				_url = _url + locationStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转到 升级服务商
		goMerchantUpgradeUrl:function(obj){
			var _url = h5DirectAppUrl.ios.merchantUpgradeUrl;
			_url = _url + '?__userid=' + encodeURIComponent(obj.userId) + '&__token=' + encodeURIComponent(obj.token) + '&__projectName=' + encodeURIComponent(obj.projectName);
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		
		//跳转经营管理首页
		goDealerManageIndex:function(obj){
			var _url = h5DirectAppUrl.ios.dealerManageUrl;
			_url = _url + '?__userid=' + encodeURIComponent(obj.userId) + '&__token=' + encodeURIComponent(obj.token);
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转到易宝银行卡添加
		goYBBankAdd:function(){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].addYBBankUrl;
			if(h5DirectAppUrl.platform === 'ios') {
				var locationStr = '?bYBBankCard=1&bIsGetMoney=0';
				_url = _url + locationStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转到融宝银行卡添加
		// android 可以通过参数来判断添加什么类型的银行卡 type = 0储蓄卡  1信用卡  不传则所有
		goRBBankAdd:function(type){
			var _url = h5DirectAppUrl[h5DirectAppUrl.platform].addRBBankUrl;
			if(h5DirectAppUrl.platform === 'android') {
				if(type){
					var locationStr = '?type='+type;
					_url = _url + locationStr;
				}
			}
			else{
				var locationStr = '?bYBBankCard=0&bIsGetMoney=0';
				_url = _url + locationStr;
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		},
		//跳转到实体店认证
		gostoreAuth:function(opt){
			var _url = '';
			if(h5DirectAppUrl.platform === 'ios') {
				if(opt.lastAuthStatus == 0){
					_url = h5DirectAppUrl.ios.storeAuthUrl;
				}
				else{
					_url = h5DirectAppUrl.ios.storeAuthCommitedUrl;
				}

				var storeInfoStr = encodeURIComponent(JSON.stringify(opt));
				storeInfoStr = '?shopMsgModel=' + storeInfoStr;
				_url = _url + storeInfoStr;
			}
			else{ //android分为两个页面 提交过审核和未提交过审核
				if(opt.lastAuthStatus == 0){
					_url = h5DirectAppUrl.android.storeAuthUrl;
				}
				else{
					_url = h5DirectAppUrl.android.storeAuthCommitedUrl;
				}
			}
			var _query = {
				path: _url
			}
			$App.go(_query);
		}
}




module.exports = h5DirectApp;


