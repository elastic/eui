/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTabs, SIZES, DISPLAYS } from './tabs';

describe('EuiTabs', () => {
  test('renders', () => {
    const component = <EuiTabs {...requiredProps}>children</EuiTabs>;

    expect(render(component)).toMatchSnapshot();
  });

  describe('props', () => {
    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = render(<EuiTabs size={size}>children</EuiTabs>);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      DISPLAYS.forEach((display) => {
        it(`${display} is rendered`, () => {
          const component = render(
            <EuiTabs display={display}>children</EuiTabs>
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('expand', () => {
      test('is rendered', () => {
        const component = render(<EuiTabs expand>children</EuiTabs>);
        expect(component).toMatchSnapshot();
      });
    });
  });
});
