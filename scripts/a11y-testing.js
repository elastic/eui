const chalk = require('chalk');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const docsPages = async (root, page) => {
  const pagesToSkip = [
    `${root}#/display/aspect-ratio`, // Has issues with the embedded audio player
    `${root}#/layout/accordion`, // Has an issue with ARIA attributes
    `${root}#/templates/page-template` // Has multiple `main` elements that we don't want to remove for bad copy/paste code
  ];

  return [
    root,
    ...(await page.$$eval('nav a', (anchors) => anchors.map((a) => a.href))),
  ].filter((link) => !pagesToSkip.includes(link));
};

const printResult = (violations) => {
  const violationData = violations.map(
    ({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length
    }));
  console.table(violationData);
}

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
      .options({
        runOnly: {
          type: 'tag',
          values: ['section508', 'wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']
        },
        rules: {
          'color-contrast': { enabled: false },
          'scrollable-region-focusable': { enabled: false },
          'frame-title': { enabled: false }, // axe reports 18 page violations, but no <iframe> or <frame> on pages
        },
      })
      .analyze();

    if (violations.length > 0) {
      totalViolationsCount += violations.length;

      const pageName = link.length > 24 ? link.substr(2) : 'the home page';
      console.log(chalk.red(`Errors on ${pageName}`));
      printResult(violations);
    }
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
})().catch((e) => console.error(e));
