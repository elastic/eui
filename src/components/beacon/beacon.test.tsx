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
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiBeacon, COLORS } from './beacon';

describe('EuiBeacon', () => {
  shouldRenderCustomStyles(<EuiBeacon />);

  test('is rendered', () => {
    const component = render(<EuiBeacon {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        it(`${color} is rendered`, () => {
          const component = render(
            <EuiBeacon color={color} {...requiredProps} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });
    describe('size', () => {
      it('accepts size', () => {
        const component = render(<EuiBeacon size={14} {...requiredProps} />);

        expect(component).toMatchSnapshot();
      });
    });
  });
});
