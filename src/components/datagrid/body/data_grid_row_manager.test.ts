/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test/internal';

import { EuiDataGridRowManager } from '../data_grid_types';
import { useRowManager } from './data_grid_row_manager';

describe('row manager', () => {
  const mockGridRef = { current: document.createElement('div') } as any;

  describe('getRow', () => {
    const { return: rowManager } = testCustomHook<EuiDataGridRowManager>(() =>
      useRowManager({ innerGridRef: mockGridRef })
    );

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
    });

    describe("when the row's child cells are all removed", () => {
      it('deletes the row element node and its mapping', () => {
        // TODO: Write a Cypress test for this
        // or upgrade Jest/jsdom to v14+ which supports Mutation Observers
      });
    });
  });

  describe('rowClasses', () => {
    const rowClasses = {
      0: 'hello',
    };
    let row0: HTMLDivElement;
    let row1: HTMLDivElement;
    const mockRowArgs = { visibleRowIndex: 99, top: '15px', height: 30 };

    const { return: rowManager, updateHookArgs } =
      testCustomHook<EuiDataGridRowManager>(useRowManager, {
        innerGridRef: mockGridRef,
        rowClasses,
      });

    beforeAll(() => {
      row0 = rowManager.getRow({ ...mockRowArgs, rowIndex: 0 });
      row1 = rowManager.getRow({ ...mockRowArgs, rowIndex: 1 });
    });

    it('creates rows with the passed gridStyle.rowClasses', () => {
      expect(row0.classList.contains('hello')).toBe(true);
    });

    it('updates row classes dynamically when gridStyle.rowClasses updates', () => {
      updateHookArgs({ rowClasses: { 0: 'world' } });

      expect(row0.classList.contains('hello')).toBe(false);
      expect(row0.classList.contains('world')).toBe(true);
    });

    it('adds/removes row classes correctly when gridStyle.rowClasses updates', () => {
      updateHookArgs({ rowClasses: { 1: 'test' } });

      expect(row0.classList.contains('hello')).toBe(false);
      expect(row0.classList.contains('world')).toBe(false);
      expect(row1.classList.contains('test')).toBe(true);
    });
  });
});
