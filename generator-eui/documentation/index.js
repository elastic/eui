/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const chalk = require('chalk');
const Generator = require('yeoman-generator');
const utils = require('../utils');

const DOCUMENTATION_PAGE_PATH = 'src-docs/src/views';

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.fileType = options.fileType;
  }

  prompting() {
    const prompts = [
      {
        message:
          "What's the name of the component you're documenting? Use snake_case, please.",
        name: 'name',
        type: 'input',
        store: true,
      },
    ];

    if (this.fileType === 'demo') {
      prompts.push({
        message:
          "What's the name of the directory this demo should go in? (Within src-docs/src/views). Use snake_case, please.",
        name: 'folderName',
        type: 'input',
        store: true,
        default: answers => answers.name,
      });

      prompts.push({
        message:
          'What would you like to name this demo? Use snake_case, please.',
        name: 'demoName',
        type: 'input',
        store: true,
      });
    }

    return this.prompt(prompts).then(answers => {
      this.config = answers;
    });
  }

  writing() {
    const config = this.config;

    const writeDocumentationPage = () => {
      const componentExampleName = utils.makeComponentName(config.name, false);
      const componentExamplePrefix = utils.lowerCaseFirstLetter(
        componentExampleName
      );
      const componentName = utils.makeComponentName(config.name);
      const fileName = config.name;

      const path = DOCUMENTATION_PAGE_PATH;

      const vars = (config.documentationVars = {
        componentExampleName,
        componentExamplePrefix,
        componentName,
        fileName,
      });

      const documentationPagePath = (config.documentationPagePath = `${path}/${
        config.name
      }/${config.name}_example.js`);

      this.fs.copyTpl(
        this.templatePath('documentation_page.js'),
        this.destinationPath(documentationPagePath),
        vars
      );
    };

    const writeDocumentationPageDemo = (fileName, folderName) => {
      const componentExampleName = utils.makeComponentName(fileName, false);
      const componentExamplePrefix = utils.lowerCaseFirstLetter(
        componentExampleName
      );
      const componentName = utils.makeComponentName(config.name);

      const path = DOCUMENTATION_PAGE_PATH;

      const vars = (config.documentationVars = {
        componentExampleName,
        componentExamplePrefix,
        componentName,
        fileName,
        folderName,
      });

      const documentationPageDemoPath = (config.documentationPageDemoPath = `${path}/${folderName}/${fileName}.tsx`);

      this.fs.copyTpl(
        this.templatePath('documentation_page_demo.tsx'),
        this.destinationPath(documentationPageDemoPath),
        vars
      );
    };

    switch (this.fileType) {
      case 'documentation':
        writeDocumentationPage();
        writeDocumentationPageDemo(config.name, config.name);
        break;

      case 'demo':
        writeDocumentationPageDemo(config.demoName, config.folderName);
        break;
    }
  }

  end() {
    const showImportDemoSnippet = () => {
      const {
        componentExampleName,
        componentExamplePrefix,
        fileName,
      } = this.config.documentationVars;

      this.log(chalk.white('\n// Import demo into example.'));
      this.log(
        `${chalk.magenta('import')} ${componentExampleName} from ${chalk.cyan(
          `'./${fileName}'`
        )};\n` +
          `${chalk.magenta(
            'const'
          )} ${componentExamplePrefix}Source = require(${chalk.cyan(
            `'!!raw-loader!./${fileName}'`
          )});\n` +
          `${chalk.magenta(
            'const'
          )} ${componentExamplePrefix}Html = renderToHtml(${componentExampleName});`
      );

      this.log(chalk.white('\n// Render demo.'));
      this.log(
        '<GuideSection\n' +
          `  title="${componentExampleName}"\n` +
          '  source={[{\n' +
          '    type: GuideSectionTypes.JS,\n' +
          `    code: ${componentExamplePrefix}Source,\n` +
          '  }, {\n' +
          '    type: GuideSectionTypes.HTML,\n' +
          `    code: ${componentExamplePrefix}Html,\n` +
          '  }]}\n' +
          '  text={\n' +
          `    <p>Description needed: how to use the ${componentExampleName} component.</p>\n` +
          ' }\n' +
          '  demo={\n' +
          `    <${componentExampleName} />\n` +
          ' }\n' +
          '/>\n'
      );
    };

    const showImportRouteSnippet = (suffix, appendToRoute) => {
      const { componentExampleName, fileName } = this.config.documentationVars;

      this.log(
        chalk.white(
          '\n// Import example into routes.js and then add it to the "components" array.'
        )
      );
      this.log(
        `${chalk.magenta('import')} { ${componentExampleName}${suffix} }\n` +
          `  ${chalk.magenta('from')} ${chalk.cyan(
            `'./views/${fileName}/${fileName}_${suffix.toLowerCase()}'`
          )};`
      );
    };

    this.log('------------------------------------------------');
    this.log(chalk.bold('Import snippets:'));

    switch (this.fileType) {
      case 'documentation':
        showImportRouteSnippet('Example');
        break;

      case 'demo':
        showImportDemoSnippet();
        break;
    }
    this.log('------------------------------------------------');
  }
};
