const Generator = require('yeoman-generator');

const documentationGenerator = require.resolve('../documentation/index.js');

module.exports = class extends Generator {
  prompting() {
    return this.prompt([{
      message: 'What do you want to do?',
      name: 'fileType',
      type: 'list',
      choices: [{
        name: 'Create a new component documention page',
        value: 'documentation',
      }, {
        name: 'Add an example to an existing component documentation page',
        value: 'demo',
      }],
    }]).then(answers => {
      this.config = answers;
    });
  }

  writing() {
    this.composeWith(documentationGenerator, {
      fileType: this.config.fileType,
    });
  }
}
