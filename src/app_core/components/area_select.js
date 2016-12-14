define('app_core/components/area_select.vue', function(require, exports, module) {

  /** 
   * 地区选择组件ViewModel 
   * @param {Object} value 选中值 { province: {"code": "123","name":"重庆市"},city: {"code": "4123","name":"重庆市"},district: {"code": "123","name":"昭阳区"}} * @param {String} url 数据来源地址 (默认为$App.ApiRoot++ "/AreaData.json") * html:
   * <area-select :value.sync="area" :url="'http://www.baidu.com'"></area-select>
   * apiData: 
   * param: {code: "父级编号",type: "0.省 1.市 2.区 "} 
   * result:{Code:100,Data:[{"name": "全国","code": "0"}]} 
   */
  	module.exports ={
  		// 声明 组件对外暴露参数 props
  		props: {
  			//选中的结果值
  			value: {
  				type: Object,
  				required: false,
  				default: function(v) {
  					return {
  						province: {
  							"code": "0"
  						},
  						city: {
  							"code": "0"
  						},
  						district: {
  							"code": "0"
  						}
  					}
  				}
  			},
  			//服务器接口地址
  			url: {
  				type: String,
  				required: false,
  				default: $App.ApiRoot + "/Common/GetAreaList"
  			},
  			//选择地区后事件
  			change:{
  				type:Function
  			}
  		},
  		data: function() {
  			return {
  				provinceList: [{
  					"name": "全国",
  					"code": "0"
  				}],
  				cityList: [{
  					"name": "市",
  					"code": "0"
  				}],
  				districtList: [{
  					"name": "区",
  					"code": "0"
  				}],
  				//当前选则的省编号
  				provinceCode: "0",
  				//当前选则的市编号
  				cityCode: "0",
  				//当前选则的区编号
  				districtCode: "0"
  			};
  		},
  		methods: {
  			change1: function() {
  				console.log(this.province.code);
  			}
  		},
  		computed: {
  			provinceCode: {
  				set: function(val) {
  					this.value.province = searchInfoInList(val, this.provinceList);
  					this.value.city = {
  						"code": "0"
  					};
  					this.value.district = {
  						"code": "0"
  					};
  					httpGetData(this, this.value.province.code, 1);
  					if (this.change!=undefined) {
  						//执行变动通知方法
  						this.change(this.value);
  					}
  				},
  				get: function() {
  					return this.value.province.code;
  				}
  			},
  			cityCode: {
  				set: function(val) {
  					this.value.city = searchInfoInList(val, this.cityList);
  					this.value.district = {
  						"code": "0"
  					};
  					httpGetData(this, this.value.city.code, 2);
  					if (this.change!=undefined) {
  						//执行变动通知方法
  						this.change(this.value);
  					}
  				},
  				get: function() {
  					return this.value.city.code;
  				}
  			},
  			districtCode: {
  				set: function(val) {
  					this.value.district = searchInfoInList(val, this.districtList);
  					if (this.change!=undefined) {
  						//执行变动通知方法
  						this.change(this.value);
  					}
  				},
  				get: function() {
  					return this.value.district.code;
  				}
  			}
  		},
  		ready: function() {
  			var _t=this;
  			_t.$watch("value",function(newVal,oldVal){
  				initSelect(_t);
  			})
  			
  		}
  	};
  
  	/**
  	 * 获取组件数据
  	 * @param {int} code 编号
  	 * @param {int} type  0.省  1.市  2.区 
  	 * @param {Function} sucess 请求成功回调方法
  	 */
  	function httpGetData(t, code, type, sucess) {
  		var _t = t;
  		$.ajax({
  			url: _t.url,
  			type: "GET",
  			data: {
  				code: code,
  				type: type
  			},
  			success: function(json) {
  				if(json.Code != 100) {
  					return false;
  				}
  				var data = json.Data;
  				if(type == 0) {
  					data.splice(0, 0, {
  						"name": "全国",
  						"code": "0"
  					});
  					_t.provinceList = data;
  				} else if(type == 1) {
  					data.splice(0, 0, {
  						"name": "市",
  						"code": "0"
  					});
  					_t.cityList = data;
  				} else {
  					data.splice(0, 0, {
  						"name": "区",
  						"code": "0"
  					});
  					_t.districtList = data;
  				}
  				if(sucess != undefined) {
  					sucess();
  				}
  			}
  		});
  	}
  
  	/**
  	 * 查询地区信息在VM中
  	 * @param {Object} code
  	 * @param {Object} list
  	 */
  	function searchInfoInList(code, list) {
  		for(var i = 0, len = list.length; i < len; i++) {
  			if(list[i].code == code) {
  				return list[i];
  			}
  		};
  		return {
  			code: "0"
  		};
  	}
  	
  	function initSelect(_t){
  			httpGetData(_t, "0", 0, function() {
  				if(_t.value.province.code != "0") {
  					_t.value.province = searchInfoInList(_t.value.province.code, _t.provinceList);
  				}
  			});
  			if(_t.value.city.code != "0") {
  				httpGetData(_t, _t.value.province.code, 1, function() {
  					if(_t.value.city.code != "0") {
  						_t.value.city = searchInfoInList(_t.value.city.code, _t.cityList);
  					}
  				});
  			}
  			if(_t.value.district.code != "0") {
  				httpGetData(_t, _t.value.city.code, 2, function() {
  					if(_t.value.district.code != "0") {
  						_t.value.district = searchInfoInList(_t.value.district.code, _t.districtList);
  					}
  				});
  			}
  	}
  var _vueTemplateString = "<div class=\"_v-685845a7\">\n\t<select class=\"form-control\" style=\"width: 31%;float: left;\" v-model=\"provinceCode\">\n\t\t<option v-for=\"item in provinceList\" value=\"{{item.code}}\">{{item.name}}</option>\n\t</select>\n\t<select class=\"form-control\" style=\"width: 30%;float: left;margin-left: 4%;\" v-model=\"cityCode\">\n\t\t<option v-for=\"item in cityList\" value=\"{{item.code}}\">{{item.name}}</option>\n\t</select>\n\t<select class=\"form-control\" style=\"width: 30%;float: left;margin-left: 5%;\" v-model=\"districtCode\">\n\t\t<option v-for=\"item in districtList\" value=\"{{item.code}}\">{{item.name}}</option>\n\t</select>\n\t<div class=\"ik-clearfix\"></div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);
  

});
