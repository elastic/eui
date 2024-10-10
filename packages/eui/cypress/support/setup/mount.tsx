/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { EuiProvider, EuiProviderProps } from '../../../src';
import type { mount } from '@cypress/react18';

// Pick cypress mount function based on which React version is currently being
// tested. It has to be directly compared against process.env.REACT_VERSION
// for tree-shaking to work and not throw an error because of a missing import.
let cypressMount: typeof mount;
if (process.env.REACT_VERSION === '18') {
  cypressMount = require('@cypress/react18').mount;
} else {
  cypressMount = require('@cypress/react').mount;
}

export interface MountOptions {
  providerProps?: Partial<EuiProviderProps<any>>;
}

const mountCommand = (
  children: ReactNode,
  options: MountOptions = {}
): ReturnType<typeof mount> => {
  const { providerProps } = options;
  return cypressMount(
    <EuiProvider colorMode="LIGHT" {...providerProps}>
      {children}
    </EuiProvider>
  );
};

// Export only the type to not confuse code-completion tools
export type mountCommand = typeof mountCommand;

Cypress.Commands.add('mount', mountCommand);
