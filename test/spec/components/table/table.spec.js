/* global browser expectImageToBeSame */
describe('Table Component', function () {

  beforeEach(function () {
    browser.url('/#/display/tables');
    browser.waitForExist('.euiTitle');
    expect('.euiTitle').to.have.text('Tables');
  });

  it('Basic Table', function () {
    browser.waitForExist('#a-simple-basictable');
    const results = browser.checkElement('#a-simple-basictable .euiBasicTable');
    expectImageToBeSame (results);
  });

});
