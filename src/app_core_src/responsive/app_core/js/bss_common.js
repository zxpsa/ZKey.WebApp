/**
 * 业务公共类
 * 作者：PS    
 * 日期：2016-12-02
 * @require ../index.js
 */
/**
 * 获取通用字典
 * @param {String} key
 * @param {String} phraseKey
 * @param {Function} calback(val)
 * @param {Boolean} needConstantly 是否需要实时数据
 */
$App.getDictionary=function(dictKey,phraseKey,calback,needConstantly){
	if (typeof phraseKey=="function") {
		calback=phraseKey;
		phraseKey=null;
	}
	var local=$App.dataCenter.Dictionary;
	if (local[dictKey]&&!needConstantly) {
		if (phraseKey) {
			calback(local[dictKey][phraseKey]);
		}else{
			calback(local[dictKey]);
		}
	}else{
		$.post($App.ApiRoot + "/Common/getDictionarysByKey", {
			dictionaryKey: dictKey
		}, function(result, status, xhr) {
			if(result.status != 0) {
				return false;
			}
			local[dictKey]=result.data;
			if (phraseKey) {
				calback(local[dictKey][phraseKey]);
			}else{
				calback(local[dictKey]);
			}
		});
	}
}
