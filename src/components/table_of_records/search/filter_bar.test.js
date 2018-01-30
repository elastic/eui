import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme/build/index';
import { FilterBar } from './filter_bar';
import { Query } from './query';

describe('FilterBar', () => {

  test('render - no filters', () => {

    const props = {
      ...requiredProps,
      onChange: () => {},
      query: Query.parse(''),
      config: []
    };

    const component = shallow(
      <FilterBar {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - with filters', () => {

    const props = {
      ...requiredProps,
      onChange: () => {},
      query: Query.parse(''),
      config: [
        {
          type: 'is',
          field: 'open',
          name: 'Open'
        },
        {
          type: 'field_value_selection',
          field: 'tag',
          name: 'Tag',
          options: () => {}
        }
      ]
    };

    const component = shallow(
      <FilterBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });

});
