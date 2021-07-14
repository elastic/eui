/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { shallow } from 'enzyme';
import { EuiSearchFilters, SearchFilterConfig } from './search_filters';
import { Query } from './query';

describe('EuiSearchFilters', () => {
  test('render - no filters', () => {
    const props = {
      ...requiredProps,
      onChange: () => {},
      query: Query.parse(''),
      filters: [],
    };

    const component = shallow(<EuiSearchFilters {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - with filters', () => {
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
      onChange: () => {},
      query: Query.parse(''),
      filters,
    };

    const component = shallow(<EuiSearchFilters {...props} />);

    expect(component).toMatchSnapshot();
  });
});
