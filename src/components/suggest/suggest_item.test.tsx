/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggestItem } from './suggest_item';

const TYPE = {
  iconType: 'search',
  color: 'tint1',
};

describe('EuiSuggestItem', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggestItem {...requiredProps} label="Test label" type={TYPE} />
    );

    expect(component).toMatchSnapshot();
  });
});

describe('props', () => {
  const sampleItem = {
    type: { iconType: 'kqlValue', color: 'tint2' },
    label: 'Charles de Gaulle International Airport',
    description: 'This is the description',
  };

  describe('labelDisplay as expand', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSuggestItem
          type={sampleItem.type}
          description={sampleItem.description}
          label={sampleItem.description}
          labelDisplay="expand"
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('descriptionDisplay as wrap', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSuggestItem
          type={sampleItem.type}
          description={sampleItem.description}
          label={sampleItem.description}
          descriptionDisplay="wrap"
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('labelWidth is 30%', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSuggestItem
          type={sampleItem.type}
          description={sampleItem.description}
          label={sampleItem.description}
          labelWidth="30"
        />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('item with no description has expanded label', () => {
    test('is rendered', () => {
      const component = render(
        <EuiSuggestItem label={sampleItem.label} type={sampleItem.type} />
      );
      expect(component).toMatchSnapshot();
    });
  });
});
