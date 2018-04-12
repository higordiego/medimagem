(function () {
    'use strict';
    app.controller('CallCtrl', [
        '$scope'
        , '$state'
        , '$ionicLoading'
        , '$ionicPopup'
        , '$ionicPlatform'
        , 'ClientFactory'
        , '$cordovaBluetoothSerial'
        , function (
            $scope,
            $state,
            $ionicLoading,
            $ionicPopup,
            $ionicPlatform,
            ClientFactory,
            $cordovaBluetoothSerial, ) {


            $scope.doRefresh = function () {
                $ionicLoading.show();
                $scope.$broadcast('scroll.refreshComplete');
            }

            setInterval(function () {
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

            function formatDate() {
                var date = new Date();
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }

            var recebe = formatDate()

            $scope.normal = function () {
                $ionicLoading.show();
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'NORMAL' }).then(function (response) {
                        var teste = '\n\n\n'
                        teste = '  	 SISTEMA DE SENHA \n\n';
                        teste += '   SENHA: NORMAL' + response.data.code + '\n\n';
                        // teste += '**********************\n'
                        // teste += ' PDV: '+ user.name + '\n\n'; 
                        teste += '   CONTROLE DE SENHA \n\n\n';
                        teste += '\n\n\n'
                        $cordovaBluetoothSerial.write(teste).then(function (a, b) {
                            $ionicLoading.hide();
                        }, function (err) {
                            
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Não conseguimos encontrar a Impressora'
                            });
                            alertPopup.then(function () { $state.go('home') });
                            $ionicLoading.hide();
                            
                        });
                    }, function (err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Comunicação com o Servidor!'
                        });
                        alertPopup.then();
                    })

                }, function () {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Impressora',
                        template: 'Impressora não conectada'
                    });
                    alertPopup.then(function (){ $state.go('home') });
                    
                });
            }

            $scope.preferencial = function () {
                $ionicLoading.show();
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'PREFERENCIAL', preferencial: true }).then(function (response) {
                        var teste = '\n\n\n'
                        teste = '  	 SISTEMA DE SENHA \n\n';
                        teste += '  SENHA: PREFERENCIAL' + response.data.code + '\n\n';
                        // teste += '**********************\n'
                        // teste += ' PDV: '+ user.name + '\n\n'; 
                        teste += '   CONTROLE DE SENHA \n\n\n';
                        teste += '\n\n\n'
                        $cordovaBluetoothSerial.write(teste).then(function (a, b) {
                            $ionicLoading.hide();
                        }, function (err) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Não conseguimos encontrar a Impressora'
                            });
                            alertPopup.then(function () { $state.go('home') });
                            $ionicLoading.hide();
                        });
                    }, function (err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Comunicação com o Servidor!'
                        });
                        alertPopup.then();
                    })

                }, function () {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Impressora',
                        template: 'Impressora não conectada'
                    });
                    alertPopup.then(function (){ $state.go('home') });
                });
            }

            $scope.exam = function () {
                $ionicLoading.show();
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'EXAMES' }).then(function (response) {
                        var teste = '\n\n\n'
                        teste = '  	 SISTEMA DE SENHA \n\n';
                        teste += '  SENHA: EXAMES' + response.data.code + '\n\n';
                        // teste += '**********************\n'
                        // teste += ' PDV: '+ user.name + '\n\n'; 
                        teste += '   CONTROLE DE SENHA \n\n\n';
                        teste += '\n\n\n'
                        $cordovaBluetoothSerial.write(teste).then(function (a, b) {
                            $ionicLoading.hide();
                        }, function (err) {
                            var alertPopup = $ionicPopup.alert({
                                title: 'Error',
                                template: 'Não conseguimos encontrar a Impressora'
                            });
                            alertPopup.then(function () { $state.go('home') });
                            $ionicLoading.hide();
                        });
                    }, function (err) {
                        $ionicLoading.hide();
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error',
                            template: 'Comunicação com o Servidor!'
                        });
                        alertPopup.then();
                    })

                }, function () {
                    $ionicLoading.hide();
                    var alertPopup = $ionicPopup.alert({
                        title: 'Impressora',
                        template: 'Impressora não conectada'
                    });
                    alertPopup.then(function (){ $state.go('home') });
                });
            }

        }])
})();

