import React from 'react';
import { mount } from 'enzyme';
import { findTestSubject } from '../../test';

import { EuiTableOfRecords } from './table_of_records';

describe('EuiTableOfRecords', () => {
  describe('behavior', () => {
    describe('selected items', () => {
      let props;
      let component;

      beforeEach(() => {
        props = {
          config: {
            recordId: 'id',
            columns: [
              {
                field: 'name',
                name: 'Name',
                description: 'description'
              }
            ],
            selection: {
              onSelectionChanged: () => {}
            },
            onDataCriteriaChange: () => {}
          },
          model: {
            data: {
              records: [
                { id: '1', name: 'name1' },
                { id: '2', name: 'name2' }
              ],
            },
          }
        };

        component = mount(<EuiTableOfRecords {...props} />);
      });

      test('check the select all checkbox when all are selected', () => {
        findTestSubject(component, 'checkboxSelectRow-1').simulate('change', { target: { checked: true } });
        findTestSubject(component, 'checkboxSelectRow-2').simulate('change', { target: { checked: true } });
        expect(findTestSubject(component, 'checkboxSelectAll').prop('checked')).toBe(true);
      });

      test('uncheck the select all checkbox when some are selected', () => {
        findTestSubject(component, 'checkboxSelectRow-1').simulate('change', { target: { checked: true } });
        expect(findTestSubject(component, 'checkboxSelectAll').prop('checked')).toBe(false);
      });

      test('are all selected when the select all checkbox is checked', () => {
        findTestSubject(component, 'checkboxSelectAll').simulate('change', { target: { checked: true } });
        expect(findTestSubject(component, 'checkboxSelectRow-1').prop('checked')).toBe(true);
        expect(findTestSubject(component, 'checkboxSelectRow-2').prop('checked')).toBe(true);
      });

      test('select all checkbox becomes unchecked when selected items are deleted', () => {
        findTestSubject(component, 'checkboxSelectAll').simulate('change', { target: { checked: true } });
        props.model.data.records = [];
        component.setProps(...props);
        expect(findTestSubject(component, 'checkboxSelectAll').prop('checked')).toBe(false);
      });
    });
  });
});
