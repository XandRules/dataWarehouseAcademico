var data = [{
  values: [16, 15, 12, 6, 5, 4, 42],
  labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
  domain: {column: 0},
  name: 'GHG Emissions',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
},{
  values: [27, 11, 25, 8, 1, 3, 25],
  labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
  text: 'CO2',
  textposition: 'inside',
  domain: {column: 1},
  name: 'CO2 Emissions',
  hoverinfo: 'label+percent+name',
  hole: .4,
  type: 'pie'
}];

var layout = {
  title: 'Trabalho disciplinar',
  annotations: [
    {
      font: {
        size: 20
      },
      showarrow: true,
      text: 'Alunos por Etinia',
      x: 0.17,
      y: 0.90
    },
    {
      font: {
        size: 20
      },
      showarrow: true,
      text: 'Alunos por Faixa Etaria',
      x: 0.82,
      y: 0.90
    }
  ],
  height: 500,
  width: 700,
  showlegend: true,
  grid: {rows: 1, columns: 2}
};

var trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 2,5, 13, 17],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var trace2 = {
    x: [2, 3, 4, 5],
    y: [16, 5, 11, 9],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var trace3 = {
    x: [1, 2, 3, 4],
    y: [12, 9, 15, 12],
    mode: 'lines+markers',
    type: 'scatter'
  };
  
  var data2 = [trace1, trace2, trace3];
  
Plotly.newPlot('myDiv', data, layout);
Plotly.newPlot('myDiv2', data, layout);
Plotly.newPlot('myDiv3', data2);
Plotly.newPlot('myDiv4', data, layout);

