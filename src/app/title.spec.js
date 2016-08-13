require('zone.js/dist/zone');
require('zone.js/dist/async-test');
var Title = require('./title');
var ngTest = require('@angular/core/testing');

describe('title component', function () {
  it('should render \'Allo, \'Allo!', ngTest.async(ngTest.inject([ngTest.TestComponentBuilder], function (tcb) {
    tcb.createAsync(Title)
      .then(function (fixture) {
        fixture.detectChanges();
        var title = fixture.nativeElement;
        expect(title.querySelector('h1').textContent.trim()).toBe('\'Allo, \'Allo!');
      });
  })));
});
