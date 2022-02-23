/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { testCustomHook } from '../../../test/test_custom_hook.test_helper';
import { useColumnWidths } from './col_widths';

// TODO: Remaining col_widths utils

describe('useColumnWidths', () => {
  // TODO: Remaining useColumnWidths values

  describe('getColumnWidth', () => {
    const args = {
      leadingControlColumns: [{ id: 'a', width: 50 }] as any,
      columns: [{ id: 'b', initialWidth: 75 }, { id: 'c ' }],
      trailingControlColumns: [{ id: 'd', width: 25 }] as any,
      defaultColumnWidth: 150,
      onColumnResize: jest.fn(),
    };

    describe('leading control columns', () => {
      it('returns the width property of the column', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(0)).toEqual(50);
      });
    });

    describe('trailing control columns', () => {
      it('returns the width property of the column', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(3)).toEqual(25);
      });
    });

    describe('normal data columns', () => {
      it('returns the initialWidth property of the column if present and not overridden by user settings', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(1)).toEqual(75);
      });

      it('returns the defaultColumnWidth if no column initialWidth or user width was set', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() => useColumnWidths({ ...args }));
        expect(getColumnWidth(2)).toEqual(150);
      });

      it('returns a static 100px width if no default column width was passed', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() =>
          useColumnWidths({ ...args, defaultColumnWidth: null })
        );
        expect(getColumnWidth(2)).toEqual(100);
      });
    });

    describe('when all columns are hidden', () => {
      it('does not error & falls back to the static default width', () => {
        const {
          return: { getColumnWidth },
        } = testCustomHook(() =>
          useColumnWidths({
            ...args,
            leadingControlColumns: [],
            trailingControlColumns: [],
            columns: [],
            defaultColumnWidth: null,
          })
        );
        expect(getColumnWidth(0)).toEqual(100);
      });
    });
  });
});
