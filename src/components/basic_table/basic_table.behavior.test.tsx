/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findTestSubject } from '../../test';

import { EuiBasicTable, EuiBasicTableProps } from './basic_table';

describe('EuiBasicTable', () => {
  describe('behavior', () => {
    describe('selected items', () => {
      let props: EuiBasicTableProps<{ id: string; name: string }>;
      let component: ReactWrapper;

      beforeEach(() => {
        props = {
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

        component = mount(<EuiBasicTable {...props} />);
      });

      test('check the select all checkbox when all are selected', () => {
        findTestSubject(component, 'checkboxSelectRow-1').simulate('change', {
          target: { checked: true },
        });
        findTestSubject(component, 'checkboxSelectRow-2').simulate('change', {
          target: { checked: true },
        });
        expect(
          findTestSubject(component, 'checkboxSelectAll').prop('checked')
        ).toBe(true);
      });

      test('uncheck the select all checkbox when some are selected', () => {
        findTestSubject(component, 'checkboxSelectRow-1').simulate('change', {
          target: { checked: true },
        });
        expect(
          findTestSubject(component, 'checkboxSelectAll').prop('checked')
        ).toBe(false);
      });

      test('are all selected when the select all checkbox is checked', () => {
        findTestSubject(component, 'checkboxSelectAll').simulate('change', {
          target: { checked: true },
        });
        expect(
          findTestSubject(component, 'checkboxSelectRow-1').prop('checked')
        ).toBe(true);
        expect(
          findTestSubject(component, 'checkboxSelectRow-2').prop('checked')
        ).toBe(true);
      });

      test('select all checkbox becomes unchecked when selected items are deleted', () => {
        findTestSubject(component, 'checkboxSelectAll').simulate('change', {
          target: { checked: true },
        });
        props.items = [];
        component.setProps(props);
        expect(
          findTestSubject(component, 'checkboxSelectAll').prop('checked')
        ).toBe(false);
      });
    });
  });
});
