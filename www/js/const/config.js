(function () {
    var online = false;
    app.constant('Config', {
        api: online ? 'https://apiteste.rmticketsbar.com.br/api/v1/' : 'http://10.20.2.119:3000/api/v1/',
        socket: online ? 'https://apiteste.rmticketsbar.com.br/' : 'http://10.20.2.119:3000/'
    })
})();
