appfai.factory('GraficoModel', ['config', '$http',
    function (config, $http) {

        var GraficoFactory = {};

        GraficoFactory.getRendaFamiliar = function () {
             return $http.get(config.baseUrl + '/aluno/rendatotal', config.defaultHeader);
        };

        GraficoFactory.getEtnia = function () {
            return $http.get(config.baseUrl + '/aluno/etniatotal', config.defaultHeader);
        };

        GraficoFactory.getSituacaoMatricula = function () {
            return $http.get(config.baseUrl + '/aluno/matriculasituacao', config.defaultHeader);
        };

        GraficoFactory.getSituacaoMatriculaRenda = function () {
            return $http.get(config.baseUrl + '/aluno/matriculasituacao', config.defaultHeader);
        };

        GraficoFactory.getSituacaoMatriculaEstado = function () {
            return $http.get(config.baseUrl + '/aluno/matriculasituacaoestado', config.defaultHeader);
        };

        GraficoFactory.getSituacaoMatriculaSexo = function () {
            return $http.get(config.baseUrl + '/aluno/matriculasituacao', config.defaultHeader);
        };


        return GraficoFactory;
    }
]);