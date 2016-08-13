var ng = require('@angular/core');
var Main = require('./app/main');

var INITIAL_STATES = [
  {name: 'App', url: '/', component: Main}
];

module.exports = ng.Class({
  constructor: function () {},

  configure: function (uiRouter) {
    INITIAL_STATES.forEach(function (state) {
      uiRouter.stateRegistry.register(state);
      uiRouter.stateRegistry.root();
      uiRouter.urlRouterProvider.otherwise(function () {
        uiRouter.stateService.go('App', null, null);
      });
    });
  }
});
