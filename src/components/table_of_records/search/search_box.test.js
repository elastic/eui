import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme/build/index';
import { SearchBox } from './search_box';

describe('SearchBox', () => {

  test('render', () => {

    const props = {
      ...requiredProps,
      config: {},
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
      <SearchBox {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - custom placeholder and asYouType', () => {

    const props = {
      ...requiredProps,
      config: {
        placeholder: 'find something...',
        asYouType: false
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
      <SearchBox {...props} />
    );

    expect(component).toMatchSnapshot();

  });

});
