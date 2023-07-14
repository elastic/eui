/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { PropsWithChildren } from 'react';
import { renderHook } from '@testing-library/react-hooks';

import {
  EuiComponentDefaultsProvider,
  useEuiComponentDefaults,
  EUI_COMPONENT_DEFAULTS,
} from './component_defaults';

describe('EuiComponentDefaultsProvider', () => {
  it('returns baseline EUI defaults if no consumer configurations are passed', () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <EuiComponentDefaultsProvider componentDefaults={undefined}>
        {children}
      </EuiComponentDefaultsProvider>
    );
    const { result } = renderHook(useEuiComponentDefaults, { wrapper });

    expect(result.current).toEqual(EUI_COMPONENT_DEFAULTS);
  });

  it('overrides undefined EUI defaults with consumer defaults', () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <EuiComponentDefaultsProvider
        componentDefaults={{
          EuiPortal: {
            insert: {
              sibling: document.createElement('div'),
              position: 'before',
            },
          },
        }}
      >
        {children}
      </EuiComponentDefaultsProvider>
    );
    const { result } = renderHook(useEuiComponentDefaults, { wrapper });

    expect(result.current.EuiPortal).toMatchInlineSnapshot(`
      Object {
        "insert": Object {
          "position": "before",
          "sibling": <div />,
        },
      }
    `);
  });

  // NOTE: Components are in charge of their own testing to ensure that the props
  // coming from `useEuiComponentDefaults()` were properly applied. This file
  // is simply a very light wrapper that carries prop data.
  // @see `src/components/portal/portal.spec.tsx` as an example
});
