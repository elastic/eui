/* global browser */
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

//#TODO: Find out why this resolution fails in FF, { width: 1200, height: 1024 }],

exports.config = {
  // #TODO see: https://github.com/webdriverio/webdriverio/issues/2262
  seleniumInstallArgs: { version: '3.4.0' },
  seleniumArgs: { version: '3.4.0' },
  specs: [
    './test/spec/**/*spec.js'
  ],
  maxInstances: 5,
  sync: true,
  port: '4444',
  coloredLogs: true,
  logLevel: 'silent',
  deprecationWarnings: true,
  waitforTimeout: 300000,
  bail: 0,
  screenshotPath: 'test/failure-screenshots',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 300000,
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
    version: ci ? '58' : null,
    platform: 'macOS 10.12',
  }, {
    maxInstances: 2,
    browserName: 'firefox',
    version: ci ? '56.0' : null,
  }],
  onPrepare: function (config, capabilities) {
    if ((ci) || process.platform === 'win32') {
      capabilities.push({
        browserName: 'internet explorer',
        killInstances: true
      });
    }
    if ((ci) && process.platform !== 'win32') {
      capabilities[1].platform =  'macOS 10.12';
    }
  },
  before: function () {
    const chai = require('chai');
    global.expect = chai.expect;
    const chaiWebdriver = require('chai-webdriverio').default;
    chai.use(chaiWebdriver(browser));

    chai.config.includeStack = true;
    global.AssertionError = chai.AssertionError;
    global.Assertion = chai.Assertion;
    global.assert = chai.assert;
    chai.Should(); // eslint-disable-line new-cap

    global.expectImageToBeSame = function expectImageToBeSame(results) {
      results.forEach((result, idx) => expect(result.isWithinMisMatchTolerance,
        'Image ' + idx + ' is not the same by ' + result.misMatchPercentage + '%').to.be.true);
    };
  }
};
