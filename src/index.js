require('reflect-metadata');
require('zone.js');

var ng = require('@angular/platform-browser-dynamic');

require('./index.scss');

var uiRouter = require('ui-router-ng2');
var ngCommon = require('@angular/common');
var ngPlatformBrowser = require('@angular/platform-browser');
var MyUIRouterConfig = require('./routes');
var ngCore = require('@angular/core');

if (process.env.NODE_ENV === 'production') {
  ngCore.enableProdMode();
}

ng.bootstrap(uiRouter.UiView, uiRouter.UIROUTER_PROVIDERS.concat([
  ngCore.provide(ngCommon.LocationStrategy, {useClass: ngCommon.PathLocationStrategy}),
  ngCore.provide(ngCommon.PlatformLocation, {useClass: ngPlatformBrowser.BrowserPlatformLocation}),
  ngCore.provide(uiRouter.UIRouterConfig, {useClass: MyUIRouterConfig})
]));
