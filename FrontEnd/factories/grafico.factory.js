appfai.factory('GraficoModel', ['config', '$http',
    function (config, $http) {

        var GraficoFactory = {};

        GraficoFactory.getRendaFamiliar = function () {
             return $http.get(config.baseUrl + '/aluno/rendatotal', config.defaultHeader);
        };

        GraficoFactory.getEtnia = function () {
            return $http.get(config.baseUrl + '/aluno/etnia', config.defaultHeader);
       };

        return GraficoFactory;
    }
]);