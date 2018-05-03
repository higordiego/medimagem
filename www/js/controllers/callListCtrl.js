(function () {
    'use strict';
    app.controller('CallListCtrl', ['$scope', '$state', '$ionicHistory','$cordovaBluetoothSerial'
    , function ($scope, $state, $ionicHistory, $cordovaBluetoothSerial) {

        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        
        $scope.normal = function () {
            $state.go('list', { option: 'Recepcao' })
        }
        $scope.entregaExames = function () {
            $state.go('list', { option: 'Entrega de Exames' })
        }
        $scope.agendamento = function () {
            $state.go('list', { option: 'Agendamento' })
        }



        setInterval(function () {
            $cordovaBluetoothSerial.isConnected().then(function () {
                var recep = ''
                $cordovaBluetoothSerial.write(recep).then(function (a, b) {
                }, function (err) {
                    $state.go('home');
                });
            })
        }, 5000)
    }])
})();