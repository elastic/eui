import React from 'react';
import { shallow, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormRow } from '../form_row';
import { EuiDescribedFormGroup } from './described_form_group';

jest.mock(`../form_row/make_id`, () => () => `generated-id`);

describe('EuiDescriptiveFormRow', () => {
  const props = {
    title: <h3>Title</h3>,
    description: 'Test description',
  };

  test('is rendered', () => {
    const component = shallow(
      <EuiDescribedFormGroup {...requiredProps} {...props}>
        <EuiFormRow>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(component)
      .toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const descriptiveFormRowProps = {
      idAria: 'test-id',
    };

    const formRowProps = {
      label: `Label`,
      helpText: `Help text`,
      isInvalid: true,
      error: [
        `Error one`,
        `Error two`
      ],
      describedByIds: ['idAria'],
    };

    const tree = mount(
      <EuiDescribedFormGroup {...requiredProps} {...props} {...descriptiveFormRowProps}>
        <EuiFormRow {...formRowProps}>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(tree)
      .toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const descriptiveFormRowProps = {
        fullWidth: true,
      };

      const component = shallow(
        <EuiDescribedFormGroup {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const descriptiveFormRowProps = {
        gutterSize: 's',
      };

      const component = shallow(
        <EuiDescribedFormGroup {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component)
        .toMatchSnapshot();
    });

    test('titleSize is rendered', () => {
      const descriptiveFormRowProps = {
        titleSize: 'l',
      };

      const component = shallow(
        <EuiDescribedFormGroup {...requiredProps} {...props} {...descriptiveFormRowProps}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component)
        .toMatchSnapshot();
    });
  });
});
