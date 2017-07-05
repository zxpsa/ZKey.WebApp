
function ZKCache() {
    var _self = this;
    var cache = $G.Session();
    var cacheData = cache.get("ZKCache");
    if(!cacheData){
        cacheData = {
           nowReloadCount:0 
        };
        cache.set("ZKCache",cacheData);
    }
   /**
    * 检测H5版本是否为最新若版本不是最新则尝试重载Html
    * @param {String} h5Version H5版本号
    */
    _self.checkH5Version = function (h5Version) {
        if(!$App.ProjectName||$Config.Env=="Dev")return false;
        $App.getDictionary("XSF_Version_"+$App.ProjectName,"WebApp_Version",function(result){
            if(!result)return false;
            var nowVerNum = parseInt(h5Version);
            var WebAppVersionNum = parseInt(result.value);
            if(isNaN(WebAppVersionNum)) return false;
            var session=$G.Session();
            if(nowVerNum < WebAppVersionNum){
                //单次最多尝试三次进行刷新
                if (cacheData.nowReloadCount<3) {
                    //强制刷新
                    $App.go(0);
                    cacheData.nowReloadCount++;
                    cache.set("ZKCache",cacheData);
                }
            };
        });
    }
}