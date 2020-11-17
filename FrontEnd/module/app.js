var appfai = angular.module('appfai', ['chart.js']);

appfai.constant('config', {
    baseUrl: "http://127.0.0.1:3000",

    defaultHeader: {

        'Content-Type': 'application/json',
        'Is-Ajax': 'true'
    },
    updateHeader: {
        'Content-Type': 'application/json',
        'Is-Ajax': 'true'
    },
    defaultHeaderNotify: {
        'Content-Type': 'application/json',
        'Is-Ajax': 'true',
        'notify': 'true'
    }
});
