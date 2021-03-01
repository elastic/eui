/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

const chalk = require('chalk');
const puppeteer = require('puppeteer');
const { AxePuppeteer } = require('@axe-core/puppeteer');

const docsPages = async (root, page) => {
  const pagesToSkip = [
    `${root}#/layout/resizable-container`,
    `${root}#/layout/page`, // Has duplicate `<main>` element
    `${root}#/tabular-content/tables`,
    `${root}#/tabular-content/in-memory-tables`,
    `${root}#/display/aspect-ratio`,
    `${root}#/display/code`,
    `${root}#/display/drag-and-drop`,
    `${root}#/forms/compressed-forms`,
    `${root}#/forms/super-select`,
    `${root}#/forms/combo-box`,
    `${root}#/forms/color-selection`,
    `${root}#/forms/code-editor`,
    `${root}#/forms/date-picker`,
    `${root}#/forms/suggest`,
    `${root}#/forms/super-date-picker`,
    `${root}#/tabular-content/data-grid`,
    `${root}#/tabular-content/data-grid-in-memory-settings`,
    `${root}#/tabular-content/data-grid-schemas-and-popovers`,
    `${root}#/tabular-content/data-grid-focus`,
    `${root}#/tabular-content/data-grid-styling-and-control`,
    `${root}#/tabular-content/data-grid-control-columns`,
    `${root}#/tabular-content/data-grid-footer-row`,
    `${root}#/tabular-content/data-grid-virtualization`,
    `${root}#/elastic-charts/creating-charts`,
    `${root}#/elastic-charts/part-to-whole-comparisons`,
    `${root}#/temporary/canopy`,
  ];

  return [
    root,
    ...(await page.$$eval('nav a', (anchors) => anchors.map((a) => a.href))),
  ].filter((link) => !pagesToSkip.includes(link));
};

const printResult = (result) =>
  console.log(`[${result.id}]: ${result.description}
  Help: ${chalk.blue(result.helpUrl)}
  Elements:
    - ${result.nodes.map((node) => node.target).join('\n    - ')}`);

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
      .configure({
        rules: [
          { id: 'color-contrast', enabled: false },
          {
            id: 'scrollable-region-focusable',
            selector: '[data-skip-axe="scrollable-region-focusable"]',
          },
          {
            // can remove after https://github.com/dequelabs/axe-core/issues/2690 is resolved
            id: 'region',
            selector: 'iframe, #player,',
          },
        ],
      })
      .analyze();

    if (violations.length > 0) {
      totalViolationsCount += violations.length;

      const pageName = link.length > 24 ? link.substr(2) : 'the home page';
      console.log(chalk.red(`Errors on ${pageName}`));
    }

    violations.forEach((result) => {
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
})().catch((e) => console.error(e));
