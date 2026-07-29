/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { createContext } from 'react';

import { _EuiButtonColor } from '../../global_styling/mixins';

/**
 * Cascades button props from a parent component (e.g. EuiButtonGroup) down
 * to button children.
 *
 * When set, context values take precedence over the same prop passed directly,
 * except for `isDisabled`/`hasAriaDisabled` which should only ever be populated
 * with `true` (never `false`). Otherwise the parent would enable manually
 * disabled children.
 */
export const EuiButtonContext = createContext<{
  color?: _EuiButtonColor;
  size?: 's' | 'm';
  isDisabled?: true;
  hasAriaDisabled?: true;
  fullWidth?: boolean;
}>({});
