/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSwitch } from './switch';

const props = {
  checked: false,
  label: 'Label',
  onChange: () => {},
};

describe('EuiSwitch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSwitch id="test" {...props} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('assigns automatically generated ID to label', () => {
    const component = render(<EuiSwitch {...props} />);

    expect(component).toMatchSnapshot();
  });
  describe('labelProps', () => {
    it('is rendered', () => {
      const component = render(
        <EuiSwitch {...props} labelProps={requiredProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
