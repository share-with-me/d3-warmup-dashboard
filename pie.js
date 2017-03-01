	var width = 700, height = 500, radius = 200;
		var svg1 = d3.select("#pie-chart").append("svg")
					.attr("height", height)
					.attr("width", width)
					.append("g")
					.attr("transform", "translate(" + width/2 + "," + (height/2) + ")");

		var color = d3.scale.ordinal().range(["#001e1e", "#003232", "#008080", "#00a7a7", "#00e2e2", "#d0743c", "#ff8c00"]);


		var arc = d3.svg.arc()
					.outerRadius(radius - 10)
					.innerRadius(0);

		var arcOver = d3.svg.arc()
					.innerRadius(0)
					.outerRadius(radius + 50);

		var labelArc = d3.svg.arc()
						.outerRadius(radius - 40)
						.innerRadius(radius - 40);


		var pie = d3.layout.pie()
					.sort(null)
					.value( function(d) { return d.Goals; });


		
		d3.csv("data.csv", function(error, data){
			if(error) throw error;

			data.forEach( function(d){
				d.Playername = d.Playername;
				d.Goals = +d.Goals;
			});

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

			g.append("path")
			 .attr("d", arc)
			 .style("fill", function(d){
			 		return color(d.data.Playername);
			 })
			 .on("mouseover", function(d){
			 	d3.select(this).transition()
			 		.duration(500)
			 		.attr("d", arcOver);
			 })
			 .on("mouseout", function(d){
			 	d3.select(this).transition()
			 		.duration(500)
			 		.attr("d", arc); 
			 })

			 g.append("text")
			 .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")";})
			 .attr("dy","0.35em")
			 .text( function(d){
			 	return d.data.Playername;
			 })
             .attr("fill", "white");



             var dddlegend = svg1.append("g")
    .attr("class", "legend")
    //.attr("x", w - 65)
    //.attr("y", 50)
    .attr("height", 100)
    .attr("width", 100)
    .attr('transform', 'translate(-20,50)');


dddlegend.selectAll('rect')
    .data(data)
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

dddlegend.selectAll('text')
    .data(data)
    .enter()
    .append("text")
    .attr("x", width/2 - 30)
    .attr("y", function(d, i) {
        return i * 20 -191 ;
    })
    .text(function(d) {
       return d.Playername;
    })
    .attr("fill", "black")
    .attr("font-size", "12px");
});