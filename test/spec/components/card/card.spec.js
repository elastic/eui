
describe('webdriver.io page', function () {

  it('should have the right title - the fancy generator way', function () {
    browser.url('http://webdriver.io');
    browser.getTitle().should.be.equal('WebdriverIO - WebDriver bindings for Node.js');
  });

});
