const $ = require('jquery');
const d3 = require('d3');

// 定义 setOption 函数
var default_style = {
  "width": 100,
  "height": 100,
  "x_gap": 90,
  "y_gap": 70,
  "radius": 6,
  "max_radius": 20,
  "stroke_width": 2,
  "margin_ver": 20,
  "margin_hor": 40,
  "offset_ver": 30
};

var default_mode = {"mode": 0};

function convertToJsonObject(variable) {
  // 检查变量是否为字符串
  if (typeof variable === 'string') {
    try {
      // 尝试将字符串解析为 JSON 对象
      const jsonObject = JSON.parse(variable);
      // 检查解析结果是否为对象
      if (typeof jsonObject === 'object' && jsonObject !== null) {
        return jsonObject;
      } else {
        throw new Error('Parsed value is not an object');
      }
    } catch (error) {
      console.error('Error parsing JSON string:', error);
      return null; // 或者返回其他适当的值
    }
  } else if (typeof variable === 'object' && variable !== null) {
    // 如果变量已经是对象，直接返回
    return variable;
  } else {
    // 变量既不是字符串也不是对象，返回 null 或其他适当的值
    return null;
  }
}

function applyUserSettings(default_setting, user_setting) {
  if (user_setting === undefined) {
    return default_setting;
  }
  
  const merged_settings = { ...default_setting, ...user_setting };
  
  return merged_settings;
}

function calPos(data, s, meta) {
  let paths = data["edges"];    // 节点连接关系
  let infos = data["nodes"];    // 节点信息

  // 计算每个节点的所处位置级别，以及其权重（通过出入度计算）
  let points = {};
  for (const path of paths) {
      for (let ttl in path) {
          let ip = path[ttl];
          if (ip == null) continue;
          if (points[ip] === undefined) {
              points[ip] = {}
              points[ip]["ttl"] = ttl;
              points[ip]["degree"] = 1;
          }
          else {
              points[ip]["ttl"] = Math.min(points[ip]["ttl"], ttl);
              points[ip]["degree"]++;
          }
      }
  }

  // 根据ttl确定每个节点的x位置，根据x位置进行分组
  let locals = [];
  for (let ip in points) {
      let ttl = points[ip].ttl;
      if (locals[ttl] === undefined) {
          locals[ttl] = [];
      }
      locals[ttl].push({ "ip": ip, "degree": points[ip].degree});
  }

  // 根据degree确定每组节点的y位置顺序，degree越大的节点越靠近中心
  let maxPoints = 0;      // 每列(组)节点的最大数量，用于计算画布宽度
  for (let ttl in locals) {
      locals[ttl].sort((a, b) => a.degree - b.degree);
      maxPoints = Math.max(maxPoints, locals[ttl].length);
  }

  // 计算每个节点所处位置，计算cx, cy存入points
  // 根据用户style计算画布宽度和高度
  let verGapLen = maxPoints - 1;
  let horGapLen = Object.keys(locals).length - 1;
  let width = s["x_gap"] * horGapLen + s["margin_hor"] * 2 + s["max_radius"] * 2;
  let height = s["y_gap"] * (verGapLen + verGapLen % 2) + s["margin_ver"] * 2;

  if (width > s.width) s.width = width;
  else width = s.width;
  s.height = height + s["offset_ver"] - (verGapLen % 2) * s["y_gap"];

  let cx = width / 2 - s["x_gap"] * horGapLen / 2; // cx值随着ttl变化而变化

  for (let ttl in locals) {
      let sign = 1;                    // 控制节点一上一下分布；
      let cy = height / 2;             // cy值随着points变化而变化;
      for (let i in locals[ttl]) {
          let ip = locals[ttl][i].ip;
          points[ip]["cx"] = cx;
          points[ip]["cy"] = cy + Math.ceil(i / 2) * sign * s["y_gap"];   // 从中心节点向上下扩散摆放
          sign = sign * -1;
      }
      cx += s["x_gap"];
  }

  // 根据points内得到的每个结点的cx,cy，以及path中的关系，绘图所需的边和节点数据
  let nodes = [], links = [];

  for (let ip in points) {
      points[ip]["key"] = ip;

      for(let label of meta.labels) {
          if(label === "key") continue;
          if(infos[ip] === undefined || infos[ip][label] === null) {
              points[ip][label] = 'Unknown';
          }
          else {
              points[ip][label] = infos[ip][label];
          }
      }
      nodes.push(points[ip]);
  }

  let _record = [];
  for (const path of paths) {
      let _src = path[0];
      let _dst;
      for (let ttl in path) {
          if (ttl == 0) continue;
          let ip = path[ttl];
          if (ip == null) continue;
          _dst = ip;
          if (_record[_src + _dst] === undefined) {
              _record[_src + _dst] = true;
              let link = { "source": points[_src], "target": points[_dst] };
              links.push(link);
          }
          _src = _dst;
      }
  }


  return { "nodes": nodes, "links": links };
}

