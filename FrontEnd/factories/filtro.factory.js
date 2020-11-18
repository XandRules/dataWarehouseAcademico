appfai.factory('FiltroModel', ['config', '$http',
    function (config, $http) {

        var FIltroFactory = {};

        FIltroFactory.getRenda = function () {
             return $http.get(config.baseUrl + '/filtro/renda', config.defaultHeader);
        };

        FIltroFactory.getEtnia = function () {
            return $http.get(config.baseUrl + '/filtro/etnia', config.defaultHeader);
        };

        FIltroFactory.getEscola = function () {
            return $http.get(config.baseUrl + '/filtro/escola', config.defaultHeader);
        };

        FIltroFactory.getMatricula = function () {
            return $http.get(config.baseUrl + '/filtro/matricula', config.defaultHeader);
        };

        FIltroFactory.getEstado = function () {
            return $http.get(config.baseUrl + '/filtro/estado', config.defaultHeader);
        };

        FIltroFactory.getSexo = function () {
            return $http.get(config.baseUrl + '/filtro/sexo', config.defaultHeader);
        };


        return FIltroFactory;
    }
]);