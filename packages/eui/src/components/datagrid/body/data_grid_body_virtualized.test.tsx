/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../test/rtl';

import { dataGridBodyProps } from './data_grid_body.test';

import { EuiDataGridBodyVirtualized } from './data_grid_body_virtualized';

describe('EuiDataGridBodyVirtualized', () => {
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
      configurable: true,
      value: 34,
    });
  });

  it('renders', () => {
    // EuiDataGridBody should be `render`ed here over `mount` due to large
    // snapshot memory issues
    const { container, getAllByTestSubject } = render(
      <EuiDataGridBodyVirtualized {...dataGridBodyProps} />
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(getAllByTestSubject('dataGridRowCell')).toHaveLength(2);
  });

  it('renders leading columns, trailing columns, and footer rows', () => {
    const { container, getAllByTestSubject } = render(
      <EuiDataGridBodyVirtualized
        {...dataGridBodyProps}
        leadingControlColumns={[
          {
            id: 'someLeadingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 30,
          },
        ]}
        trailingControlColumns={[
          {
            id: 'someTrailingColumn',
            headerCellRender: () => <div />,
            rowCellRender: () => <div />,
            width: 40,
          },
        ]}
        visibleColCount={4}
        renderFooterCellValue={() => <footer data-test-subj="footer" />}
      />
    );
    expect(
      container.querySelectorAll(
        '.euiDataGridRowCell:not(.euiDataGridFooterCell)'
      )
    ).toHaveLength(4);
    expect(getAllByTestSubject('footer')).toHaveLength(2);
  });

  it('passes some virtualization options to the underlying react-window grid', () => {
    const onItemsRendered = jest.fn();
    const { container } = render(
      <EuiDataGridBodyVirtualized
        {...dataGridBodyProps}
        virtualizationOptions={{
          initialScrollTop: 50,
          className: 'test',
          onItemsRendered,
        }}
      />
    );
    expect(container.querySelector('.test')).toBeInTheDocument();
    expect(onItemsRendered).toHaveBeenCalled();
  });

  describe('scrolling', () => {
    it('passes correct scroll position data to virtualizationOptions.onScroll', () => {
      Object.defineProperty(Element.prototype, 'scrollHeight', {
        configurable: true,
        value: 200,
      });

      Object.defineProperty(Element.prototype, 'clientHeight', {
        configurable: true,
        value: 100,
      });

      Object.defineProperty(Element.prototype, 'scrollTop', {
        configurable: true,
        value: 100,
      });

      const onScroll = jest.fn();

      const { container } = render(
        <EuiDataGridBodyVirtualized
          {...dataGridBodyProps}
          virtualizationOptions={{
            onScroll,
          }}
        />
      );

      fireEvent.scroll(container, { target: { scrollY: 50 } });

      expect(onScroll).toHaveBeenCalled();
      expect(onScroll).toHaveBeenCalledWith({
        scrollUpdateWasRequested: false,
        horizontalScrollDirection: 'forward',
        verticalScrollDirection: 'forward',
        scrollLeft: 0,
        scrollTop: 100,
        scrollHeight: 200,
        scrollWidth: 0,
        clientHeight: 100,
        clientWidth: 0,
        isScrolledToBlockStart: false,
        isScrolledToBlockEnd: true,
        isScrolledToInlineStart: true,
        isScrolledToInlineEnd: false,
      });
    });

    describe('pointer events', () => {
      beforeEach(() => {
        Object.defineProperty(Element.prototype, 'scrollHeight', {
          configurable: true,
          value: 200,
        });
        Object.defineProperty(Element.prototype, 'clientHeight', {
          configurable: true,
          value: 100,
        });
      });

      const setScrollTop = (value: number) =>
        Object.defineProperty(Element.prototype, 'scrollTop', {
          configurable: true,
          value,
        });

      const renderGrid = () => {
        const { container } = render(
          <EuiDataGridBodyVirtualized {...dataGridBodyProps} />
        );
        const outer = container.querySelector<HTMLElement>(
          '.euiDataGrid__virtualized'
        )!;
        return { outer, inner: outer.firstElementChild as HTMLElement };
      };

      it('does not disable pointer events on the inner element while scrolling', () => {
        const { outer, inner } = renderGrid();

        setScrollTop(50);
        fireEvent.scroll(outer);

        expect(inner.style.pointerEvents).not.toBe('none');
      });

      // https://github.com/elastic/eui/issues/10083
      it('does not disable pointer events for a scroll event that does not move the grid, with `scrollTop` rounded above the maximum', async () => {
        const { outer, inner } = renderGrid();

        // Firefox at a devicePixelRatio of 1.25 can report a `scrollTop` above
        // `scrollHeight - clientHeight` (100) when scrolled to the very bottom
        setScrollTop(100.4);
        fireEvent.scroll(outer);
        await waitFor(() => expect(inner.style.pointerEvents).not.toBe('none'));

        act(() => {
          fireEvent.scroll(outer);
        });

        expect(inner.style.pointerEvents).not.toBe('none');
      });
    });
  });

  // TODO: Test final height/widths
});
