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

  it('does not override existing EUI defaults if a consumer does not configure the component', () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <EuiComponentDefaultsProvider
        componentDefaults={{ EuiFocusTrap: { gapMode: 'margin' } }}
      >
        {children}
      </EuiComponentDefaultsProvider>
    );
    const { result } = renderHook(useEuiComponentDefaults, { wrapper });

    // Should not override other existing EUI component defaults
    expect(result.current.EuiTablePagination).toEqual(
      EUI_COMPONENT_DEFAULTS.EuiTablePagination
    );
    // Should set/override the passed defaults
    expect(result.current.EuiFocusTrap).toEqual({ gapMode: 'margin' });
  });

  it('does not override all other existing EUI default props if a consumer only configures a subset of the component props', () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <EuiComponentDefaultsProvider
        componentDefaults={{
          // Note: This prop is specifically chosen as an array / as a regression test
          // against recursive object/array merging.  We should only be merging 2 levels
          // deep into each component, otherwise the consumer `itemsPerPageOptions` will
          // incorrectly merge into EUI's array instead of overriding
          EuiTablePagination: { itemsPerPageOptions: [0, 10] },
        }}
      >
        {children}
      </EuiComponentDefaultsProvider>
    );
    const { result } = renderHook(useEuiComponentDefaults, { wrapper });

    expect(result.current.EuiTablePagination).toEqual({
      ...EUI_COMPONENT_DEFAULTS.EuiTablePagination,
      itemsPerPageOptions: [0, 10],
    });
  });

  // NOTE: Components are in charge of their own testing to ensure that the props
  // coming from `useEuiComponentDefaults()` were properly applied.
  // @see `src/components/portal/portal.spec.tsx` as an example
});
