/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';

import {
  EuiFormControlLayoutCustomIcon,
  EuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';

describe('EuiFormControlLayoutCustomIcon', () => {
  shouldRenderCustomStyles(<EuiFormControlLayoutCustomIcon type="faceHappy" />);

  test('is rendered as button', () => {
    const props: EuiFormControlLayoutCustomIconProps = {
      onClick: () => null,
      type: 'error',
      iconRef: jest.fn(),
      color: 'danger',
    };
    const { container } = render(
      <EuiFormControlLayoutCustomIcon {...props} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered as span', () => {
    const props: EuiFormControlLayoutCustomIconProps = {
      type: 'error',
      iconRef: jest.fn(),
    };
    const { container } = render(
      <EuiFormControlLayoutCustomIcon {...props} {...requiredProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('size is rendered', () => {
    const { container } = render(
      <EuiFormControlLayoutCustomIcon type="warning" size="s" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
