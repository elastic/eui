/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  cloneElement,
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { getIconAffordanceStyles, isRightSideIcon } from './_num_icons';
import {
  EuiFormControlLayoutIcons,
  EuiFormControlLayoutIconsProps,
} from './form_control_layout_icons';
import { CommonProps } from '../../common';
import { EuiFormLabel } from '../form_label';
import { useFormContext } from '../eui_form_context';

type StringOrReactElement = string | ReactElement;
type PrependAppendType = StringOrReactElement | StringOrReactElement[];

export type EuiFormControlLayoutProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    /**
     * Creates an input group with element(s) coming before children.
     * `string` | `ReactElement` or an array of these
     */
    prepend?: PrependAppendType;
    /**
     * Creates an input group with element(s) coming after children.
     * `string` | `ReactElement` or an array of these
     */
    append?: PrependAppendType;
    children?: ReactNode;
    icon?: EuiFormControlLayoutIconsProps['icon'];
    iconsPosition?: EuiFormControlLayoutIconsProps['iconsPosition'];
    clear?: EuiFormControlLayoutIconsProps['clear'];
    /**
     * Expand to fill 100% of the parent.
     * Defaults to `fullWidth` prop of `<EuiForm>`.
     * @default false
     */
    fullWidth?: boolean;
    isLoading?: boolean;
    isDisabled?: boolean;
    className?: string;
    compressed?: boolean;
    readOnly?: boolean;
    isInvalid?: boolean;
    /**
     * Controls the adding of and visibility of a down arrow icon
     */
    isDropdown?: boolean;
    /**
     * Connects the prepend and append labels to the input
     */
    inputId?: string;
  };

export const EuiFormControlLayout: FunctionComponent<
  EuiFormControlLayoutProps
> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    inputId,
    className,
    children,
    icon,
    iconsPosition,
    clear,
    isDropdown,
    isLoading,
    isInvalid,
    isDisabled,
    readOnly,
    compressed,
    prepend,
    append,
    fullWidth = defaultFullWidth,
    ...rest
  } = props;

  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--fullWidth': fullWidth,
      'euiFormControlLayout--compressed': compressed,
      'euiFormControlLayout--readOnly': readOnly,
      'euiFormControlLayout--group': prepend || append,
      'euiFormControlLayout-isDisabled': isDisabled,
    },
    className
  );

  const hasDropdownIcon = !readOnly && !isDisabled && isDropdown;
  const hasRightIcon = isRightSideIcon(icon);
  const hasLeftIcon = icon && !hasRightIcon;
  const hasRightIcons =
    hasRightIcon || clear || isLoading || isInvalid || hasDropdownIcon;

  const iconAffordanceStyles = useMemo(() => {
    if (iconsPosition === 'static') return; // Static icons don't need padding affordance

    return getIconAffordanceStyles({
      icon,
      clear,
      isInvalid,
      isLoading,
      isDropdown: hasDropdownIcon,
    });
  }, [iconsPosition, icon, clear, isInvalid, isLoading, hasDropdownIcon]);

  return (
    <div className={classes} {...rest}>
      <EuiFormControlLayoutSideNodes
        side="prepend"
        nodes={prepend}
        inputId={inputId}
      />
      <div
        className="euiFormControlLayout__childrenWrapper"
        style={iconAffordanceStyles}
      >
        {hasLeftIcon && (
          <EuiFormControlLayoutIcons
            side="left"
            icon={icon}
            iconsPosition={iconsPosition}
            compressed={compressed}
          />
        )}

        {children}

        {hasRightIcons && (
          <EuiFormControlLayoutIcons
            side="right"
            icon={hasRightIcon ? icon : undefined}
            iconsPosition={iconsPosition}
            compressed={compressed}
            clear={clear}
            isLoading={isLoading}
            isInvalid={isInvalid}
            isDropdown={hasDropdownIcon}
          />
        )}
      </div>
      <EuiFormControlLayoutSideNodes
        side="append"
        nodes={append}
        inputId={inputId}
      />
    </div>
  );
};

/**
 * Internal subcomponent utility for prepend/append nodes
 */
const EuiFormControlLayoutSideNodes: FunctionComponent<{
  side: 'append' | 'prepend';
  nodes?: PrependAppendType; // For some bizarre reason if you make this the `children` prop instead, React doesn't properly override cloned keys :|
  inputId?: string;
}> = ({ side, nodes, inputId }) => {
  const className = `euiFormControlLayout__${side}`;

  const renderFormLabel = useCallback(
    (label: string) => (
      <EuiFormLabel htmlFor={inputId} className={className}>
        {label}
      </EuiFormLabel>
    ),
    [inputId, className]
  );

  if (!nodes) return null;

  return (
    <>
      {React.Children.map(nodes, (node, index) =>
        typeof node === 'string'
          ? renderFormLabel(node)
          : cloneElement(node, {
              className: classNames(className, node.props.className),
              key: index,
            })
      )}
    </>
  );
};
