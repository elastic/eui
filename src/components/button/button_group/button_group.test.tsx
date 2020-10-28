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
import { render } from 'enzyme';
import { requiredProps as commonProps } from '../../../test';

import { EuiButtonGroup, EuiButtonGroupProps } from './button_group';
import { COLORS } from '../button';

const SIZES: Array<EuiButtonGroupProps['buttonSize']> = [
  's',
  'm',
  'compressed',
];

const options = [
  {
    id: 'button00',
    label: 'Option one',
    iconType: 'bolt',
    ...commonProps,
  },
  {
    id: 'button01',
    label: 'Option two',
    iconType: 'bolt',
  },
  {
    id: 'button02',
    label: 'Option three',
    iconType: 'bolt',
    isDisabled: true,
  },
];

const requiredSingleProps: EuiButtonGroupProps = {
  type: 'single',
  legend: 'test',
  onChange: () => {},
  options,
  name: 'test',
  idSelected: '',
};

const requiredMultiProps: EuiButtonGroupProps = {
  type: 'multi',
  legend: 'test',
  onChange: () => {},
  options,
};

describe('EuiButtonGroup', () => {
  describe('type', () => {
    test('single is rendered', () => {
      const component = render(
        <EuiButtonGroup {...requiredSingleProps} {...commonProps} />
      );

      expect(component).toMatchSnapshot();
    });
    test('multi is rendered', () => {
      const component = render(
        <EuiButtonGroup {...requiredMultiProps} {...commonProps} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('button props', () => {
    describe('buttonSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered for single`, () => {
          const component = render(
            <EuiButtonGroup {...requiredSingleProps} buttonSize={size} />
          );

          expect(component).toMatchSnapshot();
        });
        test(`${size} is rendered for multi`, () => {
          const component = render(
            <EuiButtonGroup {...requiredMultiProps} buttonSize={size} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('isDisabled', () => {
      it('is rendered for single', () => {
        const component = render(
          <EuiButtonGroup {...requiredSingleProps} isDisabled />
        );

        expect(component).toMatchSnapshot();
      });
      it('is rendered for multi', () => {
        const component = render(
          <EuiButtonGroup {...requiredMultiProps} isDisabled />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isFullWidth', () => {
      it('is rendered for single', () => {
        const component = render(
          <EuiButtonGroup {...requiredSingleProps} isFullWidth />
        );

        expect(component).toMatchSnapshot();
      });
      it('is rendered for multi', () => {
        const component = render(
          <EuiButtonGroup {...requiredMultiProps} isFullWidth />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isIconOnly', () => {
      it('is rendered for single', () => {
        const component = render(
          <EuiButtonGroup {...requiredSingleProps} isIconOnly />
        );

        expect(component).toMatchSnapshot();
      });
      it('is rendered for multi', () => {
        const component = render(
          <EuiButtonGroup {...requiredMultiProps} isIconOnly />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered for single`, () => {
          const component = render(
            <EuiButtonGroup {...requiredSingleProps} color={color} />
          );

          expect(component).toMatchSnapshot();
        });
        test(`${color} is rendered for multi`, () => {
          const component = render(
            <EuiButtonGroup {...requiredMultiProps} color={color} />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('selection', () => {
      it('idSelected is rendered for single', () => {
        const component = render(
          <EuiButtonGroup {...requiredSingleProps} idSelected={options[0].id} />
        );

        expect(component).toMatchSnapshot();
      });

      it('idToSelectedMap is rendered for multi', () => {
        const component = render(
          <EuiButtonGroup
            {...requiredMultiProps}
            idToSelectedMap={{ [options[0].id]: true, [options[1].id]: true }}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
