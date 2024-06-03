/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, PropsWithChildren } from 'react';
import { renderHook } from '../../../test/rtl';

import {
  EuiComponentDefaultsProvider,
  useComponentDefaults,
  usePropsWithComponentDefaults,
} from './component_defaults';

describe('EuiComponentDefaultsProvider', () => {
  describe('useComponentDefaults', () => {
    it('allows accessing provided `componentDefaults` from anywhere', () => {
      const wrapper: FunctionComponent<PropsWithChildren> = ({ children }) => (
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

      expect(result.current).toEqual({
        EuiPortal: {
          insert: {
            position: 'before',
            sibling: expect.any(HTMLDivElement),
          },
        },
      });
    });
  });

  describe('usePropsWithComponentDefaults', () => {
    const wrapper = ({ children }: PropsWithChildren<{}>) => (
      <EuiComponentDefaultsProvider
        componentDefaults={{
          EuiTablePagination: {
            itemsPerPage: 20,
            itemsPerPageOptions: [20, 40, 80, 0],
          },
        }}
      >
        {children}
      </EuiComponentDefaultsProvider>
    );

    it("returns a specific component's provided default props", () => {
      const { result } = renderHook(
        () => usePropsWithComponentDefaults('EuiTablePagination', {}),
        { wrapper }
      );

      expect(result.current).toEqual({
        itemsPerPage: 20,
        itemsPerPageOptions: [20, 40, 80, 0],
      });
    });

    it('correctly overrides defaults with actual props passed', () => {
      const { result } = renderHook(
        () =>
          usePropsWithComponentDefaults('EuiTablePagination', {
            itemsPerPageOptions: [5, 10, 20],
          }),
        { wrapper }
      );

      expect(result.current).toEqual({
        itemsPerPage: 20,
        itemsPerPageOptions: [5, 10, 20],
      });
    });

    it('correctly handles props without a default defined', () => {
      const { result } = renderHook(
        () =>
          usePropsWithComponentDefaults('EuiTablePagination', {
            showPerPageOptions: false,
          }),
        { wrapper }
      );

      expect(result.current).toEqual({
        itemsPerPage: 20,
        itemsPerPageOptions: [20, 40, 80, 0],
        showPerPageOptions: false,
      });
    });

    it('correctly handles components with no defaults defined', () => {
      const { result } = renderHook(
        () =>
          usePropsWithComponentDefaults('EuiFocusTrap', {
            children: 'test',
            crossFrame: true,
          }),
        { wrapper }
      );

      expect(result.current).toEqual({
        children: 'test',
        crossFrame: true,
      });
    });

    it('correctly handles no component defaults defined at all', () => {
      const wrapper = ({ children }: PropsWithChildren<{}>) => (
        <EuiComponentDefaultsProvider>{children}</EuiComponentDefaultsProvider>
      );
      const { result } = renderHook(
        () =>
          usePropsWithComponentDefaults('EuiFocusTrap', {
            children: 'test',
            gapMode: 'margin',
          }),
        { wrapper }
      );

      expect(result.current).toEqual({
        children: 'test',
        gapMode: 'margin',
      });
    });
  });

  // NOTE: Components are in charge of their own testing to ensure that the props
  // coming from the `componentDefaults` configuration were properly applied.
  // Examples:
  // @see src/components/portal/portal.spec.tsx
  // @see src/components/table/table_pagination/table_pagination.test.tsx
});
