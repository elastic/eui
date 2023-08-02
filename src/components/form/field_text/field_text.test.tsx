/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../../test/required_props';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiFieldText } from './field_text';

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

describe('EuiFieldText', () => {
  test('is rendered', () => {
    const { container } = render(
      <EuiFieldText
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        icon="foo"
        inputRef={() => {}}
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const { container } = render(<EuiFieldText isInvalid />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(<EuiFieldText fullWidth />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('readOnly is rendered', () => {
      const { container } = render(<EuiFieldText readOnly />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const { container } = render(<EuiFieldText isLoading />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('controlOnly is rendered', () => {
      const { container } = render(<EuiFieldText controlOnly />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { getByRole } = render(
        <EuiForm fullWidth>
          <EuiFieldText />
        </EuiForm>
      );

      const input = getByRole('textbox');
      expect(input).toHaveClass('euiFieldText--fullWidth');
    });
  });
});