function setOption(instance, option) {
  var id = instance.id;
  var data = option.data;

  data.nodes = convertToJsonObject(data.nodes);
  data.edges = convertToJsonObject(data.edges);
  var style = applyUserSettings(default_style, option.style);
  var meta = option.meta;
  var mode = applyUserSettings(default_mode, {"mode": option.mode})["mode"];

  $("#tooltip").remove();

  let processedData = calPos(data, style, meta);
  
  const links = processedData.links;
  const nodes = processedData.nodes;

  d3.select(id).selectAll("*").remove();
  const svg = d3.select(id).append('svg')
  .attr('xmlns', 'http://www.w3.org/2000/svg')
  .attr('width', style.width)
  .attr('height', style.height);

  function exColor_key(data, meta) {
    var nodes = data.nodes;
    var color_keys = [];
    for (let ip in nodes) {
        if (color_keys.includes(nodes[ip][meta["color_label"]])) continue;
        color_keys.push(nodes[ip][meta["color_label"]]);
    }
    return color_keys;
  }

  function color(color_key) {
    if (color_key === undefined) return "#808080";
    else return scale(color_key);
  }

  let offset = 10 + style["radius"] / 2 + style["stroke_width"] + 2;
  let color_keys = exColor_key(data, meta);
  let scale = d3.scaleOrdinal(d3.schemeCategory10).domain(color_keys);


  // Three function that change the tooltip when user hover / move / leave a cell
  let mouseover = function (event, d) {
      Tooltip
          .style("opacity", 1)
      d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)
  };
  let mousemove = function (event, d) {
      let location = d3.pointer(event);
      let content = "";
      // meta.over_labels = ["asn", "asn_name"]，所以根据下表遍历
      for(let i = 0; i < meta.over_labels.length; i++) {
        content += meta.over_labels[i] + ": " + d[meta.over_labels[i]]
        if(i != meta.over_labels.length - 1) {
          content += "<br>";
        }
      }
      content = content.substring(0, content.length - 4);
      Tooltip
          .html(content)
          .style("left", (location[0] + 40) + "px")
          .style("top", (location[1]) + "px")
  };
  let mouseleave = function (event, d) {
      Tooltip
          .style("opacity", 0)
      d3.select(this)
          .style("stroke", "#d8d8d8")
          .style("opacity", 0.9)
  };

  // create template of arrows
  svg.append('defs')
  .append('marker')
  .attr('id', 'arrow')
  .attr('markerUnits', 'strokeWidth')
  .attr('markerWidth', '12')
  .attr('markerHeight', '12')
  .attr('viewBox', '0 0 12 12')
  .attr('refX', offset)
  .attr('refY', '6')
  .attr('orient', 'auto')
  .append('path')
  .attr('d', 'M2,2 L10,6 L2,10 L6,6 L2,2')
  .attr('style', 'fill:#foo');

  var Tooltip = d3.select(id)
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0)
  .style("position", "absolute")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("pointer-events", "none");

  // create edge
  const link = svg.append("g")
  .attr("stroke", "#999")
  .attr("stroke-opacity", 0.6)
  .attr("marker-end", "url(#arrow)")
  .selectAll("line")
  .data(links)
  .join("line")
  .attr("stroke-width", 2)
  .attr("x1", d => d.source.cx)
  .attr("y1", d => d.source.cy)
  .attr("x2", d => d.target.cx)
  .attr("y2", d => d.target.cy);

  const node = svg.append("g")
  .selectAll("circle")
  .data(nodes)
  .join("circle")
  .attr("stroke", "#d8d8d8")
  .attr("stroke-width", style["stroke_width"])
  .attr("r", d => Math.min(style["radius"] + d.degree * d.degree, style["max_radius"]))
  .attr("fill", d => color(d[meta["color_label"]]))
  .attr("cx", d => d.cx)
  .attr("cy", d => d.cy)
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);

  for(let i = 0; i < meta.down_labels.length; i++) {
    const down_text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .style("fill", "black")
      .style('font-size', '12px')
      .style('font-family', 'Times news Roman')
      .style('font-weight', 'bold')
      .attr("dy", 30 + i * 15)
      .attr("x", d => d.cx)
      .attr("y", d => d.cy)
      .text(d => d[meta.down_labels[i]])
      .each(function(d) {
        const textElement = d3.select(this);
        const bbox = textElement.node().getBBox();
        textElement.attr("dx", -bbox.width / 2);
      });
  }
  
}

var ntv = {};

ntv.init = function(id) {
  console.log("初始化实例");
  var instance = {
    id: id,
    setOption: function(option) {
      setOption(this, option);
    }
  };

  return instance;
};

module.exports = ntv;
