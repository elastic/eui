/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import chalk from 'chalk';

export class Logger {
  private readonly PREFIX_DEBUG = chalk.gray('[debug]');
  private readonly PREFIX_INFO = chalk.white('[info]');
  private readonly PREFIX_WARNING = chalk.yellow('[warning]');
  private readonly PREFIX_ERROR = chalk.red('[error]');

  constructor(private readonly verbose: boolean) {}

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
