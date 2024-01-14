/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { css } from '@emotion/react';
import {
  render,
  waitForEuiToolTipHidden,
  waitForEuiToolTipVisible,
} from '../../../test/rtl';
import { requiredProps as commonProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import {
  EuiButtonGroup,
  EuiButtonGroupOptionProps,
  EuiButtonGroupProps,
} from './button_group';
import { BUTTON_COLORS } from '../../../themes/amsterdam/global_styling/mixins';
import { act, fireEvent } from '@testing-library/react';

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

  describe('tooltips', () => {
    it('shows a tooltip on hover', async () => {
      const { getByTestSubject, getByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
            },
          ]}
        />
      );
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      expect(getByRole('tooltip')).toHaveTextContent('Option 4');
    });

    it('shows a tooltip on focus', async () => {
      const { getByTestSubject, getByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
            },
          ]}
        />
      );
      fireEvent.focus(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      expect(getByRole('tooltip')).toHaveTextContent('Option 4');
    });

    it('allows overriding the default title', async () => {
      const { getByTestSubject, getByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              title: 'I am a tooltip',
            },
          ]}
        />
      );
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      expect(getByRole('tooltip')).toHaveTextContent('I am a tooltip');
    });

    it('allows customizing the tooltip delay', async () => {
      let result = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              title: 'I am a tooltip',
            },
          ]}
        />
      );
      fireEvent.mouseOver(result.getByTestSubject('buttonWithTooltip'));
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      expect(result.queryByRole('tooltip')).toBeNull();
      result.unmount();
      result = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              title: 'I am a tooltip',
              titleDelay: 'regular',
            },
          ]}
        />
      );
      fireEvent.mouseOver(result.getByTestSubject('buttonWithTooltip'));
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      expect(result.queryByRole('tooltip')).not.toBeNull();
    });

    it('allows customizing the tooltip position', async () => {
      let result = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              title: 'I am a tooltip',
            },
          ]}
        />
      );
      fireEvent.mouseOver(result.getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      expect(result.getByRole('tooltip')).toHaveAttribute(
        'data-position',
        'top'
      );
      result.unmount();
      result = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              title: 'I am a tooltip',
              titlePosition: 'bottom',
            },
          ]}
        />
      );
      fireEvent.mouseOver(result.getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      expect(result.getByRole('tooltip')).toHaveAttribute(
        'data-position',
        'bottom'
      );
    });

    it('does not show a tooltip for buttons with visible text', async () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              titleDelay: 'regular',
            },
          ]}
        />
      );
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip'));
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      expect(queryByRole('tooltip')).toBeNull();
    });

    it('hides the tooltip on click until rehovered/refocused', async () => {
      const { getByTestSubject, queryByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
            },
          ]}
        />
      );
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      fireEvent.click(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipHidden();
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      expect(queryByRole('tooltip')).toBeNull();
      fireEvent.focus(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipVisible();
      fireEvent.click(getByTestSubject('buttonWithTooltip'));
      await waitForEuiToolTipHidden();
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      });
      expect(queryByRole('tooltip')).toBeNull();
    });
  });
});
