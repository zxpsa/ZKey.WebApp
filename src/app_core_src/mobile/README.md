[TOC]
# 前端支持文档

> 版本：1.1

# 主要约定和说明

## 说明

- 本项目为前端模板项目，按前后端完全分离。支持常用的html项目应用场景。
- 注意：app_core为框架文件夹，由app_core_src框架源码根据不同应用场景编译生成，如mobile为常用移动app框架，responsive为常用PC响应式框架，开发者可根据自己的应用场景写对应的框架。
- 带删除线的接口为废弃接口，但仍在使用。不再使用的接口会直接从文档删除

## 接口公共属性说明（后端支持）

- 约定和后端间交互，框架通用处理如：通用错误拦截等会遵照该处理。后端可选择不进行支持，前端自行调整对应处理模块方式。

### 网络请求和对原生请求数据返回格式

| **字段** | **数据类型** | **备注**                         |
| ------ | -------- | ------------------------------ |
| status | Integer  | 状态码： 0-成功 1-参数错误 2-业务错误 3-权限错误 |
| msg    | String   | 状态对应消息                         |
| data   | Object   | 接口返回数据                         |

格式一：无返回值

```json
    {"status":0, "msg":"操作成功", "data":null}
```

格式二：返回对象

```json
    {"status":0, "msg":"成功", "data":{"orderNo":"HZ16110102111166", "totalAmount":100.00}}
```

格式三：返回列表

```json
    {"status":0, "msg":"成功", "data":[

        {"id":1, "name":"商品1", "desc":"商品描述1"},

        {"id":2, "name":"商品2", "desc":"商品描述2"}

    ]}
```

格式四：返回分页列表

```json
    {"status":0, "msg":"成功","data":{

       	"pageNo":1,

        "pageSize":20,

        "totalCount":0,

        "totalPage":0,

        "extraData":null,

        "data":[{

            "id":379681,

            "productId":8801,

            "name":"沣瑞祥翡翠",

            "pictures":[

                {"pictureId":154223,"pictureUrl":"GetPicture?PictureId=154223"},

                {"pictureId":154223,"pictureUrl":"GetPicture?PictureId=154223"}

            ]

        },{

            "id":379682,

            "productId":8802,

            "name":"沣瑞祥翡翠",

            "pictures":[

                {"PictureId":154223,"pictureUrl":"GetPicture?PictureId=154223"},

                {"PictureId":154223,"pictureUrl":"GetPicture?PictureId=154223"}

            ]

        }]

    }}
```

### 其它约定

- 所有请求均携带token
- 发送和返回的时间格式为yyyy-MM-dd HH:mm:ss
- 返回超过【long】型数字时请返回字符串（因js当前不支持超过int型的数字长度，过长会被自动截断补充0）

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

## 项目结构

