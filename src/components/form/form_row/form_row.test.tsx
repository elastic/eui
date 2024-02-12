/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { mount } from 'enzyme';
import { requiredProps } from '../../../test';
import { render } from '../../../test/rtl';

import { EuiForm } from '../form';
import { EuiFormRow, DISPLAYS } from './form_row';

describe('EuiFormRow', () => {
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

    const tree = mount(
      <EuiFormRow {...requiredProps} {...props}>
        <input />
      </EuiFormRow>
    );

    // Input is labeled by the label.
    expect(tree.find('input').prop('id')).toEqual('generated-id');
    expect(tree.find('EuiFormLabel').prop('htmlFor')).toEqual('generated-id');

    // Input is described by help and error text.
    expect(tree.find('EuiFormHelpText').prop('id')).toEqual(
      'generated-id-help-0'
    );
    expect(tree.find('EuiFormErrorText').at(0).prop('id')).toEqual(
      'generated-id-error-0'
    );
    expect(tree.find('EuiFormErrorText').at(1).prop('id')).toEqual(
      'generated-id-error-1'
    );
    expect(tree.find('input').prop('aria-describedby')).toEqual(
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
    describe('onFocus', () => {
      test('is called in child', () => {
        const focusMock = jest.fn();

        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input onFocus={focusMock} />
          </EuiFormRow>
        );

        component.find('input').simulate('focus');

        expect(focusMock).toBeCalledTimes(1);

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input />
          </EuiFormRow>
        );

        component.find('input').simulate('focus');

        // Ensure the focus event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component).toMatchSnapshot();
      });
    });

    describe('onBlur', () => {
      test('is called in child', () => {
        const blurMock = jest.fn();

        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input onBlur={blurMock} />
          </EuiFormRow>
        );

        component.find('input').simulate('blur');

        expect(blurMock).toBeCalledTimes(1);

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component).toMatchSnapshot();
      });

      test('works in parent even if not in child', () => {
        const component = mount(
          <EuiFormRow label={<span>Label</span>}>
            <input />
          </EuiFormRow>
        );

        component.find('input').simulate('blur');

        // Ensure the blur event is properly fired on the parent
        // which will pass down to the EuiFormLabel
        expect(component).toMatchSnapshot();
      });
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
      expect(row).toHaveClass('euiFormRow--fullWidth');
    });
  });
});
