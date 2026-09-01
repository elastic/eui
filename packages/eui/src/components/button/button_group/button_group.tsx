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
import { EuiButtonContext } from '../button_context';
import { EuiButtonGroupButton } from './button_group_button';
import { useEuiButtonGroupSelection } from './use_button_group_selection';
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
   * Optional props to pass to the underlying **[EuiToolTip](https://eui.elastic.co/docs/components/display/tooltip/)**
   */
  toolTipProps?: Partial<Omit<EuiToolTipProps, 'content' | 'children'>>;
}

export type EuiButtonGroupProps = CommonProps &
  EuiDisabledProps & {
    /**
     * Typical sizing is `s`. Medium `m` size should be reserved for major features.
     * `compressed` renders as `s` and will be removed in the future.
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
     * @deprecated - Will be fixed to 'text' in the future.
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
     * @deprecated - Use the Children API via `children` instead.
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
  const size = buttonSize === 'compressed' ? 's' : buttonSize;

  const wrapperCssStyles = [
    euiButtonGroupStyles.euiButtonGroup,
    isFullWidth && euiButtonGroupStyles.fullWidth,
  ];

  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);
  const cssStyles = [
    styles.euiButtonGroup__buttons,
    isFullWidth && styles.fullWidth,
    styles.size[size],
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

type SelectionVariantCommonProps = {
  /**
   * Visual display variant for the selection container background.
   * Applies only when `variant="selection"`.
   * - `'regular'`: subdued toggle state, light container background
   * - `'highlighted'`: highlighted toggle state, light container background
   * - `'inverse'`: light toggle state, dark container background
   * @default 'regular'
   */
  display?: 'regular' | 'highlighted' | 'inverse';
  /**
   * Callback fired when a child button is selected.
   * Returns the `id` of the clicked option.
   * Applies only when `variant="selection"`.
   */
  onChange?: (id: string) => void;
};

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
     * Defines the gutter size between children buttons.
     * Applies only when `variant="default"`.
     * @default 's'
     */
    gutterSize?: EuiButtonGroupGutterSize;
    /**
     * Expands the whole group to the full width of the container.
     * Only `EuiButton` children will stretch to fill the available space.
     * `EuiButtonIcon` groups will not stretch.
     * Does not apply when `layout="vertical"`.
     * @default false
     */
    isFullWidth?: boolean;
    /**
     * Shows dividers between buttons.
     * Does not apply when `variant="default"`.
     * @default false
     */
    showDividers?: boolean;
    /**
     * Defines the layout direction of the button group.
     * `layout="vertical"` should only be used with EuiButtonIcon children.
     * Does not apply when `variant="default"`.
     * @default 'horizontal'
     */
    layout?: 'horizontal' | 'vertical';
    /**
     * Defines if buttons wrap or shrink.
     * Does not apply when `variant="default"`.
     * @default true
     */
    wrap?: boolean;
  } & (
    | ({
        /**
         * Defines the type of a button group, which renders visually and functionally different:
         * - default: arranges buttons in a horizontal row with optional gutter via `gutterSize`
         * - segmented: arranges buttons in a horizontal or vertical row with no gutter.
         *   The buttons are placed inset and dividers can optionally be shown between them.
         * - selection: arranges buttons inset with toggle selection state (single or multi).
         *   Each child button must have a unique `id` prop.
         * @default 'default'
         */
        variant: 'selection';
        /**
         * Determines selection behavior.
         * With `'single'` only one button can be selected at a time.
         * Applies only when `variant="selection"`.
         * @default 'single'
         */
        type?: 'single';
        /**
         * The currently selected button `id`.
         * Omit or pass `undefined` for no initial selection.
         * Applies only when `variant="selection"` and `type="single"`.
         */
        idSelected?: string;
        idToSelectedMap?: never;
      } & SelectionVariantCommonProps)
    | ({
        variant: 'selection';
        /**
         * Determines selection behavior.
         * With `'multi'` multiple buttons can be selected simultaneously.
         * Applies only when `variant="selection"`.
         */
        type: 'multi';
        /**
         * A map of button `id`s to their selected boolean values.
         * Omit or pass `{}` for no initial selection.
         * The consumer must update this value via `onChange` to reflect new selections.
         * Applies only when `variant="selection"` and `type="multi"`.
         */
        idToSelectedMap?: Record<string, boolean>;
        idSelected?: never;
      } & SelectionVariantCommonProps)
    | {
        variant?: 'default' | 'segmented';
        type?: never;
        idSelected?: never;
        idToSelectedMap?: never;
        display?: never;
        onChange?: never;
      }
  );

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
  display = 'regular',
  type,
  idSelected,
  idToSelectedMap,
  onChange,
  ...rest
}) => {
  const isSegmented = variant === 'segmented';
  const isSelection = variant === 'selection';
  const hasSegmentedStyle = isSegmented || isSelection;
  const hasGutterSize = variant === 'default' && gutterSize !== 'none';

  const { isSelected, onSelect } = useEuiButtonGroupSelection({
    type,
    idSelected,
    idToSelectedMap,
    onChange,
  });

  const wrapperCssStyles = [
    euiButtonGroupStyles.euiButtonGroup,
    isFullWidth && euiButtonGroupStyles.fullWidth,
  ];

  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);
  const cssStyles = [
    styles.euiButtonGroup__buttons,
    hasGutterSize && styles.gutterSize[gutterSize],
    hasSegmentedStyle && !wrap && styles.noWrap,
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

  const contextValue = useMemo(
    () => ({
      size: buttonSize,
      isDisabled: isDisabled || undefined,
      hasAriaDisabled: hasAriaDisabled || undefined,
      fullWidth: isFullWidth,
      ...((isSegmented || isSelection) && {
        color: 'text' as const,
      }),
      ...(isSegmented && {
        display: 'base' as const,
        fill: false,
      }),
      ...(isSelection && {
        getSelectionProps: (id: string) => {
          const selected = isSelected(id);
          const isInverse = display === 'inverse';
          const hasFill = selected && display === 'highlighted';

          return {
            isSelected: selected,
            fill: isInverse ? false : hasFill,
            display: isInverse
              ? ('base' as const)
              : hasFill
              ? ('fill' as const)
              : undefined,
            onSelect: () => onSelect(id),
          };
        },
      }),
    }),
    [
      buttonSize,
      isDisabled,
      hasAriaDisabled,
      isFullWidth,
      isSegmented,
      isSelection,
      isSelected,
      onSelect,
      display,
    ]
  );

  // wrap children in a wrapper to apply required inset styles
  const children =
    isSegmented || isSelection
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
      data-display={isSelection ? display : undefined}
      data-layout={hasSegmentedStyle ? layout : undefined}
      data-dividers={(hasSegmentedStyle && showDividers) || undefined}
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
