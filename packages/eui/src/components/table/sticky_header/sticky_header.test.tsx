/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useRef } from 'react';
import { fireEvent, act, screen } from '@testing-library/react';
import { render } from '../../../test/rtl';
import {
  createResizeObserverMock,
  createMockResizeObserverEntry,
} from '../../../test/internal';

import {
  EuiTableStickyHeader,
  EuiTableStickyHeaderProps,
} from './sticky_header';
import { EuiTableStoreProvider } from '../store/provider';
import { createEuiTableStore, EuiTableStore } from '../store/store';
import * as storeProviderModule from '../store/provider';

const createMockTableElement = (overrides?: {
  width?: number;
  clientWidth?: number;
}): HTMLTableElement => {
  const table = document.createElement('table');
  jest.spyOn(table, 'getBoundingClientRect').mockReturnValue({
    width: overrides?.width ?? 500,
    height: 200,
    top: 0,
    left: 0,
    bottom: 200,
    right: 500,
    x: 0,
    y: 0,
    toJSON: () => {},
  });
  Object.defineProperty(table, 'clientWidth', {
    configurable: true,
    value: overrides?.clientWidth ?? overrides?.width ?? 500,
  });
  return table;
};

const createMockTableWrapper = (overrides?: {
  scrollLeft?: number;
}): HTMLDivElement => {
  const div = document.createElement('div');
  Object.defineProperty(div, 'scrollLeft', {
    configurable: true,
    writable: true,
    value: overrides?.scrollLeft ?? 0,
  });
  return div;
};

describe('EuiTableStickyHeader', () => {
  let resizeObserverMock: ReturnType<typeof createResizeObserverMock>;
  let useEuiTableColumnDataStoreMock: jest.SpyInstance<EuiTableStore>;

  beforeEach(() => {
    resizeObserverMock = createResizeObserverMock();
    global.ResizeObserver = resizeObserverMock.ResizeObserver;

    useEuiTableColumnDataStoreMock = jest.spyOn(
      storeProviderModule,
      'useEuiTableColumnDataStore'
    );
  });

  const registerMockColumn = (
    store: ReturnType<typeof createEuiTableStore>,
    id: string,
    width?: number
  ) => {
    act(() => {
      store.registerColumn(id, {
        renderHeaderCellRef: {
          current: ({ ref, key }) => (
            <th key={key} ref={ref}>
              Column {id}
            </th>
          ),
        },
      });

      if (width !== undefined) {
        store.updateColumnWidth(id, width);
      }
    });
  };

  const renderComponent = ({
    compressed = false,
    scrollableInline = false,
    isResponsive = false,
    ...rest
  }: Partial<EuiTableStickyHeaderProps> = {}) => {
    const tableElement = createMockTableElement();
    const tableWrapperElement = createMockTableWrapper();

    const Component = () => {
      const tableRef = useRef<HTMLTableElement>(tableElement);
      const tableWrapperRef = useRef<HTMLDivElement>(tableWrapperElement);

      return (
        <EuiTableStickyHeader
          tableRef={tableRef}
          tableWrapperRef={tableWrapperRef}
          compressed={compressed}
          scrollableInline={scrollableInline}
          isResponsive={isResponsive}
          {...rest}
        />
      );
    };

    const renderResult = render(
      <EuiTableStoreProvider>
        <Component />
      </EuiTableStoreProvider>
    );

    return {
      ...renderResult,
      tableElement,
      tableWrapperElement,
    };
  };

  it('renders', () => {
    renderComponent();

    expect(screen.getByRole('table', { hidden: true })).toBeInTheDocument();
    expect(screen.getByRole('rowgroup', { hidden: true })).toBeInTheDocument();
  });

  it('returns null when `isResponsive = true`', () => {
    const { container } = renderComponent({ isResponsive: true });

    expect(container.firstChild).toBeNull();
  });

  describe('columns', () => {
    it('renders all columns registered in the store', () => {
      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      registerMockColumn(testStore, '1');
      registerMockColumn(testStore, '2');
      registerMockColumn(testStore, '3');

      renderComponent();

      const elements = screen.getAllByRole('columnheader', { hidden: true });
      expect(elements).toHaveLength(3);
      expect(elements[0]).toHaveTextContent('Column 1');
      expect(elements[1]).toHaveTextContent('Column 2');
      expect(elements[2]).toHaveTextContent('Column 3');
    });

    it('renders columns added dynamically to the store, in order', () => {
      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      registerMockColumn(testStore, '1');

      renderComponent();

      expect(
        screen.getAllByRole('columnheader', { hidden: true })
      ).toHaveLength(1);

      registerMockColumn(testStore, '2');

      const elements = screen.getAllByRole('columnheader', { hidden: true });
      expect(elements).toHaveLength(2);
      expect(elements[0]).toHaveTextContent('Column 1');
      expect(elements[1]).toHaveTextContent('Column 2');
    });

    it('applies column widths', () => {
      const testStore = createEuiTableStore();
      useEuiTableColumnDataStoreMock.mockReturnValue(testStore);

      registerMockColumn(testStore, '1', 150);

      renderComponent();

      expect(screen.getByRole('columnheader', { hidden: true })).toHaveStyle({
        width: '150px',
      });

      registerMockColumn(testStore, '2', 250);

      expect(
        screen.getAllByRole('columnheader', { hidden: true })[1]
      ).toHaveStyle({
        width: '250px',
      });
    });
  });

  describe('scroll synchronization', () => {
    it('syncs scroll position from table wrapper to sticky header', async () => {
      const { container, tableWrapperElement } = renderComponent({
        scrollableInline: true,
      });

      tableWrapperElement.scrollLeft = 100;
      fireEvent.scroll(tableWrapperElement);

      const tableWrapper = container.querySelector('table')!
        .parentElement as HTMLElement;
      expect(tableWrapper.scrollLeft).toBe(100);
    });

    it('syncs table width', async () => {
      const { tableElement } = renderComponent({
        scrollableInline: true,
      });

      Object.defineProperty(tableElement, 'clientWidth', {
        configurable: true,
        value: 800,
      });

      resizeObserverMock.triggerCallback([
        createMockResizeObserverEntry(tableElement),
      ]);

      expect(screen.getByRole('table', { hidden: true })).toHaveStyle({
        minWidth: '800px',
      });
    });

    it('sets initial width on mount', () => {
      renderComponent({
        scrollableInline: true,
      });

      expect(screen.getByRole('table', { hidden: true })).toHaveStyle({
        minWidth: '500px', // Value coming from the mock above
      });
    });

    it('cleans up event listeners and observers on unmount', () => {
      const { unmount, tableWrapperElement } = renderComponent({
        scrollableInline: true,
      });

      const removeEventListenerSpy = jest.spyOn(
        tableWrapperElement,
        'removeEventListener'
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function)
      );

      expect(
        resizeObserverMock.ResizeObserver.mock.results[0].value.disconnect
      ).toHaveBeenCalled();
    });
  });
});
