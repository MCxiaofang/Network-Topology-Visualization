(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
      console.log("CommonJS环境");
      module.exports = factory(require('d3'), require('./setOption'));
    } else if (typeof define === "function" && define.amd) {
      console.log("AMD环境");
      define(['d3', './setOption'], factory);
    } else {
      console.log("浏览器环境");
      global.ntv = factory(global.d3, global.setOption);
      console.log(global.ntv);  // 添加调试信息
    }
  }(typeof window !== "undefined" ? window : this, function(d3, setOption) {
    var ntv = {};
  
    ntv.init = function(dom) {
      console.log("初始化实例");
      var instance = {
        dom: dom,
        setOption: function(option) {
          console.log("设置选项", option);
          setOption(this, option);
        }
      };
  
      return instance;
    };
  
    return ntv;
  }));
  