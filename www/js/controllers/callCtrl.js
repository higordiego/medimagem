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
        , '$stateParams'
        , function (
            $scope,
            $state,
            $ionicLoading,
            $ionicPopup,
            $ionicPlatform,
            ClientFactory,
            $cordovaBluetoothSerial,
            $stateParams
            ) {


            $scope.back = function () {
                $state.go('call')
            }

            $scope.option = $state.params.option

            

            $scope.doRefresh = function () {
                $scope.$broadcast('scroll.refreshComplete');
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

            function formatDate() {
                var date = new Date();
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
            }

            var recebe = formatDate()

            $scope.normal = function () {
                $ionicLoading.show();
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'NORMAL' , subtitle: $scope.option.toUpperCase()}).then(function (response) {
                        var recep = ''
                        var exam = ''
                        if ($scope.option.toUpperCase() == 'RECEPÇÃO' || $scope.option.toUpperCase() == 'AGENDAMENTO') {
                            recep = '\n\n\n'
                            recep = '       Medimagem \n\n';
                            recep += '   '+$scope.option.toUpperCase() +' - NORMAL \n\n';
                            recep += '      Senha: 0'+ response.data.code +'\n\n'
                            recep += 'Obrigado pela preferência!\n\n\n';
                            recep += '\n\n\n'
                            $cordovaBluetoothSerial.write(recep).then(function (a, b) {
                                $ionicLoading.hide();
                                $state.go('call')
                            }, function (err) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Não conseguimos encontrar a Impressora'
                                });
                                alertPopup.then(function () { 
                                    $ionicLoading.hide();
                                    $state.go('home') 
                                });
    
                            });
                        } else {
                            exam = '\n\n\n'
                            exam = '       Medimagem \n\n';
                            exam += ' '+$scope.option.toUpperCase() +' - NORMAL \n';
                            exam += '      Senha: 0'+ response.data.code +'\n\n'
                            exam += 'Tenha em mãos protocolo ou documento com foto\n'
                            exam += 'para retirar o seu exame\n'
                            exam += '\n\n\n'
                            $cordovaBluetoothSerial.write(exam).then(function (a, b) {
                                $ionicLoading.hide();
                                $state.go('call')
                            }, function (err) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Não conseguimos encontrar a Impressora'
                                });
                                alertPopup.then(function () { 
                                    $ionicLoading.hide();
                                    $state.go('home')
                                 });
    
                            });
                        }
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
                    alertPopup.then(function () { 
                        $ionicLoading.hide();
                        $state.go('home') 
                    });

                });
            }

            $scope.preferencial = function () {
                $ionicLoading.show();
                $cordovaBluetoothSerial.isConnected().then(function () {
                    ClientFactory.create({ name: 'PRIORIDADE',  subtitle: $scope.option.toUpperCase(), preferencial: true }).then(function (response) {
                        var recep = ''
                        var exam = ''
                        if ($scope.option.toUpperCase() == 'RECEPÇÃO' || $scope.option.toUpperCase() == 'AGENDAMENTO') {
                            recep = '\n\n\n'
                            recep = '       Medimagem \n\n';
                            recep += ' '+$scope.option.toUpperCase() +' - PRIORIDADE \n';
                            recep += '      Senha: 0'+response.data.code+'\n\n'
                            recep += 'Obrigado pela preferência!\n\n\n';
                            $cordovaBluetoothSerial.write(recep).then(function (a, b) {
                                $ionicLoading.hide();
                                $state.go('call')
                            }, function (err) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Não conseguimos encontrar a Impressora'
                                });
                                alertPopup.then(function () { $state.go('home') });
    
                            });
                        } else {
                            exam = '\n\n\n'
                            exam = '       Medimagem \n\n';
                            exam +=  $scope.option.toUpperCase()+' - PRIORIDADE \n\n';
                            exam += '      Senha: 0'+ response.data.code +'\n\n'
                            exam += 'Tenha em mãos protocolo ou documento com foto\n'
                            exam += 'para retirar o seu exame\n'
                            exam += '\n\n\n'
                            $cordovaBluetoothSerial.write(exam).then(function (a, b) {
                                $ionicLoading.hide();
                                $state.go('call')
                            }, function (err) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Não conseguimos encontrar a Impressora'
                                });
                                alertPopup.then(function () { 
                                    $ionicLoading.hide();
                                    $state.go('home') });
    
                            });
                        }
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
                    alertPopup.then(function () { 
                        $ionicLoading.hide(); 
                        $state.go('home') 
                    });
                });
            }
        }])
})();

