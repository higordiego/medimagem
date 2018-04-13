(function () {
    'use strict';
    app.controller('CallListCtrl', ['$scope', '$state', '$ionicHistory',  function ($scope, $state, $ionicHistory) {

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        
        $scope.normal = function () {
            $state.go('list', { option: 'Recepção' })
        }
        $scope.entregaExames = function () {
            $state.go('list', { option: 'Entrega de Exames' })
        }
        $scope.agendamento = function () {
            $state.go('list', { option: 'Agendamento' })
        }
    }])
})();