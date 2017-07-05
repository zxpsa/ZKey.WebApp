function ZKLog(){
    
// $App.Debug 0.关闭 1.错误级别 2.业务详细日志 3.框架详细日志
    window.onerror = function(errorMessage, scriptURI, lineNumber) {
        var s= JSON.stringify(arguments); 
        alert(s);
    }
}