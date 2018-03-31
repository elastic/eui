
const ci = process.env.CI && process.env.CI === 'true';
const path = require('path');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function (context) {
    const environment = process.env.CI === 'true';
    const type = context.type;
    const testName = context.test.title;
    const browserVersion = parseInt(context.browser.version, 10);
    const browserName = context.browser.name;
    const browserViewport = context.meta.viewport;
    const browserWidth = browserViewport.width;
    const browserHeight = browserViewport.height;

    return path.join(basePath,
      `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}_CI_is_${environment}.png`);
  };
}

//#TODO: Find out why this resolution fails, { width: 1200, height: 1024 }],

exports.config = {
  specs: [
    './test/spec/**/*spec.js'
  ],
  maxInstances: 3,
  sync: true,
  port: '4444',
  coloredLogs: true,
  logLevel: 'silent',
  deprecationWarnings: true,
  waitforTimeout: 1800000,
  bail: 0,
  screenshotPath: 'test/failure-screenshots',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 1800000,
  },
  reporters: ['dot', 'spec'],
  services: [ci ? 'sauce' : 'selenium-standalone', 'chromedriver', 'visual-regression'],
  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'test/spec/screenshots/baseline')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'test/spec/screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'test/spec/screenshots/diff')),
      misMatchTolerance: 0.1,
    }),
    viewportChangePause: 2000,
    viewports: [{ width: 575, height: 320 }, { width: 768, height: 432 }, { width: 992, height: 620 }],
    orientations: ['landscape'],
  },
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  baseUrl: 'http://localhost:9999',
  capabilities: [{
    browserName: 'chrome',
    version: '65.0',
    platform: 'macOS 10.13',
    chromeOptions: {
      // to run chrome headless the following flags are required
      // (see https://developers.google.com/web/updates/2017/04/headless-chrome)
      // args: ['--headless', '--disable-gpu'],
    }
  }, {
    // maxInstances can get overwritten per capability. So if you have an in house Selenium
    // grid with only 5 firefox instance available you can make sure that not more than
    // 5 instance gets started at a time.
    maxInstances: 1,
    browserName: 'firefox',
    version: '59.0',
    'moz:firefoxOptions': {
      // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
      // args: ['-headless']
    }
  }],
  onPrepare: function (config, capabilities) {
    if ((ci) || process.platform === 'win32') {
      capabilities.push({
        browserName: 'internet explorer',
        killInstances: false
      });
    }
    if ((ci) && process.platform !== 'win32') {
      capabilities[1].platform =  'macOS 10.13';
    }
    console.log(capabilities);
  },
  before: function (capabilities, specs) {
    const sinon = require('sinon');
    // http://sinonjs.org/
    const chai = require('chai');
    const chaiWebdriver = require('chai-webdriverio').default;
    chai.use(chaiWebdriver(browser));
    // http://chaijs.com/
    global.fetch = require('node-fetch');

    chai.config.includeStack = true;
    global.expect = chai.expect;
    global.AssertionError = chai.AssertionError;
    global.Assertion = chai.Assertion;
    global.assert = chai.assert;
    chai.Should();

    global.expectImageToBeSame = function expectImageToBeSame (results) {
      results.forEach((result, idx) => expect(result.isWithinMisMatchTolerance,
        'Image ' + idx + ' is not the same by ' + result.misMatchPercentage + '%').to.be.true);
    };

  },
};
