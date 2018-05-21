/* eslint-disable react/no-multi-comp */
import React, { Component } from 'react';
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
    test('calls onParse callback when a new query is passed', () => {
      const onParse = jest.fn();

      class Wrapper extends Component {
        constructor(...args) {
          super(...args);
          this.state = { query: '' };
        }

        setQuery(query) {
          this.setState({ query });
        }

        render() {
          return (
            <EuiSearchBar
              {...requiredProps}
              query={this.state.query}
              onParse={onParse}
            />
          );
        }
      }
      const component = mount(
        <Wrapper/>
      );

      const wrapperInstance = component.instance();
      wrapperInstance.setQuery('is:active');

      expect(onParse).toHaveBeenCalledTimes(1);
      const [[{ query, queryText }]] = onParse.mock.calls;
      expect(query).toBeInstanceOf(Query);
      expect(queryText).toBe('is:active');
    });

    test('does not call onParse when an unwatched prop changes', () => {
      const onParse = jest.fn();

      class Wrapper extends Component {
        constructor(...args) {
          super(...args);
          this.state = { isFoo: false };
        }

        setIsFoo(isFoo) {
          this.setState({ isFoo });
        }

        render() {
          return (
            <EuiSearchBar
              {...requiredProps}
              query="is:active"
              isFoo={this.state.isFoo}
              onParse={onParse}
            />
          );
        }
      }
      const component = mount(
        <Wrapper/>
      );

      const wrapperInstance = component.instance();
      wrapperInstance.setIsFoo(true);

      expect(onParse).toHaveBeenCalledTimes(0);
    });
  });
});
