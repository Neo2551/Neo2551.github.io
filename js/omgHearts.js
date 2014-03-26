$(function() {
 
  var width = Math.min(960, innerWidth),
    height = Math.min(500, innerHeight);

  var svg = d3.select("#svgOmgHearts")
  
  svg
    .attr("width", width)
    .attr("height", height)
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .attr("z-index", "99")
    .on("ontouchstart" in document ? "touchmove" : "mousemove", plotHeart);

  var i = 0;
  var j = 0;  

  function plotHeart() {
    
    var m = d3.mouse(this);
    
    var hearts = d3.select("#svgOmgHearts");
    var dat = [{"x" : m[0] , "y" : m[1] + 60}];

    hearts.selectAll("svg")//.insert("path", "rect")
      .data(dat)
      .enter()
      .append("path")
      .attr("transform", function(d) {return scaleFromCenter(d, 0.5);})
      .attr("d", heartStr)
      .attr("stroke", d3.hsl((++i % 20), 1, 
                             0.4 + (++j % 40)/100))
      .attr("stroke-width", 1.5)
      .attr("fill", "none")
      .on("ontouchstart" in document ? "touchmove" : "mousemove", plotHeart)
      .transition()
      .duration(3000)
      .ease(Math.sqrt)
      .attr("transform", function(d) {
        return scaleFromCenter(d, 5);})
      .style("stroke-opacity", 1e-6)
      .remove();
    
    d3.event.preventDefault();

    function translate(d, a){
      return "translate(" + a*d.x + "," + a*(d.y - 60) + ")";
    }

    function scaleFromCenter(d, scaleFact) {
      return translate(d, a = 1) + "scale(" + scaleFact + ")" + 
        translate(d, a = -1);
    }

    function heartStr(d){                
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

    function x(d) { return d.x; }
    function y(d) { return d.y; }
  }
});
