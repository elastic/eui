/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiFormRow, DISPLAYS } from './form_row';

describe('EuiFormRow', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFormRow {...requiredProps}>
        <input />
      </EuiFormRow>
    );

    expect(component).toMatchSnapshot();
  });

  test('ties together parts for accessibility', () => {
    const props = {
      label: 'Label',
      helpText: 'Help text',
      isInvalid: true,
      error: ['Error one', 'Error two'],
    };

    const tree = shallow(
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
      const component = shallow(
        <EuiFormRow label="label">
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('label append is rendered', () => {
      const component = shallow(
        <EuiFormRow label="label" labelAppend="append">
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('label renders as a legend and subsquently a fieldset wrapper', () => {
      const component = shallow(
        <EuiFormRow label="label" labelType="legend">
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('describedByIds is rendered', () => {
      const component = shallow(
        <EuiFormRow describedByIds={['generated-id-additional']}>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('id is rendered', () => {
      const component = render(
        <EuiFormRow id="id">
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('isInvalid is rendered', () => {
      const component = render(
        <EuiFormRow isInvalid label="label">
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error as string is rendered', () => {
      const component = render(
        <EuiFormRow error="Error" isInvalid={true}>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error as array is rendered', () => {
      const component = render(
        <EuiFormRow error={['Error', 'Error2']} isInvalid={true}>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('error is not rendered if isInvalid is false', () => {
      const component = render(
        <EuiFormRow error={['Error']} isInvalid={false}>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('helpText is rendered', () => {
      const component = render(
        <EuiFormRow helpText={<span>This is help text.</span>}>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('hasEmptyLabelSpace is rendered', () => {
      const component = render(
        <EuiFormRow hasEmptyLabelSpace>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    test('fullWidth is rendered', () => {
      const component = render(
        <EuiFormRow fullWidth>
          <input />
        </EuiFormRow>
      );

      expect(component).toMatchSnapshot();
    });

    describe('display type', () => {
      DISPLAYS.forEach((display) => {
        test(`${display} is rendered`, () => {
          const component = render(
            <EuiFormRow display={display}>
              <input />
            </EuiFormRow>
          );

          expect(component).toMatchSnapshot();
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
});
