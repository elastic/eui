/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiBetaBadge, COLORS, SIZES } from './beta_badge';

describe('EuiBetaBadge', () => {
  test('is rendered', () => {
    const component = render(<EuiBetaBadge label="Beta" {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const component = render(<EuiBetaBadge label="Beta" color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiBetaBadge label="Beta" size={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
