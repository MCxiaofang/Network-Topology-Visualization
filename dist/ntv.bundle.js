/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"));
	else if(typeof define === 'function' && define.amd)
		define(["d3"], factory);
	else if(typeof exports === 'object')
		exports["ntv"] = factory(require("d3"));
	else
		root["ntv"] = factory(root["d3"]);
})(this, (__WEBPACK_EXTERNAL_MODULE_d3__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ntv.js":
/*!********************!*\
  !*** ./src/ntv.js ***!
  \********************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  if (( false ? 0 : _typeof(module)) === \"object\" && _typeof(module.exports) === \"object\") {\n    console.log(\"CommonJS环境\");\n    module.exports = factory(__webpack_require__(/*! d3 */ \"d3\"), __webpack_require__(/*! ./setOption */ \"./src/setOption.js\"));\n  } else if (true) {\n    console.log(\"AMD环境\");\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! d3 */ \"d3\"), __webpack_require__(/*! ./setOption */ \"./src/setOption.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(typeof window !== \"undefined\" ? window : this, function (d3, _setOption) {\n  var ntv = {};\n  ntv.init = function (dom) {\n    console.log(\"初始化实例\");\n    var instance = {\n      dom: dom,\n      setOption: function setOption(option) {\n        console.log(\"设置选项\", option);\n        _setOption(this, option);\n      }\n    };\n    return instance;\n  };\n  return ntv;\n});\n\n//# sourceURL=webpack://ntv/./src/ntv.js?");

/***/ }),

/***/ "./src/setOption.js":
/*!**************************!*\
  !*** ./src/setOption.js ***!
  \**************************/
/***/ (function(module, exports, __webpack_require__) {

eval("/* module decorator */ module = __webpack_require__.nmd(module);\nvar __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\n(function (global, factory) {\n  if (( false ? 0 : _typeof(module)) === \"object\" && _typeof(module.exports) === \"object\") {\n    // CommonJS 环境\n    module.exports = factory(__webpack_require__(/*! d3 */ \"d3\"));\n  } else if (true) {\n    // AMD 环境\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! d3 */ \"d3\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else {}\n})(typeof window !== \"undefined\" ? window : this, function (d3) {\n  return function setOption(instance, option) {\n    var dom = instance.dom;\n    var data = option.data;\n\n    // 清空之前的内容\n    d3.select(dom).selectAll(\"*\").remove();\n\n    // 例如，创建一个简单的圆形\n    var svg = d3.select(dom).append(\"svg\").attr(\"width\", dom.clientWidth).attr(\"height\", dom.clientHeight);\n\n    // 这里你可以根据你的需求使用d3.js绘制图表\n    // 例如：\n    svg.append(\"circle\").attr(\"cx\", dom.clientWidth / 2).attr(\"cy\", dom.clientHeight / 2).attr(\"r\", 50).style(\"fill\", \"blue\");\n  };\n});\n\n//# sourceURL=webpack://ntv/./src/setOption.js?");

/***/ }),

/***/ "d3":
/*!*********************!*\
  !*** external "d3" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_d3__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ntv.js");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});