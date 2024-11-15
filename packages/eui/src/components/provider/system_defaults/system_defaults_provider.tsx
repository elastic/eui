/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { EuiColorModeContext } from '../../../services';

import { useWindowMediaMatcher } from './match_media_hook';

export const EuiSystemDefaultsProvider: FunctionComponent<
  PropsWithChildren
> = ({ children }) => {
  // @see https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  const systemColorMode = useWindowMediaMatcher('(prefers-color-scheme: dark)')
    ? 'DARK'
    : 'LIGHT';

  return (
    <EuiColorModeContext.Provider value={systemColorMode}>
      {children}
    </EuiColorModeContext.Provider>
  );
};
