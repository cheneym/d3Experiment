var settings = {
  w: 1000,
  h: 600,
  bh: 20
}

var body = d3.select('body');

var x = d3.scaleLinear()
  .range([1500, 0]);

var chart = d3.select('.chart')
  .attr('width', settings.w);

d3.json("http://data.consumerfinance.gov/api/views.json", function(error, data) {
  x.domain([0, data[0].viewCount]);

  chart.attr("height", settings.bh * data.length);

  var bar = chart.selectAll("g")
    .data(data)
    .enter().append("g")
    .attr("transform", function(d, i) { return "translate(0," + i * settings.bh + ")"; });

  bar.append("rect")
    .attr("width", function(d) { return x(d.viewCount); })
    .attr("height", settings.bh - 1);

  bar.append("text")
    .attr("x", function(d) { return x(d.viewCount) - 3; })
    .attr("y", settings.bh / 2)
    .attr("dy", ".35em")
    .text(function(d) { return d.viewCount; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}