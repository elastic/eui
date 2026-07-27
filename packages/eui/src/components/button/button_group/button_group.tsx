/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classNames from 'classnames';
import React, {
  FunctionComponent,
  HTMLAttributes,
  ButtonHTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { type EuiDisabledProps } from '../../../services/hooks/useEuiDisabledElement';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';

import { _EuiButtonColor } from '../../../global_styling/mixins';
import { EuiToolTipProps } from '../../../components/tool_tip';
import { EuiButtonDisplayContentProps } from '../button_display/_button_display_content';
import { EuiButtonGroupButton } from './button_group_button';
import { EuiButtonGroupContext } from './button_group_context';
import {
  euiButtonGroupStyles,
  euiButtonGroupButtonsStyles,
} from './button_group.styles';

export interface EuiButtonGroupOptionProps
  extends Omit<EuiButtonDisplayContentProps, 'size'>,
    CommonProps,
    EuiDisabledProps {
  /**
   * Each option must have a unique `id` for maintaining selection
   */
  id: string;
  /**
   * Each option must have a `label` even for icons which will be applied as the `aria-label`
   */
  label: ReactNode;
  /**
   * The value of the radio input.
   */
  value?: any;
  /**
   * The type of the underlying HTML button
   */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /**
   * By default, will use the button text for the native browser title.
   *
   * This can be either customized or unset via `title: ''` if necessary.
   */
  title?: ButtonHTMLAttributes<HTMLButtonElement>['title'];
  /**
   * Optional custom tooltip content for the button
   */
  toolTipContent?: EuiToolTipProps['content'];
  /**
   * Optional props to pass to the underlying **[EuiToolTip](/#/display/tooltip)**
   */
  toolTipProps?: Partial<Omit<EuiToolTipProps, 'content' | 'children'>>;
}

export type EuiButtonGroupProps = CommonProps &
  EuiDisabledProps & {
    /**
     * Typical sizing is `s`. Medium `m` size should be reserved for major features.
     * `compressed` is meant to be used alongside and within compressed forms.
     */
    buttonSize?: 's' | 'm' | 'compressed';
    /**
     * Expands the whole group to the full width of the container.
     * Each button gets equal widths no matter the content
     */
    isFullWidth?: boolean;
    /**
     * Hides the label to only show the `iconType` provided by the `option`
     */
    isIconOnly?: boolean;
    /**
     * A hidden group title (required for accessibility)
     */
    legend: string;
    /**
     * Any of the named color palette options.
     *
     * Do not use the following colors for standalone buttons directly,
     * they exist to serve other components:
     *  - accent
     *  - warning
     */
    color?: _EuiButtonColor;
    /**
     * Actual type is `'single' | 'multi'`.
     * Determines how the selection of the group should be handled.
     * With `'single'` only one option can be selected at a time (similar to radio group).
     * With `'multi'` multiple options selected (similar to checkbox group).
     */
    type?: 'single' | 'multi';
    /**
     * An array of {@link EuiButtonGroupOptionProps}
     */
    options: EuiButtonGroupOptionProps[];
  } & (
    | {
        /**
         * Default for `type` is single so it can also be excluded
         */
        type?: 'single';
        /**
         * @deprecated No longer needed. You can safely remove this prop entirely
         */
        name?: string;
        /**
         * Styles the selected option to look selected (usually with `fill`)
         * Required by and only used in `type='single'`.
         */
        idSelected: string;
        /**
         * Single: Returns the `id` of the clicked option and the `value`
         */
        onChange: (id: string, value?: any) => void;
        idToSelectedMap?: never;
      }
    | {
        type: 'multi';
        /**
         * A map of `id`s as keys with the selected boolean values.
         * Required by and only used in `type='multi'`.
         */
        idToSelectedMap?: { [id: string]: boolean };
        /**
         * Multi: Returns the `id` of the clicked option
         */
        onChange: (id: string) => void;
        idSelected?: never;
        /**
         * @deprecated
         */
        name?: never;
      }
  );

type OptionsModeProps = Omit<
  HTMLAttributes<HTMLFieldSetElement>,
  'onChange' | 'color'
> &
  EuiButtonGroupProps;

const EuiButtonGroupOptions: FunctionComponent<OptionsModeProps> = ({
  className,
  buttonSize = 's',
  color = 'text',
  idSelected = '',
  idToSelectedMap = {},
  isDisabled = false,
  hasAriaDisabled = false,
  isFullWidth = false,
  isIconOnly = false,
  legend,
  name, // Prevent prop from being spread
  onChange,
  options = [],
  type = 'single',
  ...rest
}) => {
  const wrapperCssStyles = [
    euiButtonGroupStyles.euiButtonGroup,
    isFullWidth && euiButtonGroupStyles.fullWidth,
  ];

  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);
  const cssStyles = [
    styles.euiButtonGroup__buttons,
    isFullWidth && styles.fullWidth,
    styles.size[buttonSize],
  ];

  const classes = classNames(
    'euiButtonGroup',
    { 'euiButtonGroup-isDisabled': isDisabled },
    className
  );

  const typeIsSingle = type === 'single';

  const groupDisabledProps = {
    disabled: hasAriaDisabled ? undefined : isDisabled,
    'aria-disabled': hasAriaDisabled ? isDisabled : undefined,
  };

  return (
    <fieldset
      css={wrapperCssStyles}
      className={classes}
      {...rest}
      {...groupDisabledProps}
    >
      <EuiScreenReaderOnly>
        <legend>{legend}</legend>
      </EuiScreenReaderOnly>

      <div css={cssStyles} className="euiButtonGroup__buttons">
        {options.map((option) => {
          return (
            <EuiButtonGroupButton
              key={option.id}
              isDisabled={isDisabled}
              hasAriaDisabled={hasAriaDisabled}
              {...(option as EuiButtonGroupOptionProps)}
              onClick={
                typeIsSingle
                  ? () => onChange(option.id, option.value)
                  : () => onChange(option.id)
              }
              isSelected={
                typeIsSingle
                  ? option.id === idSelected
                  : idToSelectedMap[option.id]
              }
              color={color}
              size={buttonSize}
              isIconOnly={isIconOnly}
            />
          );
        })}
      </div>
    </fieldset>
  );
};

