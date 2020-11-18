appfai.controller('GraficoController', ['$scope','$filter', 'GraficoModel', function ($scope,$filter,GraficoModel) {

    var orderBy = $filter('orderBy');

    $scope.filtro = 0;
    $scope.visualizacao = 0;
    $scope.dados;


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
            $scope.buscarDados();
        })
    }

    $scope.getSituacaoMatricula = function(){
        GraficoModel.getSituacaoMatricula().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getSituacaoMatriculaRenda = function(){
        GraficoModel.getSituacaoMatriculaRenda().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getSituacaoMatriculaEstado = function(){
        GraficoModel.getSituacaoMatriculaEstado().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getSituacaoMatriculaSexo = function(){
        GraficoModel.getSituacaoMatriculaSexo().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.data = {
        opcoes_de_filtro: [

            {id: "0" , name : 'Renda Total' , filtro: 'renda_familiar'},
            {id: "1" , name : 'Situação da Matricula', filtro: 'matricula_situacao'},
            {id: "2" , name : 'Situação da Matricula Por Renda', filtro: 'matricula_situacao'},
            {id: "3" , name : 'Situação da Matricula Por Estado', filtro: 'estado'},
            {id: "4" , name : 'Situação da Matricula Por Sexo', filtro: 'matricula_situacao'},
            {id: "5" , name : 'Etnia', filtro: "etnia"},
            {id: "6" , name : 'Sexo', filtro: 'sexo'},
            {id: "7" , name : 'Estado', filtro: 'estado'},
        ],
        opcoes_de_grafico: [

            {id: "0" , name : 'Pizza'},
            {id: "1" , name : 'Barras'},
            {id: "2" , name : 'Radar'},
            {id: "3" , name : 'Lollipop'},
            {id: "4" , name : 'Donuts'},
            {id: "5" , name : 'Linha'},
            {id: "6" , name : 'Barras Horizontal'},
        ],
        opcao_selecionada_grafico: {id: '0'},
        opcao_selecionada_dados: {id: '0'}  
    };


    $scope.buscarDados = function(){

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
            $scope.radar($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Pizza'){
            $scope.pizza($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Barras'){
            $scope.barras($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Lollipop'){
            $scope.lollipop($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Donuts'){
            $scope.donuts($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Linha'){
            $scope.linha($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Barras Horizontal'){
            $scope.barraHorizontal($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro);
        }     

    }


    $scope.alterarVisualizacao = function(){
        console.log('visualização' ,  $scope.data.opcao_selecionada_grafico)

        $scope.buscarDados()
    }

    $scope.alterarFiltro = function(){
        if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Renda Total"){
            $scope.getRendaFamiliar();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Etnia"){
            $scope.getEtnia();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Situação da Matricula"){
            $scope.getSituacaoMatricula();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Situação da Matricula Por Estado"){
            $scope.getSituacaoMatriculaEstado();
        }
    }

    $scope.barras = function(filtro){
        var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = $scope.dados;

    chart.padding(40, 40, 40, 40);

    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = filtro;
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.horizontalCenter = "right";
    categoryAxis.renderer.labels.template.verticalCenter = "middle";
    categoryAxis.renderer.labels.template.rotation = 270;
    categoryAxis.tooltip.disabled = true;
    categoryAxis.renderer.minHeight = 110;

    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.extraMax = 0.1;
    //valueAxis.rangeChangeEasing = am4core.ease.linear;
    //valueAxis.rangeChangeDuration = 1500;

    var series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = filtro;
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

    $scope.pizza = function(filtro){
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = $scope.dados

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = filtro;
        pieSeries.slices.template.stroke = am4core.color("#fff");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;

        // This creates initial animation
        pieSeries.hiddenState.properties.opacity = 1;
        pieSeries.hiddenState.properties.endAngle = -90;
        pieSeries.hiddenState.properties.startAngle = -90;
    }

    $scope.radar = function(filtro){
        var chart = am4core.create("chartdiv", am4charts.RadarChart);
        
        chart.data = $scope.dados;
        
        chart.innerRadius = am4core.percent(30)
        
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = filtro;
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
        series.dataFields.categoryX = filtro;
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

    $scope.lollipop = function(filtro){
        var chart = am4core.create("chartdiv", am4charts.XYChart);       

        chart.data = $scope.dados;
        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = filtro;
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
        series.dataFields.categoryX = filtro;
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

    $scope.donuts = function(filtro){
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "total";
        pieSeries.dataFields.category = filtro;

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

    $scope.linha = function(filtro){
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        // Add data
        chart.data = $scope.dados;
                
        // Create axes
        var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        
        // Create series
        var series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = filtro;
        series.dataFields.dateX = "total";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;
        
        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
        
        // Make bullets grow on hover
        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");
        
        var bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
        
        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = dateAxis;
        chart.cursor.snapToSeries = series;
        
        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();
        
        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
        
        dateAxis.start = 0.79;
        dateAxis.keepSelection = true;
    }

    $scope.barraHorizontal = function(filtro){

        var chart = am4core.create("chartdiv", am4charts.XYChart);
        chart.padding(40, 40, 40, 40);

        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = filtro;
        categoryAxis.renderer.minGridDistance = 1;
        categoryAxis.renderer.inversed = true;
        categoryAxis.renderer.grid.template.disabled = true;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = filtro;
        series.dataFields.valueX = "total";
        series.tooltipText = "{valueX.value}"
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 5;
        series.columns.template.column.cornerRadiusTopRight = 5;

        var labelBullet = series.bullets.push(new am4charts.LabelBullet())
        labelBullet.label.horizontalCenter = "left";
        labelBullet.label.dx = 10;
        labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
        labelBullet.locationX = 1;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
        return chart.colors.getIndex(target.dataItem.index);
        });

        categoryAxis.sortBySeries = series;
        chart.data = $scope.dados;


}

    $scope.getRendaFamiliar();
  
       
}]);