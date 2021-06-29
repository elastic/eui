/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { EuiFormControlLayoutClearButton } from './form_control_layout_clear_button';
import { requiredProps } from '../../../test';

describe('EuiFormControlLayoutClearButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormControlLayoutClearButton
        onClick={() => null}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('size is rendered', () => {
    const component = render(
      <EuiFormControlLayoutClearButton onClick={() => null} size="s" />
    );

    expect(component).toMatchSnapshot();
  });
});
