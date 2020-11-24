appfai.controller('GraficoController', ['$scope','$filter', 'GraficoModel','FiltroModel','ChartService', function ($scope,$filter,GraficoModel,FiltroModel,ChartService) {

    var orderBy = $filter('orderBy');

    $scope.filtro = 0;
    $scope.visualizacao = 0;
    $scope.dados;
    $scope.titulo = 'teste';
    $scope.data;
    $scope.showOptions = false;
    $scope.etnia;
    $scope.escola;
    $scope.sexo;
    $scope.renda;
    $scope.showMessage = false;
    $scope.idSexoIdade;
    $scope.matricula = {
        matricula_situacao : 'Nenhum status'
    };

    $scope.estado;
    $scope.etniaSelecionado = null;
    $scope.escolaSelecionado = null;
    $scope.sexoSelecionado = null;
    $scope.rendaSelecionado = null;
    $scope.matriculaSelecionado = null;
    $scope.estadoSelecionado = null;

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

    $scope.getSexoTotal = function(){
        GraficoModel.getSexoTotal().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getEscolaTotal = function(){
        GraficoModel.getEscolaTotal().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getEstadoTotal = function(){
        GraficoModel.getEstadoTotal().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getCustomizado = function(){

        let data = 
            `?etnia=${$scope.etniaSelecionado == null ? null : $scope.etniaSelecionado.etnia == 'Remover Filtro' ? null : $scope.etniaSelecionado.etnia}`+
            `&estado=${$scope.estadoSelecionado == null ? null :  $scope.estadoSelecionado.estado == 'Remover Filtro' ? null : $scope.estadoSelecionado.estado}`+
            `&sexo=${$scope.sexoSelecionado == null ? null : $scope.sexoSelecionado.sexo == 'Remover Filtro' ? null : $scope.sexoSelecionado.sexo}`+
            `&escola_origem=${$scope.escolaSelecionado == null ? null :$scope.escolaSelecionado.escola_origem == 'Remover Filtro' ? null : $scope.escolaSelecionado.escola_origem}`+
            `&matricula_situacao=${$scope.matriculaSelecionado == null ? null : $scope.matriculaSelecionado.matricula_situacao == 'Remover Filtro' ? null : $scope.matriculaSelecionado.matricula_situacao}`+
            `&renda_familiar=${$scope.rendaSelecionado == null? null :  $scope.rendaSelecionado.renda_familiar == 'Remover Filtro' ? null : $scope.rendaSelecionado.renda_familiar}`
    
            
        GraficoModel.customizado(data).then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }

    $scope.getSexoIdade = function(){
        GraficoModel.sexoIdade().then(function(response){
            console.log(response.data);
            $scope.dados = response.data;
            $scope.buscarDados();
        })
    }
 //FILTROS
    $scope.getEtniaF = function(){
        FiltroModel.getEtnia().then(response =>{
            $scope.etnia = response.data;
            $scope.etnia.push({etnia: 'Remover Filtro'})
            $scope.getSexo();
        })
    }

    $scope.getSexo = function(){
        FiltroModel.getSexo().then(response =>{
            $scope.sexo = response.data;
            $scope.sexo.push({sexo: 'Remover Filtro'})
            $scope.getRenda();
        })
    }

    $scope.getRenda = function(){
        FiltroModel.getRenda().then(response =>{
            $scope.renda = response.data;
            $scope.renda.push({renda_familiar: 'Remover Filtro'})
            $scope.getEstado();
        })
    }

    $scope.getEstado = function(){
        FiltroModel.getEstado().then(response =>{
            $scope.estado = response.data;
            $scope.estado.push({estado: 'Remover Filtro'})
            $scope.getMatricula();
        })
    }

    $scope.getMatricula = function(){
        FiltroModel.getMatricula().then(response =>{
            $scope.matricula = response.data;
            $scope.matricula.push({matricula_situacao: 'Remover Filtro'})
            $scope.getEscola();
        })
    }

    $scope.getEscola = function(){
        FiltroModel.getEscola().then(response =>{
            $scope.escola = response.data;
            $scope.escola.push({escola_origem: 'Remover Filtro'})
        })
    }

    $scope.data = {
        opcoes_de_filtro: [

            {id: "0" , name : 'Renda Total' , filtro: 'renda_familiar'},
            {id: "1" , name : 'Situação da Matricula', filtro: 'matricula_situacao'},
            {id: "2" , name : 'Escola Total', filtro: 'escola_origem'},
            {id: "3" , name : 'Etnia Total', filtro: "etnia"},
            {id: "4" , name : 'Sexo Total', filtro: 'sexo'},
            {id: "5" , name : 'Estado Total', filtro: 'estado'},
            {id: "6" , name : 'Sexo Idade', filtro: 'sexo'},
            {id: "7" , name : 'Customizado', filtro: 'matricula_situacao'},
        ],
        opcoes_de_grafico: [

            {id: "0" , name : 'Pizza' ,disabled: false},
            {id: "1" , name : 'Barras' ,disabled: false},
            {id: "2" , name : 'Radar' ,disabled: false},
            {id: "3" , name : 'Lollipop' ,disabled: false},
            {id: "4" , name : 'Donuts' ,disabled: false},
            {id: "5" , name : 'Barras Horizontal',disabled: false},
            {id: "6" , name : 'Barras Piramide' ,disabled: true},
        ],
        opcao_selecionada_grafico: {id: '0'},
        opcao_selecionada_dados: {id: '0'}  
    };


    $scope.buscarDados = function(){

        if($scope.dados.length == 0){
            $scope.showMessage = true;
        }else{
            $scope.showMessage = false;
        }
        $scope.loadingChart($scope.data.opcao_selecionada_dados.name, $scope.dados);
       
          
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

        if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Sexo Idade"){
            $scope.data.opcao_selecionada_grafico.id = '6';

        }
        
        if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Radar'){
            ChartService.radar($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro, $scope.dados);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Pizza'){
            ChartService.pizza($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro, $scope.dados);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Barras'){
            ChartService.barras($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro, $scope.dados);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Lollipop'){
            ChartService.lollipop($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro, $scope.dados);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Donuts'){
            ChartService.donuts($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro, $scope.dados);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Barras Horizontal'){
            ChartService.barraHorizontal($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro, $scope.dados);
        }else if($scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].name == 'Barras Piramide'){
            ChartService.barrasPiramide($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].filtro,$scope.dados);
        }   

    }


    $scope.alterarVisualizacao = function(){
        console.log('visualização' ,  $scope.data.opcao_selecionada_grafico)

        $scope.buscarDados()
    }

    $scope.alterarFiltro = function(){

        $scope.showOptions = false; 

        if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Renda Total"){
            $scope.getRendaFamiliar();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Etnia Total"){
            $scope.getEtnia();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Situação da Matricula"){
            $scope.getSituacaoMatricula();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Situação da Matricula Por Estado"){
            $scope.getSituacaoMatriculaEstado();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Escola Total"){
            $scope.getEscolaTotal();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Sexo Total"){
            $scope.getSexoTotal();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Estado Total"){
            $scope.getEstadoTotal();
        }else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == "Sexo Idade"){

            $scope.data.opcoes_de_grafico[$scope.data.opcao_selecionada_grafico.id].disabled = false;
            $scope.idSexoIdade = $scope.data.opcao_selecionada_grafico.id;
            $scope.data.opcao_selecionada_grafico.id = '6';

            $scope.getSexoIdade();
        }
        else if($scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name == 'Customizado'){
            $scope.showOptions = true;  
            $scope.getCustomizado();

        }

    }

    $scope.getRendaFamiliar();
    $scope.getEtniaF();

    $scope.titulo = $scope.data.opcoes_de_filtro[$scope.data.opcao_selecionada_dados.id].name;
  
       
}]);