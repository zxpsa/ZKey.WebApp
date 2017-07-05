<style lang="css">
    ._vuec button,
    ._vuec a {
        width: 100%;
        height: 60px;
        display: block;
        margin: 5px auto;
        text-align: center;
        color: #FFFFFF;
        background-color: green;
        line-height: 60px;
    }
    ._vuec img{
        width: 260px;
        height: 100%;
        display: block;
        margin-left: 10px;
        color: #FFFFFF;
        float: left;
    }

    ._vuec .row{
        margin: 5px auto;
        width: 100%;
        height: 260px;
        display: block;
        color: #FFFFFF;
        background-color: green;
        line-height: 260px;
    }

    ._vuec  .row-content{
         height: auto;
    }

    ._vuec .row .text-row{
        line-height: 1.5;
    }
    
</style>
<template lang="html">
    <div class="_vuec" style="overflow:auto">
        <div style="display:none">
            <button type="button" @touchstart="startListenShake" @touchend="stopListenShake">摇一摇</button>
            <!--<button type="button" @touchmove="defaultTouchmove" @touchend="stopListenShake">摇一摇</button>-->
            <button type="button" @click="setNav">修改标题</button>
            <a href="http://www.baidu.com?target=_blank">默认跳转[内部跳转]</a>
            <a href="http://www.baidu.com" target="view_window">跳转新窗口 view_window[外部跳转]</a>
            <a href="http://192.168.9.2:11000/#/luck_draw/home" target="_blank">新开游览器 _blank[外部跳转]</a>
            <a href="http://www.baidu.com" target="_self">本文档层跳转 _self[内部跳转]</a>
            <a href="http://www.baidu.com" target="_top">顶级跳转 _top[内部跳转]</a>
            <button type="button" @click="openUrl">内部事件 href[内部跳转]</button>
            <button type="button" @click="openUrl1">内部事件 replace[内部跳转]</button>
            <button type="button" @click="openNewBrower">内部事件 open[外部跳转]</button>
       </div>
       <div style="display:none">
            <button type="button" @click="shared(1)">qq</button>
            <button type="button" @click="shared(2)">WX</button>
            <button type="button" @click="shared(3)">微信朋友圈</button>
            <button type="button" @click="shared(4)">短信</button>
            <button type="button" @click="shared(5)">复制链接</button>
            <button type="button" @click="shared(6)">二维码</button>
            <button type="button" @click="shared(7)">qq空间</button>
        </div>
        <div> 
            <a href="javascript:;" @click="openUrl('http://www.baidu.com?_zktg=_self')">内部跳转</a>
            <a href="javascript:;" @click="openUrl('http://www.baidu.com?_zktg=_close_blank')">外部跳转[关闭WebView]</a>
            <a href="javascript:;" @click="openUrl('http://www.baidu.com?_zktg=_blank')">外部跳转</a>
            <a href="javascript:;" @click="openUrl('http://www.baidu.com')">默认跳转</a>
            <a href="javascript:;" class="row">
                <img src="//qr.api.cli.im/qr?data=http%253A%252F%252Fd.xsfapp.com%253F_zktg%253D_self&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=c4aeeaad3e820db4cb86ea67255c0f9b" alt="">
                <span>内部跳转</span>
            </a>
            <a href="javascript:;" class="row">
                <img src="//qr.api.cli.im/qr?data=http%253A%252F%252Fd.xsfapp.com&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=08567d1e6a7b929fbec93c4848e42b12" alt="">
                <span>默认跳转</span>
            </a>
            <a href="javascript:;"  class="row">
                <img src="//qr.api.cli.im/qr?data=http%253A%252F%252Fd.xsfapp.com%253F_zktg%253D_blank&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=632ffa17a34ccec0b033c52ecb78ed33" alt="">
                <span>外部跳转</span>
            </a>
            <a href="javascript:;"  class="row">
                <img src="//qr.api.cli.im/qr?data=http%253A%252F%252Fd.xsfapp.com%253F_zktg%253D_close_blank&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=e0fd4ec78b32bcebed0802310cf4dd4f" alt="">
                <span>外部跳转[关闭]</span>
            </a>
            <a href="javascript:;" @click="micMonitorStart()">开始麦克风监听</a>
            <a href="javascript:;" @click="micMonitorStop()">停止麦克风监听</a>
            <div class="row row-content">
                <div class="text-row" v-for="item in content" v-text="item"></div>
            </div>
        </div>
    </div>
