
describe('Table Page', function () {

  beforeEach(function () {
    browser.url('/test/spec/components/table/resources/table.html');
    browser.waitForExist('#app');
  });

  it('Basic Table', function () {
    browser.waitForExist('.basicTable');
    const results = browser.checkElement('.basicTable');
    expectImageToBeSame (results);
  });

});
