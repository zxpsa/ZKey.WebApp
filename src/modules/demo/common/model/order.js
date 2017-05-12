"use strict";
/**
 * 订单Class
 */
var Order=function(psUserId){
	var local = $G.Local();
	var key="XSF_order_"+psUserId;
	
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

module.exports = Order;
