# Elastic Visual Regression

This module is a test suite used to test [EUI components](https://elastic.github.io/eui/#/). It is to be used to verify
that changes to code do not break the components visually by verifying current screenshots to a baseline taken 
previously. 

## What EVR Does
* EVR runs tests locally and in CI via [Sauce Labs](http://www.saucelabs.com).
* EVR tests against Firefox, Chrome and Internet Explorer using [webdriver.io](http://webdriver.io/)
* EVR runs tests concurrently to speed up execution both locally and on Sauce Labs. 
* EVR tests validate all elements against multiple viewports to check responsiveness. 

## What EVR Does Not Do
* EVR does not verify screenshots across different browsers. It verifies each browser against itself. 
* EVR does not run against multiple versions of each browser. 
* EVR does not replace functional/unit tests. 
* EVR does not block commits. 
* EVR does not determine whether a baseline is acceptable or not. A human has to do this. 

## Tech Stack

* [Webdriver.io](http://webdriver.io/)
  * [Webdriver Mocha](http://webdriver.io/guide/testrunner/frameworks.html)
  * [Webpack Dev Server](http://webdriver.io/guide/services/webpack-dev-server.html)
  * [Webdriver Sauce Service](http://webdriver.io/guide/services/sauce.html)
  * [Webdriver Visual Regression Service](http://webdriver.io/guide/services/visual-regression.html)
  * [Chai-Webdriver.io](http://webdriver.io/guide/plugins/chai-webdriverio.html)
  * [Spec Reporter](http://webdriver.io/guide/reporters/spec.html)
* [Chai](http://www.chaijs.com/)
* [Mocha](https://mochajs.org/)
* [Sauce Labs](http://www.saucelabs.com)

### Supported Browsers

* Google Chrome (65 locally, 58 on CI)
* Firefox (59 locally, 56 on CI)

## Tests

### Running Tests Locally

Running Selenium locally requires installing the [Java SDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html). 

To run the tests, run: 

```bash
yarn #Ensures that the proper dependencies are all installed. 

yarn start-test-server-and-visual-test
```

### Writing Tests
There is pretty extensive documentation of usage for [selectors](http://webdriver.io/guide/usage/selectors.html), [expressive assertions](http://webdriver.io/guide/reporters/spec.html) 
and [configurations](https://github.com/webdriverio/webdriverio/blob/master/examples/wdio.conf.js)for Webdriver.io but an example is
always helpful. 

**Pro Tips**
* Validate one element at a time.
* Validate that the desired element is present before doing image verification.
* The call to `browser.url()` prepends the baseUrl from the configuration file. So you just need to add the relative
path.
* Group tests by component in a `describe` block. Each test should be in an `it` block. 
* To capture the images, a call to `browser.checkElement()` is necessary. That will give you the results to pass into
`expectImageToBeSame()`.
* `expectImageToBeSame()` is a global function that can be called within any test to verify the results of image 
capture.
* Tests should be short and sweet. 

```javascript
describe('My Custom Component', function () {

  beforeEach(function () {
    browser.url('/#/display/toast');
    browser.waitForExist('.euiTitle');
    expect('.euiTitle').to.have.text('Toast');
  });

  it('Default Toast', function () {
    browser.waitForExist('#default');
    const results = browser.checkElement('#default .euiToast');
    expectImageToBeSame (results);
  });

});
```


### Maintenance

The baseline images have to be maintained for this test suite to work. There are times where the images would need to 
be refreshed.

#### When To Refresh 

* You added a new component/test and need to add new baselines.

* You made considerable changes to a component that can/will cause the existing baseline to fail. 

* There are no baseline images (This should never happen).

#### Steps To Refresh

1.) Go to `./test/spec/screenshots/baseline`

2.) Delete all images in the folder.

3.) Rerun tests. 

4.) Commit new baselines to [EUI](https://github.com/elastic/eui). 
