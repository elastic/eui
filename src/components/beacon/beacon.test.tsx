/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../test/internal';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiBeacon, COLORS } from './beacon';

describe('EuiBeacon', () => {
  shouldRenderCustomStyles(<EuiBeacon />);

  test('is rendered', () => {
    const { container } = render(<EuiBeacon {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        it(`${color} is rendered`, () => {
          const { container } = render(
            <EuiBeacon color={color} {...requiredProps} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
    describe('size', () => {
      it('accepts size', () => {
        const { container } = render(
          <EuiBeacon size={14} {...requiredProps} />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });
});
