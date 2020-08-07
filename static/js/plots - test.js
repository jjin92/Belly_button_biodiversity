const apiKey = weather_api_key;

let city = 'Chicago'

let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`

var dataArray = [];

d3.json(url).then(function(owmData){
  // console.log(owmData);

  times = owmData.list.map((x)=>x.dt_txt);
  temps = owmData.list.map((x)=>x.main.temp);

  var trace1 = {
    type: "scatter",
    mode: "lines",
    x: times,
    y: temps,
    line: {
      color: "#17BECF"
    }
  };

  var layout = {
    title: `${city} 5-day forecast`
  };

  Plotly.newPlot("plot", [trace1], layout);
});
//   var dataArray = data.list;
  
//   for (i=0; i<data.list.length;i++){
//     dataArray.push({
//       times:data.list[i].dt_txt,
//       temps: data.list[i].main.temp
//     });
//   console.log(dataArray);
//   };

// });




function getTimes(owmData) {
  return owmData.list.map(x => x.dt_txt)
}

function getTemps(owmData) {
  return owmData.list.map(x => x.main.temp)
}

// Fetch data using d3.json() and build the timeseries plot
