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
  useComponentDefaults,
} from './component_defaults';

describe('EuiComponentDefaultsProvider', () => {
  describe('useComponentDefaults', () => {
    it('allows accessing provided `componentDefaults` from anywhere', () => {
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
      const { result } = renderHook(useComponentDefaults, { wrapper });

      expect(result.current).toMatchInlineSnapshot(`
        Object {
          "EuiPortal": Object {
            "insert": Object {
              "position": "before",
              "sibling": <div />,
            },
          },
        }
      `);
    });
  });

  // NOTE: Components are in charge of their own testing to ensure that the props
  // coming from the `componentDefaults` configuration were properly applied.
  // Examples:
  // @see src/components/portal/portal.spec.tsx
  // @see src/components/table/table_pagination/table_pagination.test.tsx
});
