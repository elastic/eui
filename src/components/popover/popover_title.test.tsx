/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiPopoverTitle, PADDING_SIZES } from './popover_title';

describe('EuiPopoverTitle', () => {
  test('is rendered', () => {
    const component = render(<EuiPopoverTitle {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('paddingSize', () => {
      PADDING_SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const component = render(<EuiPopoverTitle paddingSize={size} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
