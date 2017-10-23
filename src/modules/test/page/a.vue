<style lang="css">
    ._vuec>div {
        margin: 10px;
        background-color: rebeccapurple;
        color: white;
        font-size: 30px;
        text-align: center;
        height: 100px;
        line-height: 100px;
    }

    ._vuec  > div > img{
        width: 100%;
        display: block;
        height: 100%;
    }
</style>
<template lang="html">
    <div class="_vuec">
        <div>a页面</div>
        <div @click="testClick()">按钮</div>
        <div @click="toBPage()">跳转到b页面</div>
        <div v-text="msg"></div>
        <div> <img src="http://img.taopic.com/uploads/allimg/120727/201995-120HG1030762.jpg" alt=""></div>
        <div @click="testQR1()">弹出个人二维码</div>
        <div @click="testQR2()">弹出商户二维码</div>
        <div @click="testQR3()">弹出店铺首页or兴店二维码</div>
        <div @click="testQR9()">通用支付二维码</div>
    </div>
</template>
<script lang="es">
    const methods = { testClick, toBPage,testQR1,testQR2,testQR3, testQR9 };
    export default { data,created ,mounted, methods, beforeRouteEnter,beforeRouteLeave}
    
    function data() {
        return {
            msg: null,
            count:1
        };
    }
    // 页面初始化
    function created() {
        
    }
    
    function beforeRouteEnter(to, from, next) {
        next((vm)=>{
            console.log('路由进入');
            // console.log(from);
            // vm.count=0;
        });
    }
 
    function beforeRouteLeave(to, from, next) {
        // console.log(to);
        // console.log(from);
        // this.$destroy();
        // console.log(next);
        next();
    }

    function mounted() {
        let _t=this;
        function changeVal() {
            _t.setTimeOut(1000).then(() => {
                _t.msg = _t.count;
                _t.count++;
                changeVal();
                // document.addEventListener('pops')
                // popstate
                // console.log($ZKRoute.history);            
            });
        }
        changeVal();
    }

    function testClick(aa) {
        console.log(113);

    }

    function toBPage() {
        $App.go('/test/b');
        // window.location.href=$App.RootUrl+'#/test/b';
    }

    function  testQR1() {
        $HyApp.excute("HYAQR", "show", {
            title: 'titl',
            titleImgUrl:'',
            centerImgUrl:'',
            type:1,
            content:'http://www.baidu.com',
            prompt0:'标题第二行类标签提示',
            prompt1:'二维码下方提示 / 保存提示',
            prompt2:'二维码下方按钮提示',
            color:'#FF0000'
		});	
    }

    function testQR2() {
        $HyApp.excute("HYAQR", "show", {
            title: 'titl',
            titleImgUrl:'',
            centerImgUrl:'',
            type:2,
            content:'http://www.baidu.com',
            prompt0:'标题第二行类标签提示',
            prompt1:'二维码下方提示 / 保存提示',
            prompt2:'二维码下方按钮提示',
            color:'#FF0000'
		});	
    }

    function testQR3() {
        $HyApp.excute("HYAQR", "show", {
            title: 'titl',
            titleImgUrl:'',
            centerImgUrl:'',
            type:3,
            content:'http://www.baidu.com',
            prompt0:'标题第二行类标签提示',
            prompt1:'二维码下方提示 / 保存提示',
            prompt2:'二维码下方按钮提示',
            color:'#FF0000'
		});	
    }

    function testQR9() {
        $HyApp.excute("HYAQR", "show", {
            title: 'titl',
            titleImgUrl:'',
            centerImgUrl:'',
            type:9,
            content:'http://www.baidu.com',
            prompt0:'标题第二行类标签提示',
            prompt1:'二维码下方提示 / 保存提示',
            prompt2:'二维码下方按钮提示',
            color:'#FF0000'
		});	
    }



        // var a     = 123;
        // var basda = 231;
        // var c = a;
</script>