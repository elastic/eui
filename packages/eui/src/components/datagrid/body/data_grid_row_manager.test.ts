/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useRowManager } from './data_grid_row_manager';
import { sleep } from '../../../test';
import { renderHook } from '../../../test/rtl';
import { EuiDataGridRowManager } from '../data_grid_types';

// 30ms is the delay used by the MutationObserver polyfill
const waitForMutationObserver = () => sleep(30);

describe('row manager', () => {
  const mockGridRef = { current: document.createElement('div') } as any;

  describe('getRow', () => {
    const rowManager = renderHook(() =>
      useRowManager({ innerGridRef: mockGridRef })
    ).result.current;

    describe('when the row DOM element does not already exist', () => {
      beforeAll(() => {
        expect(mockGridRef.current.children).toHaveLength(0);
      });

      it('creates a row DOM element', () => {
        const row = rowManager.getRow({
          rowIndex: 0,
          visibleRowIndex: 0,
          top: '15px',
          height: 30,
        });
        expect(row).toMatchInlineSnapshot(`
          <div
            class="euiDataGridRow"
            data-grid-row-index="0"
            data-grid-visible-row-index="0"
            role="row"
            style="position: absolute; left: 0px; right: 0px; top: 15px; height: 30px;"
          />
        `);
      });

      it('adds a striped class if the visible row index is odd', () => {
        const row = rowManager.getRow({
          rowIndex: 1,
          visibleRowIndex: 1,
          top: '15px',
          height: 30,
        });
        expect(row).toMatchInlineSnapshot(`
          <div
            class="euiDataGridRow euiDataGridRow--striped"
            data-grid-row-index="1"
            data-grid-visible-row-index="1"
            role="row"
            style="position: absolute; left: 0px; right: 0px; top: 15px; height: 30px;"
          />
        `);
        mockGridRef.current.removeChild(row);
      });

      it('sets the parent innerGrid container to position relative', () => {
        expect(mockGridRef.current.style.position).toEqual('relative');
      });

      it('appends the row DOM element to the grid body container', () => {
        expect(mockGridRef.current.children).toHaveLength(1);
      });
    });

    describe('when the row DOM element already exists', () => {
      it('does not create a new DOM element but fetches the existing one', () => {
        rowManager.getRow({
          rowIndex: 0,
          visibleRowIndex: 0,
          top: '15px',
          height: 30,
        });
        expect(mockGridRef.current.children).toHaveLength(1);
      });

      it("updates the row's top and height values", () => {
        const row = rowManager.getRow({
          rowIndex: 0,
          visibleRowIndex: 0,
          top: '100px',
          height: 200,
        });
        expect(row).toMatchInlineSnapshot(`
          <div
            class="euiDataGridRow"
            data-grid-row-index="0"
            data-grid-visible-row-index="0"
            role="row"
            style="position: absolute; left: 0px; right: 0px; top: 100px; height: 200px;"
          />
        `);
      });

      it("updates the row's visible row index and striping on sort", () => {
        const row = rowManager.getRow({
          rowIndex: 0,
          visibleRowIndex: 3,
          top: '100px',
          height: 200,
        });
        expect(row).toMatchInlineSnapshot(`
          <div
            class="euiDataGridRow euiDataGridRow--striped"
            data-grid-row-index="0"
            data-grid-visible-row-index="3"
            role="row"
            style="position: absolute; left: 0px; right: 0px; top: 100px; height: 200px;"
          />
        `);
      });
    });

    describe("when the row's child cells are all removed", () => {
      it('deletes the row element node and its mapping', async () => {
        const gridRef = { current: document.createElement('div') };
        const { result } = renderHook(() =>
          useRowManager({ innerGridRef: gridRef })
        );
        const getRowArgs = {
          rowIndex: 0,
          visibleRowIndex: 0,
          top: '0px',
          height: 30,
        };

        const row = result.current.getRow(getRowArgs);
        row.appendChild(document.createElement('div'));
        await waitForMutationObserver();
        row.removeChild(row.firstChild!);
        await waitForMutationObserver();

        expect(gridRef.current.children).toHaveLength(0);
        expect(result.current.getRow(getRowArgs)).not.toBe(row);
      });
    });
  });

  describe('row DOM order', () => {
    const setup = () => {
      const gridRef = { current: document.createElement('div') };
      // Mimic the header row, which is rendered as the first child of the inner grid
      const headerRow = document.createElement('div');
      gridRef.current.appendChild(headerRow);

      const { result } = renderHook(() =>
        useRowManager({ innerGridRef: gridRef })
      );
      const getRow = (rowIndex: number, visibleRowIndex = rowIndex) => {
        const row = result.current.getRow({
          rowIndex,
          visibleRowIndex,
          top: `${visibleRowIndex * 30}px`,
          height: 30,
        });
        // Mimic cells being portaled into the row
        if (!row.childElementCount) {
          row.appendChild(document.createElement('div'));
        }
        return row;
      };
      // Mimic all of a row's cells unmounting, e.g. when it's virtualized out of view
      const unmountRow = (row: HTMLElement) => row.removeChild(row.firstChild!);
      const getDomOrder = () =>
        Array.from(
          gridRef.current.querySelectorAll<HTMLElement>('.euiDataGridRow')
        ).map((row) => Number(row.dataset.gridVisibleRowIndex));

      return { gridRef, headerRow, getRow, unmountRow, getDomOrder };
    };

    it('keeps rows in visible order when rows are re-created after scrolling', async () => {
      const { gridRef, headerRow, getRow, unmountRow, getDomOrder } = setup();

      const rows = [0, 1, 2, 3, 4, 5].map((index) => getRow(index));
      expect(getDomOrder()).toEqual([0, 1, 2, 3, 4, 5]);
      await waitForMutationObserver();

      // Scroll down: the first rows are removed
      rows.slice(0, 4).forEach(unmountRow);
      await waitForMutationObserver();
      expect(getDomOrder()).toEqual([4, 5]);

      // Scroll back up: the first rows are re-created in batches
      [2, 3].forEach((index) => getRow(index));
      [0, 1].forEach((index) => getRow(index));
      expect(getDomOrder()).toEqual([0, 1, 2, 3, 4, 5]);
      expect(gridRef.current.firstChild).toBe(headerRow);
    });

    it('moves rows when their visible row index changes', () => {
      const { gridRef, headerRow, getRow, getDomOrder } = setup();

      [0, 1, 2, 3].forEach((index) => getRow(index));

      // Reverse the sort order
      [0, 1, 2, 3].forEach((index) => getRow(index, 3 - index));
      expect(getDomOrder()).toEqual([0, 1, 2, 3]);
      expect(
        Array.from(
          gridRef.current.querySelectorAll<HTMLElement>('.euiDataGridRow')
        ).map((row) => Number(row.dataset.gridRowIndex))
      ).toEqual([3, 2, 1, 0]);
      expect(gridRef.current.firstChild).toBe(headerRow);
    });

    it('appends rows without scanning when they belong at the end', () => {
      const { gridRef, getRow } = setup();
      [0, 1, 2].forEach((index) => getRow(index));

      // Only the last row should need to be inspected (2 reads), not all 3 rows
      const datasetReads = jest.fn();
      Array.from(gridRef.current.children).forEach((child) => {
        const dataset = (child as HTMLElement).dataset;
        Object.defineProperty(child, 'dataset', {
          get: () => {
            datasetReads();
            return dataset;
          },
        });
      });

      getRow(3);
      expect(datasetReads.mock.calls.length).toBeLessThanOrEqual(2);
    });

    it('retains focus on a focused cell inside a row that is moved', () => {
      const { gridRef, getRow } = setup();
      document.body.appendChild(gridRef.current);

      const rows = [0, 1, 2].map((index) => getRow(index));
      const button = document.createElement('button');
      rows[0].appendChild(button);
      button.focus();
      expect(document.activeElement).toBe(button);

      getRow(0, 5); // Moves row 0 after the other rows
      expect(
        Array.from(gridRef.current.querySelectorAll('.euiDataGridRow'))[2]
      ).toBe(rows[0]);
      expect(document.activeElement).toBe(button);

      document.body.removeChild(gridRef.current);
    });

    it('does not move rows that are already in place', () => {
      const { gridRef, getRow } = setup();

      [0, 1, 2].forEach((index) => getRow(index));
      const insertBefore = jest.spyOn(gridRef.current, 'insertBefore');

      [0, 1, 2].forEach((index) => getRow(index));
      // Same visible row index on every render
      expect(insertBefore).not.toHaveBeenCalled();

      // Visible row index changes but the row stays in the same place
      getRow(2, 5);
      expect(insertBefore).not.toHaveBeenCalled();
    });
  });

  describe('rowClasses', () => {
    const mockArgs = { innerGridRef: mockGridRef };
    const mockRowArgs = { visibleRowIndex: 99, top: '15px', height: 30 };

    const initialRowClasses = { 0: 'hello' };

    const render = (props: any = {}) =>
      renderHook(useRowManager, {
        initialProps: { ...mockArgs, rowClasses: initialRowClasses, ...props },
      });

    const getRow = (manager: EuiDataGridRowManager, rowIndex: number) =>
      manager.getRow({ ...mockRowArgs, rowIndex });

    it('creates rows with the passed gridStyle.rowClasses', () => {
      const { result } = render();
      expect(getRow(result.current, 0).classList.contains('hello')).toBe(true);
    });

    it('updates row classes dynamically when gridStyle.rowClasses updates', () => {
      const { result, rerender } = render();
      rerender({ ...mockArgs, rowClasses: { 0: 'world' } });

      const row0 = getRow(result.current, 0);

      expect(row0.classList.contains('hello')).toBe(false);
      expect(row0.classList.contains('world')).toBe(true);
    });

    it('allows passing multiple classes', () => {
      const { result } = render({ rowClasses: { 0: 'hello world' } });
      expect(getRow(result.current, 0).classList.contains('hello')).toBe(true);
      expect(getRow(result.current, 0).classList.contains('world')).toBe(true);
    });

    it('adds/removes row classes correctly when gridStyle.rowClasses updates', () => {
      const { result, rerender } = render();
      rerender({ ...mockArgs, rowClasses: { 1: 'test' } });

      const row0 = getRow(result.current, 0);
      const row1 = getRow(result.current, 1);

      expect(row0.classList.contains('hello')).toBe(false);
      expect(row0.classList.contains('world')).toBe(false);
      expect(row1.classList.contains('test')).toBe(true);
    });

    it('correctly preserves EUI classes when adding/removing classes dynamically', () => {
      const { result, rerender } = render();
      rerender({ ...mockArgs, rowClasses: undefined });

      expect(getRow(result.current, 0).classList.value).toEqual(
        'euiDataGridRow euiDataGridRow--striped'
      );
    });
  });
});
