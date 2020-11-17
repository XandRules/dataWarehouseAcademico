appfai.controller('GraficoController', ['$scope','$filter', 'GraficoModel', function ($scope,$filter,GraficoModel) {

    var orderBy = $filter('orderBy');

    $scope.filtro = 0;
    $scope.visualizacao = 0;
    $scope.dados;

    console.log('iniciou o controller');

    $scope.getRendaFamiliar = function(){
        GraficoModel.getRendaFamiliar().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getEtnia = function(){
        GraficoModel.getEtnia().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
        })
    }

    $scope.data = {
        opcoes_de_filtro: [

            {id: "0" , name : 'Renda Total'},
            {id: "1" , name : 'Situação da Matricula'},
            {id: "2" , name : 'Situação da Matricula Por Renda'},
            {id: "3" , name : 'Situação da Matricula Por Estado'},
            {id: "4" , name : 'Situação da Matricula Por Sexo'},
            {id: "5" , name : 'Etnia'},
            {id: "6" , name : 'Sexo'},
            {id: "7" , name : 'Estado'},
        ],
        opcoes_de_grafico: [

            {id: "0" , name : 'Pizza'},
            {id: "1" , name : 'Barras'},
            {id: "2" , name : 'Radar'},
            {id: "3" , name : 'Lollipop'},
            {id: "4" , name : 'Donuts'},
            {id: "5" , name : 'Linha'},
        ],
        opcao_selecionada_grafico: {id: '0'},
        opcao_selecionada_dados: {id: '0'}  
    };

    $scope.renderizarGrafico = function(tipo){

        if(tipo == 'pizza'){

        }else{

        }
    }

    $scope.buscarDados = function(){
        console.log('filtro' , $scope.data.opcao_selecionada_dados)
        console.log('dados', $scope.dados)

        let config = $scope.loadingChart($scope.data.opcao_selecionada_dados.name, $scope.dados);
          
    }

    $scope.loadingChart = function (label, values) {

        var datapoints = [];

        var labelsX = [];

        for (let index = 0; index < values.length; index++) {

            labelsX.push(values[index].renda_familiar);
            datapoints.push(values[index].total);

        }        
                
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Radar'){
            $scope.radar();
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Pizza'){
            $scope.pizza();
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Barras'){
            $scope.barras();
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Lollipop'){
            $scope.lollipop();
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Donuts'){
            $scope.donuts();
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Linha'){
            $scope.linha();
        }    

    }


    $scope.alterarVisualizacao = function(){
        console.log('visualização' ,  $scope.data.opcao_selecionada_grafico)
        $scope.buscarDados();
    }

    $scope.barras = function(){
        var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = $scope.dados;

    chart.padding(40, 40, 40, 40);

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "renda_familiar";
    categoryAxis.renderer.minGridDistance = 60;
    categoryAxis.renderer.inversed = true;
    categoryAxis.renderer.grid.template.disabled = true;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "renda_familiar";
    series.dataFields.valueY = "total";
    series.tooltipText = "{valueY.value}"
    series.columns.template.strokeOpacity = 0;
    series.columns.template.column.cornerRadiusTopRight = 10;
    series.columns.template.column.cornerRadiusTopLeft = 10;

    var labelBullet = series.bullets.push(new am4charts.LabelBullet());
    labelBullet.label.verticalCenter = "bottom";
    labelBullet.label.dy = -10;
    labelBullet.label.text = "{values.valueY.workingValue.formatNumber('#.')}";
    series.tooltip.pointerOrientation = "horizontal";

    chart.zoomOutButton.disabled = true;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
    return chart.colors.getIndex(target.dataItem.index);
    });

    categoryAxis.sortBySeries = series;
    }

    $scope.pizza = function(){
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = $scope.dados

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "renda_familiar";
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
    }

    $scope.radar = function(){
        var chart = am4core.create("chartdiv", am4charts.RadarChart);
        
        chart.data = $scope.dados;
        
        chart.innerRadius = am4core.percent(30)
        
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "renda_familiar";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.labels.template.location = 0.5;
        categoryAxis.renderer.grid.template.strokeOpacity = 0.08;
        
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        valueAxis.renderer.grid.template.strokeOpacity = 0.08;
        
        chart.seriesContainer.zIndex = -10;
        
        
        var series = chart.series.push(new am4charts.RadarColumnSeries());
        series.dataFields.categoryX = "renda_familiar";
        series.dataFields.valueY = "total";
        series.tooltipText = "{valueY.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.radarColumn.cornerRadius = 5;
        series.columns.template.radarColumn.innerCornerRadius = 0;
        
        chart.zoomOutButton.disabled = true;
        
        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", (fill, target) => {
         return chart.colors.getIndex(target.dataItem.index);
        });               

        
        categoryAxis.sortBySeries = series;
        
        chart.cursor = new am4charts.RadarCursor();
        chart.cursor.behavior = "none";
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
    }

    $scope.lollipop = function(){
        var chart = am4core.create("chartdiv", am4charts.XYChart);       

        chart.data = $scope.dados;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "renda_familiar";
        categoryAxis.renderer.minGridDistance = 15;
        categoryAxis.renderer.grid.template.location = 0.5;
        categoryAxis.renderer.grid.template.strokeDasharray = "1,3";
        categoryAxis.renderer.labels.template.rotation = -90;
        categoryAxis.renderer.labels.template.horizontalCenter = "left";
        categoryAxis.renderer.labels.template.location = 0.5;

        categoryAxis.renderer.labels.template.adapter.add("dx", function(dx, target) {
            return -target.maxRight / 2;
        })

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;
        valueAxis.renderer.axisFills.template.disabled = true;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "renda_familiar";
        series.dataFields.valueY = "total";
        series.tooltipText = "{valueY.value}";
        series.sequencedInterpolation = true;
        series.fillOpacity = 0;
        series.strokeOpacity = 1;
        series.strokeDashArray = "1,3";
        series.columns.template.width = 0.01;
        series.tooltip.pointerOrientation = "horizontal";

        var bullet = series.bullets.create(am4charts.CircleBullet);

        chart.cursor = new am4charts.XYCursor();

        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();
    }

    $scope.donuts = function(){
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = "renda_familiar";

        // Let's cut a hole in our Pie chart the size of 30% the radius
        chart.innerRadius = am4core.percent(30);

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;
        pieSeries.slices.template
        // change the cursor on hover to make it apparent the object can be interacted with
        .cursorOverStyle = [
            {
            "property": "cursor",
            "value": "pointer"
            }
        ];

        pieSeries.alignLabels = true;
        pieSeries.labels.template.bent = false;
        pieSeries.labels.template.radius = 3;
        pieSeries.labels.template.padding(0,0,0,0);
        pieSeries.labels.template.disabled = true;

        pieSeries.ticks.template.disabled = true;

        // Create a base filter effect (as if it's not there) for the hover to return to
        var shadow = pieSeries.slices.template.filters.push(new am4core.DropShadowFilter);
        shadow.opacity = 0;

        // Create hover state
        var hoverState = pieSeries.slices.template.states.getKey("hover"); // normally we have to create the hover state, in this case it already exists

        // Slightly shift the shadow and make it more prominent on hover
        var hoverShadow = hoverState.filters.push(new am4core.DropShadowFilter);
        hoverShadow.opacity = 0.7;
        hoverShadow.blur = 5;

        // Add a legend
        chart.legend = new am4charts.Legend();

        chart.data = $scope.dados;


    }

    $scope.linha = function(){
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = $scope.dados;

        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.minGridDistance = 50;

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.logarithmic = true;
        valueAxis.renderer.minGridDistance = 20;

        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = "total";
        series.dataFields.dateX = "renda_familiar";
        series.tensionX = 0.8;
        series.strokeWidth = 3;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.fill = am4core.color("#fff");
        bullet.circle.strokeWidth = 3;

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.fullWidthLineX = true;
        chart.cursor.xAxis = dateAxis;
        chart.cursor.lineX.strokeWidth = 0;
        chart.cursor.lineX.fill = am4core.color("#000");
        chart.cursor.lineX.fillOpacity = 0.1;

        // Add scrollbar
        chart.scrollbarX = new am4core.Scrollbar();

        // Add a guide
        let range = valueAxis.axisRanges.create();
        range.value = 90.4;
        range.grid.stroke = am4core.color("#396478");
        range.grid.strokeWidth = 1;
        range.grid.strokeOpacity = 1;
        range.grid.strokeDasharray = "3,3";
        range.label.inside = true;
        range.label.text = "Average";
        range.label.fill = range.grid.stroke;
        range.label.verticalCenter = "bottom";
    }

    $scope.getRendaFamiliar();
  
       
}]);