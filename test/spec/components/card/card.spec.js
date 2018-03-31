
describe('Card Page', function () {

  beforeEach(function () {
    browser.url('/test/spec/components/card/resources/card.html');
    browser.waitForExist('#app');
  });

  it('Flex Card Group', function () {
    const results = browser.checkElement('#cardGroup');
    expectImageToBeSame (results);
  });

});
