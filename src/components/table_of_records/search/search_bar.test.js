import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme/build/index';
import { SearchBar } from './search_bar';

describe('SearchBar', () => {

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
        search: {},
        onDataCriteriaChange: () => {}
      },
      model: {
        data: {
          records: [],
          totalRecordCount: 0
        },
        criteria: {
          search: { query: '' }
        }
      },
      onQueryChange: () => {},
    };

    const component = shallow(
      <SearchBar {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - custom placeholder and asYouType', () => {

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
        search: {
          box: {
            placeholder: 'find something...',
            asYouType: false
          }
        },
        onDataCriteriaChange: () => {}
      },
      model: {
        data: {
          records: [],
          totalRecordCount: 0
        },
        criteria: {
          search: { query: '' }
        }
      },
      onQueryChange: () => {}
    };

    const component = shallow(
      <SearchBar {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
