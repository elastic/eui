
describe('Table Page', function () {

  beforeEach(function () {
    browser.url('/test/spec/components/table/resources/table.html');
    browser.waitForExist('#app');
  });


  it('should have the right title - the fancy generator way', function () {
    browser.getTitle().should.be.equal('Table Test Page');
  });

});
