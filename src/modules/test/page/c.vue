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
        <div>c页面</div>
        <div @click="toA()">跳转到A页面 有导航栏</div>
        <div @click="toB()">跳转到B页面 有导航栏</div>
        <div @click="toB1()">跳转到B页面 返回跳转</div>
    </div>
</template>
<script lang="es">
    const methods = { toA,toB,toB1 };
    export default { data,created ,mounted, methods, beforeRouteEnter,beforeRouteLeave}
    
    function data() {
        return {
            msg: null,
            count:1
        };
    }
    function mounted() {
        
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

    function toB1(params) {
        $App.go({
            path:'/test/b',
            toHistory:true,
            isRefresh:true,
            params:{
                test:1
            }
        })
    }





    function toA() {
        $App.go('/test/a');
        // window.location.href=$App.RootUrl+'#/test/b';
    }

    function toB() {
        $App.go('/test/b');
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