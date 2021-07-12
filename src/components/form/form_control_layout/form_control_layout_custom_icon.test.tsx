/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import {
  EuiFormControlLayoutCustomIcon,
  EuiFormControlLayoutCustomIconProps,
} from './form_control_layout_custom_icon';
import { requiredProps } from '../../../test';

describe('EuiFormControlLayoutCustomIcon', () => {
  test('is rendered as button', () => {
    const props: EuiFormControlLayoutCustomIconProps = {
      onClick: () => null,
      type: 'alert',
      iconRef: 'icon',
    };
    const component = render(
      <EuiFormControlLayoutCustomIcon {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered as span', () => {
    const props: EuiFormControlLayoutCustomIconProps = {
      type: 'alert',
      iconRef: 'icon',
    };
    const component = render(
      <EuiFormControlLayoutCustomIcon {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('size is rendered', () => {
    const component = render(
      <EuiFormControlLayoutCustomIcon type="alert" size="s" />
    );

    expect(component).toMatchSnapshot();
  });
});
