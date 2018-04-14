(function () {
    'use strict';
    app.controller('CallListCtrl', ['$scope', '$state', '$ionicHistory','$cordovaBluetoothSerial'
    , function ($scope, $state, $ionicHistory, $cordovaBluetoothSerial) {

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

        setInterval(function () {
            $cordovaBluetoothSerial.read( function(a) {
                console.log(a)
            }, function (err) {
                console.log(err)
            })
            $cordovaBluetoothSerial.isConnected(
                function () {
                    console.log("Bluetooth is connected");
                    // aqui vc faz nada.
                },
                function () {
                    // aqui vc dispara eventos que vc quiser tratar quando NAO ESTIVER CONECTADO
                    console.log("Bluetooth is not connected");
                }
            );

        }, 2000)
    }])
})();