/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '@testing-library/react/pure'; // Pure is important here to preserve state between tests

import { useRowManager } from './data_grid_row_manager';

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
      it('deletes the row element node and its mapping', () => {
        // TODO: Write a Cypress test for this
        // or upgrade Jest/jsdom to v14+ which supports Mutation Observers
      });
    });
  });

  describe('rowClasses', () => {
    const mockArgs = { innerGridRef: mockGridRef };
    const mockRowArgs = { visibleRowIndex: 99, top: '15px', height: 30 };

    const initialRowClasses = { 0: 'hello' };

    const { result, rerender } = renderHook(useRowManager, {
      initialProps: { ...mockArgs, rowClasses: initialRowClasses },
    });

    const getRow = (rowIndex: number) =>
      result.current.getRow({ ...mockRowArgs, rowIndex });

    it('creates rows with the passed gridStyle.rowClasses', () => {
      expect(getRow(0).classList.contains('hello')).toBe(true);
    });

    it('updates row classes dynamically when gridStyle.rowClasses updates', () => {
      rerender({ ...mockArgs, rowClasses: { 0: 'world' } });
      const row0 = getRow(0);

      expect(row0.classList.contains('hello')).toBe(false);
      expect(row0.classList.contains('world')).toBe(true);
    });

    it('allows passing multiple classes', () => {
      rerender({ ...mockArgs, rowClasses: { 0: 'hello world' } });
      expect(getRow(0).classList.contains('hello')).toBe(true);
      expect(getRow(0).classList.contains('world')).toBe(true);
    });

    it('adds/removes row classes correctly when gridStyle.rowClasses updates', () => {
      rerender({ ...mockArgs, rowClasses: { 1: 'test' } });
      const row0 = getRow(0);
      const row1 = getRow(1);

      expect(row0.classList.contains('hello')).toBe(false);
      expect(row0.classList.contains('world')).toBe(false);
      expect(row1.classList.contains('test')).toBe(true);
    });

    it('correctly preserves EUI classes when adding/removing classes dynamically', () => {
      rerender({ ...mockArgs, rowClasses: undefined });

      expect(getRow(0).classList.value).toEqual(
        'euiDataGridRow euiDataGridRow--striped'
      );
    });
  });
});
