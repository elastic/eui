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
import { testOnReactVersion } from '../../test/internal/react_version';

jest.mock('../../services', () =>
  jest.requireActual('../../services/accessibility')
);
import { icon as EuiIconAddToDashboard } from './assets/add_to_dashboard';

const getIds = (markup: string) =>
  Array.from(markup.matchAll(/\sid="([^"]+)"/g), ([, id]) => id);

describe('generated icon IDs', () => {
  testOnReactVersion('18')(
    'generates deterministic IDs during server-side rendering',
    () => {
      const firstRenderIds = getIds(renderToString(<EuiIconAddToDashboard />));
      const secondRenderIds = getIds(renderToString(<EuiIconAddToDashboard />));

      expect(firstRenderIds).not.toHaveLength(0);
      expect(secondRenderIds).toEqual(firstRenderIds);
    }
  );

  it('generates unique IDs for multiple icon instances', () => {
    const ids = getIds(
      renderToString(
        <>
          <EuiIconAddToDashboard />
          <EuiIconAddToDashboard />
        </>
      )
    );

    expect(ids).toHaveLength(2);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
