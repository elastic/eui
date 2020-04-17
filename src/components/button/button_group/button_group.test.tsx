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
import { requiredProps } from '../../../test';

import { EuiButtonGroup, GroupButtonSize } from './button_group';
import { COLORS } from '../button';

const SIZES: GroupButtonSize[] = ['s', 'm', 'compressed'];

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
      <EuiButtonGroup onChange={() => {}} {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('options', () => {
      it('are rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} options={options} />
        );

        expect(component).toMatchSnapshot();
      });

      it('can pass down data-test-subj', () => {
        const options2 = [
          {
            id: 'button00',
            label: 'Option one',
            'data-test-subj': 'test',
          },
        ];

        const component = render(
          <EuiButtonGroup onChange={() => {}} options={options2} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('buttonSize', () => {
      SIZES.forEach(size => {
        test(`${size} is rendered`, () => {
          const component = render(
            <EuiButtonGroup
              onChange={() => {}}
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
          <EuiButtonGroup onChange={() => {}} isDisabled options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isFullWidth', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} isFullWidth options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('isIconOnly', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} isIconOnly options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('color', () => {
      COLORS.forEach(color => {
        test(`${color} is rendered`, () => {
          const component = render(
            <EuiButtonGroup
              onChange={() => {}}
              color={color}
              options={options}
            />
          );

          expect(component).toMatchSnapshot();
        });
      });
    });

    describe('legend', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            onChange={() => {}}
            legend="legend"
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('name', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} name="name" options={options} />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('idSelected', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup
            onChange={() => {}}
            idSelected="button00"
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });

    describe('type of multi', () => {
      it('is rendered', () => {
        const component = render(
          <EuiButtonGroup onChange={() => {}} type="multi" options={options} />
        );

        expect(component).toMatchSnapshot();
      });

      it('idToSelectedMap is rendered', () => {
        const component = render(
          <EuiButtonGroup
            onChange={() => {}}
            type="multi"
            idToSelectedMap={{ button00: true, button01: true }}
            options={options}
          />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
