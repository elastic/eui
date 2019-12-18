import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldPassword } from './field_password';

jest.mock('../form_control_layout', () => ({
  EuiFormControlLayout: 'eui-form-control-layout',
}));
jest.mock('../validatable_control', () => ({
  EuiValidatableControl: 'eui-validatable-control',
}));

describe('EuiFieldPassword', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldPassword
        name="elastic"
        id="1"
        placeholder="Placeholder"
        value="1"
        onChange={() => {}}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const component = render(<EuiFieldPassword isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFieldPassword fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFieldPassword isLoading />);

      expect(component).toMatchSnapshot();
    });
  });
});
