/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import { render } from '../../../test/rtl';
import { requiredProps as commonProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import {
  EuiButtonGroup,
  EuiButtonGroupOptionProps,
  EuiButtonGroupProps,
} from './button_group';
import { BUTTON_COLORS } from '../../../themes/amsterdam/global_styling/mixins';

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
    isDisabled: true,
    type: 'submit',
  },
];

const requiredSingleProps: EuiButtonGroupProps = {
  type: 'single',
  legend: 'test',
  onChange: () => {},
  options,
  idSelected: '',
};

const requiredMultiProps: EuiButtonGroupProps = {
  type: 'multi',
  legend: 'test',
  onChange: () => {},
  options,
};

describe('EuiButtonGroup', () => {
  describe('type="single"', () => {
    shouldRenderCustomStyles(<EuiButtonGroup {...requiredSingleProps} />);

    it('renders', () => {
      const { container } = render(
        <EuiButtonGroup {...requiredSingleProps} {...commonProps} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('idSelected', () => {
      const { container } = render(
        <EuiButtonGroup {...requiredSingleProps} idSelected={options[0].id} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('type="multi"', () => {
    shouldRenderCustomStyles(<EuiButtonGroup {...requiredMultiProps} />);

    it('renders', () => {
      const { container } = render(
        <EuiButtonGroup {...requiredMultiProps} {...commonProps} />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('idToSelectedMap', () => {
      const { container } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          idToSelectedMap={{ [options[0].id]: true, [options[1].id]: true }}
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('button props', () => {
    describe('buttonSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered for single`, () => {
          const { container } = render(
            <EuiButtonGroup {...requiredSingleProps} buttonSize={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
        test(`${size} is rendered for multi`, () => {
          const { container } = render(
            <EuiButtonGroup {...requiredMultiProps} buttonSize={size} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });

    describe('isDisabled', () => {
      it('is rendered for single', () => {
        const { container } = render(
          <EuiButtonGroup {...requiredSingleProps} isDisabled />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
      it('is rendered for multi', () => {
        const { container } = render(
          <EuiButtonGroup {...requiredMultiProps} isDisabled />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isFullWidth', () => {
      it('is rendered for single', () => {
        const { container } = render(
          <EuiButtonGroup {...requiredSingleProps} isFullWidth />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
      it('is rendered for multi', () => {
        const { container } = render(
          <EuiButtonGroup {...requiredMultiProps} isFullWidth />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('isIconOnly', () => {
      it('is rendered for single', () => {
        const { container } = render(
          <EuiButtonGroup {...requiredSingleProps} isIconOnly />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
      it('is rendered for multi', () => {
        const { container } = render(
          <EuiButtonGroup {...requiredMultiProps} isIconOnly />
        );

        expect(container.firstChild).toMatchSnapshot();
      });
    });

    describe('color', () => {
      BUTTON_COLORS.forEach((color) => {
        test(`${color} is rendered for single`, () => {
          const { container } = render(
            <EuiButtonGroup {...requiredSingleProps} color={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
        test(`${color} is rendered for multi`, () => {
          const { container } = render(
            <EuiButtonGroup {...requiredMultiProps} color={color} />
          );

          expect(container.firstChild).toMatchSnapshot();
        });
      });
    });
  });

  it('correctly merges css props passed to `options`', () => {
    const { getByTestSubject } = render(
      <EuiButtonGroup
        {...requiredMultiProps}
        options={[
          ...options,
          {
            id: 'buttonWithCss',
            label: 'Option 4',
            css: css`
              text-transform: uppercase;
            `,
          },
        ]}
      />
    );

    expect(getByTestSubject('buttonWithCss')).toHaveStyle(
      'text-transform: uppercase'
    );
  });
});
