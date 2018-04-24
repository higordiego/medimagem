(function () {
	'use strict';
	app.controller('HomeCtrl', ['$scope', '$ionicLoading', '$cordovaBluetoothSerial'
		, '$ionicPlatform', '$state', '$ionicPopup'
		, function ($scope, $ionicLoading, $cordovaBluetoothSerial, $ionicPlatform, $state, $ionicPopup) {
			$ionicLoading.hide();

			$scope.bluetooths = [];

			$scope.data = {}


			$scope.doRefreshPrint = function () {
				$scope.bluetooths = []
				$scope.listarBluetooth()
				$scope.$broadcast('scroll.refreshComplete');
			}


			function confirmPrint() {
				var alertPopup = $ionicPopup.alert({
					title: 'Impressora Conectada com Sucesso!',
				});
				alertPopup.then();
				$ionicLoading.hide();
				$state.go('call')
			}

			$scope.connected = false;
			$scope.listarBluetooth = function () {
				$cordovaBluetoothSerial.list().then(
					function (results) {
						$ionicLoading.hide();
						angular.forEach(results, function (paireddev) {
							$scope.bluetooths.push(paireddev);
						});
					},
					function (error) {
						$ionicLoading.hide();
						alert(error);
					});
			};
			$scope.conectarBluetooth = function (blue) {
				$ionicLoading.show();
				$scope.conectar(blue.bluetooth);
			};

			$scope.conectar = function (address) {
				if (!$scope.connected) {
					$cordovaBluetoothSerial.connect(address).then(function () {
						$cordovaBluetoothSerial.isConnected().then(function () {
							$ionicLoading.hide();
							var recep = 'teste de impressora \n\n'
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
							confirmPrint()
						}, function (err) {
							$ionicLoading.hide();
							var alertPopup = $ionicPopup.alert({
								title: 'Error em Conectar a Impressora',
							});
							alertPopup.then();
						});
					}, function (err) {
						$ionicLoading.hide();
						var alertPopup = $ionicPopup.alert({
							title: 'Error em Conectar a Impressora',
						});
						alertPopup.then();
						$ionicLoading.hide();
					});
				}
			}


			$ionicPlatform.ready(function () {
				$cordovaBluetoothSerial.isEnabled().then(function () {
					$scope.habilitado = true;
					$scope.listarBluetooth();
				}, function () {
					$ionicLoading.hide();
					$scope.habilitado = false;
				});

			});



		}])
})();