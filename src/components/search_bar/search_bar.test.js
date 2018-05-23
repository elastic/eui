/* eslint-disable react/no-multi-comp */
import React from 'react';
import { requiredProps } from '../../test';
import { mount, shallow } from 'enzyme';
import { EuiSearchBar } from './search_bar';
import { Query } from './query';

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

  describe('controlled input', () => {
    test('calls onChange callback when a new query is passed', () => {
      const onChange = jest.fn();

      const component = mount(
        <EuiSearchBar
          query=""
          onChange={onChange}
        />
      );

      component.setProps({ query: 'is:active' });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [[{ query, queryText }]] = onChange.mock.calls;
      expect(query).toBeInstanceOf(Query);
      expect(queryText).toBe('is:active');
    });

    test('does not call onChange when an unwatched prop changes', () => {
      const onChange = jest.fn();

      const component = mount(
        <EuiSearchBar
          query="is:active"
          isFoo={false}
          onChange={onChange}
        />
      );

      component.setProps({ isFoo: true });

      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
