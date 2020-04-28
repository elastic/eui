/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/* eslint-disable react/no-multi-comp */
import React from 'react';
import { requiredProps } from '../../test';
import { mount, shallow } from 'enzyme';
import { EuiSearchBar } from './search_bar';
import { Query } from './query';
import { ENTER } from '../../services/key_codes';
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
        keyCode: ENTER,
        target: { value: 'status:inactive' },
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [[{ query, queryText }]] = onChange.mock.calls;
      expect(query).toBeInstanceOf(Query);
      expect(queryText).toBe('status:inactive');
    });
  });
});
