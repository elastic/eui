/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const chalk = require('chalk');
const Generator = require('yeoman-generator');

const CHANGELOG_DIRECTORY = 'changelogs/upcoming';

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    // This makes the pull request ID a required argument, e.g. `yarn yo-changelog 5555`
    this.argument('pullRequestId', { required: true });

    this.fileName = `${CHANGELOG_DIRECTORY}/${this.options.pullRequestId}.md`;
  }

  prompting() {
    const prompts = [
      {
        message: 'Does your PR contain features or enhancements?',
        name: 'features',
        type: 'confirm',
        default: false,
      },
      {
        message: 'Does your PR contain bug fixes?',
        name: 'bugFixes',
        type: 'confirm',
        default: false,
      },
      {
        message: 'Does your PR contain accessibility improvements?',
        name: 'a11y',
        type: 'confirm',
        default: false,
      },
      {
        message: 'Does your PR contain deprecations?',
        name: 'deprecations',
        type: 'confirm',
        default: false,
      },
      {
        message: 'Does your PR contain breaking changes?',
        name: 'breakingChanges',
        type: 'confirm',
        default: false,
      },
      {
        message: 'Does your PR contain dependency updates?',
        name: 'dependencyUpdates',
        type: 'confirm',
        default: false,
      },
    ];

    return this.prompt(prompts).then((answers) => {
      this.config = answers;
    });
  }

  writing() {
    const vars = this.config;

    this.fs.copyTpl(
      this.templatePath('changelog.md'),
      this.destinationPath(this.fileName),
      vars
    );
  }

  end() {
    this.log('------------------------------------------------');
    this.log(chalk.bold(`${this.fileName} created`));
    this.log('------------------------------------------------');
  }
};
