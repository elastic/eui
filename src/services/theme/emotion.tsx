/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ThemeProvider } from '@emotion/react';

import { useEuiTheme } from './hooks';

/**
 * @see https://emotion.sh/docs/theming
 */
export const EuiEmotionThemeProvider: FunctionComponent<
  PropsWithChildren<{}>
> = ({ children }) => {
  const euiThemeContext = useEuiTheme();
  return <ThemeProvider theme={euiThemeContext}>{children}</ThemeProvider>;
};
