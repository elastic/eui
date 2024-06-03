/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiNotificationBadge, COLORS, SIZES } from './badge_notification';

describe('EuiNotificationBadge', () => {
  shouldRenderCustomStyles(<EuiNotificationBadge>1</EuiNotificationBadge>);

  test('is rendered', () => {
    const { container } = render(
      <EuiNotificationBadge {...requiredProps}>5</EuiNotificationBadge>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <EuiNotificationBadge color={color}>5</EuiNotificationBadge>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <EuiNotificationBadge size={size}>5</EuiNotificationBadge>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });
});
