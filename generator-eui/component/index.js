const chalk = require('chalk');
const Generator = require('yeoman-generator');
const utils = require('../utils');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.fileType = options.fileType;
  }

  prompting() {
    return this.prompt([
      {
        message: "What's the name of this component? Use snake_case, please.",
        name: 'name',
        type: 'input',
      },
      {
        message: `Where do you want to create this component's files?`,
        type: 'input',
        name: 'path',
        default: 'src/components',
        store: true,
      },
      {
        message: 'Does it need its own directory?',
        name: 'shouldMakeDirectory',
        type: 'confirm',
        default: true,
      },
    ]).then((answers) => {
      this.config = answers;

      if (!answers.name || !answers.name.trim()) {
        this.log.error(
          'Sorry, please run this generator again and provide a component name.'
        );
        process.exit(1);
      }
    });
  }

  writing() {
    const config = this.config;

    const writeComponent = (isStatelessFunction) => {
      const componentName = utils.makeComponentName(config.name);
      const baseName = config.name;
      const cssClassName = utils.lowerCaseFirstLetter(componentName);
      const fileName = config.name;

      const path = utils.addDirectoryToPath(
        config.path,
        fileName,
        config.shouldMakeDirectory
      );

      const vars = (config.vars = {
        baseName,
        componentName,
        cssClassName,
        fileName: fileName.replace('.ts', ''),
      });

      const componentPath = (config.componentPath = `${path}/${fileName}.tsx`);
      const testPath = (config.testPath = `${path}/${fileName}.test.tsx`);
      const stylesPath = (config.stylesPath = `${path}/${fileName}.styles.ts`);
      config.stylesImportPath = `./${fileName}.styles.ts`;

      // If it needs its own directory then it will need a root index file too.
      if (this.config.shouldMakeDirectory) {
        this.fs.copyTpl(
          this.templatePath('index.ts'),
          this.destinationPath(`${path}/index.ts`),
          vars
        );
      }

      // Create component file.
      this.fs.copyTpl(
        isStatelessFunction
          ? this.templatePath('stateless_function.tsx')
          : this.templatePath('component.tsx'),
        this.destinationPath(componentPath),
        vars
      );

      // Create component test file.
      this.fs.copyTpl(
        this.templatePath('test.tsx'),
        this.destinationPath(testPath),
        vars
      );

      // Create component styles file.
      this.fs.copyTpl(
        this.templatePath('component.styles.ts'),
        this.destinationPath(stylesPath),
        vars
      );
    };

    switch (this.fileType) {
      case 'component':
        writeComponent();
        break;

      case 'function':
        writeComponent(true);
        break;
    }
  }

  end() {
    const showImportComponentSnippet = () => {
      const componentName = this.config.vars.componentName;

      this.log(
        chalk.white(`\n// Export component (e.. from component's index.ts).`)
      );
      this.log(
        `${chalk.magenta('export')} {\n` +
          `  ${componentName},\n` +
          `} ${chalk.magenta('from')} ${chalk.cyan(`'./${this.config.name}'`)};`
      );
    };

    this.log('------------------------------------------------');
    this.log(chalk.bold('Handy snippets:'));
    switch (this.fileType) {
      case 'component':
        showImportComponentSnippet();
        break;

      case 'function':
        showImportComponentSnippet();
        break;
    }
    this.log('------------------------------------------------');
  }
};
