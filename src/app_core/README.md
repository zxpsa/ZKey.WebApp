if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
	FastClick.attach(document.body);
	}, false);
}
<!--
	core.js 已打包以下 故不用额外引用
	- jquery.min.js
	- mod.js
	- vue.js 2.0
	- fastclick.js
-->