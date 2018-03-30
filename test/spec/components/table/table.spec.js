
describe('webdriver.io page', function () {

  it('should have the right title - the fancy generator way', function () {
    // browser.debug();
    browser.url('/test/spec/components/table/resources/table.html');
    browser.getTitle().should.be.equal('Table Test Page');
  });

});
