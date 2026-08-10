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
  useMemo,
} from 'react';

import { useEuiMemoizedStyles } from '../../../services';
import { type EuiDisabledProps } from '../../../services/hooks/useEuiDisabledElement';
import { EuiScreenReaderOnly } from '../../accessibility';
import { CommonProps } from '../../common';

import { _EuiButtonColor } from '../../../global_styling/mixins';
import { EuiToolTipProps } from '../../../components/tool_tip';
import { EuiButtonDisplayContentProps } from '../button_display/_button_display_content';
import { EuiButtonGroupButton } from './button_group_button';
import { EuiButtonContext } from '../button_context';
import {
  euiButtonGroupStyles,
  euiButtonGroupButtonsStyles,
} from './button_group.styles';

// removes outer fragment wrappers only; no nested traversal of children
// uses forEach over .toArray() to avoid mutating keys; only unwraps one Fragment level
function flattenButtonGroupChildren(children: ReactNode): ReactElement[] {
  const result: ReactElement[] = [];
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) {
      React.Children.forEach(
        (child as ReactElement<{ children: ReactNode }>).props.children,
        (fragmentChild) => {
          if (React.isValidElement(fragmentChild)) result.push(fragmentChild);
        }
      );
    } else {
      result.push(child);
    }
  });
  return result;
}

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
     *
     * Do not pass children as combined custom component. Each child needs to be a standalone component.
     */
    children: ReactNode;
    /**
     * Typical sizing is `s`. Medium `m` size should be reserved for major features.
     * @default 's'
     */
    buttonSize?: 's' | 'm';
    /**
     * Defines the type of a button group, which renders visually and functionally different:
     * - default: arranges buttons in a horizontal row with optional gutter via `gutterSize`
     * - segmented: arranges buttons in a horizontal or vertical row with no gutter.
     *   The buttons are placed inset and dividers can optionally be shown between them.
     * @default 'default'
     */
    variant?: 'default' | 'segmented';
    /**
     * Defines the gutter size between children buttons.
     * Applies only when `variant="default"`.
     * @default 's'
     */
    gutterSize?: EuiButtonGroupGutterSize;
    /**
     * Expands the whole group to the full width of the container.
     * `EuiButton` children will stretch to fill the available space via their `fullWidth` prop.
     * Does not apply when `layout="vertical"`.
     * @default false
     */
    isFullWidth?: boolean;
    /**
     * Shows dividers between buttons.
     * Applies only when `variant="segmented"`.
     * @default false
     */
    showDividers?: boolean;
    /**
     * Defines the layout direction of the button group.
     * `layout="vertical"` should only be used with EuiButtonIcon children.
     * Applies only when `variant="segmented"`.
     * @default 'horizontal'
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * Defines if buttons wrap or shrink.
     * Applies only when `variant="segmented"`.
     * @default true
     */
    wrap?: boolean;
    /**
     * Callback fired when a child button is selected.
     * Returns the `id` of the clicked option.
     * Applies only for `variant="selection"`.
     */
    onChange?: (id: string) => void;
  };

type ChildrenModeProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> &
  EuiButtonGroupChildrenProps;

export const EuiButtonGroupChildren: FunctionComponent<ChildrenModeProps> = ({
  className,
  children: _children,
  legend,
  buttonSize = 's',
  variant = 'default',
  gutterSize = 's',
  isDisabled = false,
  hasAriaDisabled = false,
  isFullWidth = false,
  showDividers = false,
  wrap = true,
  layout = 'horizontal',
  // consumed by variant="selection" in a later chunk; destructured to prevent spread
  onChange: _onChange,
  ...rest
}) => {
  const isSegmented = variant === 'segmented';
  const hasGutterSize = variant === 'default' && gutterSize !== 'none';

  const wrapperCssStyles = [
    euiButtonGroupStyles.euiButtonGroup,
    isFullWidth && euiButtonGroupStyles.fullWidth,
  ];

  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);
  const cssStyles = [
    styles.euiButtonGroup__buttons,
    hasGutterSize && styles.gutterSize[gutterSize],
    isSegmented && !wrap && styles.noWrap,
  ];

  const containerCssStyles = [
    styles.euiButtonGroup__container,
    isFullWidth && layout !== 'vertical' && styles.fullWidth,
  ];

  const classes = classNames(
    'euiButtonGroup',
    { 'euiButtonGroup-isDisabled': isDisabled },
    className
  );

  const contextValue = useMemo(() => {
    return {
      size: buttonSize,
      isDisabled: isDisabled || undefined,
      hasAriaDisabled: hasAriaDisabled || undefined,
      fullWidth: isFullWidth,
      ...(isSegmented && {
        display: 'base' as const,
        color: 'text' as const,
        fill: false,
      }),
    };
  }, [buttonSize, isDisabled, hasAriaDisabled, isFullWidth, isSegmented]);

  // wrap children in a wrapper to be able to apply required styles
  const children = isSegmented
    ? flattenButtonGroupChildren(_children).map((child, index) => (
        <div
          key={child.key ?? `euiButtonGroupItem-${index}`}
          className="euiButtonGroup__item"
        >
          {child}
        </div>
      ))
    : _children;

  return (
    <div
      css={wrapperCssStyles}
      className={classes}
      role="group"
      data-variant={variant}
      data-size={buttonSize}
      data-layout={isSegmented ? layout : undefined}
      data-dividers={(isSegmented && showDividers) || undefined}
      aria-label={legend}
      aria-disabled={isDisabled || undefined}
      {...rest}
    >
      <div css={containerCssStyles} className="euiButtonGroup__container">
        <div css={cssStyles} className="euiButtonGroup__buttons">
          <EuiButtonContext.Provider value={contextValue}>
            {children}
          </EuiButtonContext.Provider>
        </div>
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
  // A trailing catch-all signature to ensure that `ComponentProps<typeof EuiButtonGroup>`
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
