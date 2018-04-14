(function () {
    var online = true;
    app.constant('Config', {
        api: online ? 'http://192.168.0.159/api/v1/' : 'http://192.168.1.4:3000/api/v1/',
        socket: online ? 'http://192.168.0.159/' : 'http://192.168.1.4:3000/'
    })
})();
