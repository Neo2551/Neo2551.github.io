$(function() {
 
  var width = Math.min(960, innerWidth),
    height = Math.min(500, innerHeight);

  var svg = d3.select("#svgOmgHearts")
    .attr("width", width)
    .attr("height", height);
    
  svg.append("rect")
    .attr("width", width)
    .attr("height", height)
    .on("ontouchstart" in document ? "touchmove" : "mousemove", plotHeart);

  var i = 0;
  var j = 0;  

  function plotHeart() {
    
    var m = d3.mouse(this);
    
    // var hearts = svg;
    var dat = {"x" : m[0] , "y" : m[1] + 60};

    var translate = function(d, a){
      return "translate(" + a*d.x + "," + a*(d.y - 60) + ")";
    }

    var scaleFromCenter = function(d, scaleFact) {
      return translate(d, a = 1) + "scale(" + scaleFact + ")" + 
        translate(d, a = -1);
    }

    var  heartStr = function(d){                
      return ["M" + d.x + " " + (+d.y - 15),
              "c 3 -30 10 -35 20 -40",
              "s 30 -20 20 -35",
              "q -13 -15 -30 0",
              "q -10 10 -10 25",
              "q 0 -15 -10 -25",
              "s -17 -15 -30 5",
              "s 2 25 10 30",
              "s 30 10 30 40",
              "Z"].join();
    }

    var x = function(d) { return d.x; }
    var y = function(d) { return d.y; }

    svg.insert("path", "rect")
      .attr("transform", function() {return scaleFromCenter(dat, 0.5);})
      .attr("d", function() {return heartStr(dat);})
      .attr("stroke", d3.hsl((++i % 20), 1, 0.4 + (++j % 40)/100))
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
     .transition()
      .duration(3000)
      .ease(Math.sqrt)
      .attr("transform", function() {
        return scaleFromCenter(dat, 5);})
      .style("stroke-opacity", 1e-6)
      .remove();
    
    d3.event.preventDefault();
  }
});
