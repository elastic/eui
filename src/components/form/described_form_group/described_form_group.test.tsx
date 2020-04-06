import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormRow } from '../form_row';
import { EuiDescribedFormGroup } from './described_form_group';

jest.mock('./../../../services/accessibility', () => ({
  htmlIdGenerator: () => () => 'generated-id',
}));

describe('EuiDescribedFormGroup', () => {
  const props = {
    title: <h3>Title</h3>,
    description: 'Test description',
  };

  test('is rendered', () => {
    const component = mount(
      <EuiDescribedFormGroup {...requiredProps} {...props}>
        <EuiFormRow>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(component).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const formRowProps = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const tree = mount(
      <EuiDescribedFormGroup {...requiredProps} {...props}>
        <EuiFormRow {...formRowProps}>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const describedFormGroupProps = {
        fullWidth: true,
      };

      const component = mount(
        <EuiDescribedFormGroup
          {...requiredProps}
          {...props}
          {...describedFormGroupProps}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const component = mount(
        <EuiDescribedFormGroup gutterSize="s" {...requiredProps} {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize is rendered', () => {
      const component = mount(
        <EuiDescribedFormGroup titleSize="l" {...requiredProps} {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test("description is not rendered when it's not provided", () => {
      const component = mount(
        <EuiDescribedFormGroup {...requiredProps} title={<h3>Title</h3>}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
