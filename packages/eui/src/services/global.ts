/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { AMSTERDAM_NAME_KEY } from '../themes/amsterdam/constants';

export class EuiGlobal {
  private static _instance: EuiGlobal;

  private static _theme: string = AMSTERDAM_NAME_KEY;

  constructor() {
    if (EuiGlobal._instance) {
      throw new Error('Error - use EuiGlobal.getInstance()');
    }

    EuiGlobal._instance = this;
  }

  static getInstance() {
    return EuiGlobal._instance ?? new EuiGlobal();
  }

  set theme(theme: string) {
    EuiGlobal._theme = theme;
  }

  get theme() {
    return EuiGlobal._theme;
  }
}
