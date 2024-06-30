(function(global, factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
      // CommonJS 环境
      module.exports = factory(require('d3'));
    } else if (typeof define === "function" && define.amd) {
      // AMD 环境
      define(['d3'], factory);
    } else {
      // 浏览器全局环境
      global.setOption = factory(global.d3);
    }
  }(typeof window !== "undefined" ? window : this, function(d3) {
    return function setOption(instance, option) {
      var dom = instance.dom;
      var data = option.data;
  
      // 清空之前的内容
      d3.select(dom).selectAll("*").remove();
  
      // 例如，创建一个简单的圆形
      var svg = d3.select(dom)
        .append("svg")
        .attr("width", dom.clientWidth)
        .attr("height", dom.clientHeight);
  
      // 这里你可以根据你的需求使用d3.js绘制图表
      // 例如：
      svg.append("circle")
        .attr("cx", dom.clientWidth / 2)
        .attr("cy", dom.clientHeight / 2)
        .attr("r", 50)
        .style("fill", "blue");
    };
  }));
  