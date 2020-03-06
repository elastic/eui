const chalk = require('chalk');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('axe-puppeteer');

const docsPages = async (root, page) => {
  let links = [
    root,
    ...(await page.$$eval('nav a', anchors => anchors.map(a => a.href))),
  ];

  links = links.splice(0, 9);

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
