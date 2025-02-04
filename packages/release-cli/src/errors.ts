/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export class ValidationError extends Error {
  public helpText: string | null = null;

  constructor(message: string, helpText?: string) {
    super(message);

    if (helpText !== undefined) {
      this.helpText = helpText;
    }
  }

  toString() {
    let finalHelpText = '';
    if (this.helpText) {
      finalHelpText += '\n\n';
      finalHelpText += this.helpText;
    }
    return `${this.message}${finalHelpText}`;
  }
}
