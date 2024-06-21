/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Props } from '@theme/Root';
import { _EuiThemeFontScale, useEuiTheme } from '@elastic/eui';
import '@elastic/eui/dist/eui_theme_light.css';
import { FunctionComponent, PropsWithChildren } from 'react';

import { AppThemeProvider } from '../components/theme_context';

const _Root: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

// Wrap docusaurus root component with <EuiProvider>
// See https://docusaurus.io/docs/swizzling#wrapper-your-site-with-root
const Root = ({ children }: Props) => {
  return (
    <AppThemeProvider>
      <_Root>{children}</_Root>
    </AppThemeProvider>
  );
};

export default Root;
