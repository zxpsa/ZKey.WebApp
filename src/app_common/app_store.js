"use strict";
var commonNav = {
	pageTitle:"臻臻",
	btnClickCallback:function(btn){
		console.log(btn);
	}
}

var mutations={
	changeCommonNavTitle:function(state,val){
		$HyApp.excute("HYACommonCtrl", "setNav", {
            title: val
        }, function (result) {
            if (result.ststus != 0) {
                return false;
            }
        });
		state.commonNav.pageTitle=val;
	}
};

var actions={};

module.exports = {
	state: {
		commonNav:commonNav
	},
	mutations: mutations,
	actions: actions
};
