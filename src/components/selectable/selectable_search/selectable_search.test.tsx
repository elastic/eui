/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelectableSearch } from './selectable_search';

describe('EuiSelectableSearch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelectableSearch
        options={[]}
        listId="list"
        onChange={() => {}}
        isPreFiltered={false}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('defaultValue', () => {
      const component = render(
        <EuiSelectableSearch
          options={[]}
          listId="list"
          onChange={() => {}}
          isPreFiltered={false}
          defaultValue="Mi"
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
