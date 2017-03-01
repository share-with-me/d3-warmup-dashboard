d3.csv("data.csv", function(error, data){
		if(error) throw error;

		data.forEach( function(d){
			d.Playername = d.Playername;
			d.Goals = +d.Goals;
		});

		function createTable(data, columns){
			var sort = true;
			var table = d3.select("#table").append("table").attr("class", "table table-bordered table-striped");

			var thead = table.append("thead");
			var tbody = table.append("tbody");
			thead.append("tr").selectAll("th").data(columns).enter().append("th").attr("style", "text-align: center; background: teal; color: white;").text( function(d) {return d;})
				.on('click', function(d){
					if(sort){
						rows.sort(function(a,b){
							return a[d] > b[d];
						});
						sort = false;
					}
					else{
						rows.sort(function(a,b){
							return a[d] < b[d];
						})
						sort = true;
					}
				});

			var rows = tbody.selectAll("tr").data(data).enter().append("tr");

			var cell = rows.selectAll("td")
							.data( function(row){
								return columns.map( function(column){
									return { column : column, value : row[column] };
								});
							})
							.enter()
							.append("td")
							.attr("style", "font-size: 16px;")
							.html( function(d){
								return d.value;
							});
		};

		createTable(data, ["Playername", "Goals"]);
	});



