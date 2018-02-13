import React from 'react';
import { requiredProps } from '../../test';
import { shallow } from 'enzyme/build/index';
import { PaginationBar } from './pagination_bar';

describe('PaginationBar', () => {

  test('render', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ],
        pagination: {},
        onDataCriteriaChange: () => {}
      },
      model: {
        data: {
          records: [],
          totalRecordCount: 0
        },
        criteria: {
          page: {
            size: 5,
            index: 0
          }
        }
      },
      onPageSizeChange: () => {},
      onPageChange: () => {}
    };

    const component = shallow(
      <PaginationBar {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - custom page size options', () => {

    const props = {
      ...requiredProps,
      config: {
        recordId: 'id',
        columns: [
          {
            field: 'name',
            name: 'Name',
            description: 'description'
          }
        ],
        pagination: {
          pageSizeOptions: [1, 2, 3]
        },
        onDataCriteriaChange: () => {}
      },
      model: {
        data: {
          records: [],
          totalRecordCount: 0
        },
        criteria: {
          page: {
            size: 5,
            index: 0
          }
        }
      },
      onPageSizeChange: () => {},
      onPageChange: () => {}
    };

    const component = shallow(
      <PaginationBar {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
