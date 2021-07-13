/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiFilterButton } from './filter_button';

describe('EuiFilterButton', () => {
  test('is rendered', () => {
    const component = render(<EuiFilterButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders zero properly', () => {
    const component = render(
      <EuiFilterButton {...requiredProps} numFilters={0} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('iconType and iconSide', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFilterButton iconType="user" iconSide="right" />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('numFilters', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton numFilters={5} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('numActiveFilters and hasActiveFilters', () => {
      it('is rendered', () => {
        const component = render(
          <EuiFilterButton numActiveFilters={5} hasActiveFilters />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isSelected', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton isSelected />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton isDisabled />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('type', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton type="button" />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('grow', () => {
      it('can be turned off', () => {
        const component = render(<EuiFilterButton grow={false} />);

        expect(component).toMatchSnapshot();
      });
    });

    describe('withNext', () => {
      it('is rendered', () => {
        const component = render(<EuiFilterButton withNext />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
