/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSuggest, EuiSuggestionProps } from './suggest';
import { ALL_STATUS } from './types';

const sampleItems: EuiSuggestionProps[] = [
  {
    type: { iconType: 'kqlField', color: 'tint4' },
    label: 'Field sample',
    description: 'Description',
  },
  {
    type: { iconType: 'kqlValue', color: 'tint0' },
    label: 'Value sample',
    description: 'Description',
  },
];

describe('EuiSuggest', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSuggest {...requiredProps} suggestions={sampleItems} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('status', () => {
      ALL_STATUS.forEach((status) => {
        test(`status: ${status} is rendered`, () => {
          const component = render(
            <EuiSuggest
              {...requiredProps}
              suggestions={sampleItems}
              status={status}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('append', () => {
      const component = render(
        <EuiSuggest
          {...requiredProps}
          suggestions={sampleItems}
          append={<span>Appended</span>}
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('tooltipContent', () => {
      ALL_STATUS.forEach((status) => {
        test(`tooltipContent for status: ${status} is rendered`, () => {
          const component = render(
            <EuiSuggest
              {...requiredProps}
              suggestions={sampleItems}
              status={status}
              tooltipContent={status}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    test('onSearchChange', () => {
      const handler = jest.fn();
      const component = mount(
        <EuiSuggest
          {...requiredProps}
          suggestions={sampleItems}
          onSearchChange={handler}
        />
      );

      component.find('input').simulate('change', { value: 'a' });
      expect(handler).toBeCalled();
    });
  });

  describe('options', () => {
    test('standard', () => {
      const _sampleItems: EuiSuggestionProps[] = sampleItems.map(
        (item, idx) => ({
          ...item,
          labelDisplay: idx === 0 ? 'fixed' : 'expand',
          descriptionDisplay: idx === 0 ? 'truncate' : 'wrap',
          labelWidth: idx === 0 ? '70' : 80,
        })
      );
      const component = render(
        <EuiSuggest {...requiredProps} suggestions={_sampleItems} />
      );

      expect(component).toMatchSnapshot();
    });

    test('common', () => {
      const _sampleItems: EuiSuggestionProps[] = sampleItems.map((item) => ({
        ...item,
        'aria-label': 'sampleItem',
        'data-test-subj': 'sampleItem',
        className: 'sampleItem',
        id: 'sampleItem',
      }));
      const component = render(
        <EuiSuggest {...requiredProps} suggestions={_sampleItems} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
