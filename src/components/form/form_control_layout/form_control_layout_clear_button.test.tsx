/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
