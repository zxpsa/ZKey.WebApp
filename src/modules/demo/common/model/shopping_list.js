"use strict";
/**
 * 购物单Class
 */
var ShoppingList=function(psUserId){
	var local = $G.Local();
	var key="XSF_shoplist_"+psUserId;
	
	this.getData=function(){
		return  local.get(key);;
	}
	
	this.saveData=function(val){
		local.set(key,val);
	}
	
	this.refresh=function(){
		local.remove(key);
	}
}

module.exports = ShoppingList;
