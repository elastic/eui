/**
 * @jest-environment node
 */
/* eslint-disable local/require-license-header */
/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderToString } from 'react-dom/server';

import { EuiPortal } from './portal';

describe('EuiPortal', () => {
  it('renders server-side without crashing and as empty', () => {
    const renderOnServer = () => renderToString(<EuiPortal>test</EuiPortal>);
    expect(renderOnServer).not.toThrow();
    expect(renderOnServer()).toEqual('');
  });
});
