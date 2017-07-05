/**
 * file: mod.js
 * ver: 1.0.10
 * update: 2015/04/16
 * //修改:PS    日期：2016-08-30
 * //新增基于Fis3 调试模式兼容
 * https://github.com/fex-team/mod
 */
var require, define;

(function (global) {
  var head = document.getElementsByTagName('head')[0],
    loadingMap = {},
    factoryMap = {},
    modulesMap = {},
    scriptsMap = {},
    resMap = {},
    pkgMap = {};

  function createScript(url, onerror) {
    if (url in scriptsMap) return;
    scriptsMap[url] = true;

    var script = document.createElement('script');
    if (onerror) {
      var tid = setTimeout(onerror, require.timeout);

      script.onerror = function () {
        clearTimeout(tid);
        onerror();
      };

      function onload() {
        clearTimeout(tid);
      }

      if ('onload' in script) {
        script.onload = onload;
      } else {
        script.onreadystatechange = function () {
          if (this.readyState == 'loaded' || this.readyState == 'complete') {
            onload();
          }
        }
      }
    }
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
    return script;
  }

  function loadScript(id, callback, onerror) {
    var queue = loadingMap[id] || (loadingMap[id] = []);
    queue.push(callback);

    //
    // resource map query
    //
    var res = resMap[id] || resMap[id + '.js'] || {};
    var pkg = res.pkg;
    var url;

    if (pkg) {
      url = pkgMap[pkg].url;
    } else {
      url = res.url || id;
    }

    createScript(url, onerror && function () {
      onerror(id);
    });
  }

  define = function (id, factory) {
    id = id.replace(/\.js$/i, '');
    factoryMap[id] = factory;

    var queue = loadingMap[id];
    if (queue) {
      for (var i = 0, n = queue.length; i < n; i++) {
        queue[i]();
      }
      delete loadingMap[id];
    }
  };

  require = function (id) {
    // compatible with require([dep, dep2...]) syntax.
    if (id && id.splice) {
      return require.async.apply(this, arguments);
    }
    id = require.alias(id);
    var mod = modulesMap[id];
    if (mod) {
      return mod.exports;
    }

    //
    // init module
    //
    var factory = factoryMap[id];
    if (!factory) {
      throw '[ModJS] Cannot find module `' + id + '`';
    }

    mod = modulesMap[id] = {
      exports: {}
    };

    //
    // factory: function OR value
    //
    var ret = (typeof factory == 'function') ? factory.apply(mod, [require, mod.exports, mod]) : factory;

    if (ret) {
      mod.exports = ret;
    }
    return mod.exports;
  };

  require.async = function (names, onload, onerror) {
    if (typeof names == 'string') {
      names = [names];
    }

    var needMap = {};
    var needNum = 0;

    function findNeed(depArr) {
      for (var i = 0, n = depArr.length; i < n; i++) {
        //
        // skip loading or loaded
        //
        var dep = require.alias(depArr[i]);

        if (dep in factoryMap) {
          // check whether loaded resource's deps is loaded or not
          var child = resMap[dep] || resMap[dep + '.js'];
          if (child && 'deps' in child) {
            findNeed(child.deps);
          }
          continue;
        }

        if (dep in needMap) {
          continue;
        }

        needMap[dep] = true;
        needNum++;
        loadScript(dep, updateNeed, onerror);

        var child = resMap[dep] || resMap[dep + '.js'];
        if (child && 'deps' in child) {
          findNeed(child.deps);
        }
      }
    }

    function updateNeed() {
      if (0 == needNum--) {
        var args = [];
        for (var i = 0, n = names.length; i < n; i++) {
          args[i] = require(names[i]);
        }

        onload && onload.apply(global, args);
      }
    }

    findNeed(names);
    updateNeed();
  };
  
  /**
   * 作者：PS    
   * 日期：2016-08-30
   * @param {Object} obj 默认资源映射表
   */
  function dealCompatibleModjs(obj){
  	var newRes={};
  	var col = obj.res;
  	for (k in col) {
  		//modjs适用的映射数据格式 则不做任何处理
		if(k.indexOf(".")<0){
			return obj;
		}
	  	if (col.hasOwnProperty(k)) {
	  		//处理依赖中的.js后缀
	  		var newDeps=null;
	  		if (col[k].hasOwnProperty("deps")) {
	  			var deps = col[k].deps;
	  			newDeps=[];
	  			for (var i=0,len=deps.length;i<len;i++) {
					newDeps.push(require.alias(deps[i]));
				}
	  			col[k].deps=newDeps;
	  		}
	  		col[k].url=col[k].uri;
	  		delete col[k].uri;
	  		newRes[require.alias(k)]=col[k];
	  	}
  	}
  	col=obj.pkg;
  	for (k in col) {
  		col[k].url=col[k].uri;
  		delete col[k].uri;
  	}
  	obj.res = newRes;
  	return obj;
  }

  require.resourceMap = function (obj) {
    var k, col;
	
	//开发时 不进行完全编译 提升编译性能
	//obj=dealCompatibleModjs(obj);
	
    // merge `res` & `pkg` fields
    col = obj.res;
    for (k in col) {
      if (col.hasOwnProperty(k)) {
        resMap[k] = col[k];
      }
    }

    col = obj.pkg;
    for (k in col) {
      if (col.hasOwnProperty(k)) {
        pkgMap[k] = col[k];
      }
    }
  };

  require.loadJs = function (url) {
    createScript(url);
  };

  require.loadCss = function (cfg) {
    if (cfg.content) {
      var sty = document.createElement('style');
      sty.type = 'text/css';

      if (sty.styleSheet) { // IE
        sty.styleSheet.cssText = cfg.content;
      } else {
        sty.innerHTML = cfg.content;
      }
      head.appendChild(sty);
    } else if (cfg.url) {
      var link = document.createElement('link');
      link.href = cfg.url;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      head.appendChild(link);
    }
  };


  require.alias = function (id) {
  	//作者：PS    日期：2016-08-30
  	//适配 / 起点开始表示的模块
	if (id.indexOf("/")==0) {
		id=id.substr(1,id.length-1);
	}
	
    return id.replace(/\.js$/i, '');
  };

  require.timeout = 5000;

})(this);