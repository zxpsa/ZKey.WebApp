<style lang="css">
	._vuec {
		background-color: #F5F5F5;
	}
	
	._vuec .sl-content {
		background-color: white;
		padding-bottom: 49px;
	}
	
	._vuec .sl-title {
		padding-left: 9px;
		padding-right: 12px;
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
		line-height: 100%;
		width: 17.5px;
		margin-left: 5px;
		position: relative;
	}
	
	._vuec .sl-checkbox input[type="checkbox"] {
		height: 35px;
		width: 35px;
		padding: 0px;
		top: 50%;
		margin-top: -12px;
		left: 50%;
		margin-left: -12px;
		position: absolute;
		filter: alpha(opacity=0);
		-moz-opacity: 0;
		opacity: 0;
		z-index: 999;
	}
	
	._vuec .sl-checkbox label {
		content: "";
		display: block;
		height: 20px;
		width: 20px;
		position: absolute;
		top: 50%;
		margin-top: -9px;
		background-image: url('/modules/shop/common/img/icon/checking.png');
		background-size: contain;
		visibility: visible;
		z-index: 998;
	}
	
	._vuec .allselect-checkbox {
		margin-left: 14px;
		width: 60px;
	}
	
	._vuec .allselect-checkbox span {
		position: absolute;
		display: block;
		top: 50%;
		margin-top: -7px;
		width: 60px;
		font-size: 18px;
		font-weight: bold;
		color: #999999;
	}
	
	._vuec .sl-checkbox input[type="checkbox"]:checked+ label {
		background-image: url('/modules/shop/common/img/icon/checked.png');
	}
	
	._vuec .sl-title .sl-title-text {
		float: left;
		margin-left: 16px;
		font-size: 14px;
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
		width: 19px;
		height: 19px;
		display: block;
		background-size: cover;
		margin-top: 2px;
	}
	
	._vuec .sl-title .sl-title-r {
		float: left;
		background-size: 100% 100%;
		background-image: url('/modules/shop/common/img/icon/right_arrow.png');
		height: 100%;
		width: 29px;
	}
	
	.sl-tags .company {
		background-image: url('/modules/shop/common/img/icon/company.png');
	}
	
	._vuec .sl-title .zk-avatar {
		height: 25px;
		width: 25px;
		float: left;
	}
	
	._vuec .sl-title .sl-edit-btn {
		height: 100%;
		float: right;
		font-size: 12px;
		line-height: 24px;
		cursor: pointer;
	}
	
	._vuec .sl-title .sl-edit-btn:active {
		background-color: #999999;
	}
	
	._vuec .shop-row {
		padding-left: 9px;
		padding-right: 12px;
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
		border: 1px solid #CCCCCC;
		/*px*/
		overflow: hidden;
		background-image: url("/common/imgs/logo2.jpg");
		background-size: contain;
	}
	
	._vuec .shop-row .shop-detail {
		float: left;
		padding-left: 9.5px;
		padding-top: 10px;
		padding-bottom: 10px;
		width: 222px;
		height: 100%;
		position: relative;
	}
	
	._vuec .shop-row .no-checkbox {
		width: 260px;
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
	
	._vuec .shop-row .shop-spec {
		float: left;
		/*margin-left: 50px;*/
		margin-left: 20px;
		font-size: 12px;
		line-height: 24px;
		color: #333333;
	}
	
	._vuec .shop-row .shop-count {
		float: right;
		font-size: 12px;
		line-height: 24px;
		color: #A0A0A0;
	}
	/*商品数控制*/
	
	._vuec .shop-row .shop-detail .count-ctrl {
		height: 100%;
		font-size: 13px;
	}
	
	._vuec .shop-row .shop-detail .count-ctrl div {
		height: 16px;
		line-height: 16px;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -8px;
		margin-left: -8px;
	}
	
	._vuec .shop-row .shop-detail .count-ctrl div span {
		float: left;
	}
	
	._vuec .shop-row .shop-detail .count-ctrl div .lower {
		background-image: url('/modules/shop/common/img/icon/lower.png');
		display: block;
		height: 19.6px;
		width: 19.6px;
		margin-right: 20px;
		margin-top: -1px;
		/*no*/
		background-size: contain;
	}
	
	._vuec .shop-row .shop-detail .count-ctrl div .add {
		background-image: url('/modules/shop/common/img/icon/add.png');
		display: block;
		height: 19.6px;
		width: 19.6px;
		margin-left: 20px;
		margin-top: -1px;
		/*no*/
		background-size: contain;
	}
	
	._vuec .shop-row .shop-detail .count-ctrl div .add:active,
	._vuec .shop-row .shop-detail .count-ctrl div .lower:active {
		background-color: #999999;
	}
	
	._vuec .tools-btns {
		position: fixed;
		bottom: 0px;
		background-color: white;
		height: 49px;
		width: 100%;
		line-height: 49px;
		text-align: right;
		z-index: 999;
	}
	
	._vuec .tools-btns .pay,
	._vuec .tools-btns .del {
		float: right;
		width: 140px;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		color: white;
		background-color: #F8BF36;
		margin-left: 10px;
		position: relative;
	}
	
	._vuec .tools-btns .pay i {
		background-image: url('/modules/shop/common/img/icon/shoplist_car.png');
		background-size: contain;
		display: block;
		float: left;
		/*position: absolute;
		top: 50%;*/
		margin-top: 12px;
		margin-left: 33px;
		width: 25px;
		height: 25px;
	}
	
	._vuec .tools-btns .pay span {
		float: left;
		margin-left: 13px;
	}
	
	._vuec .tools-btns .del:active,
	._vuec .tools-btns .pay:active {
		background-color: #FFDB99;
	}
</style>
<template lang="html">
	<div class="_vuec">
		<div class="sl-content">
			<div class="sl-title">
				<div class="sl-checkbox" v-show="showEditBtn">
					<input type="checkbox" @click="selectAll()" :checked="allSelected" />
					<label></label>
				</div>
				<div class="zk-avatar">
					<span :style="'background-image:url('+val.psHeadUrl+')'"></span>
				</div>
				<div class="sl-title-text" v-text="val.psName">
				</div>
				<div class="sl-tags">
					<span class="company" v-show="val.storeAuthStatus==1"></span>
				</div>
				<div class="sl-title-r">&nbsp;</div>
				<div class="sl-edit-btn" v-show="showEditBtn" v-text="editBtnStr" @click="changePageState()"></div>
			</div>
			<div class="shop-row zk-border-b" v-for="item in val.productList">
				<div class="sl-checkbox" v-show="showEditBtn">
					<input type="checkbox" :value="item" v-model="selecteds" />
					<label></label>
				</div>
				<div class="shop-img">
					<div class="shop-img-block">
						<img :src="item.productImg1" />
					</div>
				</div>
				<div class="shop-detail" :class="{'no-checkbox':!showEditBtn}">
					<div class="shop-title" v-show="!isEditState" v-text="item.productName" v-zk-limit="28"></div>
					<div class="shop-pc" v-show="!isEditState">
						<span class="shop-price">
								<span>&#165;</span><span v-text="item.unitPrice"></span>
						</span>
						<span class="shop-spec">
							<span>规格：</span>
						<span v-text="item.specName" v-zk-limit="6"></span>
						</span>
						<span class="shop-count" v-text="'X'+item.itemCount"></span>
					</div>
					<div class="count-ctrl" v-show="isEditState">
						<div>
							<span class="lower" @click="lowerBuyCount(item)"></span><span v-text="item.itemCount"></span><span class="add" @click="addBuyCount(item)"></span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="tools-btns zk-border-t" v-show="showSum">
			共<span v-text="shopCount"></span>件商品 合计：
			<div class="pay" @click="cleaning()">
				<i></i> <span>结算</span>
			</div>
			<span class="shop-price" style="float: right;">
					<span>&#165;</span><span v-text="sumMoney"></span>
			</span>
		</div>
		<div class="tools-btns zk-border-t" v-show="isEditState">
			<div class="sl-checkbox allselect-checkbox">
				<input type="checkbox" @click="selectAll()" :checked="allSelected" />
				<label></label><span>全选</span>
			</div>
			<div class="del" @click="cleanShopList()">
				<span>删除</span>
			</div>
		</div>
	</div>
</template>
<script lang="js">
	'use strict';
	var ShoppingList = require("modules/shop/common/model/shopping_list");
	module.exports = {
		//数据模型
		data: function() {
			return {
				selecteds: [],
				allSelected: false,
				editBtnStr: "编辑",
				//是否处于编辑状态
				isEditState: false
			}
		},
		computed: {
			//商品数
			shopCount: function() {
				return this.selecteds.length;
			},
			//总价
			sumMoney: function() {
				var sum = 0;
				for(var i = 0, len = this.selecteds.length; i < len; i++) {
					sum = sum + (this.selecteds[i].unitPrice * this.selecteds[i].itemCount);
				}
				return sum;
			}
		},
		props: {
			val: {
				type: Object,
				required: true
			},
			showSum: {
				type: Boolean,
				default: function() {
					return false;
				}
			},
			showEditBtn: {
				type: Boolean,
				default: function() {
					return false;
				}
			}
		},
		components: {},
		methods: {
			selectAll: selectAll,
			cleaning: cleaning,
			refresh: refresh,
			lowerBuyCount: lowerBuyCount,
			addBuyCount: addBuyCount,
			changePageState: changePageState,
			cleanShopList: cleanShopList
		}
	}
	var _shoppingList;

	function refresh() {
		var vm = this;
		var psUserId = $G.getUrlParam("psUserId");
		_shoppingList = new ShoppingList(psUserId);
		vm.$nextTick(function() {
			vm.selectAll();
		});
	}

	/**
	 * 选中全部
	 */
	function selectAll() {
		var vm = this;
		if(vm.allSelected) {
			for(var i = 0, len = vm.selecteds.length; i < len; i++) {
				vm.selecteds.splice(0, vm.selecteds.length);
			}
			vm.allSelected = false;
		} else {
			for(var i = 0, len = vm.val.productList.length; i < len; i++) {
				vm.selecteds.push(vm.val.productList[i]);
			}
			vm.allSelected = true;
		}
	}

	/**
	 * 点击结算
	 */
	function cleaning() {
		var vm = this;
		if(vm.selecteds.length == 0) {
			$App.msg("请选择要结算的商品！");
			return false;
		}
		vm.$emit("cleaning", vm.selecteds);
	}

	function lowerBuyCount(item) {
		if(item.itemCount > 1) {
			item.itemCount -= 1;
		}
	}

	function addBuyCount(item) {
		item.itemCount += 1;
	}

	/**
	 *	转换到编辑状态 
	 */
	function changePageState() {
		var vm = this;
		if(vm.isEditState) { //点击完成按钮时
			vm.isEditState = false;
			vm.editBtnStr = "编辑";
			_shoppingList.saveData(vm.val);
		} else {
			vm.isEditState = true;
			vm.editBtnStr = "完成";
		}
	}

	/**
	 * 清理购物单
	 */
	function cleanShopList() {
		var vm = this;
		var localShoplist = _shoppingList.getData();
		var shoplist = vm.selecteds;
		if(!localShoplist) {
			return false;
		}
		//检测并打标已选中结的商品
		for(var i = 0, len = localShoplist.productList.length; i < len; i++) {
			for(var j = 0, lenj = shoplist.length; j < lenj; j++) {
				var itemList = localShoplist.productList[i];
				var itemChecked = shoplist[j];
				if(itemList.productId == itemChecked.productId &&
					itemList.specId == itemChecked.specId &&
					itemList.itemCount == itemChecked.itemCount
				) {
					itemList._selected = true;
				}
			}
		}

		var newProductList = [];
		for(var i = 0, len = localShoplist.productList.length; i < len; i++) {
			if(!localShoplist.productList[i]._selected) {
				newProductList.push(localShoplist.productList[i]);
			}
		}

		localShoplist.productList = newProductList;
		_shoppingList.saveData(localShoplist);
		window.location.href=window.location.href;
		window.location.reload(true);
	}
</script>