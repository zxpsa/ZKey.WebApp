<style lang="css">
	._vuec div {
		border: 1px solid red;
	}
</style>
<template lang="html">
	<div class="_vuec">
		单页1111
		<div v-text=""></div>
		<input type="button" id="change" value="" />
	</div>
</template>
<script lang="js">
"use strict";
/**
 * 确认订单信息
 * 作者：PS    
 * 日期：2016-12-12
 */
module.exports = {
	//数据模型
	data: function(){
		return {
			
		};
	},
	components:{
//		shopOrderList:require('modules/shop/common/components/shop_order_list.vue')
	},
	methods: {
		addCount:function(){
			
		}
	},
	mounted:function(){
//		this.$store.registerModule('modules/demo/common/store',require('modules/demo/common/store'));
//		this.$store.commit('addCount');
//		var vm=this;
		console.log(this.$router);
		console.log(this.$route.params);
		console.log($App_SPA_Router);
//		console.log(vm.$route);
		setTimeout(function(){
			
//			console.log($App_SPA_Router.currentRoute);
		},1000);
	}
};
</script>
