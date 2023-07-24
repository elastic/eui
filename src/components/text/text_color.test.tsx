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

import { EuiTextColor } from './text_color';

describe('EuiTextColor', () => {
  test('is rendered', () => {
    const { container } = render(<EuiTextColor {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  shouldRenderCustomStyles(<EuiTextColor color="#fff" />);

  describe('props', () => {
    describe('color', () => {
      test('is rendered with named color', () => {
        const { container } = render(
          <EuiTextColor color="warning">
            <p>Content</p>
          </EuiTextColor>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('is rendered with custom color', () => {
        const { container } = render(
          <EuiTextColor color="#ff0000">
            <p>Content</p>
          </EuiTextColor>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('cloneElement', () => {
      test('is rendered', () => {
        const { container } = render(
          <EuiTextColor cloneElement>
            <p>Content</p>
          </EuiTextColor>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      shouldRenderCustomStyles(
        <EuiTextColor cloneElement color="#fff">
          <p>Content</p>
        </EuiTextColor>
      );
    });
  });
});
