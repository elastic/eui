/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chalk from 'chalk';

class BaseLogger {
  protected readonly PREFIX_DEBUG = chalk.gray('[debug]');
  protected readonly PREFIX_INFO = chalk.white('[info]');
  protected readonly PREFIX_WARNING = chalk.yellow('[warning]');
  protected readonly PREFIX_ERROR = chalk.red('[error]');

  constructor(protected readonly verbose: boolean) {}

  debug(message: any, ...args: any) {
    if (!this.verbose) {
      return;
    }
    console.debug(this.PREFIX_DEBUG, message, ...args);
  }

  info(message: any, ...args: any) {
    console.info(this.PREFIX_INFO, message, ...args);
  }

  warning(message: any, ...args: any) {
    console.warn(this.PREFIX_WARNING, message, ...args);
  }

  error(message: any, ...args: any) {
    console.error(this.PREFIX_ERROR, message, ...args);
  }
}

class GHActionsLogger extends BaseLogger {
  protected readonly PREFIX_DEBUG = '::debug::';
  protected readonly PREFIX_INFO = '';
  protected readonly PREFIX_WARNING = '::warning::';
  protected readonly PREFIX_ERROR = '::error::';
}

export const createLogger = (verbose: boolean) => {
  // https://docs.github.com/en/actions/reference/workflows-and-actions/variables
  if (process.env.GITHUB_ACTIONS === 'true') {
    return new GHActionsLogger(verbose);
  }

  return new BaseLogger(verbose);
};

export type Logger = BaseLogger;
