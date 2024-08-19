/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../test/rtl';
import { shouldRenderCustomStyles } from '../../../test/internal';
import { requiredProps } from '../../../test';

import { EuiForm } from '../form';
import { EuiFormRow, DISPLAYS } from './form_row';

describe('EuiFormRow', () => {
  shouldRenderCustomStyles(
    <EuiFormRow>
      <input />
    </EuiFormRow>
  );

  test('is rendered', () => {
    const { container } = render(
      <EuiFormRow {...requiredProps}>
        <input />
      </EuiFormRow>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const { container } = render(
      <EuiFormRow {...requiredProps} {...props}>
        <input />
      </EuiFormRow>
    );

    const input = container.querySelector('input')!;
    const label = container.querySelector('label')!;

    // Input is labeled by the label.
    expect(input).toHaveAttribute('id', 'generated-id');
    expect(label).toHaveAttribute('for', 'generated-id');

    const helpText = container.querySelector('.euiFormHelpText')!;
    const errorText = container.querySelectorAll('.euiFormErrorText');

    // Input is described by help and error text.
    expect(helpText).toHaveAttribute('id', 'generated-id-help-0');
    expect(errorText[0]).toHaveAttribute('id', 'generated-id-error-0');
    expect(errorText[1]).toHaveAttribute('id', 'generated-id-error-1');
    expect(input).toHaveAttribute(
      'aria-describedby',
      'generated-id-help-0 generated-id-error-0 generated-id-error-1'
    );
  });

  describe('props', () => {
    test('label is rendered', () => {
      const { container } = render(
        <EuiFormRow label="label">
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('label append is rendered', () => {
      const { container } = render(
        <EuiFormRow label="label" labelAppend="append">
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('label renders as a legend and subsquently a fieldset wrapper', () => {
      const { container } = render(
        <EuiFormRow label="label" labelType="legend">
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('describedByIds is rendered', () => {
      const { container } = render(
        <EuiFormRow describedByIds={['generated-id-additional']}>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('id is rendered', () => {
      const { container } = render(
        <EuiFormRow id="id">
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const { container } = render(
        <EuiFormRow isInvalid label="label">
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const { container } = render(
        <EuiFormRow error="Error" isInvalid={true}>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const { container } = render(
        <EuiFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const { container } = render(
        <EuiFormRow error={['Error']} isInvalid={false}>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('helpText is rendered', () => {
      const { container } = render(
        <EuiFormRow helpText={<span>This is help text.</span>}>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('hasEmptyLabelSpace is rendered', () => {
      const { container } = render(
        <EuiFormRow hasEmptyLabelSpace>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const { container } = render(
        <EuiFormRow fullWidth>
          <input />
        </EuiFormRow>
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('isDisabled', () => {
      test('is passed as disabled to child', () => {
        const { container } = render(
          <EuiFormRow isDisabled>
            <input />
          </EuiFormRow>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test("allows a child's disabled to override", () => {
        const { container } = render(
          <EuiFormRow isDisabled>
            <input disabled={false} />
          </EuiFormRow>
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      test('allows a child to still be disabled manually', () => {
        const { container } = render(
          <EuiFormRow>
            <input disabled />
          </EuiFormRow>
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('display type', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const { container } = render(
            <EuiFormRow display={display}>
              <input />
            </EuiFormRow>
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  describe('behavior', () => {
    it('onFocus and onBlur', () => {
      const focusMock = jest.fn();
      const blurMock = jest.fn();

      const { getByRole, container } = render(
        <EuiFormRow label={<span>Label</span>}>
          <input onFocus={focusMock} onBlur={blurMock} />
        </EuiFormRow>
      );
      const label = container.querySelector('.euiFormLabel')!;

      fireEvent.focus(getByRole('textbox'));
      expect(focusMock).toHaveBeenCalledTimes(1);
      expect(label.className).toContain('isFocused');

      fireEvent.blur(getByRole('textbox'));
      expect(blurMock).toHaveBeenCalledTimes(1);
      expect(label.className).not.toContain('isFocused');
    });
  });

  describe('inherits', () => {
    test('fullWidth from <EuiForm />', () => {
      const { container } = render(
        <EuiForm fullWidth>
          <EuiFormRow label={<span>Label</span>}>
            <input />
          </EuiFormRow>
        </EuiForm>
      );

      const row = container.querySelector('.euiFormRow');
      expect(row!.className).toContain('fullWidth');
    });
  });
});
