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
import { COLORS } from '../icon/icon';
import { EuiHealth, TEXT_SIZES } from './health';

describe('EuiHealth', () => {
  test('is rendered', () => {
    const component = render(<EuiHealth {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiHealth />);

  describe('props', () => {
    describe('textSize', () => {
      TEXT_SIZES.forEach((textSize: any) => {
        test(`${textSize} is rendered`, () => {
          const component = render(
            <EuiHealth textSize={textSize} color="success" />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('color', () => {
      [...COLORS, '#000000'].forEach((color) => {
        it(`${color} is rendered`, () => {
          const component = render(<EuiHealth color={color} />);

          expect(component).toMatchSnapshot();
        });
      });
    });
  });
});
