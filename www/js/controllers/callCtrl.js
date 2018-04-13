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
                    ClientFactory.create({ name: 'NORMAL' , subtitle: $scope.option.toUpperCase()}).then(function (response) {
                        var recep = ''
                        var exam = ''
                        if ($scope.option.toUpperCase() == 'RECEPÇÃO' || $scope.option.toUpperCase() == 'AGENDAMENTO') {
                            recep = '\n\n\n'
                            recep = '       Clinimagem \n\n';
                            recep += '   '+$scope.option.toUpperCase() +' - NORMAL \n\n';
                            recep += '      Senha: 0'+ response.data.code +'\n\n'
                            recep += 'Obrigado pela preferência!\n\n\n';
                            recep += '\n\n\n'
                            $cordovaBluetoothSerial.write(recep).then(function (a, b) {
                                $ionicLoading.hide();
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
                            exam = '       Clinimagem \n\n';
                            exam += ' '+$scope.option.toUpperCase() +' - NORMAL \n';
                            exam += '      Senha: 0'+ response.data.code +'\n\n'
                            exam += 'Tenha em mãos protocolo ou documento com foto para retirar o seu exame. \n'
                            exam += '\n\n\n'
                            $cordovaBluetoothSerial.write(exam).then(function (a, b) {
                                $ionicLoading.hide();
                            }, function (err) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Não conseguimos encontrar a Impressora'
                                });
                                alertPopup.then(function () { $state.go('home') });
    
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
                    alertPopup.then(function () { $state.go('home') });

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
                            recep = '       Clinimagem \n\n';
                            recep += ' '+$scope.option.toUpperCase() +' - PRIORIDADE \n';
                            recep += '      Senha: 0'+ response.data.code +'\n\n'
                            recep += 'Obrigado pela preferência! \n';
                            recep += '\n\n\n'
                            $cordovaBluetoothSerial.write(recep).then(function (a, b) {
                                $ionicLoading.hide();
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
                            exam = '       Clinimagem \n\n';
                            exam +=  $scope.option.toUpperCase()+' - PRIORIDADE \n\n';
                            exam += '      Senha: 0'+ response.data.code +'\n\n'
                            exam += 'Tenha em mãos protocolo ou documento com foto para retirar o seu exame. \n'
                            exam += '\n\n\n'
                            $cordovaBluetoothSerial.write(exam).then(function (a, b) {
                                $ionicLoading.hide();
                            }, function (err) {
                                $ionicLoading.hide();
                                var alertPopup = $ionicPopup.alert({
                                    title: 'Error',
                                    template: 'Não conseguimos encontrar a Impressora'
                                });
                                alertPopup.then(function () { $state.go('home') });
    
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
                    alertPopup.then(function () { $state.go('home') });
                });
            }
            
            // $scope.exam = function () {
            //     $ionicLoading.show();
            //     $cordovaBluetoothSerial.isConnected().then(function () {
            //         ClientFactory.create({ name: 'EXAMES',  subtitle: option.toUpperCase() }).then(function (response) {
            //             var teste = '\n\n\n'
            //             teste = '  	 SISTEMA DE SENHA \n\n';
            //             teste += '  SENHA: EXAMES' + response.data.code + '\n\n';
            //             // teste += '**********************\n'
            //             // teste += ' PDV: '+ user.name + '\n\n'; 
            //             teste += '   CONTROLE DE SENHA \n\n\n';
            //             teste += '\n\n\n'
            //             $cordovaBluetoothSerial.write(teste).then(function (a, b) {
            //                 $ionicLoading.hide();
            //             }, function (err) {
            //                 var alertPopup = $ionicPopup.alert({
            //                     title: 'Error',
            //                     template: 'Não conseguimos encontrar a Impressora'
            //                 });
            //                 alertPopup.then(function () { $state.go('home') });
            //                 $ionicLoading.hide();
            //             });
            //         }, function (err) {
            //             $ionicLoading.hide();
            //             var alertPopup = $ionicPopup.alert({
            //                 title: 'Error',
            //                 template: 'Comunicação com o Servidor!'
            //             });
            //             alertPopup.then();
            //         })

            //     }, function () {
            //         $ionicLoading.hide();
            //         var alertPopup = $ionicPopup.alert({
            //             title: 'Impressora',
            //             template: 'Impressora não conectada'
            //         });
            //         alertPopup.then(function () { $state.go('home') });
            //     });
            // }

        }])
})();