</template>
<script lang="js">
    'use strict';

    module.exports = {
        props: {
        },
        //数据模型
        data: function () {
            return {
                content:[]
            }
        },
        mounted: mounted,
        methods: {
            startListenShake: startListenShake,
            stopListenShake: stopListenShake,
            defaultTouchmove: defaultTouchmove,
            setNav: setNav,
            cs: cs,
            cs1: cs1,
            openNewBrower: openNewBrower,
            openUrl: openUrl,
            openUrl1: openUrl1,
            shared: shared,
            micMonitorStart:micMonitorStart,
            micMonitorStop:micMonitorStop

        },
        components: {
            // qrCode: require('app_core/services/qr_code_service/components/qr_code.vue')
        }
    }

    function mounted() {
        var vm = this;
        //    $HyApp.excute("HYAQR","show",{
        //             type:"1",
        //             titleImgUrl:"http://www.baidu.com",
        //             centerImgUrl:"http://www.baidu.com",
        //             title:"显示标题内容",
        //             content:"http://www.baidu.com",
        //             prompt0:"提示内容0：标题第二行类标签提示",
        //             prompt1:"提示内容1：二维码下方提示 / 保存提示",
        //             prompt2:"提示内容1：二维码下方提示 / 保存提示"
        //     },function(result){
        //         alert("成功的回调");
        //         alert(JSON.stringify(result));
        //     },function(result){
        //         alert(JSON.stringify(result));
        //     });
        // $App.go("/luck_draw/home");
        //【通知】麦克风通知
        $Observer.addObserver("hyaudio-mic-monitor-data", function (result) {
            vm.content.push(JSON.stringify(result));
        });
    }

    function startListenShake() {
        $HyApp.excute("HYAShakeMonitor", "start", null, function (result) {
            if (result.status != 0) {
                alert(result.status);
                return false;
            }
        }, function (result) {
            $log(result);
        });
    }

    function stopListenShake() {
        $log("关闭摇一摇");
        $HyApp.excute("HYAShakeMonitor", "stop", null, function (result) {
            if (result.status != 0) {
                alert("1" + result.msg);
                return false;
            }
        }, function (result) {
            $log(result);
        });
    }

    function setNav() {
        $HyApp.excute("HYACommonCtrl", "setNav", {
            title: "测试的标题" + Math.random() * 10000
        }, function (result) {
            if (result.ststus != 0) {
                return false;
            }
            // $log(result);
        }, function (result) {
            //    alert(result);
        });
    }

    //监听事件
    $Observer.addObserver("HYAShakeMonitorHasShake", function (result) {
        alert("收到摇一摇通知");
    });
    function cs() {
        $log("asdasd");
    }
    function cs1() {
        $log("asdasd1");
    }

    // 打开新游览器
    function openNewBrower() {
        try {
            window.open("http://www.baidu.com", "_blank");
        } catch (error) {
            $log(error);
        }

    }

    function openUrl(val) {
        //    window.location.href="http://www.baidu.com";
        window.location.href = val;
    }

    function openUrl1() {
        window.location.replace("http://www.baidu.com");
    }

    function defaultTouchmove(e) {
        try {
            alert(e);
            e.preventDefault();
        } catch (e) {
            $log(e);
        }

    }

    function shared(val) {
        $HyApp.excute("HYAShared", "excute", {
            type: val,
            title: "分享标题",
            imgURL: "http://img02.tooopen.com/images/20140504/sy_60294738471.jpg",
            content: "分享的内容",
            clickURL: "http://www.baidu.com"
        }, function (result) {
            if (result.status != 0) {
                return false;
            }
        }, function (result) {
            // $log(result);
        });
    }

    //麦克风监听开始
    function micMonitorStart(){
        var vm=this;
        $HyApp.excute("HYAAudio", "micMonitorStart", {
            sample:1000
        }, function (result) {
            if (result.status != 0) {
                return false;
            }
            alert("监听开始");
            vm.content.splice(0,vm.content.length);
        });
    }

    //麦克风监听结束
    function micMonitorStop(){
        $HyApp.excute("HYAAudio", "micMonitorStop",null, function (result) {
            if (result.status != 0) {
                return false;
            }
            alert("监听结束");
        });
    }



</script>