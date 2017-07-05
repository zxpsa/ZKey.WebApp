function ZKAppInfo(_callback) {
    var _self = this;
    // debugger
    var info = {
        // 是否处于原生WebView中
        isInWebView: null,
        // 当前App版本字符串
        appVersion: null,
        // 当前App版本号
        appVersionNum: null,
        // 点钞音效 0关闭  1开启
        countingAudio: 0,
        // 收款音效 0关闭  1开启
        collectionAudio: 0
    };
    // 使用额外配置的App信息
    info = $G.objSetDefaultVal($App.Info, info);
    if (info.isInWebView) {
        //尝试调用App 公共初始设置接口 若调用失败 则不做任何处理
        $HyApp.excute("HYACommonCtrl", "init", {
            title:"兴手付",
            stopInjectJS:1
        });
        //尝试调用App 若调用失败 则默认按照支持的最低版本3.0.5运行
        $HyApp.excute("HYAMySetting", "get", null, function (result) {
            if (result.status != 0) {
                $log(result);
                return false;
            }
            info.countingAudio = result.data.countingAudio;
            info.collectionAudio = result.data.collectionAudio;
            info.appVersion = result.data.appVersion;
            var version = result.data.appVersion;
            var array = version.split(".");
            for (var index = 0; index < array.length; index++) {
                if (array[index].length < 2) {
                    array[index] = "0" + array[index];
                }
            }
            version = array.join("");
            version = parseInt(version);
            info.appVersionNum = version;
            _callback(info);
        }, function (code, desc) {
            info.appVersion = "3.0.3";
            info.appVersionNum = 30003;
            $log("尝试调用App获取App信息失败！视为老版本兼容处理！");
            _callback(info);
        });
    }else{
        info.appVersion = "3.0.5";
        info.appVersionNum = 30005;
        _callback(info);
    }
}