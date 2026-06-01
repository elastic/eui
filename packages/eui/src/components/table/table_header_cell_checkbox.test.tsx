/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

jest.mock('uuid', () => ({
  v4: jest.fn(() => {
    return jest.requireActual('uuid').v4();
  }),
}));

import React, { PropsWithChildren, ReactElement } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';

import { EuiTableHeaderCellCheckbox } from './table_header_cell_checkbox';
import {
  WARNING_MESSAGE_MAX_WIDTH,
  WARNING_MESSAGE_MIN_WIDTH,
  WARNING_MESSAGE_WIDTH,
  WARNING_MESSAGE_NOT_RECOMMENDED_UNIT,
} from './utils';
import type { EuiTableSharedWidthProps } from './types';
import { EuiTableStoreProvider } from './store/provider';
import {
  createEuiTableStore,
  EuiTableStore,
  EuiTableStoreColumnData,
} from './store/store';
import * as storeProviderModule from './store/provider';
import { EuiTableWithinStickyHeaderProvider } from './sticky_header/context';

const renderInTableHeader = (cell: React.ReactElement) => {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <EuiTableStoreProvider>
      <table>
        <thead>
          <tr>{children}</tr>
        </thead>
      </table>
    </EuiTableStoreProvider>
  );

  const result = render(<Wrapper>{cell}</Wrapper>);

  return {
    ...result,
    rerender: (cell: ReactElement) =>
      result.rerender(<Wrapper>{cell}</Wrapper>),
  };
};

