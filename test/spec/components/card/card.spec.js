
describe('webdriver.io page', function () {

  it('should have the right title - the fancy generator way', function () {
    // browser.debug();
    browser.url('/test/spec/components/card/resources/card.html');
    browser.getTitle().should.be.equal('Card Test Page');
  });

});
