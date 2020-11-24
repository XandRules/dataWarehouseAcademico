appfai.service('ChartService', function() {

    var Charts = {};

    Charts.barraHorizontal = function(filtro,dados){

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
        labelBullet.label.dx = 100;
        labelBullet.label.text = "{valueX.value}";
        labelBullet.locationX = 1;

        // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
        series.columns.template.adapter.add("fill", function(fill, target){
        return chart.colors.getIndex(target.dataItem.index);
        });

        categoryAxis.sortBySeries = series;
        chart.data = dados;

    }

    Charts.barrasPiramide = function(filtro, dados){
        var chart = am4core.create("chartdiv", am4charts.XYChart);

        let dataF = [];
        let dataM = [];
        for (let i = 0; i < dados.length; i++) {
            
            if(dados[i].sexo =="M"){
                dataM.push({
                    age: dados[i].idade,
                    male: dados[i].total * -1
                })
            }else{
                dataF.push({
                    age:dados[i].idade,
                    female: dados[i].total
                })
            }            
        }

        let dataFinal = [];

        let len = dataF.length > dataM.length ?  dataF.length :  dataM.length;

        var next = false;

        let male10 = 0;
        let female10 = 0;

        let male20 = 0;
        let female20 = 0;

        let male30 = 0;
        let female30 = 0;

        let male40 = 0;
        let female40 = 0;

        let male50 = 0;
        let female50 = 0;

        let male60 = 0;
        let female60 = 0;

        let male70 = 0;
        let female70 = 0;

        let male80 = 0;
        let female80 = 0;

        for (let i = 0; i < len; i++) {

            if(i <= dataF.length -1){

                if(dataF[i].age < 10){
                    female10 += dataF[i].age;                  
                    
                }else if(dataF[i].age < 20){
                    female20 += dataF[i].age;

                }else if(dataF[i].age < 30){
                    female30 += dataF[i].age;

                }else if(dataF[i].age < 40){
                    female40 += dataF[i].age;

                }else if(dataF[i].age < 50){
                    female50 += dataF[i].age;

                }else if(dataF[i].age < 60){
                    female60 += dataF[i].age;

                }else if(dataF[i].age < 70){
                    female70 += dataF[i].age;

                }else if(dataF[i].age > 70){
                    female80 += dataF[i].age;

                }
            }

            if(i <= dataM.length -1){
                if(dataM[i].age < 10){
                    male10 += dataF[i].age;
                }else if(dataM[i].age < 20){
                    male20 += dataF[i].age;
                }else if(dataM[i].age < 30){
                    male30 += dataF[i].age;
                }else if(dataM[i].age < 40){
                    male40 += dataF[i].age;
                }else if(dataM[i].age < 50){
                    male50 += dataF[i].age;
                }else if(dataM[i].age < 60){
                    male60 += dataF[i].age;
                }else if(dataM[i].age < 70){
                    male70 += dataF[i].age;
                }else if(dataM[i].age > 70){
                    male80 += dataF[i].age;
                }
            }           

            
        }

        dataFinal.push({
            age: '0 - 9',
            female: female10,
            male: male10 * -1
        },{
            age: '10 - 19',
            female: female20,
            male: male20 * -1
        },{
            age: '20 - 29',
            female: female30,
            male: male30 * -1
        },{
            age: '30 - 39',
            female: female40,
            male: male40 * -1
        },
        {
            age: '40 - 49',
            female: female50,
            male: male50 * -1
        },
        {
            age: '50 - 59',
            female: female60,
            male: male60 * -1
        },{
            age: '60 - 69',
            female: female70,
            male: male70 * -1
        },{
            age: '70+',
            female: female80,
            male: male80 * -1
        }
        )

        dataF.sort((a,b) =>{
            return a.age < b.age ? -1 : a.age > b.age ? 1 : 0;
        });

        dataM.sort((a,b) =>{
            return a.age < b.age ? -1 : a.age > b.age ? 1 : 0;
        });

        // Add data
        chart.data = dataFinal;

        // Use only absolute numbers
        chart.numberFormatter.numberFormat = "#.#s";

        // Create axes
        var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "age";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.inversed = true;

        var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.extraMin = 0.1;
        valueAxis.extraMax = 0.1;
        valueAxis.renderer.minGridDistance = 80;
        valueAxis.renderer.ticks.template.length = 5;
        valueAxis.renderer.ticks.template.disabled = false;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.4;
        

        // Create series
        var male = chart.series.push(new am4charts.ColumnSeries());
        male.dataFields.valueX = "male";
        male.dataFields.categoryY = "age";
        male.clustered = false;

        var maleLabel = male.bullets.push(new am4charts.LabelBullet());
        maleLabel.label.text = "{valueX}";
        maleLabel.label.hideOversized = false;
        maleLabel.label.truncate = false;
        maleLabel.label.horizontalCenter = "right";
        maleLabel.label.dx = -10;

        var female = chart.series.push(new am4charts.ColumnSeries());
        female.dataFields.valueX = "female";
        female.dataFields.categoryY = "age";
        female.clustered = false;

        var femaleLabel = female.bullets.push(new am4charts.LabelBullet());
        femaleLabel.label.text = "{valueX}";
        femaleLabel.label.hideOversized = false;
        femaleLabel.label.truncate = false;
        femaleLabel.label.horizontalCenter = "left";
        femaleLabel.label.dx = 10;

        var maleRange = valueAxis.axisRanges.create();
        maleRange.value = -150;
        maleRange.endValue = 0;
        maleRange.label.text = "Masculino";
        maleRange.label.fill = chart.colors.list[0];
        maleRange.label.dy = 20;
        maleRange.label.fontWeight = '600';
        maleRange.grid.strokeOpacity = 1;
        maleRange.grid.stroke = male.stroke;

        var femaleRange = valueAxis.axisRanges.create();
        femaleRange.value = 0;
        femaleRange.endValue = 150;
        femaleRange.label.text = "Feminino";
        femaleRange.label.fill = chart.colors.list[1];
        femaleRange.label.dy = 20;
        femaleRange.label.fontWeight = '600';
        femaleRange.grid.strokeOpacity = 1;
        femaleRange.grid.stroke = female.stroke;
    }

    Charts.barras = function(filtro, dados){
        var chart = am4core.create("chartdiv", am4charts.XYChart);

    chart.data = dados;

    console.log(filtro)

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

    Charts.pizza = function(filtro, dados){
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        console.log(filtro)

        // Add data
        chart.data = dados

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

    Charts.radar = function(filtro, dados){
        var chart = am4core.create("chartdiv", am4charts.RadarChart);
        
        chart.data = dados;
        
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

    Charts.lollipop = function(filtro, dados){
        var chart = am4core.create("chartdiv", am4charts.XYChart);       

        chart.data = dados;
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

    Charts.donuts = function(filtro, dados){
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

        chart.data = dados;


    }

    return Charts;

  });