/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, shallow } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSelectable } from '../selectable';
import { EuiSuggest, EuiSuggestionProps } from './suggest';
import { ALL_STATUSES } from './types';

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
      ALL_STATUSES.forEach((status) => {
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
      ALL_STATUSES.forEach((status) => {
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

    test('isVirtualized', () => {
      const component = render(
        <EuiSuggest
          {...requiredProps}
          suggestions={sampleItems}
          isVirtualized
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('maxHeight', () => {
      const component = render(
        <EuiSuggest
          {...requiredProps}
          suggestions={sampleItems}
          maxHeight="50vh"
        />
      );

      expect(component).toMatchSnapshot();
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

    describe('onItemClick', () => {
      it('passes an onChange callback to the underlying EuiSelectable, which will fire on list item clicks and enter keypresses', () => {
        const onItemClick = jest.fn();
        const component = shallow(
          <EuiSuggest
            {...requiredProps}
            suggestions={sampleItems}
            onItemClick={onItemClick}
          />
        );

        const options = component.find(EuiSelectable).prop('options');
        options[1].checked = 'on';
        component.find(EuiSelectable).simulate('change', options);

        expect(onItemClick).toHaveBeenCalledWith(sampleItems[1]);
      });
    });

    test('remaining EuiFieldSearch props are spread to the search input', () => {
      const component = render(
        <EuiSuggest
          {...requiredProps}
          suggestions={sampleItems}
          name="testName"
          id="testId"
          placeholder="Start typing"
          value="Controlled value"
          isInvalid={true}
          compressed={true}
          fullWidth={false}
          isClearable={true}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
