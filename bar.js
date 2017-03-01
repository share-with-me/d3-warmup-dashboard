
	var height = 500, width = 900, wpad = 50, hpad = 50;
	var svg = d3.select("#bar-chart").append("svg")
				.attr("width", width + wpad*2)
						 .attr("height", height + wpad*2)
						// .call(d3.behavior.zoom().on("zoom", function () {
        				//	svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
      					//}))
						 .append("g")
    					 .attr("transform", "translate(" + wpad + "," + hpad + ")");
	
    var tip = d3.tip()
    		    .attr("class", "d3-tip")
				.offset([-10, 0])
				.html( function (d){
					return "<strong>Player Name:</strong> " + d.Playername + "<br/>Goals Scored: " + d.Goals + "<br/>"; 
				});

	svg.call(tip);
	var gX, gY, xAxis, yAxis, xScale, yScale;
	d3.csv("data.csv", function(error, data){
		if(error) throw error;

		data.forEach( function(d){
			d.Playername = d.Playername;
			d.Goals = +d.Goals;
		});
		xScale = d3.scale.ordinal()
						.domain(data.map( function(d) { return d.Playername; }))
						.rangeRoundBands([0, width], 0.1);

		yScale = d3.scale.linear()
						.domain([0, 25])
						.range([height,0]);


		xAxis = d3.svg.axis()
					.scale(xScale)
					.orient("bottom")
					.innerTickSize(-height)
    .outerTickSize(0)
    .tickPadding(10);

		yAxis = d3.svg.axis()
					.scale(yScale)
					.orient("left")
					.innerTickSize(-width)
    .outerTickSize(0)
    .tickPadding(10);


		gX = svg.append("g").attr("transform", "translate(" + wpad + "," + height + ")")
			.attr("class", "axis")
			.call(xAxis)
			.append("text")
			.attr("y", 50)
			.attr("x", width / 2 - wpad)
			.text("Goal Scorer");


		gY = svg.append("g").attr("transform", "translate(" + wpad + ",0)")
			.attr("class", "axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", -50)
			.attr("x", -150)
			.style("text-anchor", "end")
			.text("Goals Scored");

		var bars = svg.selectAll("rect")
					.data(data)
					.enter()
					.append("rect")
					.attr("x", function(d) { return xScale(d.Playername) + wpad;})
					.attr("y", function(d) { return yScale(d.Goals); })
					.attr("height", function(d) { return height - yScale(d.Goals); })
					.attr("width", function(d) { return xScale.rangeBand(); })
					.attr("fill", "teal");
					//.on('mouseover', tip.show)
					//.on('mouseout', tip.hide);

		bars.on("mouseover", function(d){
			tip.show(d);
			d3.select(this).attr("fill", "#00e2e2");
		})
		.on("mouseout", function(d){
			tip.hide(d);
			d3.select(this).attr("fill", "teal");
		});




		// add legend   
	var legend = svg.append("g")
	  .attr("class", "legend")
        //.attr("x", w - 65)
        //.attr("y", 50)
	  .attr("height", 100)
	  .attr("width", 100)
    .attr('transform', 'translate(-20,50)');  

    legend
      .append("rect")
	  .attr("x", width)
      .attr("y", -50)
	  .attr("width", 20)
	  .attr("height", 20)
	  .style("fill",  "teal");
      
     
    legend
      .append("text")
	  .attr("x", width+25)
      .attr("y", -35)
      .attr("style", "font-size: 16px;")
	  .text("Goals");

	

});


