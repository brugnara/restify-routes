function Routes() {
  this.alreadyRouted = {};
};

Routes.prototype.set = function(server, path) {
  var routes = require('require-all')(path);
  //
  for (var key in routes) {
    var routeContainer = routes[key];
    for (var k in routeContainer) {
      var singleRoute = routeContainer[k];
      this._addRoute(server, singleRoute);
    };
  }
};

Routes.prototype._addRoute = function(server, route) {
  var name = server.name || 'default-name';
  this.alreadyRouted[name] = this.alreadyRouted[name] || [];
  for (var path in route) {
    var routePath = route[path];
    for (var method in routePath) {
      var action = routePath[method];
      method = method.toLowerCase();
      //
      var key = method + ':' + path;
      //
      if (this.alreadyRouted[name].indexOf(key) !== -1) {
        console.warn('Route already added: %s, skipping...', path);
      } else {
        try {
          server[method](path, action);
          this.alreadyRouted[name].push(key);
          console.info('Added route: %s %s', method.toUpperCase(), path);
        } catch(e) {
          console.error('Adding route failed due errors: %s %s', method.toUpperCase(), path);
        }
      }
    }
  }
};

module.exports = new Routes();