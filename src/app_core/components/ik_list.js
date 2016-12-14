define('app_core/components/ik_list.vue', function(require, exports, module) {

  	/**
  	 * 通用分页列表
  	 * 作者：PS    
  	 * 日期：2016-09-08
  	 * @param {Object} pagingList {url:"页面数据来源接口",data:['列表数据'],type:"0.完整列表  1.简易列表",showPagination:"是否展示分页"}
  	 * 
  	 */
  	var data = {
  		//搜索栏DomId
  		searchId: 'search_' + $App.getCode(),
  		//查询参数列表ViewModel
  		searchList:[],
  		//是否显示搜索Btn
  		showSearchEntryBtn:false,
  		//当前页索引
  		pageIndex:1,
  		//每页行数
  		pageSize:20,
  		//总页数
  		totalPages:0,
  		//总行数
  		totalCount:0
  	}
  
  	module.exports = { //数据模型
  		data: function() {
  			return data;
  		},
  		props: {
  			//分页列表传入配置参数
  			pagingList: Object,
  			//发起请求前回调方法
  			getDataBefore:{
  				type:Function,
  				default:function(reqParam){
  
  				}
  			},
  			getDataAfter:{
  				type:Function
  			}
  		},
  		ready: ready,
  		methods: {
  			//显示查询按钮
  			showSearch : showSearch,
  			//导出or下载
  			exportAll : exportAll,
  			//更新查询比对选项
  			updateComparisonList : updateComparisonList,
  			//新增一个查询条件
  			addOneSearchWhere:addOneSearchWhere,
  			//查询第一页
  			firstPage : firstPage,
  			//查询下一页
  			nextPage : nextPage,
  			//查询上一页
  			previousPage: previousPage,
  			//查询最后一页
  			lastPage:lastPage,
  			//改变单页行数
  			changePageSize:changePageSize,
  			//刷新
  			refresh:refresh
  		}
  	};
  	
  	//当前页面ViewModel
  	var vm;
  	//导出excle名称
  	var exportfileName;
  	//记录当前查询参数
  	var nowSearchParam=[];
  	//视图模型生成完毕
  	function ready() {
  		vm = this;
  		//检测时候显示查询按钮
  		if (!isEmpty(vm.pagingList.searchOption)&&vm.pagingList.searchOption.length>0) {
  			vm.showSearchEntryBtn=true;
  			//初始化时添加一个查询条件
  			addOneSearchWhere();
  		}
  		//监听查询选项
  		if (!vm.pagingList.reqParams) {
  			vm.pagingList.reqParams={};
  		}
  		//初始化查询第一页数据
  		firstPage();
  		//设置导出文件名称
  		exportfileName=vm.pagingList.exportfileName?vm.pagingList.exportfileName:vm.pagingList.title;
  	}
  	
  	
  	/**
  	 * 弹出搜索框
  	 */
  	function showSearch() {
  		layer.open({
  			type: 1,
  			shade: 0,
  			title: '搜索...',
  			btn: ['查询','取消','重置'],
  			shadeClose: false,
  			btn1: function() {
  				//查询按钮点击
  				nowSearchParam=[];
  				//组装查询请求参数
  				for (var i=0,len=vm.searchList.length;i<len;i++) {
  					if (vm.searchList[i].type=="dateTime"||vm.searchList[i].type=="date") {
  						vm.searchList[i].Val=document.getElementById(vm.searchId+'_'+vm.searchList[i].index).value;
  					}
  					if (!isEmpty(vm.searchList[i].Val)) {
  						nowSearchParam.push(vm.searchList[i]);
  					}
  				}
  				firstPage();
  			},
  			btn2: function() {
  				
  			},
  			btn3: function() {
  				//重置按钮点击
  				vm.searchList=vm.searchList.slice(0,1);
  				vm.searchList[0].Val="";
  			},
  			area: ['420px'], //宽高
  			content: $('#' + data.searchId)
  		});
  		$('#' + data.searchId).parent().css("height","auto");
  	}
  	
  	function addOneSearchWhere(){
  		//往查询列表View模型中添加查询项目
  		vm.searchList.push({
  			index:vm.searchList.length,
  			Field:vm.pagingList.searchOption[0].field,
  			ComparisonType:"",
  			Val:"",
  			//可选比较符号选项列表
  			UsableComparisonTypes:[]
  		});
  		updateComparisonList(vm.searchList[vm.searchList.length-1]);
  	}
  	/**
  	 * 更新待查询选比较字符选项列表
  	 * @param {Object} item 查询选项当前row vm
  	 */
  	function updateComparisonList(item){
  		//当前项可用比对字符列表
  		var comparisonTypes=[];
  		//当前项数据类型
  		var type;
  		//传入的可用选项列表
  		var searchOption = vm.pagingList.searchOption;
  		//从配置中获取对应选项的可选符号列表
  		for(var i=0,len=searchOption.length;i<len;i++){
  			if (searchOption[i].field==item.Field) {
  				comparisonTypes=searchOption[i].comparisonTypes;
  				//获得当前项  数据类型
  				type=searchOption[i].type;
  				continue;
  			}
  		}
  		//生成比对字符选项列表
  		item.UsableComparisonTypes=[];
  		for (var i=0,len=comparisonTypes.length;i<len;i++){
  			var text = "";
  			//转意比对符号为用户可知文本
  			switch(comparisonTypes[i]){
  				case "==":text="等于";break;
  				case "!=":text="不等于";break;
  				case "<":text="小于";break;
  				case "<=":text="小于等于";break;
  				case ">":text="大于";break;
  				case ">=":text="大于等于";break;
  				case "like":text="包含";break;
  				case "not like":text="不包含";break;
  			}
  			
  			var obj = {
  				val:comparisonTypes[i],
  				text:text
  			}
  			
  			if (i==0) {//设置改条件 默认比对选项
  				item.ComparisonType=obj.val;
  			}
  			//添加到该行 可用比对选项列表
  			item.UsableComparisonTypes.push(obj);
  		}
  		item.type=type;
  		//给时间输入框绑定 时间选项插件
  		vm.$nextTick(function(){
  			if (type=='dateTime') {
  				$('#'+vm.searchId+'_'+item.index).attr("onclick","laydate({istime: true,format: 'YYYY-MM-DD hh:mm:ss'})");
  			}else if(type=='date'){
  				$('#'+vm.searchId+'_'+item.index).attr("onclick","laydate({format: 'YYYY-MM-DD'})");
  			}else{
  				$('#'+vm.searchId+'_'+item.index).removeAttr("onclick");
  			}
  		});
  	}
  	
  	/**
  	 * 导出全部内容
  	 * 注:当前需求为导出Excle 后期可添加参数
  	 */
  	function exportAll() {
  		
  		var doms = vm.$el.parentElement.querySelectorAll("thead th");
  		var exportHeadModel=[];
  		for (var i=0,len=doms.length;i<len;i++) {
  			var name=doms[i].getAttribute("name");
  			if (!isEmpty(name)&&doms[i].display!="none") {
  				exportHeadModel.push({
  					lable:doms[i].innerHTML,
  					name:name
  				});
  			}
  		}
  		//根据列表数据来源Api地址获取 通用导出ExcleApi地址
  		var url=vm.pagingList.url;
  			url=url.replace(/\?.*/,"");
  		var strArray = url.split('/');
  		//api名称
  		var apiName=strArray[strArray.length-1];
  		strArray.pop();
  		var exportApi=strArray.join("/");
  		
  		var searchParam=vm.pagingList.reqParams;
  			searchParam.searchWhereList=nowSearchParam;
  			searchParam.pageIndex=vm.pageIndex;
  //			searchParam.pageSize=vm.pageSize;
  			searchParam.pageSize=2000;
  		//避免数据污染
  		searchParam=JSON.parse(JSON.stringify(searchParam));
  		if (vm.getDataBefore!=undefined) {
  			//获取数据前执行自定义回调方法
  			vm.getDataBefore(searchParam);
  		}
  		
  		var form = vm.$el.parentElement.querySelector("[name='export']");
  		
  		var input1 = form.querySelector("[name='queryParamStr']");
  		var input2 = form.querySelector("[name='apiName']");
  		var input3 = form.querySelector("[name='exportHeadModel']");
  		var input4 = form.querySelector("[name='exportFileName']");
  		
  		input1.value=encodeURIComponent(JSON.stringify(searchParam));
  		input2.value=apiName;
  		input3.value=encodeURIComponent(JSON.stringify(exportHeadModel));
  		input4.value=exportfileName;
  		form.action=exportApi + "/ExportExcle";	
  		form.submit();	
  	}
  	
  	/**
  	 * 查询第一页
  	 */
  	function firstPage(){
  		vm.pageIndex=1;
  		httpGetListData();
  	}
  	
  	/**
  	 * 查询下一页
  	 */
  	function nextPage(){
  		vm.pageIndex++;
  		
  		if (vm.pageIndex>vm.totalPages) {
  			vm.pageIndex=vm.totalPages;
  		}
  		
  		httpGetListData();
  	}
  	
  	/**
  	 * 查询上一页
  	 */
  	function previousPage(){
  		vm.pageIndex--;
  		if (vm.pageIndex<=0) {
  			vm.pageIndex=1;
  		}
  		
  		httpGetListData();
  	}
  	
  	/**
  	 * 查询最后一页
  	 */
  	function lastPage(){
  		vm.pageIndex=vm.totalPages;
  		httpGetListData();
  	}
  	
  	/**
  	 * 改变页面单页行数
  	 */
  	function changePageSize(){
  		httpGetListData();
  	}
  	
  	/**
  	 * 刷新组件
  	 */
  	function refresh(){
  		//重置选项
  		vm.searchList=vm.searchList.slice(0,1);
  		vm.searchList[0].Val="";
  		updateComparisonList(vm.searchList[0]);
  		vm.firstPage();
  	}
  	
  	
  	/**
  	 * 获取列表数据
  	 */
  	function httpGetListData() {
  //		{
  //			"SearchWhereList": [
  //				{
  //					"Field": "查询字段",
  //					"ComparisonType": "!=",
  //					"Val": "啊是大师傅"
  //				},
  //				{
  //					"Field": "查询字段",
  //					"ComparisonType": "!=",
  //					"Val": "啊是大师傅"
  //				}
  //			],
  //			"PageIndex": 1,
  //			"PageSize": 100
  //		}
  
  		vm.pagingList.reqParams.searchWhereList=nowSearchParam;
  		vm.pagingList.reqParams.pageIndex=vm.pageIndex;
  		vm.pagingList.reqParams.pageSize=vm.pageSize;
  		//避免数据污染
  		var reqParams=JSON.parse(JSON.stringify(vm.pagingList.reqParams));
  		if (vm.getDataBefore!=undefined) {
  			//获取数据前执行自定义回调方法
  			vm.getDataBefore(reqParams);
  		}
  		$.post(vm.pagingList.url,reqParams,function(result, status, xhr) {
  			var reg1=new RegExp("\\d{2}T\\d{2}:\\d{2}");
  			var reg2=new RegExp("T|(\\.\\d*$)","g");
  			for (var i=0,len=result.Data.PageData.length+1;i<len;i++) {	
  				var row=result.Data.PageData[i];
  				for (var item in row) {
  					if (reg1.test(row[item])) {
  						row[item]=row[item].replace(reg2," ");
  						if (row[item]=="1970-01-01 00:00:00") {
  							row[item]="";
  						}
  					}
  				}
  			}
  			
  			//兼容无列表数据时
  			if (result.Data==null) {
  				result.Data.PageData=[];
  			}
  			
  			//获取数据后执行自定义回调方法
  			if (vm.getDataAfter!=undefined) {
  				vm.getDataAfter(result.Data);
  			}
  			vm.pagingList.data = result.Data.PageData;
  			vm.pageIndex = result.Data.PageIndex;
  			vm.pageSize = result.Data.PageSize;
  			vm.totalPages = result.Data.TotalPages;
  			vm.totalCount = result.Data.TotalCount;
  			
  		});
  	}
  var _vueTemplateString = "<!--完整带外框分页列表-->\n<div class=\"ibox float-e-margins _v-4ddc18bb\" v-if=\"pagingList.type==0||!pagingList.type\">\n\t<div class=\"ibox-title\">\n\t\t<h5>{{pagingList.title?pagingList.title:\"列表\"}}</h5> &nbsp;\n\t\t<a @click=\"showSearch()\" v-show=\"showSearchEntryBtn\">\n\t\t\t<i class=\"glyphicon glyphicon-search\"></i>\n\t\t</a>&nbsp;\n\t\t<div class=\"ibox-tools\">\n\t\t\t<a @click=\"exportAll()\" v-show=\"pagingList.showExportBtn\">\n\t\t\t\t<i class=\"fa fa-download\"></i>\n\t\t\t</a>\n\t\t\t<slot name=\"actionBar\">\n\t\t\t\t<!--自定义工具栏部分-->\n\t\t \t</slot>\n\t\t\t<a class=\"collapse-link\">\n\t\t\t\t<i class=\"fa fa-chevron-up\"></i>\n\t\t\t</a>\n\t\t\t<a class=\"close-link\">\n\t\t\t\t<i class=\"fa fa-times\"></i>\n\t\t\t</a>\n\t\t</div>\n\t</div>\n\t<div class=\"ibox-content\">\n\t\t<slot name=\"main\">\n\t\t\t<!--列表主体部分 父模板定义-->\n\t\t</slot>\n\t\t<div class=\"ik-pagination\" v-show=\"pagingList.showPagination||pagingList.showPagination==null\">\n\t\t\t<div class=\"ik-pagination-info\">第<span v-text=\"pageIndex\">1</span>页/共<span v-text=\"totalPages\">1</span>页，本页\n\t\t\t\t<select v-model=\"pageSize\" @change=\"changePageSize()\" class=\"form-control\" style=\"width:75px;height: 32px;padding: 0px 12px;display: inline-block;\">\n\t\t\t\t\t<option>10</option>\n\t\t\t\t\t<option>20</option>\n\t\t\t\t\t<option>30</option>\n\t\t\t\t\t<option>50</option>\n\t\t\t\t\t<option>100</option>\n\t\t\t\t</select>\n\t\t\t\t行/共<span v-text=\"totalCount\">1</span>行\n\t\t\t</div>\n\t\t\t<div class=\"btn-group ik-pagination-btns\" role=\"group\" aria-label=\"分页\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"firstPage()\">首页</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"previousPage()\">上一页</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"nextPage()\">下一页</button>\n\t\t\t\t<button type=\"button\" class=\"btn btn-primary\" @click=\"lastPage()\">尾页</button>\n\t\t\t</div>\n\t\t</div>\t\t\n\t</div>\n\t<!--弹出搜索框-->\n\t<div id=\"{{searchId}}\" style=\"display: none;\">\n\t\t<div style=\"margin-top: 15px;overflow: hidden;\" v-for=\"item in searchList\">\n\t\t\t<div class=\"col-xs-3\" style=\"padding-right: 0px;\">\n\t\t\t\t<select class=\"form-control\" v-model=\"item.Field\" @change=\"updateComparisonList(item)\">\n\t\t\t\t\t<option v-for=\"item0 in pagingList.searchOption\" value=\"{{item0.field}}\">{{item0.label}}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-3\" style=\"padding-right: 0px;\">\n\t\t\t\t<select class=\"form-control\" v-model=\"item.ComparisonType\">\n\t\t\t\t\t<option v-for=\"item0 in item.UsableComparisonTypes \" value=\"{{item0.val}}\">{{item0.text}}</option>\n\t\t\t\t</select>\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-4\" style=\"padding-right: 0px;\">\n\t\t\t\t<input class=\"form-control\" id=\"{{searchId+'_'+item.index}}\" type=\"text\" placeholder=\"请输入条件！\" v-model=\"item.Val\">\n\t\t\t</div>\n\t\t\t<div class=\"col-xs-2\" style=\"padding-right: 0px;\">\n\t\t\t\t<button type=\"button\" class=\"btn btn-sm btn-primary\" @click=\"addOneSearchWhere()\"><i class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></i></button>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n\t<form method=\"post\" name=\"export\" style=\"display: none;\">\n\t\t<input type=\"text\" name=\"queryParamStr\">\n\t\t<input type=\"text\" name=\"apiName\">\n\t\t<input type=\"text\" name=\"exportHeadModel\">\n\t\t<input type=\"text\" name=\"exportFileName\">\n\t</form>\n</div>\n<!--简化版分页列表-->\n<div v-if=\"pagingList.type==1\">\n\t<slot>\n\t\t<!--列表主体部分 父模板定义-->\n\t</slot>\n\t<div class=\"ik-pagination\" v-show=\"pagingList.showPagination||pagingList.showPagination==null\">\n\t\t<div class=\"ik-pagination-info\">第<span v-text=\"pageIndex\">1</span>页/共<span v-text=\"totalPages\">1</span>页，本页\n\t\t\t<select v-model=\"pageSize\" @change=\"changePageSize()\" class=\"form-control\" style=\"width:75px;height: 32px;padding: 0px 12px;display: inline-block;\">\n\t\t\t\t<option>10</option>\n\t\t\t\t<option>20</option>\n\t\t\t\t<option>30</option>\n\t\t\t\t<option>50</option>\n\t\t\t\t<option>100</option>\n\t\t\t</select>\n\t\t\t行/共<span v-text=\"totalCount\">1</span>行\n\t\t</div>\n\t\t<div class=\"btn-group ik-pagination-btns\" role=\"group\" aria-label=\"分页\">\n\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"firstPage()\">首页</button>\n\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"previousPage()\">上一页</button>\n\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"nextPage()\">下一页</button>\n\t\t\t<button type=\"button\" class=\"btn btn-default\" @click=\"lastPage()\">尾页</button>\n\t\t</div>\n\t</div>\n\t<form method=\"post\" name=\"export\" style=\"display: none;\">\n\t\t<input type=\"text\" name=\"queryParamStr\">\n\t\t<input type=\"text\" name=\"apiName\">\n\t\t<input type=\"text\" name=\"exportHeadModel\">\n\t\t<input type=\"text\" name=\"exportFileName\">\n\t</form>\n</div>";
  
  module && module.exports && (module.exports.template = _vueTemplateString);
  
  exports && exports.default && (exports.default.template = _vueTemplateString);
  

});
