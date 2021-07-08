/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps as commonProps } from '../../../test';

import {
  EuiButtonGroup,
  EuiButtonGroupOptionProps,
  EuiButtonGroupProps,
} from './button_group';

import { COLORS } from '../button';

const SIZES: Array<EuiButtonGroupProps['buttonSize']> = [
  's',
  'm',
  'compressed',
];

const options: EuiButtonGroupOptionProps[] = [
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
    type: 'submit',
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
