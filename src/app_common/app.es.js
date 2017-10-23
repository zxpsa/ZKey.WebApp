/**
 * 应用全局控制中心
 * 2017-08-01 00:19:38 
 * @author PS
 */
(function (win,App,Config,G) {

	Vue.mixin({
		beforeRouteEnter: function (to, form, next) {
			//非定制分享页进行通用验签
			next(function(vm){
				
			});
		},
		beforeRouteLeave:function(to,from,next){
			next();
		}
	});

	var debug = G.getUrlParam('debug');
	if (debug) App.Debug = debug;


	
})(window,$App,$Config,$G);