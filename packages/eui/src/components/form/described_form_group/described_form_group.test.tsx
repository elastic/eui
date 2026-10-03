/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
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

  it('renders', () => {
    const { container } = render(
      <EuiDescribedFormGroup {...requiredProps} {...props}>
        <EuiFormRow>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const formRowProps = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const { container } = render(
      <EuiDescribedFormGroup {...props}>
        <EuiFormRow {...formRowProps}>
          <input />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const { container } = render(
        <EuiDescribedFormGroup fullWidth {...props}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('third is rendered', () => {
      const { container } = render(
        <EuiDescribedFormGroup ratio="third" {...props}>
          <EuiFormRow fullWidth>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('gutterSize is rendered', () => {
      const { container } = render(
        <EuiDescribedFormGroup gutterSize="s" {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('titleSize is rendered', () => {
      const { container } = render(
        <EuiDescribedFormGroup titleSize="l" {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test("description is not rendered when it's not provided", () => {
      const { container } = render(
        <EuiDescribedFormGroup title={<h3>Title</h3>}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('props for the flex item containers are passed down', () => {
      const { container } = render(
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

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('accessible name', () => {
    const getGroup = (container: HTMLElement) =>
      container.querySelector('[role="group"]')!;

    test('the group is named by its title', () => {
      const { container } = render(
        <EuiDescribedFormGroup {...props}>
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      const titleId = container.querySelector('h3')!.id;
      expect(titleId).toBeTruthy();
      expect(getGroup(container)).toHaveAttribute('aria-labelledby', titleId);
    });

    test('an `id` already set on the title is reused', () => {
      const { container } = render(
        <EuiDescribedFormGroup
          {...props}
          title={<h3 id="customTitleId">Title</h3>}
        >
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(container.querySelector('h3')!.id).toEqual('customTitleId');
      expect(getGroup(container)).toHaveAttribute(
        'aria-labelledby',
        'customTitleId'
      );
    });

    test('a custom `aria-labelledby` takes precedence over the title', () => {
      const { container } = render(
        <EuiDescribedFormGroup {...props} aria-labelledby="customLabelId">
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(getGroup(container)).toHaveAttribute(
        'aria-labelledby',
        'customLabelId'
      );
    });

    test('a custom `aria-label` is not overridden by the title', () => {
      const { container } = render(
        <EuiDescribedFormGroup {...props} aria-label="Custom label">
          <EuiFormRow>
            <input />
          </EuiFormRow>
        </EuiDescribedFormGroup>
      );

      expect(getGroup(container)).toHaveAttribute('aria-label', 'Custom label');
      expect(getGroup(container)).not.toHaveAttribute('aria-labelledby');
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiDescribedFormGroup {...props} />
        </EuiForm>
      );

      expect(
        container.querySelector('.euiDescribedFormGroup')?.className
      ).toContain('euiDescribedFormGroup-fullWidth');
    });
  });
});
