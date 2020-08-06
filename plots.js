// create dynamic dropdown menu
function init() {
    var selector = d3.select("#selDataset");
  
    d3.json("samples.json").then((data) => {
      console.log(data);
      var sampleNames = data.names;
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
    })
};


// when dropdown is changed, 
// volunteer demographics and charts are updated
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildBarChart(newSample);
    buildBubbleChart(newSample);
};
  
// function to produce demographics table
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(key.toUpperCase() + ': ' + value);
    });
  });
};

// function to produce the bar chart
function buildBarChart(sample){
  d3.json("samples.json").then((data) => {
    var samplesData = data.samples;
    var resultArray = samplesData.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // put all three arrays into dictionary format
    var allSampleData = [];

    for (i = 0; i < result.otu_ids.length; i++) {
      allSampleData.push({
        otu_ids: result.otu_ids[i],
        sample_values: result.sample_values[i],
        otu_labels: result.otu_labels[i]
      });
    };

    // get the top ten results
    var topTenResult = allSampleData.sort((a,b) => a.sample_values-b.sample_values).reverse().slice(0,10);
    
    // vars for the bar chart
    var values = topTenResult.map(val=>val.sample_values);
    var labels = topTenResult.map(lab=>"UTO "+lab.otu_ids);
    var hoverText = topTenResult.map(t=>t.otu_labels);

    var PANEL = d3.select("#bar");

    PANEL.html("");
    var barData = {
      x: values,
      y: labels,
      text: hoverText,
      type: "bar",
      orientation: "h" 
    };

    var layout = {
      yaxis:{
        autorange:'reversed'
      }
    };

    Plotly.newPlot("bar", [barData], layout);
  });
};

// function to produce the bubble chart
function buildBubbleChart(sample){
  d3.json("samples.json").then((data) => {
    var samplesData = data.samples;
    var resultArray = samplesData.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    // put all three arrays into dictionary format
    var allSampleData = [];

    for (i = 0; i < result.otu_ids.length; i++) {
      allSampleData.push({
        otu_ids: result.otu_ids[i],
        sample_values: result.sample_values[i],
        otu_labels: result.otu_labels[i]
      });
    };

    var values = allSampleData.map(val=>val.sample_values);
    var ids = allSampleData.map(lab=>lab.otu_ids);
    var labels = allSampleData.map(t=>t.otu_labels);

    var PANEL = d3.select("#bubble");

    PANEL.html("");
    var bubbleTrace = {
      x: ids,
      y: values,
      text: labels,
      mode: 'markers',
      marker:{
        color: ids,
        size: values
      }
    };
    
    var bubbleLayout = {
      xaxis:{title: "OTU ID"}
    }

    Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
  

  });  



};


init();
// initial loading for id 940
optionChanged(940);
  