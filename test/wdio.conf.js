
const ci = process.env.CI && process.env.CI === 'true';
const path = require('path');
const VisualRegressionCompare = require('wdio-visual-regression-service/compare');

function getScreenshotName(basePath) {
  return function (context) {
    const type = context.type;
    const testName = context.test.title;
    const browserVersion = parseInt(context.browser.version, 10);
    const browserName = context.browser.name;
    const browserViewport = context.meta.viewport;
    const browserWidth = browserViewport.width;
    const browserHeight = browserViewport.height;

    return path.join(basePath, `${testName}_${type}_${browserName}_v${browserVersion}_${browserWidth}x${browserHeight}.png`);
  };
}


exports.config = {
  specs: [
    './test/spec/**/*spec.js'
  ],
  maxInstances: 6,
  sync: true,
  port: '4444',
  coloredLogs: true,
  logLevel: 'verbose',
  deprecationWarnings: true,
  waitforTimeout: 20000,
  bail: 0,
  screenshotPath: 'test/failure-screenshots',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 30000,
    retries: 2
  },
  reporters: ['dot', 'spec'],
  services: [ci ? 'sauce' : 'selenium-standalone', 'chromedriver', 'visual-regression'],
  visualRegression: {
    compare: new VisualRegressionCompare.LocalCompare({
      referenceName: getScreenshotName(path.join(process.cwd(), 'test/spec/screenshots/baseline')),
      screenshotName: getScreenshotName(path.join(process.cwd(), 'test/spec/screenshots/screen')),
      diffName: getScreenshotName(path.join(process.cwd(), 'test/spec/screenshots/diff')),
      misMatchTolerance: 0.01,
    }),
    viewportChangePause: 300,
    orientations: ['landscape'],
  },
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  sauceConnect: true,
  baseUrl: 'http://localhost:9999',
  capabilities: [{
    browserName: 'chrome',
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
    acceptInsecureCerts: true,
    'moz:firefoxOptions': {
      // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
      // args: ['-headless']
    }
  }],
  onPrepare: function (config, capabilities) {
    if ((ci) || process.platform === 'win32') {
      capabilities.push({
        browserName: 'internet explorer',
        killInstances: true
      });
    }
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

    global.expectImageToBeSame = function expectImageToBeSame (results, percentOff) {
      results.forEach((result, idx) => expect(result.isExactSameImage, 'Image ' + idx + ' is not the same by' + percentOff + '%.').to.be.true);
    };

  },
};
