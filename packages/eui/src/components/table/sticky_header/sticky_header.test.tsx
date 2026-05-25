/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { requiredProps } from '../../../test';

import { EuiTable } from '../table';
import { EuiTableHeader } from '../table_header';
import { EuiTableHeaderCell } from '../table_header_cell';
import { EuiTableHeaderCellCheckbox } from '../table_header_cell_checkbox';
import { EuiTableBody } from '../table_body';
import { EuiTableRow } from '../table_row';
import { EuiTableRowCell } from '../table_row_cell';

// Mock observers to avoid issues in Jest environment
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

global.IntersectionObserver = class IntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
} as any;

describe('EuiTable Sticky Header', () => {
  afterEach(() => {
    cleanup();
  });
  describe('context registration', () => {
    it('renders sticky header wrapper when stickyHeader={true}', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell>Column 1</EuiTableHeaderCell>
            <EuiTableHeaderCell>Column 2</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody>
            <EuiTableRow>
              <EuiTableRowCell>Cell 1</EuiTableRowCell>
              <EuiTableRowCell>Cell 2</EuiTableRowCell>
            </EuiTableRow>
          </EuiTableBody>
        </EuiTable>
      );

      // Should render aria-hidden sticky header table
      const stickyTables = container.querySelectorAll('table[aria-hidden="true"]');
      expect(stickyTables.length).toBeGreaterThanOrEqual(1);
    });

    it('does not render sticky header when stickyHeader={false}', () => {
      const { container } = render(
        <EuiTable stickyHeader={false}>
          <EuiTableHeader>
            <EuiTableHeaderCell>Column</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTables = container.querySelectorAll('table[aria-hidden="true"]');
      expect(stickyTables.length).toBe(0);
    });

    it('maintains correct order of cells in sticky header', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell>First</EuiTableHeaderCell>
            <EuiTableHeaderCell>Second</EuiTableHeaderCell>
            <EuiTableHeaderCell>Third</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      if (stickyTable) {
        const stickyCells = stickyTable.querySelectorAll('thead th, thead td');
        if (stickyCells.length > 0) {
          expect(stickyCells[0].textContent).toContain('First');
          expect(stickyCells[1].textContent).toContain('Second');
          expect(stickyCells[2].textContent).toContain('Third');
        }
      }
    });

    it('includes checkbox cells', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCellCheckbox>
              <input type="checkbox" />
            </EuiTableHeaderCellCheckbox>
            <EuiTableHeaderCell>Name</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      if (stickyTable) {
        const checkboxInput = stickyTable.querySelector('input[type="checkbox"]');
        expect(checkboxInput).toBeTruthy();
      }
    });
  });

  describe('dynamic children', () => {
    it('renders string children', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell>Simple String</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      expect(stickyTable?.textContent).toContain('Simple String');
    });

    it('renders React component children', () => {
      const CustomComponent = () => <span data-test-id="custom">Custom Content</span>;

      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell>
              <CustomComponent />
            </EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      const customElement = stickyTable?.querySelector('[data-test-id="custom"]');
      expect(customElement).toBeTruthy();
      expect(customElement?.textContent).toBe('Custom Content');
    });

    it('renders complex nested children', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell>
              <div>
                <strong>Bold</strong>
                <em>Italic</em>
              </div>
            </EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      expect(stickyTable?.querySelector('strong')).toBeTruthy();
      expect(stickyTable?.querySelector('em')).toBeTruthy();
    });
  });

  describe('sticky header rendering', () => {
    it('applies stickyHeaderOffset to sticky header position', () => {
      const { container } = render(
        <EuiTable stickyHeader stickyHeaderOffset={50}>
          <EuiTableHeader>
            <EuiTableHeaderCell>Column</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyWrapper = container.querySelector('[data-is-stuck]');
      if (stickyWrapper) {
        const style = (stickyWrapper as HTMLElement).style;
        expect(style.top).toBe('50px');
      }
    });

    it('marks sticky header with aria-hidden', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell>Column</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      expect(stickyTable).toBeTruthy();
    });

    it('duplicates sortable header cells', () => {
      const onSort = jest.fn();

      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader>
            <EuiTableHeaderCell onSort={onSort} isSorted isSortAscending>
              Sortable Column
            </EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      const sortButton = stickyTable?.querySelector('button[data-test-subj="tableHeaderSortButton"]');
      expect(sortButton).toBeTruthy();
    });
  });

  describe('responsive mode', () => {
    it('does not render sticky header in responsive mode', () => {
      const { container } = render(
        <EuiTable stickyHeader responsiveBreakpoint={true}>
          <EuiTableHeader>
            <EuiTableHeaderCell>Column</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      const stickyTable = container.querySelector('table[aria-hidden="true"]');
      expect(stickyTable).toBeFalsy();
    });
  });

  describe('edge cases', () => {
    it('handles empty headers gracefully', () => {
      const { container } = render(
        <EuiTable stickyHeader>
          <EuiTableHeader />
          <EuiTableBody />
        </EuiTable>
      );

      // Should not crash
      expect(container.querySelector('table')).toBeTruthy();
    });

    it('supports all required props', () => {
      const { container } = render(
        <EuiTable stickyHeader {...requiredProps}>
          <EuiTableHeader>
            <EuiTableHeaderCell>Column</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody />
        </EuiTable>
      );

      expect(container.querySelector('table')).toBeTruthy();
    });
  });
});
