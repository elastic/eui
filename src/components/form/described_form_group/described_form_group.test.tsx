/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow, render } from 'enzyme';
import { requiredProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { EuiForm } from '../form';
import { EuiFormRow } from '../form_row';
import { EuiDescribedFormGroup } from './described_form_group';

describe('EuiDescribedFormGroup', () => {
  const props = {
    title: <h3>Title</h3>,
    description: 'Test description',
  };

  shouldRenderCustomStyles(<EuiDescribedFormGroup {...props} />, {
    childProps: ['descriptionFlexItemProps', 'fieldFlexItemProps'],
  });

  test('is rendered', () => {
    const component = shallow(
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

    const tree = shallow(
      <EuiDescribedFormGroup {...props}>
        <EuiFormRow {...formRowProps}>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(tree).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = shallow(
        <EuiDescribedFormGroup fullWidth {...props}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('third is rendered', () => {
      const component = shallow(
        <EuiDescribedFormGroup ratio="third" {...props}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const component = shallow(
        <EuiDescribedFormGroup gutterSize="s" {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('titleSize is rendered', () => {
      const component = shallow(
        <EuiDescribedFormGroup titleSize="l" {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test("description is not rendered when it's not provided", () => {
      const component = shallow(
        <EuiDescribedFormGroup title={<h3>Title</h3>}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });

    test('props for the flex item containers are passed down', () => {
      const component = shallow(
        <EuiDescribedFormGroup
          {...props}
          descriptionFlexItemProps={{ grow: 2 }}
          fieldFlexItemProps={{ component: 'section' }}
        >
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const component = render(
        <EuiForm fullWidth>
          <EuiDescribedFormGroup {...props} />
        </EuiForm>
      );

      if (
        !component
          .find('.euiDescribedFormGroup')
          .hasClass('euiDescribedFormGroup--fullWidth')
      ) {
        throw new Error(
          'expected EuiDescribedFormGroup to inherit fullWidth from EuiForm'
        );
      }
    });
  });
});
