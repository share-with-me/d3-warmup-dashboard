(function(d3) {
        'use strict';

        var ddwidth = 700;
        var ddheight = 500;
        var ddradius = 200;
        var donutWidth = 75;
        var legendRectSize = 18;
        var legendSpacing = 4;

         var color = d3.scale.ordinal().range(["#001e1e", "#003232", "#008080", "#00a7a7", "#00e2e2", "#d0743c", "#ff8c00"]);
    //var color = d3.scale.category20c();

        var ddsvg = d3.select('#chart')
          .append('svg')
          .attr('width', ddwidth)
          .attr('height', ddheight)
          .append('g')
          .attr('transform', 'translate(' + (ddwidth / 2) + 
            ',' + (ddheight / 2) + ')');

        var ddarc = d3.svg.arc()
          .innerRadius(ddradius - donutWidth)
          .outerRadius(ddradius);


          var ddarcOver = d3.svg.arc()
                          .innerRadius(ddradius - donutWidth)
                          .outerRadius(ddradius + 50);
        var ddpie = d3.layout.pie()
          .value(function(d) { return d.Goals; })
          .sort(null);

        var tooltip1 = d3.select('#chart')                               // NEW
          .append('div')                                                // NEW
          .attr('class', 'tooltip2');                                    // NEW
                      
        tooltip1.append('div')                                           // NEW
          .attr('class', 'label');                                      // NEW
             
        tooltip1.append('div')                                           // NEW
          .attr('class', 'count');                                      // NEW

        tooltip1.append('div')                                           // NEW
          .attr('class', 'percent');     

                                       // NEW

        d3.csv('data.csv', function(error, dataset) {
          dataset.forEach(function(d) {
            d.Goals = +d.Goals;
          });

/*
          var g = svg1.selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc")
          .on('mouseover', function() {
                var current = this;
                var others = svg1.selectAll(".arc").filter(function(el) {
                  return this != current
              });
                others.selectAll("path").style('opacity', 0.6);
            })
            .on('mouseout', function() {
                var current = this;
                var others = svg1.selectAll(".arc").filter(function(el) {
                  return this != current
              });
            others.selectAll("path").style('opacity', 1);
        });
*/

          /*var g = svg1.selectAll(".arc")
          .data(pie(data))
          .enter()
          .append("g")
          .attr("class", "arc")
*/
          var ddpath = ddsvg.selectAll('.arc')
            .data(ddpie(dataset))
            .enter()
            .append('g')
            .attr('class', "arc");


          ddpath.append("path")
       .attr("d", ddarc)
       .style("fill", function(d){
          return color(d.data.Playername);
       })
       .on("mouseover", function(d){

        d3.select(this).transition()
          .duration(500)
          .attr("d", ddarcOver);
       })
       .on("mouseout", function(d){


        d3.select(this).transition()
          .duration(500)
          .attr("d", ddarc); 
       })


          ddpath.on('mouseover', function(d) {                            // NEW
            var total = d3.sum(dataset.map(function(d) {                // NEW
              return d.Goals;                                           // NEW
            }));                                                        // NEW
            var percent = Math.round(1000 * d.data.Goals / total) / 10; // NEW
            tooltip1.select('.label').html(d.data.Playername);                // NEW
            tooltip1.select('.count').html(d.data.Goals);                // NEW
            tooltip1.select('.percent').html(percent + '%');             // NEW
            tooltip1.style('display', 'block');    
          });                                                           // NEW
          
          ddpath.on('mouseout', function() {                              // NEW
            tooltip1.style('display', 'none');  
                           // NEW
          });                                                           // NEW

         
            
         /* var legend = svg.selectAll('.legend')
            .data(color.domain())
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height * color.domain().length / 2;
              var horz = -2 * legendRectSize;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            });

          legend.append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)                                   
            .style('fill', color)
            .style('stroke', color);
            
          legend.append('text')
            .attr('x', legendRectSize + legendSpacing + 280)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) { return d; });

        });*/

        var ddlegend = ddsvg.append("g")
    .attr("class", "legend")
    //.attr("x", w - 65)
    //.attr("y", 50)
    .attr("height", 100)
    .attr("width", 100)
    .attr('transform', 'translate(-20,50)');


ddlegend.selectAll('rect')
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", width/2-50)
    .attr("y", function(d, i) {
        return i * 20-200;
    })
    .attr("width", 10)
    .attr("height", 10)
    .style("fill", function(d) {
        return color(d.Playername);
    });

ddlegend.selectAll('text')
    .data(dataset)
    .enter()
    .append("text")
    .attr("x", ddwidth/2 - 30)
    .attr("y", function(d, i) {
        return i * 20 - 191 ;
    })
    .text(function(d) {
       return d.Playername;
    })
    .attr("fill", "black")
    .attr("font-size", "12px");
});

      })(window.d3);