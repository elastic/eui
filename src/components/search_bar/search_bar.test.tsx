/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import { act } from 'react-dom/test-utils';

import { requiredProps } from '../../test';
import { mount, shallow } from 'enzyme';
import { EuiSearchBar } from './search_bar';
import { Query } from './query';
import { keys } from '../../services';
import { SearchFilterConfig } from './search_filters';

describe('SearchBar', () => {
  test('render - no config, no query', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
    };

    const component = shallow(<EuiSearchBar {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - tools', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
      toolsLeft: <div>Left</div>,
      toolsRight: <div>Right</div>,
    };

    const component = shallow(<EuiSearchBar {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - box', () => {
    const props = {
      box: {
        placeholder: 'find something...',
        incremental: false,
        ...requiredProps,
      },
      onChange: () => {},
    };

    const component = shallow(<EuiSearchBar {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - provided query, filters', () => {
    const filters: SearchFilterConfig[] = [
      {
        type: 'is',
        field: 'open',
        name: 'Open',
      },
      {
        type: 'field_value_selection',
        field: 'tag',
        name: 'Tag',
        options: () => Promise.resolve([]),
      },
    ];

    const props = {
      ...requiredProps,
      filters,
      query: 'this is a query',
      onChange: () => {},
    };

    const component = shallow(<EuiSearchBar {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('controlled input', () => {
    test('calls onChange callback when the query is modified', () => {
      const onChange = jest.fn();

      const component = mount(
        <EuiSearchBar
          query="status:active"
          onChange={onChange}
          box={{ 'data-test-subj': 'searchbar' }}
        />
      );

      component.find('input[data-test-subj="searchbar"]').simulate('keyup', {
        key: keys.ENTER,
        target: { value: 'status:inactive' },
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [[{ query, queryText }]] = onChange.mock.calls;
      expect(query).toBeInstanceOf(Query);
      expect(queryText).toBe('status:inactive');
    });
  });

  describe('hint', () => {
    test('renders a hint below the search bar on focus', () => {
      const component = mount(
        <EuiSearchBar
          query="status:active"
          box={{ 'data-test-subj': 'searchbar' }}
          hint={{
            content: <span data-test-subj="myHint">Hello from hint</span>,
          }}
        />
      );

      const getHint = () => component.find('[data-test-subj="myHint"]');

      let hint = getHint();
      expect(hint.length).toBe(0);

      act(() => {
        component.find('input[data-test-subj="searchbar"]').simulate('focus');
      });
      component.update();

      hint = getHint();
      expect(hint.length).toBe(1);
      expect(hint.text()).toBe('Hello from hint');
    });

    test('control the visibility of the hint', () => {
      const TestComp = () => {
        const [isHintVisible, setIsHintVisible] = useState(false);

        return (
          <>
            <EuiSearchBar
              box={{ 'data-test-subj': 'searchbar' }}
              hint={{
                content: <span data-test-subj="myHint">Hello from hint</span>,
                popoverProps: {
                  isOpen: isHintVisible,
                },
              }}
            />
            <button
              data-test-subj="showHintBtn"
              onClick={() => setIsHintVisible(true)}
            >
              Show hint
            </button>
          </>
        );
      };

      const component = mount(<TestComp />);
      const getHint = () => component.find('[data-test-subj="myHint"]');

      let hint = getHint();
      expect(hint.length).toBe(0);

      act(() => {
        component.find('input[data-test-subj="searchbar"]').simulate('focus');
      });
      component.update();

      hint = getHint();
      expect(hint.length).toBe(0); // Not visible on focus as it is controlled

      act(() => {
        component.find('[data-test-subj="showHintBtn"]').simulate('click');
      });
      component.update();

      hint = getHint();
      expect(hint.length).toBe(1);
      expect(hint.text()).toBe('Hello from hint');
    });
  });
});
