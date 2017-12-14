import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSelect } from './select';

jest.mock('../form_control_layout', () => ({ EuiFormControlLayout: 'eui-form-control-layout' }));
jest.mock('../validatable_control', () => ({ EuiValidatableControl: 'eui-validatable-control' }));

describe('EuiSelect', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSelect
        id="id"
        name="name"
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('options are rendered', () => {
      const component = render(
        <EuiSelect
          options={[
            { value: '1', text: 'Option #1' },
            { value: '2', text: 'Option #2' }
          ]}
        />
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(
        <EuiSelect isInvalid/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(
        <EuiSelect fullWidth/>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(
        <EuiSelect isLoading/>
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
