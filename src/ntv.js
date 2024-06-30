// src/ntv.js
import { setOption } from './setOption';

const ntv = {
  init: function(dom) {
    console.log("初始化实例");
    var instance = {
      dom: dom,
      setOption: function(option) {
        console.log("设置选项", option);
        setOption(this, option);
      }
    };

    return instance;
  }
};

export default ntv;
