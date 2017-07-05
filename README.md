## 说明

- 本项目为前端模板项目，按前后端完全分离。支持常用的html项目应用场景。实现不同场景中，开发模式高度统一，通过切换框架部分适应各种特殊需求，且常规开发者完全不用考虑编译相关的自动化处理。
- 本项目支持常用WebApp，基于Cordova的混合App，基于常规WebView的混合App，PC端响应式，微信H5App。从而支持一个项目自行适应不同环境，和应用场景。
- 本项目模式使用UI还原程度最高的淘宝**Flexible**，自动对单独CSS文件和Vue文件中css部分进行px转rem处理，若无需求，屏蔽编译设置即可。
## 项目结构

```sh
maypp/
    |-- app_core/ # 前端框架库
    | |-- components/ # 基础框架组件
    | |-- directives/ # 基础框架指令
    | |-- libs/ # 框架自带依赖库/项目标准依赖库
    | |-- services/ # 框架基础服务
    | | |-- shared # 分享服务
    | | | |-- components # 分享UI组件
    | | | |-- directives/ # 分享相关指令
    | | | |-- index.js # 分享服务核心js
    | | |-- img # 图片服务
    | | | |-- components # 图片UI组件
    | | | |-- index.js # 图片服务核心js
    | |-- core.js # 框架核心js
    |-- app_common/ # app级别公共资源
    | |-- html/ # app级别公共html资源/嵌入资源 比如头部Nav
    | |-- services/ # app级别公共service
    | | |-- shared # 分享服务
    | | | |-- components # 分享UI组件
    | | | |-- directives/ # 分享指令
    | | | |-- index.js # 分享服务核心js
    | |-- components # app级别公共UI组件
    | |-- directives/ # app级别公共指令
    |-- libs/ # app依赖库
    | |-- swiper/ # 轮播插件库
    |-- mock/ # 接口模拟
    |-- modules/ # 业务功能模块集合
    | |-- 个人中心/ # 业务模块a
    | | |-- common/ # 业务模块a的公共资源
    | | | |-- services/ # 业务模块a的公共服务
    | | | |-- models/ # 业务模块a的模型
    | | | |-- components # 业务模块a的公共组件
    | | | |-- directives/ # 业务模块a的公共指令
    | | |-- page_a.html # 页面
    | | |-- page_b.html # 页面
    | | |-- 用户注册/ # 业务模块"个人中心"的子模块用户注册
    | | | |-- common/ # 业务模块a的公共资源
    | | | | |-- services/ # 业务模块a的公共服务
    | | | | |-- models/ # 业务模块a的模型
    | | | | |-- components # 业务模块a的公共组件
    | | | | |-- directives/ # 业务模块a的公共指令
    | |-- demo_b/ # 业务模块b
    |-- config_info.js # 跟随项目变化的配置文件
    |-- config.js # 跟随环境变化的配置文件
    |-- fis-conf.js # 构建和打包配置
    |-- index.html # app入口／通常为单页容器
```

- app_core为框架文件夹，由app_core_src框架源码根据不同应用场景编译生成，如mobile为常用移动app框架，responsive为常用PC响应式框架，开发者可根据自己的应用场景写对应的框架。app_core_src可做为单独框架项目存在，发布时可排除app_core_src，实现多个项目共享一个框架。

## 前端规则要求

- 目录/文件名全小写，两个单词间使用英文下划线“_”间隔（user_index.html）【linux中严格区分大小写，为便于跨平台通用部署固有此规定】
- 根目录下仅可修改modules下内容【modules之外新增或修改在正式环境是无效果的】。
- 变量方法等的命名请尽量遵照前端标准规范
- 请切记不要变动【fis-conf.js】中配置除非已有深入了解
- 【node_modules】中文件请勿修改
- 禁止modules下第一层模块间的(独立功能模块)相互依赖(避免单次过多的加载代码) 每一层模块公共代码请放置于common中,利于按模块进行惰性加载
- 多文本中存在返回数据有\n等的字符时，且需要原样展示时,需要严格使用$G.htmlEncode转码，避免注入攻击。
- 使用全局对象 请申请
## 参考文档

- [响应式数据绑定框架 Vue1.0](http://cn.vuejs.org/guide/)

- [响应式数据绑定框架 Vue2.0](http://vuefe.cn/guide)

- [自动化构建工具fis3](http://fis.baidu.com/fis3/docs/beginning/intro.html)

## 鸣谢

- 大量使用了开源的第三方控件进行二次封装,故对非本组织的代码,所有权归原作者所有。
- 非常感谢以下开源控件的创作者以及其他未知作者
- [贤心·杭州【layui，layerDate】](https://github.com/sentsin/layui/) 
- [Evan You【Vue1，vue2】](https://github.com/vuejs/vue)

## 依赖npm编译插件

    npm install -g fis3-postpackager-loader
    npm install -g fis-postprocessor-px2rem
    npm install -g fis3-deploy-replace
    npm install -g fis3-deploy-skip-packed
    npm install -g fis3-deploy-zip
    npm install -g fis3-hook-commonjs
    npm install -g fis3-hook-relative
    npm install -g fis3-parser-vue-component
    npm install -g fis3-postpackager-loadrequires
    npm install -g fis3-deploy-tar