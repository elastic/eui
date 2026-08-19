/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { _EuiThemeSizes } from '@elastic/eui-theme-common';
import { css } from '@emotion/react';
import { fireEvent } from '@testing-library/react';
import { render, focusEuiToolTipTrigger, renderHook } from '../../../test/rtl';
import { requiredProps as commonProps } from '../../../test';
import { shouldRenderCustomStyles } from '../../../test/internal';

import { useEuiTheme } from '../../../services';
import { BUTTON_COLORS } from '../../../global_styling/mixins';
import { EuiToolTip } from '../../tool_tip';
import { EuiButton } from '../button';
import { EuiButtonEmpty } from '../button_empty/button_empty';
import { EuiButtonIcon } from '../button_icon/button_icon';
import {
  EuiButtonGroup,
  EuiButtonGroupOptionProps,
  EuiButtonGroupProps,
  EuiButtonGroupGutterSize,
} from './button_group';

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

    describe('hasAriaDisabled', () => {
      it('renders buttons with `aria-disabled` when `isDisabled=true`', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup
            {...requiredSingleProps}
            isDisabled
            hasAriaDisabled
            data-test-subj="button-group"
          />
        );

        const button = getByTestSubject('button01');
        const fieldset = getByTestSubject('button-group');

        expect(button).toBeEuiDisabled();
        expect(fieldset).toBeEuiDisabled();

        expect(button).toHaveAttribute('aria-disabled', 'true');
        expect(fieldset).toHaveAttribute('aria-disabled', 'true');
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
    it('shows a tooltip on hover and focus', async () => {
      const { getByTestSubject, getByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              toolTipContent: 'I am a tooltip',
            },
          ]}
        />
      );
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip'));

      expect(getByRole('tooltip')).toHaveTextContent('I am a tooltip');

      fireEvent.mouseOut(getByTestSubject('buttonWithTooltip'));

      const cleanup = focusEuiToolTipTrigger(
        getByTestSubject('buttonWithTooltip')
      );
      fireEvent.blur(getByTestSubject('buttonWithTooltip'));
      cleanup();
    });

    it('shows a tooltip on hover and focus when custom disabled via `hasAriaDisabled`', async () => {
      const { getByTestSubject, findByRole } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          isDisabled
          hasAriaDisabled
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              toolTipContent: 'I am a tooltip',
            },
          ]}
        />
      );

      // NOTE: uses `parentElement` as the hover event is triggered on the tooltip wrapper.
      // The button itself doesn't allow mouse events when disabled.
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip').parentElement!);

      expect(await findByRole('tooltip')).toHaveTextContent('I am a tooltip');

      fireEvent.mouseOut(getByTestSubject('buttonWithTooltip').parentElement!);

      const cleanup = focusEuiToolTipTrigger(
        getByTestSubject('buttonWithTooltip')
      );
      fireEvent.blur(getByTestSubject('buttonWithTooltip'));
      cleanup();
    });

    it('allows customizing the tooltip via `toolTipProps`', () => {
      const { getByTestSubject } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: 'Option 4',
              toolTipContent: 'I am a tooltip',
              toolTipProps: {
                position: 'right',

                'data-test-subj': 'toolTipTest',
              },
            },
          ]}
        />
      );
      fireEvent.mouseOver(getByTestSubject('buttonWithTooltip'));

      expect(getByTestSubject('toolTipTest')).toHaveAttribute(
        'data-position',
        'right'
      );
    });

    it('allows consumers to unset the `title` in favor of a tooltip', () => {
      const reallyLongLabel =
        'This is a really long label that we know will be truncated, so we show a tooltip instead and hide the title';

      const { getByTestSubject } = render(
        <EuiButtonGroup
          {...requiredMultiProps}
          isIconOnly
          options={[
            ...options,
            {
              id: 'buttonWithTooltip',
              label: reallyLongLabel,
              toolTipContent: reallyLongLabel,
              title: undefined,
            },
          ]}
        />
      );
      expect(getByTestSubject('buttonWithTooltip')).not.toHaveAttribute(
        'title'
      );
      expect(getByTestSubject('button01')).toHaveAttribute(
        'title',
        'Option two'
      );
    });
  });

  describe('children API', () => {
    shouldRenderCustomStyles(
      <EuiButtonGroup legend="test">
        <EuiButton>Save</EuiButton>
      </EuiButtonGroup>
    );

    it('renders a `role="group"` with an `aria-label` from `legend`', () => {
      const { getByRole, container } = render(
        <EuiButtonGroup legend="Actions">
          <EuiButton>Save</EuiButton>
        </EuiButtonGroup>
      );

      const group = getByRole('group', { name: 'Actions' });
      expect(group.tagName).toBe('DIV');
      expect(container.querySelector('fieldset')).toBeNull();
      expect(container.querySelector('legend')).toBeNull();
    });

    it('sets `aria-disabled="true"` on the group when `isDisabled=true`', () => {
      const { getByRole } = render(
        <EuiButtonGroup legend="Actions" isDisabled>
          <EuiButton>Save</EuiButton>
        </EuiButtonGroup>
      );

      expect(getByRole('group', { name: 'Actions' })).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });

    describe('variant', () => {
      it('defaults to "default"', () => {
        const { getByRole } = render(
          <EuiButtonGroup legend="test">
            <EuiButton>Save</EuiButton>
          </EuiButtonGroup>
        );
        expect(getByRole('group')).toHaveAttribute('data-variant', 'default');
      });

      describe('default', () => {
        it('does not wrap children in `euiButtonGroup__item`', () => {
          const { container } = render(
            <EuiButtonGroup legend="test" variant="default">
              <EuiButton>One</EuiButton>
              <EuiButton>Two</EuiButton>
            </EuiButtonGroup>
          );

          expect(
            container.querySelectorAll('.euiButtonGroup__item')
          ).toHaveLength(0);
        });

        describe('gutterSize', () => {
          test.each<{
            gutterSize: EuiButtonGroupGutterSize;
            expected: string | undefined;
          }>([
            { gutterSize: 'none', expected: undefined },
            { gutterSize: 'xs', expected: 'xs' },
            { gutterSize: 's', expected: 's' },
            { gutterSize: 'm', expected: 'base' },
            { gutterSize: 'l', expected: 'l' },
            { gutterSize: 'xl', expected: 'xl' },
          ])(
            'renders a gap of $expected when `gutterSize` is `$gutterSize`',
            ({ gutterSize, expected }) => {
              const { result } = renderHook(() => useEuiTheme());
              const { container } = render(
                <EuiButtonGroup legend="test" gutterSize={gutterSize}>
                  <EuiButton>Save</EuiButton>
                </EuiButtonGroup>
              );

              if (expected === undefined) {
                expect(
                  container.querySelector('.euiButtonGroup__buttons')
                ).not.toHaveStyleRule('gap');
                return;
              } else {
                const expectedGutterSize =
                  result.current.euiTheme.size[
                    expected as keyof _EuiThemeSizes
                  ];

                expect(
                  container.querySelector('.euiButtonGroup__buttons')
                ).toHaveStyleRule('gap', expectedGutterSize);
              }
            }
          );
        });
      });

      describe('segmented', () => {
        it('applies data-variant="segmented"', () => {
          const { getByRole } = render(
            <EuiButtonGroup legend="test" variant="segmented">
              <EuiButton>Save</EuiButton>
            </EuiButtonGroup>
          );
          expect(getByRole('group')).toHaveAttribute(
            'data-variant',
            'segmented'
          );
        });

        it('wraps each child in a `euiButtonGroup__item` wrapper', () => {
          const { container } = render(
            <EuiButtonGroup legend="test" variant="segmented">
              <EuiButton data-test-subj="child-1">One</EuiButton>
              <EuiButton data-test-subj="child-2">Two</EuiButton>
            </EuiButtonGroup>
          );

          const items = container.querySelectorAll('.euiButtonGroup__item');

          expect(items).toHaveLength(2);
          expect(items[0]).toContainElement(
            container.querySelector('[data-test-subj="child-1"]')
          );
          expect(items[1]).toContainElement(
            container.querySelector('[data-test-subj="child-2"]')
          );
        });

        it('correctly removes fragment wrappers', () => {
          const { container } = render(
            <EuiButtonGroup legend="test" variant="segmented">
              <>
                <EuiButton data-test-subj="child-1">One</EuiButton>
                <EuiButton data-test-subj="child-2">Two</EuiButton>
              </>
              <EuiButton data-test-subj="child-3">Three</EuiButton>
            </EuiButtonGroup>
          );

          expect(
            container.querySelectorAll('.euiButtonGroup__item')
          ).toHaveLength(3);
        });

        it('drops non-element nodes (null, booleans) when wrapping', () => {
          const { container } = render(
            <EuiButtonGroup legend="test" variant="segmented">
              <EuiButton>One</EuiButton>
              {false}
              {null}
              <EuiButton>Two</EuiButton>
            </EuiButtonGroup>
          );

          expect(
            container.querySelectorAll('.euiButtonGroup__item')
          ).toHaveLength(2);
        });

        it('overrides children button `color` to `text`', () => {
          const { getByTestSubject } = render(
            <EuiButtonGroup legend="test" variant="segmented">
              <EuiButton color="danger" data-test-subj="child">
                One
              </EuiButton>
            </EuiButtonGroup>
          );

          expect(getByTestSubject('child').className).not.toContain('danger');
          expect(getByTestSubject('child').className).toContain('text');
        });
      });
    });

    describe('showDividers', () => {
      it('does not set `data-dividers` when false (default)', () => {
        const { getByRole } = render(
          <EuiButtonGroup legend="test" variant="segmented">
            <EuiButton>One</EuiButton>
          </EuiButtonGroup>
        );
        expect(getByRole('group')).not.toHaveAttribute('data-dividers');
      });

      it('sets `data-dividers` when true', () => {
        const { getByRole } = render(
          <EuiButtonGroup legend="test" variant="segmented" showDividers>
            <EuiButton>One</EuiButton>
          </EuiButtonGroup>
        );
        expect(getByRole('group')).toHaveAttribute('data-dividers', 'true');
      });
    });

    describe('layout', () => {
      it('sets `data-layout="horizontal"` as default', () => {
        const { getByRole } = render(
          <EuiButtonGroup legend="test" variant="segmented">
            <EuiButtonIcon iconType="bolt" aria-label="One" />
          </EuiButtonGroup>
        );
        expect(getByRole('group')).toHaveAttribute('data-layout', 'horizontal');
      });

      it('sets `data-layout="vertical"`', () => {
        const { getByRole } = render(
          <EuiButtonGroup legend="test" variant="segmented" layout="vertical">
            <EuiButtonIcon iconType="bolt" aria-label="One" />
          </EuiButtonGroup>
        );
        expect(getByRole('group')).toHaveAttribute('data-layout', 'vertical');
      });

      it('does not apply `fullWidth` to the buttons container when `layout="vertical"`', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="segmented"
            isFullWidth
            layout="vertical"
            data-test-subj="group"
          >
            <EuiButtonIcon iconType="bolt" aria-label="One" />
          </EuiButtonGroup>
        );

        expect(
          getByTestSubject('group').querySelector('.euiButtonGroup__container')!
            .className
        ).not.toContain('fullWidth');
      });

      it('applies `fullWidth` to the buttons container when `layout="horizontal"`', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="segmented"
            isFullWidth
            layout="horizontal"
            data-test-subj="group"
          >
            <EuiButtonIcon iconType="bolt" aria-label="One" />
          </EuiButtonGroup>
        );

        expect(
          getByTestSubject('group').querySelector('.euiButtonGroup__container')!
            .className
        ).toContain('fullWidth');
      });
    });

    describe('buttonSize', () => {
      it('overrides children buttons own `size` when set to "m"', () => {
        const { result } = renderHook(() => useEuiTheme());
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" buttonSize="m">
            <EuiButton size="s" data-test-subj="child-1">
              Child
            </EuiButton>
            <EuiButtonEmpty size="s" data-test-subj="child-2">
              Child
            </EuiButtonEmpty>
            <EuiToolTip content="Child" disableScreenReaderOutput>
              <EuiButtonIcon
                size="xs"
                color="primary"
                iconType="bolt"
                aria-label="child"
                data-test-subj="child-3"
              />
            </EuiToolTip>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child-1')).toHaveStyleRule(
          'block-size',
          result.current.euiTheme.size.xxl
        );

        expect(getByTestSubject('child-2')).toHaveStyleRule(
          'block-size',
          result.current.euiTheme.size.xxl
        );

        expect(getByTestSubject('child-3')).toHaveStyleRule(
          'block-size',
          result.current.euiTheme.size.xxl
        );
      });

      it('overrides children buttons own `size` when set to "s"', () => {
        const { result } = renderHook(() => useEuiTheme());
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" buttonSize="s">
            <EuiButton size="m" data-test-subj="child-1">
              Child
            </EuiButton>
            <EuiButtonEmpty size="xs" data-test-subj="child-2">
              Child
            </EuiButtonEmpty>
            <EuiToolTip content="Child" disableScreenReaderOutput>
              <EuiButtonIcon
                size="xs"
                color="primary"
                iconType="bolt"
                aria-label="child"
                data-test-subj="child-3"
              />
            </EuiToolTip>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child-1')).toHaveStyleRule(
          'block-size',
          result.current.euiTheme.size.xl
        );

        expect(getByTestSubject('child-2')).toHaveStyleRule(
          'block-size',
          result.current.euiTheme.size.xl
        );

        expect(getByTestSubject('child-3')).toHaveStyleRule(
          'block-size',
          result.current.euiTheme.size.xl
        );
      });
    });

    describe('isFullWidth', () => {
      it('applies fullWidth to the group', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" isFullWidth data-test-subj="group">
            <EuiButton data-test-subj="child">Child</EuiButton>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('group').className).toContain('fullWidth');
        expect(getByTestSubject('child')).toHaveStyleRule(
          'inline-size',
          '100%'
        );
      });

      it('applies fullWidth to EuiButton children', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" isFullWidth>
            <EuiButton data-test-subj="child">Child</EuiButton>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child').className).toContain('fullWidth');
        expect(getByTestSubject('child')).toHaveStyleRule(
          'inline-size',
          '100%'
        );
      });

      it('does not apply fullWidth to EuiButtonEmpty children', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" isFullWidth>
            <EuiButtonEmpty data-test-subj="child">Child</EuiButtonEmpty>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child').className).not.toContain('fullWidth');
        expect(getByTestSubject('child')).not.toHaveStyleRule(
          'inline-size',
          '100%'
        );
      });

      it('does not apply fullWidth to EuiButtonIcon children', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" isFullWidth>
            <EuiToolTip content="Child" disableScreenReaderOutput>
              <EuiButtonIcon
                size="xs"
                color="primary"
                iconType="bolt"
                aria-label="child"
                data-test-subj="child"
              />
            </EuiToolTip>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child').className).not.toContain('fullWidth');
        expect(getByTestSubject('child')).not.toHaveStyleRule(
          'inline-size',
          '100%'
        );
      });
    });

    describe('isDisabled', () => {
      it('disables children buttons', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="Actions" isDisabled>
            <EuiButton size="s" data-test-subj="child-1">
              Child
            </EuiButton>
            <EuiButtonEmpty size="s" data-test-subj="child-2">
              Child
            </EuiButtonEmpty>
            <EuiToolTip content="Child" disableScreenReaderOutput>
              <EuiButtonIcon
                size="xs"
                color="primary"
                iconType="bolt"
                aria-label="child"
                data-test-subj="child-3"
              />
            </EuiToolTip>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child-1').closest('button')).toBeDisabled();
        expect(getByTestSubject('child-2').closest('button')).toBeDisabled();
        expect(getByTestSubject('child-3').closest('button')).toBeDisabled();
      });

      it('does not enable manually disabled children buttons', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="Actions" isDisabled={false}>
            <EuiButton size="s" isDisabled data-test-subj="child-1">
              Child
            </EuiButton>
            <EuiButtonEmpty size="s" isDisabled data-test-subj="child-2">
              Child
            </EuiButtonEmpty>
            <EuiToolTip content="Child" disableScreenReaderOutput>
              <EuiButtonIcon
                size="xs"
                isDisabled
                color="primary"
                iconType="bolt"
                aria-label="child"
                data-test-subj="child-3"
              />
            </EuiToolTip>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child-1').closest('button')).toBeDisabled();
        expect(getByTestSubject('child-2').closest('button')).toBeDisabled();
        expect(getByTestSubject('child-3').closest('button')).toBeDisabled();
      });
    });

    describe('hasAriaDisabled', () => {
      it('applies `aria-disabled` instead of `disabled` to children buttons', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="Actions" isDisabled hasAriaDisabled>
            <EuiButton size="s" data-test-subj="child-1">
              Child
            </EuiButton>
            <EuiButtonEmpty size="s" data-test-subj="child-2">
              Child
            </EuiButtonEmpty>
            <EuiToolTip content="Child" disableScreenReaderOutput>
              <EuiButtonIcon
                size="xs"
                color="primary"
                iconType="bolt"
                aria-label="child"
                data-test-subj="child-3"
              />
            </EuiToolTip>
          </EuiButtonGroup>
        );

        expect(getByTestSubject('child-1').closest('button')).toHaveAttribute(
          'aria-disabled',
          'true'
        );
        expect(
          getByTestSubject('child-1').closest('button')
        ).not.toHaveAttribute('disabled');

        expect(getByTestSubject('child-2').closest('button')).toHaveAttribute(
          'aria-disabled',
          'true'
        );
        expect(
          getByTestSubject('child-2').closest('button')
        ).not.toHaveAttribute('disabled');

        expect(getByTestSubject('child-3').closest('button')).toHaveAttribute(
          'aria-disabled',
          'true'
        );
        expect(
          getByTestSubject('child-3').closest('button')
        ).not.toHaveAttribute('disabled');
      });
    });
  });

  describe('variant="selection"', () => {
    const selectionChildren = (
      <>
        <EuiButton id="button-1" data-test-subj="button-1">
          One
        </EuiButton>
        <EuiButton id="button-2" data-test-subj="button-2">
          Two
        </EuiButton>
        <EuiButton id="button-3" data-test-subj="button-3">
          Three
        </EuiButton>
      </>
    );

    it('applies `data-variant="selection"` to the group element', () => {
      const { getByRole } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          {selectionChildren}
        </EuiButtonGroup>
      );
      expect(getByRole('group')).toHaveAttribute('data-variant', 'selection');
    });

    it('sets `data-display="regular"` by default', () => {
      const { getByRole } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          {selectionChildren}
        </EuiButtonGroup>
      );
      expect(getByRole('group')).toHaveAttribute('data-display', 'regular');
    });

    it('sets `data-display="highlighted"` by default', () => {
      const { getByRole } = render(
        <EuiButtonGroup
          legend="test"
          variant="selection"
          display="highlighted"
          onChange={() => {}}
        >
          {selectionChildren}
        </EuiButtonGroup>
      );
      expect(getByRole('group')).toHaveAttribute('data-display', 'highlighted');
    });

    it('sets `data-display="inverse"` with `display="inverse"`', () => {
      const { getByRole } = render(
        <EuiButtonGroup
          legend="test"
          variant="selection"
          display="inverse"
          onChange={() => {}}
        >
          {selectionChildren}
        </EuiButtonGroup>
      );
      expect(getByRole('group')).toHaveAttribute('data-display', 'inverse');
    });

    it('wraps each child in a `euiButtonGroup__item` wrapper', () => {
      const { container } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          {selectionChildren}
        </EuiButtonGroup>
      );
      const items = container.querySelectorAll('.euiButtonGroup__item');
      expect(items).toHaveLength(3);
      expect(items[0]).toContainElement(
        container.querySelector('[data-test-subj="button-1"]')
      );
    });

    it('renders a `euiButtonGroup__container` element', () => {
      const { container } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          {selectionChildren}
        </EuiButtonGroup>
      );
      expect(
        container.querySelector('.euiButtonGroup__container')
      ).not.toBeNull();
    });

    it('correctly removes fragment wrappers', () => {
      const { container } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          <>
            <EuiButton id="button-1">One</EuiButton>
            <EuiButton id="button-2">Two</EuiButton>
          </>
          <EuiButton id="button-3">Three</EuiButton>
        </EuiButtonGroup>
      );
      expect(container.querySelectorAll('.euiButtonGroup__item')).toHaveLength(
        3
      );
    });

    it('drops non-element nodes (null, booleans) when wrapping', () => {
      const { container } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          <EuiButton id="button-1">One</EuiButton>
          {false}
          {null}
          <EuiButton id="button-2">Two</EuiButton>
        </EuiButtonGroup>
      );
      expect(container.querySelectorAll('.euiButtonGroup__item')).toHaveLength(
        2
      );
    });

    describe('type="single" (idSelected)', () => {
      it('fires onChange with the clicked button id', () => {
        const onChange = jest.fn();
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" variant="selection" onChange={onChange}>
            {selectionChildren}
          </EuiButtonGroup>
        );

        fireEvent.click(getByTestSubject('button-2'));
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith('button-2');
      });

      it('sets all buttons to `aria-pressed="false"` when `idSelected` is not set', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
            {selectionChildren}
          </EuiButtonGroup>
        );

        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
        expect(getByTestSubject('button-2')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
        expect(getByTestSubject('button-3')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
      });

      it('sets the selected button to `aria-pressed="true"`', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="selection"
            idSelected="button-1"
            onChange={() => {}}
          >
            {selectionChildren}
          </EuiButtonGroup>
        );

        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'true'
        );
        expect(getByTestSubject('button-2')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
      });

      it('applies consumer state', () => {
        const Controlled = () => {
          const [selected, setSelected] = React.useState('button-1');
          return (
            <EuiButtonGroup
              legend="test"
              variant="selection"
              idSelected={selected}
              onChange={(id) => setSelected(id)}
            >
              {selectionChildren}
            </EuiButtonGroup>
          );
        };
        const { getByTestSubject } = render(<Controlled />);

        fireEvent.click(getByTestSubject('button-2'));

        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
        expect(getByTestSubject('button-2')).toHaveAttribute(
          'aria-pressed',
          'true'
        );
      });
    });

    it('calls both group onChange and the button own onClick when clicked', () => {
      const onChange = jest.fn();
      const buttonOnClick = jest.fn();
      const { getByTestSubject } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={onChange}>
          <EuiButton
            id="button-1"
            data-test-subj="button-1"
            onClick={buttonOnClick}
          >
            One
          </EuiButton>
        </EuiButtonGroup>
      );

      fireEvent.click(getByTestSubject('button-1'));
      expect(onChange).toHaveBeenCalledWith('button-1');
      expect(buttonOnClick).toHaveBeenCalledTimes(1);
    });

    describe('type="multi"', () => {
      it('fires onChange with the clicked button id', () => {
        const onChange = jest.fn();
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="selection"
            type="multi"
            onChange={onChange}
          >
            {selectionChildren}
          </EuiButtonGroup>
        );

        fireEvent.click(getByTestSubject('button-1'));
        expect(onChange).toHaveBeenCalledWith('button-1');

        fireEvent.click(getByTestSubject('button-2'));
        expect(onChange).toHaveBeenCalledWith('button-2');

        expect(onChange).toHaveBeenCalledTimes(2);
      });

      it('marks all buttons as `aria-pressed="false"` when no `idToSelectedMap` is provided', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="selection"
            type="multi"
            onChange={() => {}}
          >
            {selectionChildren}
          </EuiButtonGroup>
        );

        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
        expect(getByTestSubject('button-2')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
        expect(getByTestSubject('button-3')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
      });

      it('marks selected buttons via `idToSelectedMap`', () => {
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="selection"
            type="multi"
            idToSelectedMap={{ 'button-1': true, 'button-3': true }}
            onChange={() => {}}
          >
            {selectionChildren}
          </EuiButtonGroup>
        );

        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'true'
        );
        expect(getByTestSubject('button-2')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
        expect(getByTestSubject('button-3')).toHaveAttribute(
          'aria-pressed',
          'true'
        );
      });

      it('applies consumer state', () => {
        const Controlled = () => {
          const [map, setMap] = React.useState<Record<string, boolean>>({});
          return (
            <EuiButtonGroup
              legend="test"
              variant="selection"
              type="multi"
              idToSelectedMap={map}
              onChange={(id) =>
                setMap((prev) => ({ ...prev, [id]: !prev[id] }))
              }
            >
              {selectionChildren}
            </EuiButtonGroup>
          );
        };
        const { getByTestSubject } = render(<Controlled />);

        fireEvent.click(getByTestSubject('button-1'));
        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'true'
        );

        fireEvent.click(getByTestSubject('button-1'));
        expect(getByTestSubject('button-1')).toHaveAttribute(
          'aria-pressed',
          'false'
        );
      });

      it('calls both group onChange and the button own onClick when clicked', () => {
        const onChange = jest.fn();
        const buttonOnClick = jest.fn();
        const { getByTestSubject } = render(
          <EuiButtonGroup
            legend="test"
            variant="selection"
            type="multi"
            onChange={onChange}
          >
            <EuiButton
              id="button-1"
              data-test-subj="button-1"
              onClick={buttonOnClick}
            >
              One
            </EuiButton>
          </EuiButtonGroup>
        );

        fireEvent.click(getByTestSubject('button-1'));
        expect(onChange).toHaveBeenCalledWith('button-1');
        expect(buttonOnClick).toHaveBeenCalledTimes(1);
      });
    });

    it('disables all child buttons when `isDisabled=true`', () => {
      const { getByTestSubject } = render(
        <EuiButtonGroup
          legend="test"
          variant="selection"
          isDisabled
          onChange={() => {}}
        >
          {selectionChildren}
        </EuiButtonGroup>
      );

      expect(getByTestSubject('button-1').closest('button')).toBeDisabled();
      expect(getByTestSubject('button-2').closest('button')).toBeDisabled();
      expect(getByTestSubject('button-3').closest('button')).toBeDisabled();
    });

    it('applies `aria-disabled` instead of `disabled` to children when `hasAriaDisabled=true`', () => {
      const { getByTestSubject } = render(
        <EuiButtonGroup
          legend="test"
          variant="selection"
          isDisabled
          hasAriaDisabled
          onChange={() => {}}
        >
          {selectionChildren}
        </EuiButtonGroup>
      );

      expect(getByTestSubject('button-1').closest('button')).toHaveAttribute(
        'aria-disabled',
        'true'
      );
      expect(
        getByTestSubject('button-1').closest('button')
      ).not.toHaveAttribute('disabled');

      expect(getByTestSubject('button-2').closest('button')).toHaveAttribute(
        'aria-disabled',
        'true'
      );
      expect(
        getByTestSubject('button-2').closest('button')
      ).not.toHaveAttribute('disabled');
    });

    it('overrides button `color` to `text`', () => {
      const { getByTestSubject } = render(
        <EuiButtonGroup legend="test" variant="selection" onChange={() => {}}>
          <EuiButton id="button-1" color="danger" data-test-subj="button-1">
            One
          </EuiButton>
        </EuiButtonGroup>
      );

      expect(getByTestSubject('button-1').className).not.toContain('danger');
      expect(getByTestSubject('button-1').className).toContain('text');
    });

    it('handles EuiButtonIcon children', () => {
      const onChange = jest.fn();
      const { container } = render(
        <EuiButtonGroup
          legend="icon selection"
          variant="selection"
          idSelected="icon-a"
          onChange={onChange}
        >
          <EuiButtonIcon
            id="icon-a"
            iconType="grid"
            aria-label="Grid"
            data-test-subj="icon-a"
          />
          <EuiButtonIcon
            id="icon-b"
            iconType="list"
            aria-label="List"
            data-test-subj="icon-b"
          />
        </EuiButtonGroup>
      );

      // Wrapped in items
      expect(container.querySelectorAll('.euiButtonGroup__item')).toHaveLength(
        2
      );

      // Initially selected
      expect(
        container.querySelector('[data-test-subj="icon-a"]')
      ).toHaveAttribute('aria-pressed', 'true');

      // Click triggers onChange
      fireEvent.click(container.querySelector('[data-test-subj="icon-b"]')!);
      expect(onChange).toHaveBeenCalledWith('icon-b');
    });
  });
});
