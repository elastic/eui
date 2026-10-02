/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef } from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../test/rtl';

import { dataGridBodyProps } from './data_grid_body.test';

import { EuiDataGridBodyProps } from '../data_grid_types';
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
    const originalDescriptors = (
      ['scrollTop', 'scrollHeight', 'clientHeight'] as const
    ).map(
      (name) =>
        [
          name,
          Object.getOwnPropertyDescriptor(Element.prototype, name)!,
        ] as const
    );

    afterEach(() => {
      originalDescriptors.forEach(([name, descriptor]) =>
        Object.defineProperty(Element.prototype, name, descriptor)
      );
    });

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

      const renderGrid = (
        virtualizationOptions?: EuiDataGridBodyProps['virtualizationOptions'],
        gridRef: EuiDataGridBodyProps['gridRef'] = dataGridBodyProps.gridRef
      ) => {
        const { container } = render(
          <EuiDataGridBodyVirtualized
            {...dataGridBodyProps}
            gridRef={gridRef}
            virtualizationOptions={virtualizationOptions}
          />
        );
        const outer = container.querySelector<HTMLElement>(
          '.euiDataGrid__virtualized'
        )!;
        return { outer, inner: outer.firstElementChild as HTMLElement };
      };

      it('disables pointer events on the inner element while scrolling', () => {
        const { outer, inner } = renderGrid();

        setScrollTop(50);
        fireEvent.scroll(outer);

        expect(inner.style.pointerEvents).toBe('none');
      });

      it('does not disable pointer events for a scroll event that does not move the grid, with `scrollTop` rounded above the maximum', async () => {
        const { outer, inner } = renderGrid();

        // Firefox at a devicePixelRatio of 1.25 can report a `scrollTop` above
        // `scrollHeight - clientHeight` (100) when scrolled to the very bottom. This test
        // ensures that pointer events are not disabled in the case of this false positive.
        setScrollTop(100.4);
        fireEvent.scroll(outer);
        await waitFor(() => expect(inner.style.pointerEvents).not.toBe('none'));

        act(() => {
          fireEvent.scroll(outer);
        });

        expect(inner.style.pointerEvents).not.toBe('none');
      });

      it('passes on a scroll back to the previous position that arrives before the grid re-renders', () => {
        const onScroll = jest.fn();
        const { outer } = renderGrid({ onScroll });

        // Both events are handled before React re-renders the grid
        act(() => {
          setScrollTop(50);
          fireEvent.scroll(outer);
          setScrollTop(0);
          fireEvent.scroll(outer);
        });

        // The callback's `scrollTop` is read from the DOM mock, so it stays 0
        // even when the second event was dropped. Direction does not: mount
        // reports `forward`, and `backward` means the reversal was applied.
        expect(onScroll).toHaveBeenLastCalledWith(
          expect.objectContaining({
            verticalScrollDirection: 'backward',
          })
        );
      });

      it('renders `virtualizationOptions.outerElementType` as the scroll container', () => {
        const CustomOuter = forwardRef<
          HTMLDivElement,
          React.ComponentPropsWithoutRef<'div'>
        >((props, ref) => (
          <div data-test-subj="customOuter" ref={ref} {...props} />
        ));
        CustomOuter.displayName = 'CustomOuter';
        const { outer, inner } = renderGrid({ outerElementType: CustomOuter });

        expect(outer).toHaveAttribute('data-test-subj', 'customOuter');

        setScrollTop(50);
        fireEvent.scroll(outer);

        expect(inner.style.pointerEvents).toBe('none');
      });

      it('does not treat a clamped scroll as movement after scrollTo past the end', async () => {
        let scrollTop = 0;
        const maxScrollTop = 100;
        Object.defineProperty(Element.prototype, 'scrollTop', {
          configurable: true,
          get: () => scrollTop,
          set: (value: number) => {
            scrollTop = Math.max(0, Math.min(value, maxScrollTop));
          },
        });

        const gridRef: EuiDataGridBodyProps['gridRef'] = { current: null };
        const { outer, inner } = renderGrid(undefined, gridRef);

        // Land on the real end so the ref holds the clamped position.
        scrollTop = maxScrollTop;
        fireEvent.scroll(outer);
        await waitFor(() => expect(inner.style.pointerEvents).not.toBe('none'));

        act(() => {
          gridRef.current!.scrollTo({ scrollTop: 5000 });
        });

        // Firefox can then report a value above the maximum. The setter
        // clamps programmatic writes, so the overshoot is applied directly.
        scrollTop = 100.4;
        act(() => {
          fireEvent.scroll(outer);
        });

        expect(inner.style.pointerEvents).not.toBe('none');
      });
    });
  });

  // TODO: Test final height/widths
});
