/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ReactNode } from 'react';
import { render, renderHook } from '../../../../test/rtl';

import { useColumnSorting } from './column_sorting';

describe('useColumnSorting', () => {
  const onSort = () => {};
  const columnId = 'test';
  const mockSortingArgs = {
    sorting: undefined,
    id: columnId,
    hasColumnActions: true,
  };

  const getRender = (node: ReactNode) => render(<>{node}</>).container;

  describe('if the current column is being sorted', () => {
    it('renders an ascending sort arrow', () => {
      const { sortingArrow } = renderHook(() =>
        useColumnSorting({
          ...mockSortingArgs,
          sorting: {
            onSort,
            columns: [{ id: columnId, direction: 'asc' }],
          },
        })
      ).result.current;

      expect(
        getRender(sortingArrow).querySelector('[data-euiicon-type="sortUp"]')
      ).toBeInTheDocument();
    });

    it('renders a descending sort arrow', () => {
      const { sortingArrow } = renderHook(() =>
        useColumnSorting({
          ...mockSortingArgs,
          sorting: {
            onSort,
            columns: [{ id: columnId, direction: 'desc' }],
          },
        })
      ).result.current;

      expect(
        getRender(sortingArrow).querySelector('[data-euiicon-type="sortDown"]')
      ).toBeInTheDocument();
    });

    describe('when only the current column is being sorted', () => {
      it('renders aria-sort but not sortingScreenReaderText', () => {
        const { ariaSort, sortingScreenReaderText } = renderHook(() =>
          useColumnSorting({
            ...mockSortingArgs,
            sorting: {
              onSort,
              columns: [{ id: columnId, direction: 'asc' }],
            },
          })
        ).result.current;

        expect(ariaSort).toEqual('ascending');
        expect(getRender(sortingScreenReaderText)).toHaveTextContent('');
      });
    });
  });

  describe('if the current column is not being sorted', () => {
    it('does not render an arrow even if other columns are sorted', () => {
      const { sortingArrow } = renderHook(() =>
        useColumnSorting({
          ...mockSortingArgs,
          sorting: { onSort, columns: [{ id: 'other', direction: 'desc' }] },
        })
      ).result.current;

      expect(sortingArrow).toBeNull();
    });

    it('does not render aria-sort or screen reader sorting text', () => {
      const { ariaSort, sortingScreenReaderText } = renderHook(() =>
        useColumnSorting(mockSortingArgs)
      ).result.current;

      expect(ariaSort).toEqual(undefined);
      expect(getRender(sortingScreenReaderText)).toHaveTextContent('');
    });
  });

  describe('when multiple columns are being sorted', () => {
    it('does not render aria-sort, but renders sorting screen reader text text with a full list of sorted columns', () => {
      const { result, rerender } = renderHook(useColumnSorting, {
        initialProps: {
          ...mockSortingArgs,
          id: 'A',
          sorting: {
            onSort,
            columns: [
              { id: 'A', direction: 'asc' },
              { id: 'B', direction: 'desc' },
            ],
          },
        },
      });

      expect(result.current.ariaSort).toEqual(undefined);
      expect(
        getRender(result.current.sortingScreenReaderText)
      ).toHaveTextContent(
        'Sorted by A, ascending, then sorted by B, descending.'
      );

      // Branch coverage
      rerender({
        ...mockSortingArgs,
        id: 'B',
        sorting: {
          onSort,
          columns: [
            { id: 'B', direction: 'desc' },
            { id: 'C', direction: 'asc' },
            { id: 'A', direction: 'asc' },
          ],
        },
      });
      expect(
        getRender(result.current.sortingScreenReaderText)
      ).toHaveTextContent(
        'Sorted by B, descending, then sorted by C, ascending, then sorted by A, ascending.'
      );
    });
  });
});