describe('EuiTableHeaderCellCheckbox', () => {
  test('is rendered', () => {
    const { container } = renderInTableHeader(
      <EuiTableHeaderCellCheckbox {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('style and width props', () => {
    it('accepts `style` prop', () => {
      const { getByRole } = renderInTableHeader(
        <EuiTableHeaderCellCheckbox
          style={{ width: '200px', minWidth: '123px', maxWidth: '456px' }}
        >
          Test
        </EuiTableHeaderCellCheckbox>
      );

      expect(getByRole('columnheader')).toHaveStyle({
        width: '200px',
        minWidth: '123px',
        maxWidth: '456px',
      });
    });

    const testProp =
      (name: keyof EuiTableSharedWidthProps, warningMessage: string) => () => {
        const defaultStyles = {
          width: undefined,
          minWidth: undefined,
          maxWidth: undefined,
        };

        it(`accepts \`${name}\` prop`, () => {
          const { getByRole } = renderInTableHeader(
            <EuiTableHeaderCellCheckbox style={{ [name]: '100px' }}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(getByRole('columnheader')).toHaveStyle({
            ...defaultStyles,
            [name]: '100px',
          });
        });

        it(`accepts \`${name}\` prop as number`, () => {
          const props = {
            [name]: 100,
          };

          const { getByRole } = renderInTableHeader(
            <EuiTableHeaderCellCheckbox {...props}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(getByRole('columnheader')).toHaveStyle({
            ...defaultStyles,
            [name]: '100px',
          });
        });

        it(`resolves \`style.${name}\` and \`${name}\` props`, () => {
          const originalConsoleWarn = console.warn;
          console.warn = jest.fn();

          const props = {
            [name]: '100px',
            style: {
              [name]: '200px',
            },
          };

          const { getByRole } = renderInTableHeader(
            <EuiTableHeaderCellCheckbox {...props}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(getByRole('columnheader')).toHaveStyle({
            ...defaultStyles,
            [name]: '100px',
          });

          expect(console.warn).toHaveBeenCalledWith(warningMessage);

          console.warn = originalConsoleWarn;
        });

        it('warns when a not recommended unit is used', () => {
          const originalConsoleWarn = console.warn;
          console.warn = jest.fn();

          renderInTableHeader(
            <EuiTableHeaderCellCheckbox {...{ [name]: '20%' }}>
              Test
            </EuiTableHeaderCellCheckbox>
          );

          expect(console.warn).toHaveBeenCalledWith(
            WARNING_MESSAGE_NOT_RECOMMENDED_UNIT
          );

          console.warn = originalConsoleWarn;
        });
      };

    describe('width', testProp('width', WARNING_MESSAGE_WIDTH));

    describe('minWidth', testProp('minWidth', WARNING_MESSAGE_MIN_WIDTH));

    describe('maxWidth', testProp('maxWidth', WARNING_MESSAGE_MAX_WIDTH));
  });

  describe('store integration', () => {
    let useEuiTableColumnDataStoreMock: jest.SpyInstance<EuiTableStore>;

    beforeEach(() => {
      useEuiTableColumnDataStoreMock = jest.spyOn(
        storeProviderModule,
        'useEuiTableColumnDataStore'
      );
    });

    it('registers column in the store on mount', () => {
      (uuidv4 as jest.MockedFunction<() => string>).mockReturnValue(
        'unique-id'
      );

      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      const registerColumn = jest.spyOn(testStore, 'registerColumn');

      renderInTableHeader(
        <EuiTableHeaderCellCheckbox>Test</EuiTableHeaderCellCheckbox>
      );

      expect(registerColumn).toHaveBeenCalledWith(
        'unique-id',
        expect.objectContaining<EuiTableStoreColumnData>({
          renderHeaderCellRef: expect.objectContaining({
            current: expect.any(Function),
          }),
        })
      );
    });

    it('unregisters column on unmount', () => {
      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      const registerColumn = jest.spyOn(testStore, 'registerColumn');

      const { unmount } = renderInTableHeader(
        <EuiTableHeaderCellCheckbox>Test</EuiTableHeaderCellCheckbox>
      );

      expect(registerColumn).toHaveBeenCalledTimes(1);

      const id = registerColumn.mock.lastCall![0];

      expect(testStore.getColumns().size).toBe(1);
      expect(testStore.getColumns().has(id)).toBe(true);

      unmount();

      // Rather than testing whether the unregister function returned by
      // registerColumn() was called, which is tricky to mock, we just assert
      // on the store
      expect(testStore.getColumns().size).toBe(0);
      expect(testStore.getColumns().has(id)).toBe(false);
    });

    it('does not register or update widths when within sticky header', () => {
      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      const registerColumn = jest.spyOn(testStore, 'registerColumn');
      const updateColumnWidth = jest.spyOn(testStore, 'updateColumnWidth');

      render(
        <EuiTableStoreProvider>
          <EuiTableWithinStickyHeaderProvider>
            <table>
              <thead>
                <tr>
                  <EuiTableHeaderCellCheckbox>Test</EuiTableHeaderCellCheckbox>
                </tr>
              </thead>
            </table>
          </EuiTableWithinStickyHeaderProvider>
        </EuiTableStoreProvider>
      );

      expect(registerColumn).not.toHaveBeenCalled();
      expect(updateColumnWidth).not.toHaveBeenCalled();
    });

    it('updates column on every render', () => {
      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      const registerColumn = jest.spyOn(testStore, 'registerColumn');
      const updateColumn = jest.spyOn(testStore, 'updateColumn');

      const { rerender } = renderInTableHeader(
        <EuiTableHeaderCellCheckbox>Test</EuiTableHeaderCellCheckbox>
      );

      const id = registerColumn.mock.lastCall![0];

      expect(updateColumn).toHaveBeenCalledWith(
        id,
        expect.objectContaining<EuiTableStoreColumnData>({
          renderHeaderCellRef: expect.objectContaining({
            current: expect.any(Function),
          }),
        })
      );

      const { renderHeaderCellRef } = updateColumn.mock.lastCall![1];

      updateColumn.mockClear();

      rerender(<EuiTableHeaderCellCheckbox>Test</EuiTableHeaderCellCheckbox>);

      expect(updateColumn).toHaveBeenCalledWith(
        id,
        expect.objectContaining<EuiTableStoreColumnData>({
          renderHeaderCellRef,
        })
      );
    });
  });
});
