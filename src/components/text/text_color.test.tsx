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

import { EuiTextColor } from './text_color';

describe('EuiTextColor', () => {
  test('is rendered', () => {
    const component = render(<EuiTextColor {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      test('is rendered with named color', () => {
        const component = render(
          <EuiTextColor color="warning">
            <p>Content</p>
          </EuiTextColor>
        );

        expect(component).toMatchSnapshot();
      });

      test('is rendered with custom color', () => {
        const component = render(
          <EuiTextColor color="#ff0000">
            <p>Content</p>
          </EuiTextColor>
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
