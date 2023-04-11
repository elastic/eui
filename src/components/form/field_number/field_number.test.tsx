/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { EuiForm } from '../form';
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
    const { container } = render(
      <EuiFieldNumber
        id="1"
        name="elastic"
        min={1}
        max={8}
        step={1}
        value={1}
        icon="warning"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered from a prop', () => {
      const { container } = render(<EuiFieldNumber isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<EuiFieldNumber fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const { container } = render(<EuiFieldNumber isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const { container } = render(<EuiFieldNumber readOnly />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('controlOnly is rendered', () => {
      const { container } = render(<EuiFieldNumber controlOnly />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('inputRef', () => {
      const inputRef = jest.fn();
      const { container } = render(<EuiFieldNumber inputRef={inputRef} />);

      expect(inputRef).toHaveBeenCalledTimes(1);
      expect(container.querySelector('input[type="number"]')).toBe(
        inputRef.mock.calls[0][0]
      );
    });

    describe('value', () => {
      test('value is number', () => {
        const { container } = render(
          <EuiFieldNumber value={0} onChange={() => {}} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });

      test('no initial value', () => {
        const { container } = render(
          <EuiFieldNumber value={''} onChange={() => {}} />
        );
        expect(container.firstChild).toMatchSnapshot();
      });
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiFieldNumber />
        </EuiForm>
      );
      const control = container.querySelector('.euiFieldNumber')!;

      if (!control.classList.contains('euiFieldNumber--fullWidth')) {
        throw new Error(
          'expected EuiFieldNumber to inherit fullWidth from EuiForm'
        );
      }
    });
  });
});
