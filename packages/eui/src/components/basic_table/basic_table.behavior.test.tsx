/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the "Elastic License
 * 2.0", the "GNU Affero General Public License v3.0 only", and the "Server Side
 * Public License v 1"; you may not use this file except in compliance with, at
 * your election, the "Elastic License 2.0", the "GNU Affero General Public
 * License v3.0 only", or the "Server Side Public License, v 1".
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';

import { EuiBasicTable, EuiBasicTableProps } from './basic_table';

describe('EuiBasicTable', () => {
  describe('behavior', () => {
    describe('selected items', () => {
      const props: EuiBasicTableProps<{ id: string; name: string }> = {
        items: [
          { id: '1', name: 'name1' },
          { id: '2', name: 'name2' },
        ],
        itemId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description',
          },
        ],
        selection: {
          onSelectionChange: () => {},
        },
        onChange: () => {},
      };

      test('check the select all checkbox when all are selected', () => {
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);

        fireEvent.click(getByTestSubject('checkboxSelectRow-1'));
        fireEvent.click(getByTestSubject('checkboxSelectRow-2'));
        expect(getByTestSubject('checkboxSelectAll')).toBeChecked();
      });

      test('uncheck the select all checkbox when some are selected', () => {
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);

        fireEvent.click(getByTestSubject('checkboxSelectRow-1'));
        expect(getByTestSubject('checkboxSelectAll')).not.toBeChecked();
      });

      test('are all selected when the select all checkbox is checked', () => {
        const { getByTestSubject } = render(<EuiBasicTable {...props} />);

        fireEvent.click(getByTestSubject('checkboxSelectAll'));
        expect(getByTestSubject('checkboxSelectRow-1')).toBeChecked();
        expect(getByTestSubject('checkboxSelectRow-2')).toBeChecked();
      });

      test('select all checkbox becomes unchecked when selected items are deleted', () => {
        const { getByTestSubject, rerender } = render(
          <EuiBasicTable {...props} />
        );
        fireEvent.click(getByTestSubject('checkboxSelectAll'));
        expect(getByTestSubject('checkboxSelectAll')).toBeChecked();

        rerender(<EuiBasicTable {...props} items={[]} />);
        expect(getByTestSubject('checkboxSelectAll')).not.toBeChecked();
      });
    });
  });
});
