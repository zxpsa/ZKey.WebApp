<style lang="css">
	._vuec {
		background-color: #F5F5F5;
		margin-top: 10px;
		position: relative;
	}
	
	.sl-content {
		background-color: white;
	}
	
	._vuec .sl-title {
		padding-left: 17px;
		padding-right: 17px;
		height: 49px;
		border-bottom: 1px dotted #333333;
		/*no*/
		padding-top: 12px;
		padding-bottom: 12px;
		position: relative;
	}
	
	._vuec .sl-checkbox {
		height: 100%;
		float: left;
		margin-right: 9px;
		vertical-align: middle;
	}
	
	._vuec .sl-checkbox span {
		height: 17px;
		width: 17px;
		position: relative;
		top: 50%;
		margin-top: -8.5px;
		background-image: url('../img/icon10.png');
		background-size: contain;
		display: block;
	}
	
	._vuec .sl-checkbox.active span {
		background-image: url('../img/icon9.png');
	}
	
	._vuec .sl-title .sl-title-text {
		float: left;
		margin-left: 16px;
		font-size: 13px;
		font-weight: bold;
		line-height: 24px;
		height: 100%;
	}
	
	._vuec .sl-title .sl-tags {
		float: left;
		height: 100%;
		width: auto;
		line-height: 23px;
		padding-left: 4.5px;
		padding-right: 4.5px;
	}
	
	._vuec .sl-title .sl-tags span {
		float: left;
		width: 15px;
		height: 15px;
		display: block;
		background-size: contain;
		margin-top: 4.5px;
	}
	
	._vuec .sl-title .sl-title-r {
		float: left;
		background-size: 100% 100%;
		background-image: url('../img/icon8.png');
		height: 100%;
		width: 29px;
	}
	
	.sl-tags .company {
		background-image: url('../img/icon11.png');
	}
	
	._vuec .sl-title .ui-avatar {
		height: 23px;
		width: 23px;
		float: left;
	}
	
	._vuec .sl-title .sl-edit-btn {
		height: 100%;
		float: right;
		font-size: 12px;
		line-height: 24px;
	}
	
	._vuec .shop-row {
		padding-left: 17px;
		padding-right: 17px;
		height: 91px;
	}
	
	._vuec .shop-row .shop-img {
		float: left;
		width: 70px;
		height: 100%;
		position: relative;
	}
	
	._vuec .shop-row .shop-img-block {
		position: absolute;
		top: 50%;
		margin-top: -35px;
		width: 70px;
		height: 70px;
		background-color: green;
	}
	
	._vuec .shop-row .shop-detail {
		float: left;
		padding-left: 9.5px;
		padding-top: 10px;
		padding-bottom: 10px;
		width: 239px;
		height: 100%;
		position: relative;
	}
	
	._vuec .shop-row .shop-title {
		font-size: 13px;
		float: left;
	}
	
	._vuec .shop-row .shop-pc {
		width: 100%;
		height: auto;
		position: absolute;
		float: left;
		bottom: 10px;
	}
	
	._vuec .shop-price {
		font-size: 17px;
		float: left;
		font-weight: bold;
		color: #ff2626;
	}
	
	._vuec .shop-row .shop-count {
		float: right;
		font-size: 12px;
		line-height: 24px;
		color: #A0A0A0;
	}
	
	._vuec .tools-btns {
		position: absolute;
		bottom: 0px;
		background-color: white;
		height: 49px;
		width: 100%;
		line-height: 49px;
		text-align: right;
	}
	
	._vuec .tools-btns .pay {
		float: right;
		width: 140px;
		text-align: center;
		color: white;
		background-color: #F8BF36;
		margin-left: 10px;
	}
	
	._vuec .tools-btns .pay span {
		background-image: url('img/icon11.png');
		background-color: red;
		width: 25px;
		height: 25px;
	}
	
	._vuec .tools-btns .pay:active {
		background-color: #FFDB99;
	}
</style>
<template lang="html">
	<div class="_vuec">
		<div class="sl-content">
			<div class="sl-title">
				<div class="sl-checkbox active">
					<span></span>
				</div>
				<div class="ui-avatar">
					<span style="background-image:url(http://placeholder.qiniudn.com/100x100);"></span>
				</div>
				<div class="sl-title-text">
					达人美
				</div>
				<div class="sl-tags">
					<span class="company"></span>
				</div>
				<div class="sl-title-r">&nbsp;</div>
				<div class="sl-edit-btn">编辑</div>
			</div>
			<div class="shop-row zk-border-b">
				<div class="sl-checkbox active">
					<span>&nbsp;</span>
				</div>
				<div class="shop-img">
					<div class="shop-img-block">
						<img src="../../common/imgs/browser.png" />
					</div>
				</div>
				<div class="shop-detail">
					<div class="shop-title">
						泰国...爱的回复可见啊都是风景
					</div>
					<div class="shop-pc">
						<span class="shop-price">
								<span>&#165;</span><span>389.00</span><span>-</span><span>460.00</span>
						</span>
						<span class="shop-count">X1</span>
					</div>
				</div>
			</div>
			<div class="shop-row zk-border-b">
				<div class="sl-checkbox active">
					<span>&nbsp;</span>
				</div>
				<div class="shop-img">
					<div class="shop-img-block">
						<img src="../../common/imgs/browser.png" />
					</div>
				</div>
				<div class="shop-detail">
					<div class="shop-title">
						都是风泰国...爱风景泰国...爱风景泰国...爱风景泰国......爱
					</div>
					<div class="shop-pc">
						<span class="shop-price">
								<span>&#165;</span><span>389.00</span><span>-</span><span>460.00</span>
						</span>
						<span class="shop-count">X1</span>
					</div>
				</div>
			</div>
		</div>
		<div class="tools-btns" style="display: none;">
			共2件商品 合计：
			<div class="pay">
				<span></span> 结算
			</div>
			<span class="shop-price" style="float: right;">
					<span>&#165;</span><span>389.00</span>
			</span>
		</div>
	</div>
</template>
<script lang="js">
	'use strict';
	module.exports = {
		//数据模型
		data:function(){
			return {
				
			}
		},
		components: {
			
		},
		methods: {
			
		}
	}
</script>