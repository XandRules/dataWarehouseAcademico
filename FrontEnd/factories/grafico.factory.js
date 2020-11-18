appfai.factory('GraficoModel', ['config', '$http',
    function (config, $http) {

        var GraficoFactory = {};

        GraficoFactory.getRendaFamiliar = function () {
             return $http.get(config.baseUrl + '/aluno/rendatotal', config.defaultHeader);
        };

        GraficoFactory.getEtnia = function () {
            return $http.get(config.baseUrl + '/aluno/etniatotal', config.defaultHeader);
        };

        GraficoFactory.getEscolaTotal = function () {
            return $http.get(config.baseUrl + '/aluno/escolaTotal', config.defaultHeader);
        };

        GraficoFactory.getSituacaoMatricula = function () {
            return $http.get(config.baseUrl + '/aluno/matriculasituacao', config.defaultHeader);
        };

        GraficoFactory.getSituacaoMatriculaRenda = function () {
            return $http.get(config.baseUrl + '/aluno/matriculasituacao', config.defaultHeader);
        };

        GraficoFactory.getEstadoTotal = function () {
            return $http.get(config.baseUrl + '/aluno/estadototal', config.defaultHeader);
        };

        GraficoFactory.getSexoTotal = function () {
            return $http.get(config.baseUrl + '/aluno/sexototal', config.defaultHeader);
        };

        GraficoFactory.sexoIdade = function () {
            return $http.get(config.baseUrl + '/aluno/sexoidade', config.defaultHeader);
        };

        GraficoFactory.customizado = function (data) {
            return $http.get(config.baseUrl + `/aluno/customizado${data}`, config.defaultHeader);
        };


        return GraficoFactory;
    }
]);