
describe('Card Page', function () {

  beforeEach(function () {
    browser.url('/test/spec/components/card/resources/card.html');
    browser.waitForExist('#app');
  });

  it('should look good', function () {
    const results = browser.checkElement('#cardGroup');
    console.log(results);
    expectImageToBeSame (browser.checkElement('#cardGroup'), results.misMatchPercentage);
  });

});
