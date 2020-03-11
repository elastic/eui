const chalk = require('chalk');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');

const docsPages = async (root, page) => {
  let links = [
    root,
    ...(await page.$$eval('nav a', anchors => anchors.map(a => a.href))),
  ];

  links = links.splice(0, 14);
  const reflinks = [
    `${root}#/layout/horizontal-rule`,
    `${root}#/layout/modal`,
    `${root}#/layout/nav-drawer`,
    `${root}#/layout/panel`,
    `${root}#/layout/popover`,
    `${root}#/layout/spacer`,
    `${root}#/navigation/breadcrumbs`,
    `${root}#/navigation/context-menu`,
    `${root}#/navigation/control-bar`,
    `${root}#/navigation/link`,
    `${root}#/navigation/pagination`,
    `${root}#/navigation/steps`,
    `${root}#/navigation/tabs`,
    `${root}#/display/avatar`,
    `${root}#/display/badge`,
    `${root}#/display/callout`,
    `${root}#/display/card`,
    `${root}#/display/description-list`,
    `${root}#/display/emptyprompt`,
    `${root}#/display/health`,
    `${root}#/display/icons`,
    `${root}#/display/image`,
    `${root}#/display/list-group`,
    `${root}#/display/loading`,
    `${root}#/display/progress`,
    `${root}#/display/stat`,
    `${root}#/display/text`,
    `${root}#/display/title`,
    `${root}#/display/toast`,
    `${root}#/display/tooltip`,
    `${root}#/forms/form-layouts`,
    `${root}#/forms/form-validation`,
    `${root}#/forms/code-editor`,
    `${root}#/forms/expression`,
    `${root}#/forms/filter-group`,
    `${root}#/forms/range-sliders`,
    `${root}#/forms/search-bar`,
    `${root}#/elastic-charts/sizing`,
    `${root}#/elastic-charts/time-series`,
    `${root}#/elastic-charts/categorical`,
    `${root}#/utilities/i18n`,
    `${root}#/utilities/is-color-dark`,
    `${root}#/utilities/pretty-duration`,
    `${root}#/utilities/mutationobserver`,
    `${root}#/utilities/outside-click-detector`,
    `${root}#/utilities/portal`,
    `${root}#/utilities/resizeobserver`,
    `${root}#/utilities/responsive`,
    `${root}#/utilities/toggle`,
    `${root}#/utilities/window-events`,
    `${root}#/package/i18n-tokens`,
    `${root}#/utilities/accessibility`,
    `${root}#/utilities/context`,
    `${root}#/utilities/copy`,
    `${root}#/utilities/delay-hide`,
    `${root}#/utilities/delay-render`,
    `${root}#/utilities/highlight`,
  ];

  links = [...links, ...reflinks];

  return links;
};

const printResult = result =>
  console.log(`[${result.id}]: ${result.description}
  Help: ${chalk.blue(result.helpUrl)}
  Elements:
    - ${result.nodes.map(node => node.target).join('\n    - ')}`);

(async () => {
  let totalViolationsCount = 0;
  let root = 'http://localhost:9999/';
  let browser;
  let page;

  try {
    browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    page = await browser.newPage();

    await page.setBypassCSP(true);
  } catch (e) {
    console.log(chalk.red('Failed to setup puppeteer'));
    console.log(e);
    process.exit(1);
  }

  try {
    await page.goto(root);
  } catch (e) {
    root = 'http://localhost:8030/';
    try {
      await page.goto(root);
    } catch (e) {
      console.log(
        chalk.red(
          'No local server found. Expecting localhost:9999 or localhost:8030 to resolve.'
        )
      );
      process.exit(1);
    }
  }

  const links = await docsPages(root, page);

  for (const link of links) {
    await page.goto(link);

    const { violations } = await new AxePuppeteer(page)
      .disableRules('color-contrast')
      .exclude(['figure[role="figure"']) // excluding figure[role="figure"] the duplicatory role is there for ie11 support
      .analyze();

    if (violations.length > 0) {
      totalViolationsCount += violations.length;

      const pageName = link.length > 24 ? link.substr(2) : 'the home page';
      console.log(chalk.red(`Errors on ${pageName}`));
    }

    violations.forEach(result => {
      printResult(result);
    });
  }

  await page.close();
  await browser.close();

  if (totalViolationsCount > 0) {
    const errorsCount = chalk.red(
      `${totalViolationsCount} accessibility errors`
    );

    console.log(`${errorsCount}

Install axe for Chrome or Firefox to debug:
Chrome: https://chrome.google.com/webstore/detail/axe-web-accessibility-tes/lhdoppojpmngadmnindnejefpokejbdd
Firefox: https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/`);
    process.exit(1);
  } else {
    console.log(chalk.green('axe found no accessibility errors!'));
  }
})();
