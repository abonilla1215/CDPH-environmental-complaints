//-------------ALEX BONILLA------------------------------------------------
const spec6 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: {url: "data/vegacsv.csv"},
  vconcat: [
    {
      width: 500,
      height: 300,
      mark: "bar",
      encoding: {
        x: {
          field: "COMPLAINT_DATE",
          type: "temporal",
          axis: {title: "Year"},
          timeUnit: "year"
        },
        y: {
          aggregate: "count",
          type: "quantitative",
          axis: {title: "Complaints per Year"}
        },
        tooltip: [
          {field: "COMPLAINT_DATE", type: "temporal", timeUnit: "year", title: "Year"},
          {field: "COMPLAINT_DATE", aggregate: "count", type: "quantitative", title: "Total Complaints"}
        ]
      },
      selection: {
        year_select: {
          type: "single",
          on: "click",
          encodings: ["x"],
          empty: "none"
        }
      }
    },
    {
      width: 400,
      height: 200,
      data: {url: "data/vegacsv.csv"},
      transform: [
        {
          filter: {selection: "year_select"},
          timeUnit: "year",
          field: "COMPLAINT_DATE",
          as: "year"
        },
        {
          aggregate: [{op: "count", as: "count"}],
          groupby: ["COMPLAINT_TYPE"]
        }
      ],
      mark: {type: "arc", innerRadius: 60},
      encoding: {
        theta: {field: "count", type: "quantitative"},
        color: {
          field: "COMPLAINT_TYPE",
          type: "nominal",
          scale: {scheme: "tableau20"},
          legend: {

            offset: {"left":500, "bottom":-250},
            orient: "right", 
            titleAlign: "left", 
            titleFontSize: 10, 
            labelFontSize: 8, 
          }
        },
        tooltip: [
          {field: "COMPLAINT_TYPE", type: "nominal", title: "Complaint Type"},
          {field: "count", type: "quantitative", title: "Count"}
        ]
      }
    }
  ]
}
;
vegaEmbed("#vis6", spec6);


//-------------TASK 2 LINKED VIEW VISUAL: MIGUEL------------------------------------------------
const spec7 = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  description: "Task 2: Linked View Visualization",
  title: "Total Complaints of Top 4 COMPLAINT_TYPEs from 2018 - 2022",
  data: {
    values: [
      {"Year": 2018, "COMPLAINT_TYPE": "Noise", "Count": 110},
      {"Year": 2018, "COMPLAINT_TYPE": "Vehicle", "Count": 80},
      {"Year": 2018, "COMPLAINT_TYPE": "Water", "Count": 70},
      {"Year": 2018, "COMPLAINT_TYPE": "Air Pollution", "Count": 45},
      {"Year": 2019, "COMPLAINT_TYPE": "Noise", "Count": 125},
      {"Year": 2019, "COMPLAINT_TYPE": "Vehicle", "Count": 90},
      {"Year": 2019, "COMPLAINT_TYPE": "Water", "Count": 75},
      {"Year": 2019, "COMPLAINT_TYPE": "Air Pollution", "Count": 55},
      {"Year": 2020, "COMPLAINT_TYPE": "Noise", "Count": 120},
      {"Year": 2020, "COMPLAINT_TYPE": "Vehicle", "Count": 85},
      {"Year": 2020, "COMPLAINT_TYPE": "Water", "Count": 75},
      {"Year": 2020, "COMPLAINT_TYPE": "Air Pollution", "Count": 50},
      {"Year": 2021, "COMPLAINT_TYPE": "Noise", "Count": 150},
      {"Year": 2021, "COMPLAINT_TYPE": "Vehicle", "Count": 95},
      {"Year": 2021, "COMPLAINT_TYPE": "Water", "Count": 80},
      {"Year": 2021, "COMPLAINT_TYPE": "Air Pollution", "Count": 65},
      {"Year": 2022, "COMPLAINT_TYPE": "Noise", "Count": 130},
      {"Year": 2022, "COMPLAINT_TYPE": "Vehicle", "Count": 100},
      {"Year": 2022, "COMPLAINT_TYPE": "Water", "Count": 90},
      {"Year": 2022, "COMPLAINT_TYPE": "Air Pollution", "Count": 70}
    ]
  },
  vconcat: [
    {
      width: 400,
      height: 200,
      mark: "bar",
      encoding: {
        x: {
          field: "Year",
          type: "ordinal",
          axis: { title: "Year" }
        },
        y: {
          aggregate: "sum",
          field: "Count",
          type: "quantitative",
          axis: { title: "Total Count" }
        },
        color: { field: "COMPLAINT_TYPE", type: "nominal" },
        tooltip: [
          { field: "Year", type: "ordinal", title: "Year" },
          { field: "COMPLAINT_TYPE", type: "nominal", title: "COMPLAINT_TYPE" },
          { field: "Count", type: "quantitative", title: "Total Count" }
        ]
      },
      selection: {
        yearSelection: {
          type: "single",
          fields: ["Year"],
          bind: "scales",
          init: { Year: 2020 }
        }
      }
    },
    {
      width: 400,
      height: 200,
      mark: "rect",
      encoding: {
        x: {
          field: "COMPLAINT_TYPE",
          type: "nominal",
          axis: { title: "COMPLAINT_TYPE" }
        },
        y: {
          field: "Year",
          type: "ordinal",
          axis: { title: "Year" }
        },
        color: {
          aggregate: "sum",
          field: "Count",
          type: "quantitative",
          scale: { scheme: "viridis" }
        },
        tooltip: [
          { field: "Year", type: "ordinal", title: "Year" },
          { field: "COMPLAINT_TYPE", type: "nominal", title: "COMPLAINT_TYPE" },
          { field: "Count", type: "quantitative", title: "Total Count" }
        ]
      },
      transform: [
        { filter: { selection: "yearSelection" } }
      ]
    }
  ]
};
vegaEmbed("#vis7", spec7);


