<style lang="css">
    ._vuec button {

    }
</style>
<template lang="html">
    <div class="_vuec">
        <div>index</div>
    </div>
</template>
<script lang="es">
    // 加载demo_enumjs
    import DemoEnum from '../enum/demo_enum';
    const methods = { testClick };
    export default { data, created, beforeRouteEnter, refresh, methods, beforeRouteLeave }
    // 视图模型
    function data() {
        return {
            msg: null,
            count: 1
        };
    }
    // 页面初始化(必写)
    function created() {
        console.log(DemoEnum);
        // 页面初始化完成时处理
        // 注:该方法仅初次进入该页面时会被调用
        this.refresh();
    }

    // 刷新页面(必写)
    function refresh() {
        // 刷新数据时进行处理
        // 1.返回该页面时(需要刷新时)
        // 2.该页面被复用时
    }

    // 绑定方法
    function testClick() {
        console.log(this);
    }

    // 进入页面时处理(可选实现)
    function beforeRouteEnter(to, from, next) {
        // 一般为绑定事件等进行处理
        next((vm) => { });
    }

    // 离开页面时处理(可选实现)
    function beforeRouteLeave(to, from, next) {
        // 一般为解绑事件等进行处理
        // 以及其他在离开该页面时需要进行的相应回收处理
        next();
    }
</script>