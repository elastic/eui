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

import { EuiFieldNumber } from './field_number';

jest.mock('../form_control_layout', () => {
  const formControlLayout = jest.requireActual('../form_control_layout');
  return {
    ...formControlLayout,
    EuiFormControlLayout: 'eui-form-control-layout',
  };
});
jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiFieldNumber', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldNumber
        id="1"
        name="elastic"
        min={1}
        max={8}
        step={1}
        value={1}
        icon="alert"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const component = render(<EuiFieldNumber isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFieldNumber fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFieldNumber isLoading />);

      expect(component).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const component = render(<EuiFieldNumber readOnly />);

      expect(component).toMatchSnapshot();
    });

    test('controlOnly is rendered', () => {
      const component = render(<EuiFieldNumber controlOnly />);

      expect(component).toMatchSnapshot();
    });

    describe('value', () => {
      test('value is number', () => {
        const component = render(
          <EuiFieldNumber value={0} onChange={() => {}} />
        );
        expect(component).toMatchSnapshot();
      });

      test('no initial value', () => {
        const component = render(
          <EuiFieldNumber value={''} onChange={() => {}} />
        );
        expect(component).toMatchSnapshot();
      });
    });
  });
});