const spec8 = {
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "Task 2: Linked View Visualization",
    description: "Click on a pie slice to filter the corresponding street name chart",
    data: {url: "data/vegacsv.csv"},
    vconcat: [
      {
        width: 300,
        height: 300,
        mark: "arc",
        selection: {
          inspectorSelect: {type: "single", fields: ["INSPECTOR"], on: "click", empty: "none"}
        },
        transform: [
          {aggregate: [{op: "count", as: "count"}], groupby: ["INSPECTOR"]},
          {window: [{op: "rank", as: "rank"}], sort: [{field: "count", order: "descending"}]},
          {filter: {field: "rank", lte: 10}}
        ],
        encoding: {
          theta: {field: "count", type: "quantitative"},
          color: {
            field: "INSPECTOR",
            type: "nominal",
            scale: {scheme: "set3"}
          },
          opacity: {
            condition: {selection: "inspectorSelect", value: 1},
            value: 0.2
          }
        }
      },
      {
        width: 300,
        height: 300,
        mark: {type: "point"},
        transform: [
          {filter: {selection: "inspectorSelect"}},
          {aggregate: [{op: "count", as: "count"}], groupby: ["STREET_NAME"]},
          {window: [{op: "rank", as: "rank"}], sort: [{field: "count", order: "descending"}]},
          {filter: {field: "rank", lte: 10}}
        ],
        encoding: {
          x: {field: "STREET_NAME", type: "nominal"},
          y: {field: "count", type: "quantitative"},
          color: {field: "STREET_NAME", type: "nominal", scale: {scheme: "tableau20"}}
        }
      }
    ],
    resolve: {
      scale: {
        color: "independent"
      }
    }
  
};
vegaEmbed("#vis8", spec8);



// DROP DOWN CODE ---------------------------------------------------------------------------------->
//working map with drop down and slider, uses d3.

// Initialize the map
var map = L.map('map').setView([41.8781, -87.6298], 11); // Chicago coordinates
var markers = L.markerClusterGroup();
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Â© OpenStreetMap contributors'
}).addTo(map);

// Global variable to store the current data layer
var currentLayer = null;

