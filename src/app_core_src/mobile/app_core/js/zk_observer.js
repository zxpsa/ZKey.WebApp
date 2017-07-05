/**
 * 通知中心 / 发布订阅中心
 * 2017-04-12 13:54:51
 * @author PS
 */
function ZKObserver() {
	var _self=this;
	//被观察者列表
	var observables = {
		"onZKBack": []
	};

	// 主题集合
	var subjects = {};
	
	/**
	 * 添加观察者
	 * @param {String} subjectName 主题名称
	 * @param {Object} _func 主题变动时回调 
	 * @param {String} observerName 观察者
	 */
	_self.addObserver = function(subjectName,_func,observerName) {
		if(!subjects[subjectName]){
			subjects[subjectName]={
				observers:{},
				func:[]
			};
		}
		// 若观察者不是匿名观察者的话
		if(observerName){
			if(!subjects[subjectName].observers[observerName]){
				subjects[subjectName].observers[observerName]={};
			}

			if(!subjects[subjectName].observers[observerName].func){
				subjects[subjectName].observers[observerName].func=[];
			}

			subjects[subjectName].observers[observerName].func.push(_func);
		}
		//添加主题变动时回调 
		subjects[subjectName].func.push(_func);
	}

	_self.publish=function(subjectName,subjectData,observerName){
		setTimeout(function(){
			if(!subjects[subjectName]){
				return  false;
			}
			if(!observerName){
				for(var i=0,len=subjects[subjectName].func.length;i<len;i++){
					subjects[subjectName].func[i](subjectData);
				}
			}else{
				//向指定观察者推送信息
				for(var i=0,len=subjects[subjectName][observerName].func.length;i<len;i++){
					subjects[subjectName][observerName].func[i](subjectData,observerName);
				}
			}
		},1);
	}

	/**
	 * 删除所有观察者
	 */
	_self.removeObserver=function(subjectName){
		if(subjects[subjectName]){
			delete subjects[subjectName];
		}else{
			$log("主题不存在",subjectName);
		}
	}

//	if(window.onZKBack) {
//		window.onZKBack(); 
//	} else { 
//		var loadFunc; 
//		if(window.onload) { 
//			loadFunc = window.onload; 
//		} window.onload = function() { 
//			try { if(loadFunc) { loadFunc();
//			} window.onZKBack(); } catch() {} 
//		} 
//	}
	// ZKObserver.addObserver("sucess",function(){
		
	// })
}
