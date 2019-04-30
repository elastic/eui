import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldText } from './field_text';

jest.mock('../form_control_layout', () => {
  const formControlLayout = require.requireActual('../form_control_layout');
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
    const component = render(
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

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('isInvalid is rendered', () => {
      const component = render(<EuiFieldText isInvalid />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(<EuiFieldText fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(<EuiFieldText isLoading />);

      expect(component).toMatchSnapshot();
    });
  });
});
