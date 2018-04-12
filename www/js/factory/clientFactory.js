(function(){
	'use strict'
	app.factory('ClientFactory', ['$http','Config' ,function($http,Config){
		return {
			create: function(data){
				return $http.post(Config.api + 'client', data)
			}
		};
	}]);
})();
