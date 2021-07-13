/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFormFieldset } from './form_fieldset';

describe('EuiFormFieldset', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormFieldset {...requiredProps}>
        <input />
      </EuiFormFieldset>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('legend is rendered', () => {
      const component = render(
        <EuiFormFieldset legend={{ children: 'Legend' }}>
          <input />
        </EuiFormFieldset>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