// Function to load and process the CSV data
d3.csv("data/vegacsv.csv").then(function(data) {
  // Create unique list of complaint types for the dropdown
  var complaintTypes = Array.from(new Set(data.map(d => d.COMPLAINT_TYPE))).sort();
  var select = d3.select('#complaintType');
  select.selectAll('option')
    .data(complaintTypes)
    .enter()
    .append('option')
    .text(d => d);

  // Function to update the map
  function updateMap() {
    // Clear the existing markers
    markers.clearLayers();

    var selectedType = select.node().value;
    var selectedYear = parseInt(d3.select('#yearSlider').node().value);
    d3.select('#yearSlider').on('input', function() {
      updateMap();
  });

    // Update the year display
    d3.select('#yearDisplay').text(selectedYear);

    // Filter data based on selections
    var filteredData = data.filter(d =>
      d.COMPLAINT_TYPE === selectedType &&
      new Date(d.COMPLAINT_DATE).getFullYear() === selectedYear
    );

    // Add filtered data points to the marker cluster group
    filteredData.forEach(function(complaint) {
      var marker = L.circleMarker([complaint.LATITUDE, complaint.LONGITUDE], {
        radius: 5,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      });

      // Bind a popup that shows on hover
      marker.bindPopup("Complaint ID: " + complaint.COMPLAINT_ID + "<br>" +
        "Type: " + complaint.COMPLAINT_TYPE + "<br>" +
        "Date: " + complaint.COMPLAINT_DATE + "<br>" +
        "Details: " + complaint.COMPLAINT_DETAIL);

      // Show popup on hover
      marker.on('mouseover', function(e) {
        this.openPopup();
      });
      marker.on('mouseout', function(e) {
        this.closePopup();
      });

      markers.addLayer(marker);
    });

    // Add the marker cluster group to the map
    map.addLayer(markers);
  }
  var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 700 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// Append the svg object to the line chart div
var svgLineChart = d3.select("#lineChart")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom+50)
.append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Add X axis
var x = d3.scaleTime().range([0, width]);
var xAxis = svgLineChart.append("g")
  .attr("transform", `translate(0,${height})`);

// Add Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = svgLineChart.append("g");

// Line generator
var line = d3.line()
  .x(function(d) { return x(d.year); })
  .y(function(d) { return y(d.count); });

// Function to update the line chart
function updateLineChart(complaintType) {
  // Ensure the filtered data is sorted by year
  var filteredData = d3.group(data, d => d.COMPLAINT_TYPE, d => new Date(d.COMPLAINT_DATE).getFullYear());
  var countsByYear = Array.from(filteredData.get(complaintType) || [], ([year, values]) => ({ year: new Date(year, 0, 1), count: values.length }));
  countsByYear.sort((a, b) => d3.ascending(a.year, b.year)); // Sort the data by year

  // Update scales
  x.domain(d3.extent(countsByYear, d => d.year));
  y.domain([0, d3.max(countsByYear, d => d.count)]);

  // Update axes
  xAxis.call(d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y')));
  yAxis.call(d3.axisLeft(y));

  // Update the line path
  var linePath = svgLineChart.selectAll(".line")
    .data([countsByYear]); // Bind the data to the line

  linePath.enter()
    .append("path")
    .merge(linePath)
      .attr("class", "line")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);
  xAxis.call(d3.axisBottom(x).ticks(d3.timeYear.every(1)).tickFormat(d3.timeFormat('%Y')))
      .selectAll("text")  
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-90)");
  linePath.exit().remove(); // Remove any unneeded paths
}

// Append axis labels only once, not in the update function
// Add X axis label
svgLineChart.append("text")
  .attr("text-anchor", "end")
  .attr("x", (width-margin.width)/2)
  .attr("y", height + margin.top + 50)
  .text("Year");

// Add Y axis label
svgLineChart.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 20)
  .attr("x", -margin.top)
  .text("Number of Complaints");

select.on('change', function() {
updateMap();
updateLineChart(select.node().value);
});

  // Initial map update
  updateMap();
}); // This closes the d3.csv().then() block




