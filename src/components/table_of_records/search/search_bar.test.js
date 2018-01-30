import React from 'react';
import { requiredProps } from '../../../test';
import { shallow } from 'enzyme/build/index';
import { SearchBar } from './search_bar';

describe('SearchBar', () => {

  test('render - no config, no query', () => {

    const props = {
      ...requiredProps,
      config: {
      },
      onChange: () => {}
    };

    const component = shallow(
      <SearchBar {...props} />
    );

    expect(component).toMatchSnapshot();

  });

  test('render - no query, custom box placeholder and incremental', () => {

    const props = {
      ...requiredProps,
      config: {
        box: {
          placeholder: 'find something...',
          incremental: false
        }
      },
      onChange: () => {}
    };

    const component = shallow(
      <SearchBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('render - provided query, filters', () => {

    const props = {
      ...requiredProps,
      config: {
        filters: [
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
      },
      query: 'this is a query',
      onChange: () => {}
    };

    const component = shallow(
      <SearchBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });

});
