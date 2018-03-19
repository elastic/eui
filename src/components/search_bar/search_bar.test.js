import React from 'react';
import { requiredProps } from '../../test';
import { shallow } from 'enzyme';
import { EuiSearchBar } from './search_bar';

describe('SearchBar', () => {
  test('render - no config, no query', () => {
    const props = {
      ...requiredProps,
      onChange: () => {}
    };

    const component = shallow(
      <EuiSearchBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('render - tools', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
      toolsLeft: <div>Left</div>,
      toolsRight: <div>Right</div>,
    };

    const component = shallow(
      <EuiSearchBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('render - box', () => {
    const props = {
      box: {
        placeholder: 'find something...',
        incremental: false,
        ...requiredProps
      },
      onChange: () => {}
    };

    const component = shallow(
      <EuiSearchBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });

  test('render - provided query, filters', () => {
    const props = {
      ...requiredProps,
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
      ],
      query: 'this is a query',
      onChange: () => {}
    };

    const component = shallow(
      <EuiSearchBar {...props} />
    );

    expect(component).toMatchSnapshot();
  });
});
