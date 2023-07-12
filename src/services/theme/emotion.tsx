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
 * This Emotion theme provider is added for *consumer usage* & convenience only.
 *
 * EUI should stick to using our own context/`useEuiTheme` internally
 * instead of Emotion's shorthand `css={theme => {}}` API. If consumers
 * set their own theme via <ThemeProvider>; EUI's styles should continue
 * working as-is.
 */
export const EuiEmotionThemeProvider: FunctionComponent<
  PropsWithChildren<{}>
> = ({ children }) => {
  const euiThemeContext = useEuiTheme();
  return <ThemeProvider theme={euiThemeContext}>{children}</ThemeProvider>;
};
