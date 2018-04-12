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



            function formatDate() {
                var date = new Date();
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }

            var recebe = formatDate()

            $scope.normal = function () {
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
                            $state.go('home')
                            alert('Error na Impressão');
                            $ionicLoading.hide();
                        });
                    }, function (err) {
                        alert('Tente Novamente')
                    })

                }, function () {
                    $ionicLoading.hide();
                    alert('Não conectado');
                });
            }
            $scope.preferencial = function () {
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'PREFERENCIAL', preferencial: true }).then(function (response) {
                        var teste = '\n\n\n'
                        teste = '  	 SISTEMA DE SENHA \n\n';
                        teste += '  SENHA: PREFERENCIAL'+ response.data.code + '\n\n';
                        // teste += '**********************\n'
                        // teste += ' PDV: '+ user.name + '\n\n'; 
                        teste += '   CONTROLE DE SENHA \n\n\n';
                        teste += '\n\n\n'
                        $cordovaBluetoothSerial.write(teste).then(function (a, b) {
                            $ionicLoading.hide();
                        }, function (err) {
                            $state.go('home')
                            alert('Error na Impressão');
                            $ionicLoading.hide();
                        });
                    }, function (err) {
                        alert('Tente Novamente')
                    })

                }, function () {
                    $ionicLoading.hide();
                    alert('Não conectado');
                });
            }
            $scope.exam = function () {
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'EXAMES' }).then(function (response) {
                        var teste = '\n\n\n'
                        teste = '  	 SISTEMA DE SENHA \n\n';
                        teste += '  SENHA: EXAMES'+ response.data.code + '\n\n';
                        // teste += '**********************\n'
                        // teste += ' PDV: '+ user.name + '\n\n'; 
                        teste += '   CONTROLE DE SENHA \n\n\n';
                        teste += '\n\n\n'
                        $cordovaBluetoothSerial.write(teste).then(function (a, b) {
                            $ionicLoading.hide();
                        }, function (err) {
                            $state.go('home')
                            alert('Error na Impressão');
                            $ionicLoading.hide();
                        });
                    }, function (err) {
                        alert('Tente Novamente')
                    })

                }, function () {
                    $ionicLoading.hide();
                    alert('Não conectado');
                });
            }

        }])
})();

