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
</style>
<template lang="html">
    <div class="_vuec">
        <div>b页面</div>
        <div @click="testClick()">按钮</div>
        <div @click="toAPage()">返回到a页面</div>
        <div @click="toAPage1()">跳转到a页面 无导航栏</div>
        <div @click="toAPage2()">跳转到baidu页面 有导航栏</div>
        <div v-text="msg"></div>
    </div>
</template>
<script lang="es">
    const methods = {testClick, toAPage, toAPage1, toAPage2 };
    export default { data, mounted, methods,refresh }

    function data() {
        return {
            msg: null
        };
    }

    function mounted() {
        // this.setTimeOut(2000).then(() => this.msg = 2000);
        // this.msg = $App.getPageParam('test');
    }

    function refresh() {
        console.log('调用刷新方法');
        this.msg = $App.getPageParam('test');
    }

    function testClick() {
        console.log(113);
                                                            
    }

    function toAPage() {
        $App.go(-1);
    }

    function toAPage1() {
        $App.go({
            path:'/test/a',
            query:{
                '_zknav':'no'
            }
        });
    }

    function toAPage2(params) {
        $App.go({
            path:'http://www.baidu.com'
        });
    }

</script>