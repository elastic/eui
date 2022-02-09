/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { makeRowManager } from './data_grid_row_manager';

describe('row manager', () => {
  const mockContainerRef = { current: document.createElement('div') } as any;
  const rowManager = makeRowManager(mockContainerRef);

  beforeEach(() => jest.clearAllMocks());

  describe('getRow', () => {
    const mockTop = '15px';
    const mockHeight = 30;

    describe('when the row DOM element does not already exist', () => {
      beforeAll(() => {
        expect(mockContainerRef.current.children).toHaveLength(0);
      });

      it('creates a row DOM element', () => {
        const row = rowManager.getRow(0, mockTop, mockHeight);
        expect(row).toMatchInlineSnapshot(`
          <div
            class="euiDataGridRow"
            role="row"
            style="position: absolute; left: 0px; right: 0px; top: 15px; height: 30px;"
          />
        `);
      });

      it('sets the parent innerGrid container to position relative', () => {
        expect(mockContainerRef.current.style.position).toEqual('relative');
      });

      it('appends the row DOM element to the grid body container', () => {
        expect(mockContainerRef.current.children).toHaveLength(1);
      });
    });

    describe('when the row DOM element already exists', () => {
      it('does not create a new DOM element but fetches the existing one', () => {
        rowManager.getRow(0, mockTop, mockHeight);
        expect(mockContainerRef.current.children).toHaveLength(1);
      });

      it("updates the row's top and height values", () => {
        const row = rowManager.getRow(0, '100px', 200);
        expect(row).toMatchInlineSnapshot(`
          <div
            class="euiDataGridRow"
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
});
