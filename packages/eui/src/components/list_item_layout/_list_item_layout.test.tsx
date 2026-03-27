/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, either the Elastic License 2.0 or the
 * Server Side Public License, v 1.
 */

import React from 'react';
import {
  render,
  waitForEuiToolTipHidden,
  waitForEuiToolTipVisible,
} from '../../test/rtl';
import { requiredProps } from '../../test/required_props';
import { shouldRenderCustomStyles } from '../../test/internal';
import { EuiListItemLayout } from './_list_item_layout';
import { fireEvent } from '@testing-library/react';
import { EuiButtonIcon } from '../button';

const NON_INTERACTRIVE_ELEMENTS = ['li', 'div'] as const;
const INTERACTIVE_ELEMENTS = [
  ['button', { component: 'button' }],
  ['a', { component: 'a', href: '#' }],
] as const;

describe('EuiListItemLayout', () => {
  shouldRenderCustomStyles(
    <EuiListItemLayout component="li" {...requiredProps}>
      Option
    </EuiListItemLayout>
  );

  shouldRenderCustomStyles(
    <EuiListItemLayout component="button" {...requiredProps}>
      Option
    </EuiListItemLayout>
  );

  shouldRenderCustomStyles(
    <EuiListItemLayout
      component="button"
      wrapperComponent="li"
      {...requiredProps}
    >
      Option
    </EuiListItemLayout>,
    {
      childProps: ['wrapperProps'],
    }
  );

  test('is rendered as li element', () => {
    const { container } = render(
      <EuiListItemLayout component="li">Option</EuiListItemLayout>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered as button element', () => {
    const { container } = render(
      <EuiListItemLayout component="button">Option</EuiListItemLayout>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered as anchor element', () => {
    const { container } = render(
      <EuiListItemLayout component="a">Option</EuiListItemLayout>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered as div element', () => {
    const { container } = render(
      <EuiListItemLayout component="div">Option</EuiListItemLayout>
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    describe('component', () => {
      NON_INTERACTRIVE_ELEMENTS.forEach((name) => {
        describe(`${name}`, () => {
          it(`renders as ${name} element`, () => {
            const { getByTestSubject } = render(
              <EuiListItemLayout component={name}>Option</EuiListItemLayout>
            );

            const element = getByTestSubject('euiListItemLayout');

            expect(element).toBeInTheDocument();
            expect(element.tagName).toBe(name.toUpperCase());
          });
        });
      });

      INTERACTIVE_ELEMENTS.forEach(([name, props]) => {
        describe(`${name}`, () => {
          it(`renders as ${name} element`, () => {
            const { getByTestSubject } = render(
              <EuiListItemLayout {...props}>Option</EuiListItemLayout>
            );

            const element = getByTestSubject('euiListItemLayout');

            expect(element).toBeInTheDocument();
            expect(element.tagName).toBe(name.toUpperCase());
          });
        });
      });

      describe('multi-selection (`isSingleSelection=false`)', () => {
        NON_INTERACTRIVE_ELEMENTS.forEach((name) => {
          describe(`${name}`, () => {
            it('renders `aria-checked="true"` for a checkable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="option"
                  checked="on"
                  isSelected
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-checked', 'true');
              expect(element).not.toHaveAttribute('aria-selected');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-checked="false"` for a checkable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="option"
                  checked={undefined}
                  isSelected={false}
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-checked', 'false');
              expect(element).not.toHaveAttribute('aria-selected');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-selected="true"` for a non-checkable, selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="tab"
                  checked="on"
                  isSelected
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-selected', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-selected="false"` for a non-checkable, selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="tab"
                  checked={undefined}
                  isSelected={false}
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-selected', 'false');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-current="true"` for a non-checkable, non-selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="presentation"
                  checked="on"
                  isSelected
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-current', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-selected');
            });

            it('renders `aria-current=undefined` for a non-checkable, non-selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="presentation"
                  checked={undefined}
                  isSelected={false}
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).not.toHaveAttribute('aria-current');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-selected');
            });

            describe('with `role="option"`', () => {
              it('renders `aria-checked` when `isSingleSelection=false`', () => {
                const { getByTestSubject } = render(
                  <EuiListItemLayout
                    component={name}
                    role="option"
                    isSingleSelection={false}
                    checked="on"
                    isSelected={true}
                  >
                    Option
                  </EuiListItemLayout>
                );

                const element = getByTestSubject('euiListItemLayout');
                expect(element).toHaveAttribute('aria-checked', 'true');
                expect(element).not.toHaveAttribute('aria-selected');
              });

              it('renders `aria-selected` when `isSingleSelection=true`', () => {
                const { getByTestSubject } = render(
                  <EuiListItemLayout
                    component={name}
                    role="option"
                    isSingleSelection
                    checked="on"
                    isSelected={true}
                  >
                    Option
                  </EuiListItemLayout>
                );

                const element = getByTestSubject('euiListItemLayout');
                expect(element).toHaveAttribute('aria-selected', 'true');
                expect(element).not.toHaveAttribute('aria-checked');
              });
            });
          });
        });

        INTERACTIVE_ELEMENTS.forEach(([name, props]) => {
          describe(`${name}`, () => {
            it('applies `aria-current="true"`', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  {...props}
                  checked="on"
                  isSelected
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-current', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-selected');
            });

            it('applies custom `aria-selected`', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  {...props}
                  aria-selected="true"
                  checked="on"
                  isSelected
                  isSingleSelection={false}
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-selected', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-current');
            });
          });
        });
      });

      describe('single-selection (`isSingleSelection=true`)', () => {
        NON_INTERACTRIVE_ELEMENTS.forEach((name) => {
          describe(`${name}`, () => {
            it('renders `aria-checked="true"` for a natively checkable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="menuitemcheckbox"
                  checked="on"
                  isSelected
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-checked', 'true');
              expect(element).not.toHaveAttribute('aria-selected');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-checked="false"` for a natively checkable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="menuitemcheckbox"
                  checked={undefined}
                  isSelected={false}
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-checked', 'false');
              expect(element).not.toHaveAttribute('aria-selected');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-selected="true"` for a checkable, selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="option"
                  checked="on"
                  isSelected
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-selected', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-selected="false"` for a checkable, selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="option"
                  checked={undefined}
                  isSelected={false}
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-selected', 'false');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-current');
            });

            it('renders `aria-current="true"` for a non-checkable, non-selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="presentation"
                  checked="on"
                  isSelected
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-current', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-selected');
            });

            it('renders `aria-current=undefined` for a non-checkable, non-selectable role', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  component={name}
                  role="presentation"
                  checked={undefined}
                  isSelected={false}
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).not.toHaveAttribute('aria-current');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-selected');
            });
          });
        });

        INTERACTIVE_ELEMENTS.forEach(([name, props]) => {
          describe(`${name}`, () => {
            it('applies `aria-current="true"`', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  {...props}
                  checked="on"
                  isSelected
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-current', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-selected');
            });

            it('applies custom `aria-selected`', () => {
              const { getByTestSubject } = render(
                <EuiListItemLayout
                  {...props}
                  aria-selected="true"
                  checked="on"
                  isSelected
                  isSingleSelection
                >
                  Option
                </EuiListItemLayout>
              );

              const element = getByTestSubject('euiListItemLayout');
              expect(element).toHaveAttribute('aria-selected', 'true');
              expect(element).not.toHaveAttribute('aria-checked');
              expect(element).not.toHaveAttribute('aria-current');
            });
          });
        });
      });
    });

    describe('href, target, rel', () => {
      it('passes anchor props to the element when `component=a`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="a"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('href', '#');
        expect(element).toHaveAttribute('target', '_blank');
        expect(element).toHaveAttribute('rel', 'noopener noreferrer');
      });

      it('does not passes anchor props to the element when it is not `component=a`', () => {
        const { getByTestSubject } = render(
          // @ts-expect-error - testing invalid props
          <EuiListItemLayout
            component="button"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).not.toHaveAttribute('href', '#');
        expect(element).not.toHaveAttribute('target', '_blank');
        expect(element).not.toHaveAttribute('rel', 'noopener noreferrer');
      });
    });

    describe('role', () => {
      it('applies a role attribute', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" role="menuitemcheckbox">
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('role', 'menuitemcheckbox');
      });
    });

    describe('isDisabled', () => {
      it('applies a visual disabled state', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" isDisabled>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const classes = Array.from(element.classList) as string[];
        expect(classes.some((clx) => clx.includes('isDisabled'))).toBe(true);
      });

      it('applies a semantic disabled state when `component=li`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" isDisabled>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('aria-disabled', 'true');
        expect(element).not.toHaveAttribute('disabled');
      });

      it('applies a semantic disabled state when `component=button`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="button" isDisabled>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('disabled');
      });

      it('renders a disabled `button` when `component=a`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="a" isDisabled>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element.tagName).toBe('BUTTON');
      });
    });

    describe('checked', () => {
      it('applies a checked state for multi-selection items when `checked="on"`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            checked="on"
            isSingleSelection={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const checkbox = element.querySelector('.EuiCheckboxControl');

        expect(element).toHaveAttribute('aria-checked', 'true');
        expect(checkbox).toBeInTheDocument();
        expect(
          element.querySelector('[data-euiicon-type="check"]')
        ).toBeInTheDocument();
      });

      it('applies an unchecked state for multi-selection items when `checked=undefined`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            checked={undefined}
            isSingleSelection={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const checkbox = element.querySelector('.EuiCheckboxControl');

        expect(element).toHaveAttribute('aria-checked', 'false');
        expect(checkbox).toBeInTheDocument();
        expect(
          element.querySelector('[data-euiicon-type="empty"]')
        ).toBeInTheDocument();
      });

      it('applies an exclusion state for multi-selection items when checked="off"', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            checked="off"
            isSingleSelection={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const checkbox = element.querySelector('.EuiCheckboxControl');

        expect(element).toHaveAttribute('aria-checked', 'true');
        expect(checkbox).toBeInTheDocument();
        expect(
          element.querySelector('[data-euiicon-type="cross"]')
        ).toBeInTheDocument();
      });

      it('applies an indeterminate state for multi-selection items when checked="mixed"', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            checked="mixed"
            isSingleSelection={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const checkbox = element.querySelector('.EuiCheckboxControl');

        expect(element).toHaveAttribute('aria-checked', 'mixed');
        expect(checkbox).toBeInTheDocument();
        expect(
          element.querySelector('[data-euiicon-type="stopFill"]')
        ).toBeInTheDocument();
      });

      it('applies an indeterminate state for a supported custom `role`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="checkbox"
            checked="mixed"
            isSingleSelection={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('aria-checked', 'mixed');
      });

      it('applies does not apply an indeterminate state for a non supported custom `role`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="radio"
            checked="mixed"
            isSingleSelection={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('aria-checked', 'false');
      });
    });

    describe('isSelected', () => {
      it('applies a selected state when `isSingleSelection=true`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            isSelected
            isSingleSelection
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const classes = Array.from(element.classList) as string[];

        expect(element).toHaveAttribute('aria-selected', 'true');
        expect(classes.some((clx) => clx.includes('isSelected'))).toBe(true);
      });

      it('applies `aria-current` when `component=button`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="button" isSelected>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');

        expect(element).toHaveAttribute('aria-current', 'true');
      });

      it('applies `aria-current` when `component=a`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="button" isSelected>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');

        expect(element).toHaveAttribute('aria-current', 'true');
      });

      it('applies `aria-current` when `component=li` without selectable role', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" isSelected>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');

        expect(element).toHaveAttribute('aria-current', 'true');
      });

      it('applies `aria-current` when `component=div` without selectable role', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="div" isSelected>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');

        expect(element).toHaveAttribute('aria-current', 'true');
      });
    });

    describe('isFocused', () => {
      it('applies a pseudofocus state', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" isFocused>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const classes = Array.from(element.classList) as string[];

        expect(classes.some((clx) => clx.includes('isFocused'))).toBe(true);
      });
    });

    describe('selectionMode', () => {
      it('overrides the default selection mode when `isSingleSelection=true`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            checked="on"
            isSingleSelection
            selectionMode="checked"
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('aria-checked', 'true');
        expect(element).not.toHaveAttribute('aria-selected');
      });

      it('overrides the default selection mode when `isSingleSelection=false`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            role="option"
            isSelected
            isSingleSelection={false}
            selectionMode="selected"
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element).toHaveAttribute('aria-selected', 'true');
        expect(element).not.toHaveAttribute('aria-checked');
      });
    });

    describe('showIndicator', () => {
      it('hides the indicator element when `showIndicator=false`for single selection', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" showIndicator={false}>
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(
          element.querySelector('.euiListItemLayout__icon')
        ).not.toBeInTheDocument();
      });

      it('hides the indicator element when `showIndicator=false` for multi selection', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            isSingleSelection={false}
            showIndicator={false}
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(
          element.querySelector('.euiListItemLayout__checkbox')
        ).not.toBeInTheDocument();
      });
    });

    describe('textWrap', () => {
      it('applies truncation styles when `textWrap="truncate"`', () => {
        const label = 'A longer option label that should be truncated';

        const { getByText } = render(
          <EuiListItemLayout component="li" textWrap="truncate">
            {label}
          </EuiListItemLayout>
        );

        const text = getByText(label);
        const classes = Array.from(text.classList) as string[];
        expect(classes.some((clx) => clx.includes('text-truncate'))).toBe(true);

        expect(text).toHaveStyleRule('text-overflow', 'ellipsis!important');
        expect(text).toHaveStyleRule('white-space', 'nowrap!important');
      });

      it('does not add truncation styles when `textWrap="wrap"`', () => {
        const label = 'A longer option label that should not be truncated';

        const { getByText } = render(
          <EuiListItemLayout component="li" textWrap="wrap">
            {label}
          </EuiListItemLayout>
        );

        const text = getByText(label);
        const classes = Array.from(text.classList) as string[];
        expect(classes.some((clx) => clx.includes('text-wrap'))).toBe(true);

        expect(text).not.toHaveStyleRule('text-overflow', 'ellipsis');
        expect(text).not.toHaveStyleRule('white-space', 'nowrap');
      });
    });

    describe('prepend', () => {
      it('renders prepended content', () => {
        const { getByText } = render(
          <EuiListItemLayout component="li" prepend={<span>Prepend</span>}>
            Option
          </EuiListItemLayout>
        );

        expect(getByText('Prepend')).toBeInTheDocument();
      });
    });

    describe('append', () => {
      it('renders appended content', () => {
        const { getByText } = render(
          <EuiListItemLayout component="li" append={<span>Append</span>}>
            Option
          </EuiListItemLayout>
        );

        expect(getByText('Append')).toBeInTheDocument();
      });
    });

    describe('wrapperComponent', () => {
      it('renders a wrapping `div` element when component="button"', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="button" wrapperComponent="div">
            Option
          </EuiListItemLayout>
        );

        expect(getByTestSubject('euiListItemLayout').tagName).toBe('BUTTON');
        expect(getByTestSubject('euiListItemLayout-wrapper').tagName).toBe(
          'DIV'
        );
      });

      it('renders a wrapping `div` element when component="a"', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="a" wrapperComponent="div">
            Option
          </EuiListItemLayout>
        );

        expect(getByTestSubject('euiListItemLayout').tagName).toBe('A');
        expect(getByTestSubject('euiListItemLayout-wrapper').tagName).toBe(
          'DIV'
        );
      });

      it('does not have any effect on the element when component="li"', () => {
        const { getByTestSubject, container } = render(
          <EuiListItemLayout component="li" wrapperComponent="div">
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element.tagName).toBe('LI');
        expect(container.firstChild).toBe(element);
      });

      it('does not have any effect on the element when component="div"', () => {
        const { getByTestSubject, container } = render(
          <EuiListItemLayout component="div" wrapperComponent="li">
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        expect(element.tagName).toBe('DIV');
        expect(container.firstChild).toBe(element);
      });
    });

    describe('extraAction', () => {
      it('renders a wrapping `li` element and a sibling extra action to the main element when component="button"', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="button"
            extraAction={
              <EuiButtonIcon
                iconType="ellipsis"
                aria-label="Extra action"
                data-test-subj="extra-action"
              />
            }
          >
            Option
          </EuiListItemLayout>
        );

        const wrapper = getByTestSubject('euiListItemLayout-wrapper');
        const element = getByTestSubject('euiListItemLayout');
        const extraAction = getByTestSubject('extra-action');

        expect(element.tagName).toBe('BUTTON');
        expect(wrapper.tagName).toBe('LI');
        expect(element).not.toContainElement(extraAction);
        expect(wrapper.childNodes[0]).toBe(element);
        expect(wrapper.childNodes[1]).toBe(extraAction);
      });

      it('renders a wrapping `li` and a sibling extra action to the main element when component="a"', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="a"
            extraAction={
              <EuiButtonIcon
                iconType="ellipsis"
                aria-label="Extra action"
                data-test-subj="extra-action"
              />
            }
          >
            Option
          </EuiListItemLayout>
        );

        const wrapper = getByTestSubject('euiListItemLayout-wrapper');
        const element = getByTestSubject('euiListItemLayout');
        const extraAction = getByTestSubject('extra-action');

        expect(element.tagName).toBe('A');
        expect(wrapper.tagName).toBe('LI');
        expect(element).not.toContainElement(extraAction);
        expect(wrapper.childNodes[0]).toBe(element);
        expect(wrapper.childNodes[1]).toBe(extraAction);
      });

      it('does not render a wrapping `li` element when component="li"', () => {
        const { getByTestSubject, container } = render(
          <EuiListItemLayout
            component="li"
            extraAction={
              <EuiButtonIcon
                iconType="ellipsis"
                aria-label="Extra action"
                data-test-subj="extra-action"
              />
            }
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const extraAction = getByTestSubject('extra-action');

        expect(element.tagName).toBe('LI');
        expect(container.firstChild).toBe(element);
        expect(element).toContainElement(extraAction);
      });

      it('does not render a wrapping `li` element when component="div"', () => {
        const { getByTestSubject, container } = render(
          <EuiListItemLayout
            component="div"
            extraAction={
              <EuiButtonIcon
                iconType="ellipsis"
                aria-label="Extra action"
                data-test-subj="extra-action"
              />
            }
          >
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('euiListItemLayout');
        const extraAction = getByTestSubject('extra-action');

        expect(element.tagName).toBe('DIV');
        expect(container.firstChild).toBe(element);
        expect(element).toContainElement(extraAction);
      });

      it('renders a wrapping `div` element and a sibling extra action to the main element when `wrapperComponent="div"`', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="button"
            wrapperComponent="div"
            extraAction={
              <EuiButtonIcon
                iconType="ellipsis"
                aria-label="Extra action"
                data-test-subj="extra-action"
              />
            }
          >
            Option
          </EuiListItemLayout>
        );

        const wrapper = getByTestSubject('euiListItemLayout-wrapper');
        const element = getByTestSubject('euiListItemLayout');
        const extraAction = getByTestSubject('extra-action');

        expect(element.tagName).toBe('BUTTON');
        expect(wrapper.tagName).toBe('DIV');
        expect(element).not.toContainElement(extraAction);
        expect(wrapper.childNodes[0]).toBe(element);
        expect(wrapper.childNodes[1]).toBe(extraAction);
      });
    });

    describe('wrapperProps', () => {
      it('passes `wrapperProps` to the wrapper element when `wrapperComponent` is defined', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="button"
            wrapperComponent="li"
            wrapperProps={{
              className: 'item-wrapper',
              'data-test-subj': 'item-wrapper',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        const wrapper = getByTestSubject('item-wrapper');

        expect(wrapper).toBeInTheDocument();
        expect(wrapper).toHaveClass('item-wrapper');
        expect(wrapper.firstChild).toBe(getByTestSubject('euiListItemLayout'));
      });

      it('passes `wrapperProps` to the wrapper element when `extraAction` is passed', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="button"
            extraAction={
              <EuiButtonIcon iconType="ellipsis" aria-label="Extra action" />
            }
            wrapperProps={{
              className: 'item-wrapper',
              'data-test-subj': 'item-wrapper',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        const wrapper = getByTestSubject('item-wrapper');

        expect(wrapper).toBeInTheDocument();
        expect(wrapper).toHaveClass('item-wrapper');
        expect(wrapper.firstChild).toBe(getByTestSubject('euiListItemLayout'));
      });

      it('does not apply `wrapperProps` when `wrapperComponent` is not defined', () => {
        const { container } = render(
          <EuiListItemLayout
            component="li"
            wrapperProps={{
              className: 'item-wrapper',
              'data-test-subj': 'item-wrapper',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        expect(
          container.querySelector('.item-wrapper')
        ).not.toBeInTheDocument();
      });

      it('does not apply `wrapperProps` when `wrapperComponent="div"` and `component="li"`', () => {
        const { container } = render(
          <EuiListItemLayout
            component="li"
            wrapperComponent="div"
            wrapperProps={{
              className: 'item-wrapper',
              'data-test-subj': 'item-wrapper',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        expect(
          container.querySelector('.item-wrapper')
        ).not.toBeInTheDocument();
      });

      it('does not apply `wrapperProps` when `wrapperComponent="li"` and `component="div"`', () => {
        const { container } = render(
          <EuiListItemLayout
            component="li"
            wrapperComponent="div"
            wrapperProps={{
              className: 'item-wrapper',
              'data-test-subj': 'item-wrapper',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        expect(
          container.querySelector('.item-wrapper')
        ).not.toBeInTheDocument();
      });
    });

    describe('contentProps', () => {
      it('passes `contentProps` to the content element', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            contentProps={{
              className: 'item-content',
              'data-test-subj': 'item-content',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        const content = getByTestSubject('item-content');

        expect(content).toBeInTheDocument();
        expect(content).toHaveClass('item-content');
      });
    });

    describe('textProps', () => {
      it('passes `textProps` to the text element', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            textProps={{
              className: 'item-text',
              'data-test-subj': 'item-text',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        const text = getByTestSubject('item-text');

        expect(text).toBeInTheDocument();
        expect(text).toHaveClass('item-text');
      });
    });

    describe('prependProps', () => {
      it('passes `prependProps` to the prepended element', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            prepend={<span>Prepend</span>}
            prependProps={{
              className: 'item-prepend',
              'data-test-subj': 'item-prepend',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        const prepend = getByTestSubject('item-prepend');

        expect(prepend).toBeInTheDocument();
        expect(prepend).toHaveClass('item-prepend');
        expect(prepend.firstChild).toHaveTextContent('Prepend');
      });
    });

    describe('appendProps', () => {
      it('passes `appendProps` to the appended element', () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            append={<span>Append</span>}
            appendProps={{
              className: 'item-append',
              'data-test-subj': 'item-append',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        const append = getByTestSubject('item-append');

        expect(append).toBeInTheDocument();
        expect(append).toHaveClass('item-append');
        expect(append.firstChild).toHaveTextContent('Append');
      });
    });

    describe('tooltipProps', () => {
      NON_INTERACTRIVE_ELEMENTS.forEach((name) => {
        it(`renders a tooltip and passes 'tooltipProps' when component=${name}`, async () => {
          const { baseElement, getByTestSubject } = render(
            <EuiListItemLayout
              component={name as 'li' | 'div'}
              tooltipProps={{
                title: 'Tooltip',
                content: 'Tooltip content',
                delay: 'regular',
                position: 'bottom',
                'data-test-subj': 'item-tooltip',
              }}
            >
              Option
            </EuiListItemLayout>
          );

          const tooltipAnchor = baseElement.querySelector('.euiToolTipAnchor');

          expect(tooltipAnchor).toBeInTheDocument();

          fireEvent.mouseOver(tooltipAnchor!);
          await waitForEuiToolTipVisible();

          expect(getByTestSubject('item-tooltip')).toBeInTheDocument();
        });
      });

      INTERACTIVE_ELEMENTS.forEach(([name]) => {
        it(`renders a tooltip and passes 'tooltipProps' when component=${name}`, async () => {
          const { baseElement, getByTestSubject } = render(
            <EuiListItemLayout
              component={name as 'button' | 'a'}
              tooltipProps={{
                title: 'Tooltip',
                content: 'Tooltip content',
                delay: 'regular',
                position: 'bottom',
                'data-test-subj': 'item-tooltip',
              }}
            >
              Option
            </EuiListItemLayout>
          );

          const element = getByTestSubject('euiListItemLayout');
          const tooltipAnchor = baseElement.querySelector('.euiToolTipAnchor');

          expect(tooltipAnchor).toBeInTheDocument();

          fireEvent.focus(element);
          await waitForEuiToolTipVisible();

          expect(getByTestSubject('item-tooltip')).toBeInTheDocument();
        });
      });

      it('shows a tooltip when `isFocused=true` and a non interactive element is rendered', async () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="li"
            isFocused
            tooltipProps={{
              title: 'Tooltip',
              content: 'Tooltip content',
              delay: 'regular',
              position: 'bottom',
              'data-test-subj': 'item-tooltip',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        await waitForEuiToolTipVisible();

        expect(getByTestSubject('item-tooltip')).toBeInTheDocument();
      });

      it('shows a tooltip when `isFocused=true` and an interactive element is rendered', async () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="button"
            isFocused
            tooltipProps={{
              title: 'Tooltip',
              content: 'Tooltip content',
              delay: 'regular',
              position: 'bottom',
              'data-test-subj': 'item-tooltip',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        await waitForEuiToolTipVisible();

        expect(getByTestSubject('item-tooltip')).toBeInTheDocument();
      });

      it('does not show a tooltip when `isFocused=false`', () => {
        render(
          <EuiListItemLayout
            component="button"
            isFocused={false}
            tooltipProps={{
              title: 'Tooltip',
              content: 'Tooltip content',
              delay: 'regular',
              position: 'bottom',
              'data-test-subj': 'item-tooltip',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        expect(
          document.querySelector('.euiToolTipPopover')
        ).not.toBeInTheDocument();
        expect(
          document.querySelector('[data-test-subj="item-tooltip"]')
        ).not.toBeInTheDocument();
      });

      it('does not show a tooltip when `isDisabled=true` and `isFocused=true`', async () => {
        render(
          <EuiListItemLayout
            component="button"
            isFocused
            isDisabled
            tooltipProps={{
              title: 'Tooltip',
              content: 'Tooltip content',
              delay: 'regular',
              position: 'bottom',
              'data-test-subj': 'item-tooltip',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        expect(
          document.querySelector('.euiToolTipPopover')
        ).not.toBeInTheDocument();
        expect(
          document.querySelector('[data-test-subj="item-tooltip"]')
        ).not.toBeInTheDocument();
      });

      it('hides a visible tooltip when `isFocused` is updated to `false`', async () => {
        const { getByTestSubject, rerender } = render(
          <EuiListItemLayout
            component="button"
            isFocused
            tooltipProps={{
              title: 'Tooltip',
              content: 'Tooltip content',
              delay: 'regular',
              position: 'bottom',
              'data-test-subj': 'item-tooltip',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        await waitForEuiToolTipVisible();

        expect(getByTestSubject('item-tooltip')).toBeInTheDocument();

        rerender(
          <EuiListItemLayout
            component="button"
            isFocused={false}
            tooltipProps={{
              title: 'Tooltip',
              content: 'Tooltip content',
              delay: 'regular',
              position: 'bottom',
              'data-test-subj': 'item-tooltip',
            }}
          >
            Option
          </EuiListItemLayout>
        );

        await waitForEuiToolTipHidden();
      });
    });

    describe('data-test-subj', () => {
      it('applies custom `data-test-subj`', async () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout component="li" data-test-subj="custom-selector">
            Option
          </EuiListItemLayout>
        );

        const element = getByTestSubject('custom-selector');

        expect(element).toBeInTheDocument();
      });

      it('applies custom `data-test-subj` to the wrapper if `wrapperComponent` is defined', async () => {
        const { getByTestSubject } = render(
          <EuiListItemLayout
            component="button"
            wrapperComponent="li"
            data-test-subj="custom-selector"
          >
            Option
          </EuiListItemLayout>
        );

        const wrapper = getByTestSubject('custom-selector-wrapper');
        const element = getByTestSubject('custom-selector');

        expect(wrapper).toBeInTheDocument();
        expect(element).toBeInTheDocument();
      });
    });
  });
});
