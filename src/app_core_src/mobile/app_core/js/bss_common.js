/**
 * 业务公共类
 * 作者：PS    
 * 日期：2016-12-02
 */
/**
 * 获取通用字典
 * 短语key存在则返回具体内容,短语Key不存在则直接返回字典对应短语列表
 * @param {String} key
 * @param {String} phraseKey
 * @param {Function} calback(val)
 */
$App.getDictionary = function (dictKey, phraseKey, calback, needConstantly) {
	if (typeof phraseKey == "function") {
		calback = phraseKey;
		phraseKey = null;
	}
	$.post($App.ApiRoot + "/operator/getDictionaryItemList?_t="+Math.random()*10000, {
		dictionaryCode: dictKey
	}, function (result, status, xhr) {
		if (result.status != 0) {
			return false;
		}
		var data;
		var array = result.data;
		if (phraseKey) {
			for (var index = 0; index < array.length; index++) {
				var item = array[index];
				if (item.itemCode == phraseKey){
					data = item;
					break;
				} 
			}
		} else {
			data = array;
		}
		if (phraseKey) {
			calback(data);
		} else {
			calback(data);
		}
	});
}

/**
 * 获取内容配置By分类Code
 * @param {String} code
 * @param {Function} calback(val)
 */
$App.getContentByCategoryCode = function (code, calback) {
	$.post($App.ApiRoot + "/operator/getContentListByCategoryCode", {
		categoryCode: code
	}, function (result, status, xhr) {
		if (result.status != 0) {
			return false;
		}
		calback(result.data);
	});
}

/**
 * 获取内容配置
 * @param {String} code
 * @param {Function} calback(val)
 */
$App.getContent = function (code, calback) {
	$.post($App.ApiRoot + "/operator/getContentByContentCode", {
		contentCode: code
	}, function (result, status, xhr) {
		if (result.status != 0) {
			return false;
		}
		calback(result.data);
	});
}
