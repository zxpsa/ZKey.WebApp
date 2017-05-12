define('app_core/services/zk_shared', function(require, exports, module) {
	module.exports = function Shared(){
		var self=this;
		
		/**
		 * 分享类型枚举
		 */
		self.TypeEnum = {
			/**
			 * QQ
			 */
			QQ:1,
			/**
			 * 微信好友
			 */
			WX:2,
			/**
			 * 微信朋友圈
			 */
			WXCircle:3,
			/**
			 * 分享到短信
			 */
			SMS:4,
			/**
			 * 分享复制链接
			 */
			CopyLink:5,
			/**
			 * 分享二维码
			 */
			QR:6,
			/**
			 * QQ空间
			 */
			QQSpace:7
		};
		
		/**
		 * 发起分享
		 * 
		 * @param {TypeEnum} type 分享类型
		 * @param {String} title 分享标题
		 * @param {String} imgURL 分享图片地址
		 * @param {String} content 分享内容
		 * @param {String} clickURL 点击文本块后访问地址
		 * @param {Function} sucess 分享成功回调
		 * @param {Function} error 分享失败回调
		 */
		self.excute = function(type,title,imgURL,content,clickURL,sucess,error){
			if ($Config.isHyApp) {
				//调用
				cordova.exec(sucess,error, "Shared", "toQQ", [type,title,imgURL,content,clickURL]);	
			}
		}
		
		/**
		 * 发起分享by内容code
		 * @param {TypeEnum} type 分享类型
		 * @param {String} code 分享编号
		 * @param {Function} sucess 分享成功回调
		 * @param {Function} error 分享失败回调
		 */
		self.excuteByContentCode = function(type,code,sucess,error){
			if ($Config.isHyApp) {
				//调用
				cordova.exec(sucess,error, "Shared", "toQQ", [type,title,imgURL,content,clickURL]);	
			}
		}		
	}
});