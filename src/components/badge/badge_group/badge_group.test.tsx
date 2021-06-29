/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiBadge } from '../badge';
import { EuiBadgeGroup, GUTTER_SIZES } from './badge_group';

describe('EuiBadgeGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiBadgeGroup {...requiredProps}>
        <EuiBadge>Content</EuiBadge>
      </EuiBadgeGroup>
    );

    expect(component).toMatchSnapshot();
  });

  describe('gutterSize', () => {
    GUTTER_SIZES.forEach((size) => {
      it(`${size} is rendered`, () => {
        const component = render(<EuiBadgeGroup gutterSize={size} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
