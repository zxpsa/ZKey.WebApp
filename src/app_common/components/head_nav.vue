<style lang="css">
	._vuec {
		height: 44px;
		/* background-color:#FFFFFF; */
		background-color: #F95C50;
		line-height: 44px;
		font-size: 14px;
		text-align: center;
		position: relative;
		/* box-shadow:0px 1px 8px 1px #F1F6F6;
		-webkit-box-shadow: 0px 1px 8px 1px #F1F6F6;   */
	}
	
	._vuec .left-btns {
		position: absolute;
		height: 100%;
		z-index: 99;
	}
	
	._vuec .right-btns {
		position: absolute;
		height: 100%;
		right: 0px;
		z-index: 99;
	}
	
	._vuec .arrow-right {
		height: 100%;
		width: 26px;
		position: relative;
		float: left;
		margin-left: 12px;
	}
	
	._vuec .arrow-right> i {
		background-image: url('/app_common/img/icon/left_arrow1.png');
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
		height: 17px;
		width: 22px;
		top: 50%;
		margin-top: -7.5px;
		right: 0px;
		display: inline-block;
	}
	
	._vuec .back-btn {
		float: left;
		height: 100%;
		position: relative;
		padding-right: 6px;
	}
	._vuec .back-btn span{
		padding-left: 6px;
		display: inline-block;
		height: 100%;
	}
	
	._vuec .other-btn {
		float: left;
		padding-left: 5px;
		padding-right: 5px;
		position: relative;
	}
	
	._vuec .title-text {
		width: 100%;
		position: absolute;
		margin: 0 auto;
		font-size: 18px;
	}
	
	._vuec .right-btn {
		padding-left: 12px;
		padding-right: 12px;
		position: relative;
	}

	._vuec .title-search {
		width: 100%;
		height: 100%;
		position: absolute;
		margin: 0 auto;
		font-size: 18px;
		overflow: hidden;
	}

	._vuec .title-search > div{
		width: 100%;
		height: 100%;
		position: relative;
	}

	._vuec .title-search .main{
		width: 312px;
		height: 27.5px;
		line-height:27.5px;
		position: absolute;
		transform: translate(0,-50%);
		-webkit-transform: translate(0,-50%);
		top: 50%;
		left: 50px; 
		border-radius: 5px;
		font-size: 13px;
		color: #999999;
	}

	._vuec .title-search .main i{
		background-image: url("/app_common/img/icon/search.png");
		background-repeat: no-repeat;
		background-size: contain;
		display: inline-block;
		width: 14.5px;
		height: 15.5px; 
		vertical-align: middle;
		margin-right: 6px;
		
	}

	/* 风格2 */
	._vuec.sty-2{
		background-color:transparent;
		color:#FFFFFF;
		box-shadow: 0px 0px 0px 0px transparent;
		-webkit-box-shadow: 0px 0px 0px 0px transparent;  
	}
	._vuec.sty-2 .arrow-right> i{
		background-image: url('/app_common/img/icon/left_arrow_2.png');
	}
</style>
<template lang="html">
	<div>
		<div class="_vuec" :class="{'sty-2':type==2}">
			<div class="left-btns">
				<div class="back-btn" v-show="backBtn" @click="btnClick(backBtn)" v-html="backBtn.label"></div>
				<div class="other-btn" v-for="item in leftBtns" @click="btnClick(item)" v-html="item.label"></div>
			</div>
			<div class="title-search" v-show="type==1" @click="toSearch">
				<div>
					<div class="main zk-border">
						<i></i><span v-html="title"></span>
					</div>
				</div>
			</div>
			<div class="title-text" v-show="type!=1" v-html="title"></div>
			<div class="right-btns">
				<div class="right-btn" v-for="item in rightBtns" @click="btnClick(item)" v-html="item.label"></div>
			</div>
		</div>
	</div>
	
</template>
<script lang="js">
	'use strict';
	module.exports = {
		//数据模型
		data: function() {
			return {
				
			}
		},
		props: {
			// 导航栏类型 0.默认 1.通用搜索栏 2.透明默认型
			type:{
				type:Number,
				default:function(){
					return 0;
				}
			},
			title:{
				type:String,
				default:function(){
					return "";
				}
			},
			backBtn:{
				type:Object,
				default:function(){
					return {
						label:'<div class="arrow-right"><i></i></div>',
						key:"backBtn" 
					}
				}
			},
			leftBtns:{
				type:Array,
				default:function(){
					return [
//					{
//						label:"关闭",
//						key:"closeBtn"
//					}
					]
				}
			},
			rightBtns:{
				type:Array,
				default:function(){
					return [{
						label:"更多",
						key:"moreBtn"
					}]
				}
			},
			registerTitle: {
				type: String,
				default: function() {
					return "我也要开店";
				}
			}
		},
		methods: {
			btnClick:function(btn){
				if(btn.key=="backBtn"){
					$App.go(-1);
				}else if(btn.key=="closeBtn"){
					window.close();
				}
				this.$emit("btn-click",btn);
			},
			//前往搜索页面
			toSearch:function(){
				$App.go("/search");
			}
		}
	}
</script>