var dwidth = 600, dheight = 400, dradius = 200;
    var dsvg = d3.select("#donut-chart").append("svg")
          .attr("height", dheight)
          .attr("width", dwidth)
          .append("g")
          .attr("transform", "translate(" + dwidth/2 + "," + (dheight/2) + ")");

    var dcolor = d3.scale.ordinal().range(["#001e1e", "#003232", "#008080", "#00a7a7", "#00e2e2", "#d0743c", "#ff8c00"]);


    var darc = d3.svg.arc()
          .outerRadius(dradius - 10)
          .innerRadius(dradius - 60);

    var dlabelArc = d3.svg.arc()
            .outerRadius(dradius - 40)
            .innerRadius(dradius - 40);


    var dpie = d3.layout.pie()
          .sort(null)
          .value( function(d) { return d.Goals; });


    
    d3.csv("data.csv", function(error, data){
      if(error) throw error;

      data.forEach( function(d){
        d.Playername = d.Playername;
        d.Goals = +d.Goals;
      });

      var dg = dsvg.selectAll(".arc")
          .data(dpie(data))
          .enter()
          .append("g")
          .attr("class", "arc");

      dg.append("path")
       .attr("d", darc)
       .style("fill", function(d){
          return dcolor(d.data.Playername);
       });

       dg.append("text")
       .attr("transform", function(d) { return "translate(" + dlabelArc.centroid(d) + ")";})
       .attr("dy","0.35em")
       .text( function(d){
        return d.data.Playername;
       })
             .attr("fill", "white");



             var dlegend = dsvg.append("g")
    .attr("class", "legend")
    //.attr("x", w - 65)
    //.attr("y", 50)
    .attr("height", 100)
    .attr("width", 100)
    .attr('transform', 'translate(-20,50)');


dlegend.selectAll('rect')
    .data(data)
    .enter()
    .append("rect")
    .attr("x", dwidth/2-50)
    .attr("y", function(d, i) {
        return i * 20-200;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(d) {
        return dcolor(d.Playername);
    });

dlegend.selectAll('text')
    .data(data)
    .enter()
    .append("text")
    .attr("x", dwidth/2 - 30)
    .attr("y", function(d, i) {
        return i * 20 -191 ;
    })
    .text(function(d) {
       return d.Playername;
    })
    .attr("fill", "teal")
    .attr("font-size", "12px");
});