maypp/
```sh
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
# 全局Api

### $App.UserInfo()

- 获得用户相关信息

**return**

| 字段          | 数据类型   | 可空   | 备注         |
| ----------- | ------ | ---- | ---------- |
| userName    | String | 是    | 用户名称       |
| userAccount | String | 否    | 用户账号       |
| token       | String | 否    | 用户token    |
| userId      | String | 是    | 用户id(可能废弃) |



### $App.getCode()

- 生成全局唯一编号

**return**

| 字段    | 数据类型 | 可空   | 备注     |
| ----- | ---- | ---- | ------ |
| value | int  | 否    | 全局唯一编号 |



### $App.Modal(vmOptions)[待重写实现]

- 创建模态窗

**Props**

| 字段        | 数据类型                   | 可空   | 备注               |
| --------- | ---------------------- | ---- | ---------------- |
| vmOptions | Object(Vue组件创建Options) | 否    | Vue组件创建选项Options |

**return**

| 字段    | 数据类型   | 可空   | 备注    |
| ----- | ------ | ---- | ----- |
| value | Object | 否    | 模态窗实例 |

***说明***

- 模态窗可看作特殊组件，存在数个内置方法。
  - value.$_Show() 显示模态窗
  - value.$_Hide()  隐藏模态窗


### $App.alert(content,{option},collback)

> $App.alert(content,collback)

- 创建alert弹出提示

**Props**

| 字段                     | 数据类型     | 可空   | 备注        |
| ---------------------- | -------- | ---- | --------- |
| content                | String   | 否    | 文本内容      |
| [option](#LayerOption) | Object   | 是    | alert设置参数 |
| collback               | Function | 是    | 回调方法      |

**return**

| 字段    | 数据类型   | 可空   | 备注   |
| ----- | ------ | ---- | ---- |
| value | Object | 否    | 弹层编号 |



### $App.msg(content,{option},collback)

> $App.msg(content,collback)

- 创建自动消失消息弹出提示

**Props**

| 字段                     | 数据类型   | 可空   | 备注   |
| ---------------------- | ------ | ---- | ---- |
| content                | String | 否    | 文本内容 |
| [option](#LayerOption) | Object | 是    | 设置参数 |

**return**

| 字段    | 数据类型   | 可空   | 备注   |
| ----- | ------ | ---- | ---- |
| value | Object | 否    | 弹层编号 |



### $App.confirm(content,{option},firstBtnCollback)

> $App.confirm(content,firstBtnCollback)
>
> $App.confirm(content,firstBtnCollback,cancelCollback)

- 创建确认弹出提示

**Props**

| 字段                     | 数据类型     | 可空   | 备注          |
| ---------------------- | -------- | ---- | ----------- |
| content                | String   | 否    | 文本内容        |
| [option](#LayerOption) | Object   | 是    | confirm设置参数 |
| firstBtnCollback       | Function | 是    | 第一个按钮回调方法   |
| cancelCollback         | Function | 是    | 取消按钮回调方法    |

**return**

| 字段    | 数据类型   | 可空   | 备注        |
| ----- | ------ | ---- | --------- |
| value | Object | 否    | confirm编号 |



### $App.loading({opt})

- 创建加载提示

**Props**

| 字段       | 数据类型     | 可空   | 备注     |
| -------- | -------- | ---- | ------ |
| time     | int      | 是    | 自动隐藏时间 |
| shade    | double   | 是    | 透明度    |
| collback | Function | 是    | 回调方法   |

**return**

| 字段    | 数据类型   | 可空   | 备注        |
| ----- | ------ | ---- | --------- |
| value | Object | 否    | loading编号 |



### $App.closeLoding(index)

- 关闭弹出层，对loading生效

**Props**

| 字段    | 数据类型 | 可空   | 备注    |
| ----- | ---- | ---- | ----- |
| index | Int  | 是    | 层返回索引 |



### $App.dateControlInit({opt})

- 时间or日期控件初始化
- 【PC】

**Props**

| 字段     | 数据类型    | 可空   | 备注                       |
| ------ | ------- | ---- | ------------------------ |
| istime | Boolean | 是    | 是否显示详细时间选项               |
| format | String  | 是    | 时间格式：YYYY-MM-DD hh:mm:ss |





### $App.ImgViewer(id,{opt})

- 图片查看器
- 【PC】

**Props**

| 字段   | 数据类型   | 可空   | 备注                |
| ---- | ------ | ---- | ----------------- |
| id   | String | 是    | 将要展示的图片查看器所属容器的id |
| opt  | Object | 是    | 选项                |



### $App.go(val/{opt})

- 导航到一个新页面
- 为了保证页面跳转在多环境使用正常,故在使用相对路径时 仅支持基于根目录的相对路径

**Props0**

| 字段   | 数据类型          | 可空   | 备注                                      |
| ---- | ------------- | ---- | --------------------------------------- |
| val  | String or Int | 否    | 新页面的路径(绝对或者基于根目录的相对路径)/数字为前进or后退层数 0为刷新 |



**Props1**

| 字段          | 数据类型    | 可空   | 备注                     |
| ----------- | ------- | ---- | ---------------------- |
| isTopGo     | Boolean | 是    | 是否在定级                  |
| path        | String  | 否    | 新页面的路径(绝对或者基于根目录的相对路径) |
| params      | Object  | 是    | 非Url携带参数               |
| query       | Object  | 是    | Url携带参数                |
| gotoHistory | Boolean | 是    | 是否跳转到历史记录中的地址          |



### $App.getDictionary(dictKey,phraseKey,calback)

- 获取通用字典

**Props**

| 字段        | 数据类型     | 可空   | 备注    |
| --------- | -------- | ---- | ----- |
| dictKey   | String   | 否    | 字典key |
| phraseKey | String   | 是    | 短语Key |
| calback   | Function | 是    | 回调    |



### $App.getContentByCategoryCode(code,calback)

- 获取内容配置By分类Code

**Props**

| 字段      | 数据类型            | 可空   | 备注   |
| ------- | --------------- | ---- | ---- |
| code    | String          | 否    | 分类编号 |
| calback | Function(获取到结果) | 是    | 回调   |



### $App.getContent(code,calback)

- 获取内容配置

**Props**

| 字段      | 数据类型            | 可空   | 备注   |
| ------- | --------------- | ---- | ---- |
| code    | String          | 否    | 内容编号 |
| calback | Function(获取到结果) | 是    | 回调   |



# 通用工具库

## String.prototype.trim()

- 清除两边的空格

**Props**

| 字段      | 数据类型   | 可空   | 备注    |
| ------- | ------ | ---- | ----- |
| html    | String | 否    | 内容字符串 |
| options | Object | 否    | 处理选项  |



## String.prototype.replaceAll(reallyDo, replaceWith, ignoreCase)

- 清除两边的空格
- 默认区分大小写

**Props**

| 字段          | 数据类型    | 可空   | 备注      |
| ----------- | ------- | ---- | ------- |
| reallyDo    | String  | 否    | 旧内容     |
| replaceWith | Object  | 否    | 新内容     |
| ignoreCase  | Boolean | 是    | 是否忽略大小写 |



## Date.prototype.format(format)

- 拓展--Date格式化
- 例:
  - (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423   
  - (new Date()).Format("yyyy-M-d h:m\\:s.S")      ==> 2006-7-2 8:9:4.18  

**Props**

| 字段     | 数据类型   | 可空   | 备注                  |
| ------ | ------ | ---- | ------------------- |
| format | String | 否    | yyyy-MM-dd hh:mm:ss |



## Date.prototype.diff(objDate, interval)

- 拓展--计算当前时间与目标时间差

**Props**

| 字段       | 数据类型   | 可空   | 备注                            |
| -------- | ------ | ---- | ----------------------------- |
| objDate  | String | 否    | 目标时间                          |
| interval | String | 否    | 计算类型 s:秒 n:分钟 d:日 w:周 m:月 y:年 |



## String.prototype.getBytesLen()

- 拓展--获取字节长度





## docId(id)

- 通过Id获取Doc元素

**Props**

| 字段   | 数据类型   | 可空   | 备注          |
| ---- | ------ | ---- | ----------- |
| id   | String | 否    | document id |



## $G.nowTime()

- 获取当前时间(yyyy-MM-dd HH:mm:ss)



## $G.nowDay()

- 获取当前日期(yyyy-MM-dd 00:00:00)



## $G.toQueryString(obj, url)

- 简易将JSON对象转换为QueryString结构
- 如:aaa=123&aa=1

**Props**

| 字段   | 数据类型   | 可空   | 备注              |
| ---- | ------ | ---- | --------------- |
| obj  | Object | 否    | {aa:12,asd:231} |
| url  | String | 是    | 需要主动拼接Url的地址    |



## $G.Session()

- 会话缓存实例

### session.set(key, value)

- 存储缓存

**Props**

| 字段    | 数据类型   | 可空   | 备注   |
| ----- | ------ | ---- | ---- |
| key   | String | 否    | key  |
| value | Object | 否    | 值    |



### session.get(key, valType)

- 获取存储的缓存

**Props**

| 字段   | 数据类型   | 可空   | 备注   |
| ---- | ------ | ---- | ---- |
| key  | String | 否    | key  |



### session.remove(key)

- 移出内容

**Props**

| 字段   | 数据类型   | 可空   | 备注   |
| ---- | ------ | ---- | ---- |
| key  | String | 否    | key  |



### session.clear(key)

- 清空所有数据




## $G.Local()

- 本地存储实例

### local.set(key, value)

- 存储

**Props**

| 字段         | 数据类型   | 可空   | 备注      |
| ---------- | ------ | ---- | ------- |
| key        | String | 否    | key     |
| value      | Object | 否    | 值       |
| expireTime | String | 是    | 过期时间(秒) |



### local.get(key, valType)

- 获取存储的数据

**Props**

| 字段   | 数据类型   | 可空   | 备注   |
| ---- | ------ | ---- | ---- |
| key  | String | 否    | key  |



### local.remove(key)

- 移出存储的数据

**Props**

| 字段   | 数据类型   | 可空   | 备注   |
| ---- | ------ | ---- | ---- |
| key  | String | 否    | key  |



### local.clear(key)

- 清空所有数据




## $G.base64Encode(data)

- base64编码

**Props**

| 字段   | 数据类型   | 可空   | 备注   |
| ---- | ------ | ---- | ---- |
| data | String | 否    | 内容值  |



## $G.base64Decode(data)

- base64解码

**Props**

| 字段   | 数据类型   | 可空   | 备注   |
| ---- | ------ | ---- | ---- |
| data | String | 否    | 内容值  |



## $G.getCookie(key)

- 获取cookie中存储的值

**Props**

| 字段   | 数据类型   | 可空   | 备注    |
| ---- | ------ | ---- | ----- |
| key  | String | 否    | 内容key |



## $G.delCookie(key)

- 删除cookie中存储的值

**Props**

| 字段   | 数据类型   | 可空   | 备注    |
| ---- | ------ | ---- | ----- |
| key  | String | 否    | 内容key |



## $G.deviceInfo

- 当前设备信息对象实例(已实例化)

### deviceInfo.isBrowser

- 是否是某某游览器

**Props**

| 字段      | 类型             |
| ------- | -------------- |
| .wx     | 微信游览器          |
| .ie     | IE内核           |
| .opera  | opera          |
| .webKit | 苹果、谷歌内核        |
| .fix    | 火狐内核           |
| .mobile | 是否为移动终端        |
| .safari | 是否为safari标准游览器 |
| .qq     | 是否QQ游览器        |



### deviceInfo.isSystem

- 是否是某某系统

**Props**

| 字段       | 类型        |
| -------- | --------- |
| .ios     | ios系统     |
| .android | Android系统 |



## $G.htmlEncode(html, options)

- html编码,处理字符串中\n等字符

**Props**

| 字段      | 数据类型   | 可空   | 备注    |
| ------- | ------ | ---- | ----- |
| html    | String | 否    | 内容字符串 |
| options | Object | 否    | 处理选项  |

**options**

| 字段        | 数据类型    | 可空   | 备注      |
| --------- | ------- | ---- | ------- |
| dealBlank | Boolean | 是    | 是否处理空字符 |



## $G.htmlDecode(html, options)

- html解码,处理字符串中"\<br/>"等字符为显示"\n"等

**Props**

| 字段      | 数据类型   | 可空   | 备注    |
| ------- | ------ | ---- | ----- |
| html    | String | 否    | 内容字符串 |
| options | Object | 否    | 处理选项  |

**options**

| 字段        | 数据类型    | 可空   | 备注      |
| --------- | ------- | ---- | ------- |
| dealBlank | Boolean | 是    | 是否处理空字符 |



# 基础服务—待修改

### 说明：

- 为App提供各种基础软件或者硬件功能服务
- 服务回调方法传递对象为ZKResult：{code:10000,desc:"描述"，data:"实际数据"}

## 分享服务API

>  <a id="zk_shared">app_core/services/shared</a>
>
>  **HyAppApi：Shared**

### 分享类型枚举

> <a id="sharedService.TypeEnum">SharedService.TypeEnum</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段       | 备注     |
| -------- | ------ |
| QQ       | QQ朋友圈  |
| WX       | WX好友   |
| WXCircle | 微信朋友圈  |
| SMS      | 分享到短信  |
| CopyLink | 分享复制链接 |
| QR       | 分享二维码  |
| QQSpace  | QQ空间   |

### 发起分享

> <a id="sharedService.excute">sharedService.excute(type,title,imgURL,content,clickURL,sucess,error)</a>
>
> **HyAppApi：Shared.excute(type,title,imgURL,content,clickURL,sucess,error)**
>
> Shared.excute(type,title,imgURL,content,clickURL).then(function(){
>
> }).then(function(){
>
> })
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段       | 数据类型     | 可空   | 备注         |
| -------- | -------- | ---- | ---------- |
| type     | TypeEnum | 否    | 分享类型       |
| title    | String   | 否    | 分享标题       |
| imgURL   | String   | 否    | 分享图片地址     |
| content  | String   | 是    | 分享内容       |
| clickURL | String   | 是    | 点击文本块后访问地址 |
| sucess   | Function | 是    | 分享成功回调     |
| error    | Function | 是    | 分享失败回调     |

### 根据内容code发起分享

> <a id="sharedService.excuteByContentCode">sharedService.excuteByContentCode(type,code,sucess,error)</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段     | 数据类型     | 可空   | 备注          |
| ------ | -------- | ---- | ----------- |
| type   | TypeEnum | 否    | 分享类型        |
| code   | String   | 否    | 内容管理中内容Code |
| sucess | String   | 否    | 分享成功回调      |
| error  | String   | 是    | 分享失败回调      |



## 视频服务API

>  <a id="zk_shared">app_core/services/video</a>
>
>  **HyAppApi：Video**

### 视频类型枚举

> <a id="videoService.TypeEnum">VideoService.TypeEnum</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段    | 备注   |
| ----- | ---- |
| MPEG4 |      |
| AVI   |      |

### 拍摄视频

> <a id="video.shoot">video.shoot(dealParam,success,error)</a>
>
> **HyAppApi：Video.shoot(dealParam,success,error)**
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段             | 数据类型                              | 可空   | 备注                |
| -------------- | --------------------------------- | ---- | ----------------- |
| dealParam      | Object                            | 否    | 处理参数              |
| sucess(result) | Function(ZKResult\<SucessResult>) | 否    | 拍摄成功回调（拍摄后文件所在路径） |
| error          | Function                          | 否    | 拍摄失败回调            |
| serverURL      | String                            | 是    | 服务器上传接口地址/null不上传 |

**DealParam**

| 字段      | 数据类型   | 可空   | 备注   |
| ------- | ------ | ---- | ---- |
| quality | Double | 是    | 压缩质量 |
| width   | Double | 是    | 视频宽度 |
| height  | Double | 是    | 视频高度 |
| time    | Double | 是    | 录制时间 |

### 选择视频

> <a id="video.select">video.select(dealParam,success,error,serverURL)</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段                                   | 数据类型                              | 可空   | 备注                |
| ------------------------------------ | --------------------------------- | ---- | ----------------- |
| serverURL                            | String                            | 是    | 服务器上传接口地址/null不上传 |
| <a href="#video.shoot">dealParam</a> | Object                            | 是    | 处理参数              |
| sucess(result)                       | Function(ZKResult\<SucessResult>) | 否    | 上传成功回调            |
| error(result)                        | Function(ZKResult)                | 否    | 上传失败回调            |

**SucessResult**

| 字段           | 数据类型                                     | 可空   | 备注                  |
| ------------ | ---------------------------------------- | ---- | ------------------- |
| path         | String                                   | 是    | 文件所在本地路径            |
| resourcesId  | String                                   | 否    | 服务器返回资源Id           |
| resourcesUrl | String                                   | 否    | 服务器返回资源地址（带http://） |
| type         | <a id="videoService.TypeEnum">TypeEnum</a> | 否    | 视频格式                |



## 图片服务API

>  <a id="zk_shared">app_core/services/imge</a>
>
>  **HyAppApi：ZKImge**

### 图片类型枚举

> <a id="Imge.TypeEnum">Imge.TypeEnum</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段   | 备注   |
| ---- | ---- |
| BMP  |      |
| GIF  |      |
| JPEG |      |
| SVG  |      |
| PNG  |      |
| WebP |      |

### 拍摄图片

> <a id="imge.shoot">imge.shoot(dealParam,success,error,serverURL)</a>
>
> **HyAppApi：ZKImge.shoot(dealParam,success,error,serverURL)**
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段             | 数据类型                               | 可空   | 备注                    |
| -------------- | ---------------------------------- | ---- | --------------------- |
| dealParam      | Object                             | 是    | 处理参数                  |
| sucess(result) | Function(ZKResult\<SucessResult\>) | 否    | 拍摄成功／上传成功回调           |
| error          | Function                           | 否    | 拍摄失败／上传失败回调           |
| serverURL      | String                             | 是    | 服务器上传接口地址／为null时不进行上传 |

**DealParam**

| 字段      | 数据类型                                  | 可空   | 备注                |
| ------- | ------------------------------------- | ---- | ----------------- |
| quality | Double                                | 是    | 压缩质量（WebApp模式时无效） |
| width   | Double                                | 是    | 宽度                |
| height  | Double                                | 是    | 高度                |
| type    | <a href="#Imge.TypeEnum">TypeEnum</a> | 是    | 图片格式              |

**SucessResult**

| 字段           | 数据类型                                  | 可空   | 备注                  |
| ------------ | ------------------------------------- | ---- | ------------------- |
| path         | String                                | 是    | 图片所在本地路径            |
| resourcesId  | String                                | 否    | 服务器返回资源Id           |
| resourcesUrl | String                                | 否    | 服务器返回资源地址（带http://） |
| type         | <a href="#Imge.TypeEnum">TypeEnum</a> | 否    | 图片格式                |

### 选择图片

> <a id="imge.select">imge.select(dealParam,success,error,allowSelectCount,serverURL,allowTypes)</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段                                  | 数据类型                                     | 可空   | 备注                |
| ----------------------------------- | ---------------------------------------- | ---- | ----------------- |
| serverURL                           | String                                   | 是    | 服务器上传接口地址／null不上传 |
| <a href="#imge.shoot">dealParam</a> | Object                                   | 是    | 处理参数              |
| allowSelectCount                    | Int                                      | 是    | 允许同时选中数量/1单选      |
| sucess(result)                      | Function(ZKResult\<List\<SucessResult>>) | 否    | 上传成功回调            |
| error(result)                       | Function(ZKResult)                       | 否    | 上传失败回调            |
| allowTypes                          | List<<a href="#Imge.TypeEnum">TypeEnum</a>> | 是    | 允许的图片格式           |



**SucessResult**

| 字段           | 数据类型                                  | 可空   | 备注                  |
| ------------ | ------------------------------------- | ---- | ------------------- |
| path         | String                                | 是    | 图片所在本地路径            |
| resourcesId  | String                                | 否    | 服务器返回资源Id           |
| resourcesUrl | String                                | 否    | 服务器返回资源地址（带http://） |
| type         | <a href="#Imge.TypeEnum">TypeEnum</a> | 否    | 图片格式                |



## 音频服务API

> <a id="zk_shared">app_core/services/audio</a>
>
> **HyAppApi：ZKAudio**

### 音频类型枚举

> <a id="Audio.TypeEnum">Audio.TypeEnum</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段   | 备注   |
| ---- | ---- |
| MP3  |      |
| WAV  |      |
| WMA  |      |
| MID  |      |

### 录音

> <a id="audio.record">audio.record(dealParam,success,error,serverURL)</a>
>
> **HyAppApi：ZKAudio.record(dealParam,success,error,serverURL)**
>
> WebApp时无该方法
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段             | 数据类型                              | 可空   | 备注                |
| -------------- | --------------------------------- | ---- | ----------------- |
| dealParam      | DealParam                         | 否    | 处理参数              |
| sucess(result) | Function(ZKResult\<SucessResult>) | 否    | 成功回调              |
| error          | Function                          | 否    | 失败回调              |
| serverURL      | String                            | 是    | 服务器上传接口地址/null不上传 |

**DealParam**

| 字段      | 数据类型   | 可空   | 备注   |
| ------- | ------ | ---- | ---- |
| quality | Double | 是    | 压缩质量 |
| time    | Double | 是    | 录制时间 |

**SucessResult**

| 字段           | 数据类型                                 | 可空   | 备注                  |
| ------------ | ------------------------------------ | ---- | ------------------- |
| path         | String                               | 是    | 文件所在本地路径            |
| resourcesId  | String                               | 否    | 服务器返回资源Id           |
| resourcesUrl | String                               | 否    | 服务器返回资源地址（带http://） |
| type         | <a id="#Audio.TypeEnum">TypeEnum</a> | 否    | 音频格式                |



## 文件上传服务API

> <a id="file">app_core/services/file</a>
>
> **HyAppApi：ZKFile**

### 文件类型枚举

> <a id="File.TypeEnum">File.TypeEnum</a>
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段                      | 备注   |
| ----------------------- | ---- |
| BMP                     |      |
| GIF                     |      |
| JPEG                    |      |
| SVG                     |      |
| PNG                     |      |
| WebP                    |      |
| XML                     |      |
| Zip                     |      |
| MPEG4                   |      |
| IMG\|FILE\|AUDIO\|VIDEO |      |
| AVI                     |      |
| MP3                     |      |
| WAV                     |      |
| WMA                     |      |
| IMG                     |      |
| FILE                    |      |
| AUDIO                   |      |
| VIDEO                   |      |
|                         |      |

### 上传

> <a id="file.upload">file.upload(serverURL,filesPaths,success,error,dealParam)</a>
>
> **HyAppApi：ZKFile.upload(serverURL,filesPaths,success,error,dealParam)**
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段             | 数据类型                                     | 可空   | 备注                |
| -------------- | ---------------------------------------- | ---- | ----------------- |
| serverURL      | String                                   | 是    | 服务器上传接口地址         |
| fileInfos      | List\<FileInfo>                          | 是    | 文件列表／null自行获取文件信息 |
| sucess(result) | Function(ZKResult\<List\<SucessResult>>) | 否    | 成功回调              |
| error          | Function(ZKResult)                       | 否    | 失败回调              |
| dealParam      | DealParam                                | 是    | 处理参数              |

**FileInfo**

| 字段   | 数据类型                                  | 可空   | 备注   |
| ---- | ------------------------------------- | ---- | ---- |
| Path | String                                | 是    | 路径   |
| type | <a href="#File.TypeEnum">TypeEnum</a> | 是    | 文件格式 |

**DealParam**

| 字段        | 数据类型                                  | 可空   | 备注                  |
| --------- | ------------------------------------- | ---- | ------------------- |
| quality   | Double                                | 是    | 建议压缩质量（WebApp模式时无效） |
| type      | <a href="#File.TypeEnum">TypeEnum</a> | 是    | 目标文件格式              |
| maxSize   |                                       |      |                     |
| maxWidth  |                                       |      |                     |
| maxHeight |                                       |      |                     |
|           |                                       |      |                     |
|           |                                       |      |                     |

**SucessResult**

| 字段           | 数据类型   | 可空   | 备注                  |
| ------------ | ------ | ---- | ------------------- |
| path         | String | 是    | 图片所在本地路径            |
| resourcesId  | String | 否    | 服务器返回资源Id           |
| resourcesUrl | String | 否    | 服务器返回资源地址（带http://） |

### 选择文件

> <a id="file.select">file.select(dealParam,success,error,allowSelectCount,serverURL,allowTypes)</a>
>
> **HyAppApi：ZKFile.select(dealParam,success,error,allowSelectCount,serverURL,allowTypes)**
>
> 作者：裴胜
>
> 时间：2017-02-27

**Props**

| 字段                                   | 数据类型                                     | 可空   | 备注                |
| ------------------------------------ | ---------------------------------------- | ---- | ----------------- |
| serverURL                            | String                                   | 是    | 服务器上传接口地址／null不上传 |
| <a href="#file.upload">dealParam</a> | DealParam                                | 是    | 处理参数              |
| allowSelectCount                     | Int                                      | 是    | 允许做多选中数量/1单选      |
| sucess(result)                       | Function(ZKResult\<List\<SucessResult>>) | 否    | 上传成功回调            |
| error(result)                        | Function(ZKResult)                       | 否    | 上传失败回调            |
| allowTypes                           | List\<<a id="#File.TypeEnum">TypeEnum</a>> | 是    | 允许的文件格式           |

**SucessResult**

| 字段           | 数据类型   | 可空   | 备注                  |
| ------------ | ------ | ---- | ------------------- |
| path         | String | 是    | 文件所在本地路径            |
| resourcesId  | String | 否    | 服务器返回资源Id           |
| resourcesUrl | String | 否    | 服务器返回资源地址（带http://） |



# 支付服务API

> 待设计



# 地图／定位服务API

> 待设计



# OCR识别服务API

> 待设计



# 日历／时间选择器服务API

> 待设计

# 扫描二维码／条码服务API

> 待设计



# 组件和控件

### 说明：

- 组件化实现方式基于vue+fis3+modjs实现，可完全实现解耦与多种方式进行复用。
- 组件文件名以【.vue】结尾，可以html的方式打开，在各个文本编辑器中编辑以及获得代码提示。
- 传入组件的参数绑定通过对html模板中组件占位标签属性显示声明绑定
- 父组件调用子组件的方法或数据，可通过this.$refs.【子组件id】的方式调用

***说明:***

- 【\<zk-list>】为组件占位标签，可自定义 
- 【:paging-list.sync】为绑定组件传入参数（双向绑定，vue2.0已不推荐该写法，故自写组件慎用）
- 【:get-data-before】绑定列表组件发起网络请求前的回调方法（单向绑定）
- 【 v-ref:ik-list】设置组件id（主要用于必要时获得组件）

### 地区选择组件【area_select.vue】---已经删除
> <a id="ik_list">components/area_select.vue</a>
>
> 作者：裴胜
>
> 时间：2016-09-21



**Props**

| 字段    | 数据类型   | 可空   | 备注        |
| ----- | ------ | ---- | --------- |
| value | Object | 否    | 默认选中数据    |
| url   | String | 否    | 数据来源api接口 |

**Events**

| 字段     | 回调参数                                     | 备注   |
| ------ | ---------------------------------------- | ---- |
| change | { province : { 	"code" : "0", 	"name" : "全国" }, city : { "code" : "0","name" : "全国" 	}, district : { "code" : "0","name" : "全国" } } | 选择结果 |

**示例**

***HTML***

```html
<area-select :value="area"></area-select>
```

***JS***

```javascript
module.exports = {
	//必填(申明控制器作用域)
	el: 'body',
	data: {
      area: {
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
	},
	//挂载的组件
	components: {
		"areaSelect": require("components/area_select.vue")
	}
};
```
