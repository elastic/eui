/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiGlobal } from '../services/global';
import { AMSTERDAM_NAME_KEY } from './amsterdam/constants';
import { NEW_THEME_KEY } from './new_theme/constants';

export const isDefaultTheme = (name: string) => {
  return name === AMSTERDAM_NAME_KEY;
};

const euiGlobal = EuiGlobal.getInstance();

export const isNewTheme = () => {
  return euiGlobal.theme === NEW_THEME_KEY;
};
