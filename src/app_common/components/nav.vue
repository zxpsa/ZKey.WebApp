<style lang="css">
	._vuec {
		height: 46px;
		background-color: white;
		line-height: 46px;
		font-size: 14px;
		text-align: center;
		position: relative;
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
	}
	
	._vuec .arrow-right> i {
		background-image: url('/app_common/img/icon/left_arrow.png');
		background-repeat: no-repeat;
		background-size: contain;
		position: absolute;
		height: 18px;
		width: 18px;
		top: 50%;
		margin-top: -9.5px;
		right: 0px;
		float: right;
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
	
	._vuec .arrow-right:active,
	._vuec .back-btn:active,
	._vuec .right-btn:active,
	._vuec .other-btn:active {
		background-color: #999999;
	}
</style>
<template lang="html">
	<div >
		<div class="_vuec">
			<div class="left-btns">
				<div class="back-btn" v-show="backBtn" @click="btnClick(backBtn)" v-html="backBtn.label"></div>
				<div class="other-btn" v-for="item in leftBtns" @click="btnClick(item)" v-html="item.label"></div>
			</div>
			<div class="title-text" v-html="title"></div>
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
			title:{
				type:String,
				default:function(){
					return "臻臻";
				}
			},
			backBtn:{
				type:Object,
				default:function(){
					return {
						label:'<div class="arrow-right"><i></i></div><span>返回</span>',
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
					history.go(-1);
				}else if(btn.key=="closeBtn"){
					window.close();
				}
				this.$emit("btn-click",btn);
			}
		},
		components: {

		}
	}
</script>