define('app_core/components/zk_list.vue', function(require, exports, module) {

  	/**
  	 * 通用分页列表
  	 * 作者：PS    
  	 * 日期：2016-11-07
  	 * 
  	 * searchInputs:[{label : "账号",value:"",cfg:"",field : "asdfasdf",type : "select",options:[{text:"选项1",value:1},]}]
  	 * @require app_core/libs/layer/laydate/laydate.js
  	 */
  	module.exports = { //数据模型
  		data: function() {
  			return {
  				//搜索栏显示状态
  				showSearch: true,
  				//有搜索展开按钮
  				hasSearchExpandBtn:true,
  				//当前请求参数
  				nowReqParams:null,
  				//允许加载数据
  				allowLoad:true,
  				//当前页索引
  				pageIndex:1,
  				//每页行数
  				pageSize:20,
  				//总页数
  				totalPages:0,
  				//总行数
  				totalCount:0,
  				searchInputs:[]
  			};
  		},
  		props: {
  			value:{
  				type: Array
  			},
  			//数据来源
  			url: {
  				type: String,
  				required: false
  			},
  			//查询选项
  			search:{
  				type: Array,
  				default: function(){
  					return [];
  				}
  			},
  			//是否有查询按钮
  			hasSearchBtn:{
  				type: Boolean,
  				default: true
  			},
  			//显示导出按钮
  			showExportBtn: {
  				type: Boolean,
  				default: true
  			},
  			//列表标题
  			title: {
  				type: String,
  				default: "列表"
  			},
  			//是否有标签头
  			showTitleHead:{
  				type: Boolean,
  				default: true
  			},
  			reqParams: {
  				type: Object
  			},
  			//列表类型 0.(默认)完全列表 1.简单列表
  			type: {
  				type: Number,
  				default: 0
  			},
  			exportfileName: {
  				type: String,
  				default: function() {
  					return this.title;
  				}
  			},
  			showPagination: {
  				type: Boolean,
  				default: function(){
  					return this.isPagination;
  				}
  			},
  			//是否分页查询列表
  			isPagination:{
  				type: Boolean,
  				default: true
  			},
  			//发起请求前回调方法
  			getDataBefore: {
  				type: Function,
  				default: function(reqParam) {
  
  				}
  			},
  			//是否初始化加载数据
  			isInitLoadData:{
  				type: Boolean,
  				default: true
  			}
  		},
  		mounted: mounted,
  		methods: {
  			//生成查询项 展示名称
  			createSearchLabel:createSearchLabel,
  			//展开查询栏
  			expandSearch : expandSearch,
  			//查询第一页
  			firstPage:firstPage,
  			//查询下一页
  			nextPage:nextPage,
  			//查询上一页
  			previousPage:previousPage,
  			//查询最后一页
  			lastPage:lastPage,
  			//改变单页行数
  			changePageSize:changePageSize,
  			//清空所有查询项
  			cleanSearch:cleanSearch,
  			//刷新
  			refresh:refresh
  		}
  	};
  	
  	/**
  	 * 编译完成初始化
  	 */
  	function mounted(vm){
  		if(isEmpty(vm)){
  			vm=this;
  		}
  		
  		vm.searchInputs=vm.search;
  		//手机端初始 不显示搜索栏
  			if($App.screen.lessXS($App.screen.getNowDOMWidth())) {
  				vm.showSearch = false;
  			}
  			vm.$nextTick(function(){
  				//设置是否显示查询按钮和清除按钮
  				if(!vm.$slots["searchExt"]&&vm.search.length<=0&&!vm.$slots["btnExt"]){
  					vm.showSearch=false;
  					vm.hasSearchExpandBtn=false;
  				}
  				
  				//设置Table高度
  				var searchDom=vm.$el.querySelector(".search");
  				var tableDom=vm.$el.querySelector(".table-responsive");
  				var extHeight=(searchDom.offsetHeight+50)+"px";
  				tableDom.style.height="calc(100% - "+extHeight+")";	
  			});
  			//给时间查询输入框设置name 且设置各个输入框默认值
  			var inputs=vm.searchInputs;
  			for(var i=0,len=inputs.length;i<len;i++){
  				var input0=inputs[i];
  				//检测数据是否正常
  				if(input0.value===undefined){
  					throw new Error(JSON.stringify(input0)+":查询配置,必须有默认值value");
  				}
  				input0.default=input0.value;
  				if(input0.type=="dateTime"){
  					input0.domId=createSearchDateOptId(inputs[i].field);
  				}
  			}
  			
  			vm.$nextTick(function(){
  				//给时间查询输入框添加时间控件
  				var inputs=vm.searchInputs;
  				for(var i=0,len=inputs.length;i<len;i++){
  					var input0=inputs[i];
  					if(input0.type=="dateTime"){
  						//初始化时间控件
  						$App.dateControlInit({elem:'#'+input0.domId,inputData:input0,choose: function(dates){ //选择好日期的回调
  							this.inputData.value=dates;
  						}});
  					}
  				}
  			});
  			
  			if(!vm.isInitLoadData){
  				vm.allowLoad=false;
  			}
  			
  			if(vm.url&&vm.allowLoad){
  				httpGetListData(vm);	
  			}
  	}
  	
  	
  	/**
  	 * 生成时间查询项Id
  	 */
  	function createSearchDateOptId(item){
  		var domId=item+"_date_"+$App.getCode();
  		return domId;
  	}
  	/**
  	 * 生成查询项 展示名称
  	 * @param {Object} str
  	 */
  	function createSearchLabel(str){
  		var lableLen=str.length;
  		var labelStr=str.split("");
  		if(lableLen==2){
  			labelStr=labelStr.join('<span class="zk-ss">&nbsp;&nbsp;</span>');
  		}else if(lableLen==3){
  			labelStr=labelStr.join('<span class="zk-ss">_</span>');
  		}else if(lableLen==1){
  			labelStr='<span class="zk-ss">&nbsp;&nbsp;&nbsp;</span>'+labelStr.join();
  		}else{
  			labelStr=str;
  		}
  		return labelStr+"：";
  	}
  	
  	/**
  	 * 展开查询项
  	 */
  	function expandSearch() {
  		if(this.showSearch) {
  			this.showSearch = false;
  			var tableDom=this.$el.querySelector(".table-responsive");
  			tableDom.style.height="";
  		} else {
  			this.showSearch = true;
  			this.$nextTick(function(){
  				var searchDom=this.$el.querySelector(".search");
  				var tableDom=this.$el.querySelector(".table-responsive");
  				var extHeight=(searchDom.offsetHeight+50)+"px";
  				tableDom.style.height="calc(100% - "+extHeight+")";
  			});
  		}
  	};
  	
  	/**
  	 * http获取数据
  	 * @param {Object} vm 组件ViewModel
  	 */
  	function httpGetListData(vm) {
  		vm.allowLoad=true;
  		//组装请求参数
  		var  reqPar=JSON.parse(JSON.stringify(vm.reqParams));
  		//获取查询栏输入参数
  		var inputs=vm.searchInputs;
  		for(var i=0,len=inputs.length;i<len;i++){
  			reqPar[inputs[i].field]=(inputs[i].value);
  		}
  		
  		//有分页才有分页参数提交
  		if(vm.isPagination){
  			reqPar.pageNo=vm.pageIndex;
  			reqPar.pageSize=vm.pageSize;
  		}
  		
  		$.post(vm.url,reqPar,function(result, status, xhr) {
  			if(result.status!=0){
  				return false;
  			}
  			//记录当前数据的请求参数 
  			vm.nowReqParams=reqPar;
  			var listData=[];
  			if(vm.isPagination){
  					vm.pageIndex = result.data.pageNo;
  					vm.totalPages = result.data.totalPage;
  					vm.totalCount = result.data.totalCount;
  					listData=result.data.data;
  					if(result.data.hasOwnProperty("pageNo")){//标准PC分页
  						vm.pageIndex = result.data.pageNo;
  						vm.totalPages = result.data.totalPage;
  						vm.totalCount = result.data.totalCount;
  						listData=result.data.data;
  					}else{//默认Api分页
  						vm.pageIndex = result.pageNo;
  						vm.totalPages = result.totalPage;
  						vm.totalCount = result.totalCount;
  						listData=result.data;
  					}
  			}else{
  				listData=result.data;
  			}
  			vm.$emit('get-data-after',listData,result.data);
  			vm.$emit('input',listData,result.data);
  		});
  	}
  
     /**
  	* 查询第一页
  	*/
  	function firstPage(){
  		this.pageIndex=1;
  		httpGetListData(this);
  	}
  	/**
  	 * 查询下一页
  	 */
  	function nextPage(){
  		this.pageIndex++;
  		if (this.pageIndex>this.totalPages) {
  			this.pageIndex=this.totalPages;
  		}
  		httpGetListData(this);
  	}
  		
  	/**
  	 * 查询上一页
  	 */
  	function previousPage(){
  		this.pageIndex--;
  		if (this.pageIndex<=0) {
  			this.pageIndex=1;
  		}
  			
  		httpGetListData(this);
  	}
  		
  	/**
  	 * 查询最后一页
  	 */
  	function lastPage(){
  		this.pageIndex=this.totalPages;
  		httpGetListData(this);
  	}
  	
  	/**
  	 * 清空查询项
  	 */
  	function cleanSearch(){
  		var inputs=this.searchInputs;
  		for(var i=0,len=inputs.length;i<len;i++){
  			inputs[i].value=inputs[i].default;
  			//时间框 手动清除
  			if(inputs[i].type=="dateTime"){
  				docId(inputs[i].domId).value=inputs[i].default;
  			}
  		}
  		this.$emit('clean-search');
  	}
  		
  	/**
  	 * 改变页面单页行数
  	 */
  	function changePageSize(){
  		httpGetListData(this);
  	}
  	
  	/**
  	 * 刷新页面
  	 */
  	function refresh(){
  		var vm=this;
  		vm.cleanSearch();
  		httpGetListData(vm);	
  	}
  var _vueTemplateString = "<div class=\"zk-list\" :class=\"{'zk-view':showTitleHead}\">\n\t<div class=\"panel panel-default\">\n\t\t<div class=\"panel-heading\" v-if=\"showTitleHead\">\n\t\t\t<h3 class=\"panel-title\" v-html=\"title\">列表</h3> &nbsp;\n\t\t\t<a href=\"javascript:;\" v-show=\"hasSearchExpandBtn\" style=\"font-size: 13px;\" @click=\"expandSearch()\"><i class=\"glyphicon glyphicon-search\"></i></a>\n\t\t\t<div class=\"head-tool\">\n\t\t\t\t<!--<a>\n\t\t\t\t\t<i class=\"glyphicon glyphicon-plus\"></i>\n\t\t\t\t</a>-->\n\t\t\t\t<a class=\"collapse-link fold-zkview\" href=\"javascript:;\">\n\t\t\t\t\t<i class=\"glyphicon glyphicon-chevron-down\"></i>\n\t\t\t\t</a>\n\t\t\t\t<!--<span class=\"dropdown\">\n\t                <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"javascript:;\">\n\t                    <i class=\"glyphicon glyphicon-cog\"></i>\n\t\t            </a>\n\t\t            <ul class=\"dropdown-menu\">\n\t\t                <li><a href=\"calendar.html#\">选项111111选选项111111项111111</a></li>\n\t\t                <li><a href=\"calendar.html#\">选项2</a></li>\n\t\t            </ul>\n               </span>-->\n\t\t\t\t<a class=\"close-link\" href=\"javascript:;\">\n\t\t\t\t\t<i class=\"glyphicon glyphicon-remove\"></i>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class=\"zk-clearfix\"></div>\n\t\t</div>\n\t\t<div class=\"panel-body\">\n\t\t\t<div class=\"search\" v-show=\"showSearch\">\n\t\t\t\t<form class=\"form-inline\" @keyup.enter=\"firstPage()\">\n\t\t\t\t\t<div class=\"form-group\" v-for=\"item in searchInputs\">\n\t\t\t\t\t\t<label v-html=\"createSearchLabel(item.label)\"></label>\n\t\t\t\t\t\t<input v-if=\"item.type==null||item.type=='text'\" type=\"text\" class=\"form-control\" :placeholder=\"item.placeholder\" v-model=\"item.value\">\n\t\t\t\t\t\t<select v-if=\"item.type=='select'\" class=\"form-control\" v-model=\"item.value\">\n\t\t\t\t\t\t\t<option v-for=\"item0 in item.options\" :value=\"item0.value\">{{item0.text}}</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<label v-if=\"item.type=='radio'\" v-for=\"item0 in item.options\" class=\"radio-inline\">\n\t\t\t\t\t\t\t<input type=\"radio\" :name=\"item.field\" :value=\"item0.value\" v-model=\"item.value\">{{item0.text}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<label v-if=\"item.type=='checkbox'\" v-for=\"item0 in item.options\" class=\"checkbox-inline\">\n\t\t\t\t\t\t\t<input type=\"checkbox\" :value=\"item0.value\" v-model=\"item.value\">{{item0.text}}\n\t\t\t\t\t\t</label>\n\t\t\t\t\t\t<input v-if=\"item.type=='dateTime'\" :id=\"item.domId\" type=\"text\" class=\"form-control\" :placeholder=\"item.placeholder\">\n\t\t\t\t\t</div>\n\t\t\t\t\t<slot name=\"searchExt\"></slot>\n\t\t\t\t\t<div class=\"search-btn\">\n\t\t\t\t\t\t<slot name=\"btnExt\"></slot>\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"firstPage()\" v-show=\"hasSearchBtn\">查询</button>\n\t\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"cleanSearch()\" v-show=\"hasSearchBtn\">清除</button>\n\t\t\t\t\t</div>\n\t\t\t\t</form>\n\t\t\t</div>\n\t\t\t<div class=\"table-responsive\" :class=\"{'table-responsive-nosearch':!showSearch}\">\n\t\t\t\t<slot name=\"table\"></slot>\n\t\t\t</div>\n\t\t\t<div class=\"panel-footer zk-pagination\" v-if=\"showPagination\">\n\t\t\t\t<div class=\"zk-pagination-info\">第<span v-text=\"pageIndex\">1</span>页/共<span v-text=\"totalPages\">1</span>页，本页\n\t\t\t\t\t<select v-model.number=\"pageSize\" class=\"form-control\" style=\"width:75px;height: 32px;padding: 0px 0px;display: inline-block;\" @change=\"changePageSize\">\n\t\t\t\t\t\t<option :value=\"10\">10</option>\n\t\t\t\t\t\t<option :value=\"20\">20</option>\n\t\t\t\t\t\t<option :value=\"30\">30</option>\n\t\t\t\t\t\t<option :value=\"50\">50</option>\n\t\t\t\t\t\t<option :value=\"100\">100</option>\n\t\t\t\t\t</select>\n\t\t\t\t\t行/共<span v-text=\"totalCount\">1</span>行\n\t\t\t\t</div>\n\t\t\t\t<div class=\"btn-group zk-pagination-btns\" role=\"group\" aria-label=\"分页\">\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"firstPage\">首页</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"previousPage\">上一页</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"nextPage\">下一页</button>\n\t\t\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"lastPage\">尾页</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);
  

});
