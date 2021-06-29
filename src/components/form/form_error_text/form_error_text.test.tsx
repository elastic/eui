/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormErrorText } from './form_error_text';

describe('EuiFormErrorText', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormErrorText {...requiredProps}>This is an error.</EuiFormErrorText>
    );

    expect(component).toMatchSnapshot();
  });
});
