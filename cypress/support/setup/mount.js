/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { mount as cypressMount } from '@cypress/react';
import { React, Fragment } from 'react';
import { EuiProvider } from '../../../src';

Cypress.Commands.add('mount', (children) => {
  return cypressMount(<EuiProvider>{children}</EuiProvider>);
});
