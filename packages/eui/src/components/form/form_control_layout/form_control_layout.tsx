/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../services';
import { CommonProps } from '../../common';

import { EuiFormLabel } from '../form_label';
import { useFormContext } from '../eui_form_context';
import { getIconAffordanceStyles, isRightSideIcon } from './_num_icons';
import {
  EuiFormControlLayoutIcons,
  EuiFormControlLayoutIconsProps,
} from './form_control_layout_icons';
import {
  euiFormControlLayoutStyles,
  euiFormControlLayoutSideNodeStyles,
} from './form_control_layout.styles';

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
    /**
     * Determines whether icons are absolutely or statically rendered. For single inputs,
     * absolute rendering is typically preferred.
     * @default absolute
     */
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
    /**
     * Allows passing optional additional props to `.euiFormControlLayout__childrenWrapper`
     */
    wrapperProps?: CommonProps & HTMLAttributes<HTMLDivElement>;
  };

export const EuiFormControlLayout: FunctionComponent<
  EuiFormControlLayoutProps & {
    // Internal prop used by EuiFormControlLayoutDelimited
    isDelimited?: boolean;
  }
> = (props) => {
  const { defaultFullWidth } = useFormContext();
  const {
    inputId,
    className,
    children,
    icon,
    iconsPosition = 'absolute',
    clear,
    isDropdown,
    isLoading,
    isInvalid,
    isDisabled,
    readOnly,
    compressed,
    prepend,
    append,
    isDelimited,
    wrapperProps,
    fullWidth = defaultFullWidth,
    ...rest
  } = props;

  const isGroup = !!(prepend || append || isDelimited);

  const classes = classNames(
    'euiFormControlLayout',
    {
      'euiFormControlLayout--group': isGroup && !isDelimited,
      'euiFormControlLayout-isDisabled': isDisabled,
      'euiFormControlLayout-readOnly': readOnly,
    },
    className
  );

  const styles = useEuiMemoizedStyles(euiFormControlLayoutStyles);

  const cssStyles = [
    styles.euiFormControlLayout,
    compressed ? styles.compressed : styles.uncompressed,
    fullWidth ? styles.fullWidth : styles.formWidth,
    ...(isGroup
      ? [
          styles.group.group,
          compressed ? styles.group.compressed : styles.group.uncompressed,
        ]
      : []),
  ];

  const childrenWrapperStyles = [
    styles.children.euiFormControlLayout__childrenWrapper,
    isGroup && styles.children.inGroup,
    isGroup && !append && styles.children.prependOnly,
    isGroup && !prepend && styles.children.appendOnly,
    wrapperProps?.css,
  ];

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
    <div css={cssStyles} className={classes} {...rest}>
      <EuiFormControlLayoutSideNodes
        side="prepend"
        nodes={prepend}
        inputId={inputId}
        compressed={compressed}
      />
      <div
        {...wrapperProps}
        css={childrenWrapperStyles}
        className={classNames(
          'euiFormControlLayout__childrenWrapper',
          wrapperProps?.className
        )}
        style={{ ...iconAffordanceStyles, ...wrapperProps?.style }}
      >
        {hasLeftIcon && (
          <EuiFormControlLayoutIcons
            side="left"
            icon={icon}
            iconsPosition={iconsPosition}
            compressed={compressed}
            isDisabled={isDisabled}
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
            isDisabled={isDisabled}
          />
        )}
      </div>
      <EuiFormControlLayoutSideNodes
        side="append"
        nodes={append}
        inputId={inputId}
        compressed={compressed}
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
  compressed?: boolean;
}> = ({ side, nodes, inputId, compressed }) => {
  const className = `euiFormControlLayout__${side}`;
  const styles = useEuiMemoizedStyles(euiFormControlLayoutSideNodeStyles);
  const cssStyles = [
    styles.euiFormControlLayout__side,
    styles[side],
    compressed ? styles.compressed : styles.uncompressed,
  ];

  if (!nodes) return null;

  return (
    <div css={cssStyles} className={className}>
      {React.Children.map(nodes, (node) =>
        typeof node === 'string' ? (
          <EuiFormLabel htmlFor={inputId}>{node}</EuiFormLabel>
        ) : (
          node
        )
      )}
    </div>
  );
};