export const BUTTON_GROUP_GUTTER_SIZES = [
  'none',
  'xs',
  's',
  'm',
  'l',
  'xl',
] as const;
export type EuiButtonGroupGutterSize =
  (typeof BUTTON_GROUP_GUTTER_SIZES)[number];

export type EuiButtonGroupChildrenProps = CommonProps &
  EuiDisabledProps & {
    options?: never; // Prevents the `options` API from being used in this mode
    /**
     * A group title (required for accessibility).
     * Rendered as `aria-label` on the group element.
     */
    legend: string;
    /**
     * Pass button components (`EuiButton`, `EuiButtonEmpty`, `EuiButtonIcon`) as children,
     * some specific wrappers, like `EuiToolTip` and `EuiPopover` are allowed.
     */
    children: ReactNode;
    /**
     * Typical sizing is `s`. Medium `m` size should be reserved for major features.
     */
    buttonSize?: 's' | 'm';
    /**
     * Defines the type of a button group, which renders visually and functionally different:
     * - default: arranges buttons in a horizontal row with optional gutter via `gutterSize`
     */
    variant?: 'default';
    /**
     * Defines the gutter size between children buttons.
     * Applies only when `variant="default"`.
     */
    gutterSize?: EuiButtonGroupGutterSize;
    /**
     * Expands the whole group to the full width of the container.
     * `EuiButton` children will stretch to fill the available space via their `fullWidth` prop.
     */
    isFullWidth?: boolean;
    /**
     * Callback fired when a child button is selected.
     * Returns the `id` of the clicked option.
     * Applies only for `variant="selection"`.
     */
    onChange?: (id: string) => void;
  };

type ChildrenModeProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupChildrenProps;

const EuiButtonGroupChildren: FunctionComponent<ChildrenModeProps> = ({
  className,
  children,
  legend,
  buttonSize = 's',
  variant = 'default',
  gutterSize = 's',
  isDisabled = false,
  hasAriaDisabled = false,
  isFullWidth = false,
  // consumed by variant="selection" in a later chunk; destructured to prevent spread
  onChange: _onChange,
  ...rest
}) => {
  const wrapperCssStyles = [
    euiButtonGroupStyles.euiButtonGroup,
    isFullWidth && euiButtonGroupStyles.fullWidth,
  ];

  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);
  const cssStyles = [
    styles.euiButtonGroup__buttons,
    isFullWidth && styles.fullWidth,
    gutterSize && gutterSize !== 'none' && styles.gutterSize[gutterSize],
  ];

  const classes = classNames(
    'euiButtonGroup',
    { 'euiButtonGroup-isDisabled': isDisabled },
    className
  );

  return (
    <div
      css={wrapperCssStyles}
      className={classes}
      role="group"
      data-variant={variant}
      data-size={buttonSize}
      aria-label={legend}
      aria-disabled={isDisabled || undefined}
      {...rest}
    >
      <div css={cssStyles} className="euiButtonGroup__buttons">
        <EuiButtonGroupContext.Provider
          value={{
            size: buttonSize,
            isDisabled: isDisabled || undefined,
            hasAriaDisabled: hasAriaDisabled || undefined,
            fullWidth: isFullWidth,
          }}
        >
          {children}
        </EuiButtonGroupContext.Provider>
      </div>
    </div>
  );
};

/* Overloaded call signatures let one `EuiButtonGroup` component support both
the `options` API and the `children` API, each with its own precise prop
type, without adding another union layer. */
interface EuiButtonGroupComponent {
  (props: OptionsModeProps): ReactElement | null;
  (props: ChildrenModeProps): ReactElement | null;
  // A trailing catch-all signature to ensure that `ComponentProps<typeofEuiButtonGroup>`
  // resolves to the full union
  (props: OptionsModeProps | ChildrenModeProps): ReactElement | null;
}

// Renders either the (legacy) `options` API or the `children` API depending on which props are provided.
export const EuiButtonGroup: EuiButtonGroupComponent = (
  props: OptionsModeProps | ChildrenModeProps
) => {
  const { options } = props;

  if (options) {
    return <EuiButtonGroupOptions {...(props as OptionsModeProps)} />;
  }

  return <EuiButtonGroupChildren {...(props as ChildrenModeProps)} />;
};
