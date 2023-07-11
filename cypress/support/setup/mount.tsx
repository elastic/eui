/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { mount as cypressMount } from 'cypress/react';
import { EuiProvider } from '../../../src';

const mountCommand = (children: ReactNode): ReturnType<typeof cypressMount> => {
  return cypressMount(<EuiProvider>{children}</EuiProvider>);
};

// Export only the type to not confuse code-completion tools
export type mountCommand = typeof mountCommand;

Cypress.Commands.add('mount', mountCommand);