// lolipop code ---------------------------------------------------------------------------------->
// lolipop code ---------------------------------------------------------------------------------->
// Set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

// Append the svg object to the div called 'lollipop-chart'
const svg = d3.select("#lollipop-chart")
  .append("svg")
    .attr("width", width + margin.left + margin.right + 385)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
  

// Load and process the data
d3.csv("data/vegacsv.csv").then(data => {
  // Parse dates and extract years
  data.forEach(d => {
    d.COMPLAINT_DATE = new Date(d.COMPLAINT_DATE);
    d.YEAR = d.COMPLAINT_DATE.getFullYear();
  });

  // Aggregate data by year and complaint type
  let nestedData = d3.rollups(data,
      v => v.length,
      d => d.YEAR,
      d => d.COMPLAINT_TYPE
    );

  // Flatten the nested data
  let processedData = nestedData.flatMap(([year, types]) => 
    types.map(([type, count]) => ({ year, type, count }))
  );

  // Sort data for better visualization
  processedData.sort((a, b) => d3.ascending(a.year, b.year) || d3.ascending(a.type, b.type));
  const color = d3.scaleOrdinal()
  .domain([...new Set(data.map(d => d.COMPLAINT_TYPE))])
  .range(d3.schemeCategory10); // This is a predefined set of colors

// Adjust the position of the legend
const legendX = width + margin.right + 370; // Adjust this value as needed
const legendY = 50; // Adjust this value as needed
function toggleDisplay(complaintType) {
  const isActive = d3.select("#legend-" + complaintType).classed("active");
  d3.select("#legend-" + complaintType).classed("active", !isActive);
  svg.selectAll(".line-" + complaintType).style("opacity", isActive ? 1 : 0);
  svg.selectAll(".circle-" + complaintType).style("opacity", isActive ? 1 : 0);
}

// Create a legend
const legend = svg.selectAll(".legend")
.data(color.domain())
.enter().append("g")
  .attr("class", "legend")
  .attr("id", d => "legend-" + d)
  .attr("transform", (d, i) => `translate(${legendX}, ${legendY + i * 20})`)
  .classed("active", true)
  .on("click", toggleDisplay);

// Draw legend colored rectangles
legend.append("rect")
  .attr("x", 0)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

// Draw legend text
legend.append("text")
  .attr("x", -5)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(d => d);

  // Add X axis
  const x = d3.scaleBand()
    .range([0, width])
    .domain(processedData.map(d => d.year))
    .padding(1);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
    .domain([0, d3.max(processedData, d => d.count)])
    .range([height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Lines
  svg.selectAll("myline")
  .data(processedData)
  .join("line")
    .attr("class", d => "line-" + d.type)
    .attr("x1", d => x(d.year))
    .attr("x2", d => x(d.year))
    .attr("y1", d => y(d.count))
    .attr("y2", y(0))
    .attr("stroke", d => color(d.type));

// Circles
svg.selectAll("mycircle")
  .data(processedData)
  .join("circle")
    .attr("class", d => "circle-" + d.type)
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.count))
    .attr("r", "4")
    .style("fill", d => color(d.type))
    .attr("stroke", "black");

  // Add labels
  svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2 + margin.left)
    .attr("y", height + margin.top + 20)
    .text("Year");

  svg.append("text")
    .attr("text-anchor", "end")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left+20)
    .attr("x", -margin.top - height/2 + 20)
    .text("Number of Complaints")
});

const spec9 = {
  data: {url: "data/vegacsv.csv"},
  mark: "line",
  encoding: {
    x: {
      field: "COMPLAINT_DATE",
      type: "temporal",
      axis: {title: "Year", format: "%Y"},
      timeUnit: "year"
    },
    y: {
      aggregate: "count",
      type: "quantitative",
      axis: {title: "Complaints"}
    },
    color: {
      field: "DIRECTION",
      type: "nominal",
      legend: {title: "Direction"}
    }
  }
};

vegaEmbed("#vis9",spec9);