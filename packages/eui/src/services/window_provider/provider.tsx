/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { EuiWindowContext } from './context';
import createEmotion from '@emotion/css/create-instance';

export interface EuiWindowProviderProps {
  window: Window;
  children: ReactNode;
}

export function EuiWindowProvider({
  window,
  children,
}: EuiWindowProviderProps) {
  const { css, cx } = createEmotion({
    key: 'eui-child-window',
    container: window.document.head,
  });

  return (
    <EuiWindowContext.Provider value={{ window, css, cx }}>
      {children}
    </EuiWindowContext.Provider>
  );
}
