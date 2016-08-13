require('zone.js/dist/zone');
require('zone.js/dist/async-test');
var ng = require('@angular/core');
var ngHttpTesting = require('@angular/http/testing');
var ngHttp = require('@angular/http');
var Techs = require('./techs');
var Tech = require('./tech');
var ngTest = require('@angular/core/testing');
var rxjs = require('rxjs/Rx');

var MockComponent = ng.Component({
  selector: 'Tech',
  template: '',
  inputs: ['tech']
})
.Class({
  constructor: function () {}
});

var techsJson = [
  {
    key: 'gulp',
    title: 'Gulp',
    logo: 'http://fountainjs.io/assets/imgs/gulp.png',
    text1: 'The streaming build system',
    text2: 'Automate and enhance your workflow'
  },
  {
    key: 'react',
    title: 'React',
    logo: 'http://fountainjs.io/assets/imgs/react.png',
    text1: 'A JavaScript library for building user interfaces',
    text2: 'A declarative, efficient, and flexible JavaScript library for building user interfaces'
  },
  {
    key: 'angular1',
    title: 'Angular 1',
    logo: 'http://fountainjs.io/assets/imgs/angular1.png',
    text1: 'HTML enhanced for web apps!',
    text2: 'AngularJS lets you extend HTML vocabulary for your application. The resulting environment is extraordinarily expressive, readable, and quick to develop.'
  }
];

describe('techs component', function () {
  describe('techs component methods', function () {
    beforeEach(function () {
      ngTest.addProviders([
        Techs,
        ngHttpTesting.MockBackend,
        ngHttp.BaseRequestOptions,
        ng.provide(ngHttp.Http, {
          useFactory: function (backend, defaultOptions) {
            return new ngHttp.Http(backend, defaultOptions);
          },
          deps: [ngHttpTesting.MockBackend, ngHttp.BaseRequestOptions]
        })
      ]);
    });

    it('should get techs', ngTest.inject([ngHttpTesting.MockBackend, Techs], function (mockBackend, techs) {
      var conn;
      var response = new ngHttp.Response(new ngHttp.ResponseOptions({body: techsJson}));
      mockBackend.connections.subscribe(function (connection) {
        conn = connection;
      });
      techs.getTechs().subscribe(function (jsonObject) {
        techs.techs = jsonObject;
      });
      conn.mockRespond(response);
      expect(techs.techs.length).toBe(3);
      mockBackend.verifyNoPendingRequests();
    }));
  });

  describe('techs component rendering', function () {
    beforeEach(function () {
      Techs.prototype.getTechs = function getTechs() {
        var response = new ngHttp.Response(new ngHttp.ResponseOptions({body: techsJson}));
        return rxjs.Observable.of(response).map(function (response) {
          return response.json();
        });
      };
    });

    it('should mock the techs and render 3 elements <tech>', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
      return tcb
        .overrideDirective(Techs, Tech, MockComponent)
        .createAsync(Techs)
        .then(function (fixture) {
          fixture.detectChanges();
          var techs = fixture.nativeElement;
          expect(techs.querySelectorAll('tech').length).toBe(3);
        });
    })));
  });
});
