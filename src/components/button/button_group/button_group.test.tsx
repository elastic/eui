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

import { EuiButtonGroup } from './button_group';
import { EuiButtonGroupProps } from './types';
import { COLORS } from '../button';

const SIZES: Array<EuiButtonGroupProps['buttonSize']> = [
  's',
  'm',
  'compressed',
];

const requiredProps = {
  legend: 'test',
  onChange: () => {},
  options: [],
  ...commonProps,
};

const options = [
  {
    id: 'button00',
    label: 'Option one',
  },
  {
    id: 'button01',
    label: 'Option two',
  },
  {
    id: 'button02',
    label: 'Option three',
  },
];

describe('EuiButtonGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButtonGroup type="single" idSelected="" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('options', () => {
      it('are rendered', () => {
        const component = render(
          <EuiButtonGroup
            type="single"
            idSelected=""
            {...requiredProps}
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonSize', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiButtonGroup
              type="single"
              idSelected=""
              {...requiredProps}
              buttonSize={size}
              options={options}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('isDisabled', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            type="single"
            idSelected=""
            {...requiredProps}
            isDisabled
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isFullWidth', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            type="single"
            idSelected=""
            {...requiredProps}
            isFullWidth
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isIconOnly', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            type="single"
            idSelected=""
            {...requiredProps}
            isIconOnly
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonGroup
              type="single"
              idSelected=""
              {...requiredProps}
              color={color}
              options={options}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('idSelected', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            type="single"
            idSelected={options[0].id}
            {...requiredProps}
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('type of multi', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup type="multi" {...requiredProps} options={options} />
        );

        expect(component).toMatchSnapshot();
      });

      it('idToSelectedMap is rendered', () => {
        const component = render(
          <EuiButtonGroup
            {...requiredProps}
            type="multi"
            idToSelectedMap={{ [options[0].id]: true, [options[1].id]: true }}
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
