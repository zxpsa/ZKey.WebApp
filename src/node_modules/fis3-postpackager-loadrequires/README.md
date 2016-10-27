# fis3-postpackager-loadrequires

用于自动加载模块化资源的[FIS](https://github.com/fex-team/fis)插件，由fis-postpackager-autoload改造而来。添加了excludeModule配置。

## 功能

 - 将当前页面的所有资源依赖自动注入页面中，


## 安装

    $ npm install -g fis3-postpackager-loadrequires

## 配置参数

    excludeModule参数可以添加无需自动引入的模块名称，如["jquery", "bootstrap"]

    其他参考[fis-postpackager-autoload](https://www.npmjs.com/package/fis-postpackager-autoload)

## 用法

    fis.match('::package', {
        postpackager: [fis.plugin('requires'), fis.plugin('loadrequires', {excludeModule: ['jquery']})]
    });