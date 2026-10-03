/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useCombinedRefs, useEuiTheme } from '../../services';
import { CommonProps } from '../common';

import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiToolTip } from '../tool_tip';
import type { EuiToolTipRef } from '../tool_tip';
import { EuiIcon } from '../icon';
import { EuiComboBoxOptionOption } from '../combo_box';

import { euiFilterSelectItemStyles } from './filter_select_item.styles';

export type FilterChecked = 'on' | 'off';
export interface EuiFilterSelectItemProps
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: FilterChecked;
  showIcons?: boolean;
  isFocused?: boolean;
  truncateContent?: boolean;
  toolTipContent?: EuiComboBoxOptionOption['toolTipContent'];
  toolTipProps?: EuiComboBoxOptionOption['toolTipProps'];
  forwardRef?: (ref: HTMLButtonElement | null) => void;
}

const resolveIconAndColor = (checked?: FilterChecked) => {
  if (!checked) {
    return { icon: 'empty' };
  }
  return checked === 'on'
    ? {
        icon: 'check',
        color: 'text',
      }
    : {
        icon: 'cross',
        color: 'text',
      };
};

/**
 * TODO: This component should removed in favor of EuiSelectable usage
 * once EuiComboBox has been converted to dogfood EuiSelectable.
 *
 * @deprecated - Use EuiSelectable instead
 */
const EuiFilterSelectItemComponent: FunctionComponent<
  EuiFilterSelectItemProps
> = ({
  children,
  className,
  disabled,
  checked,
  isFocused,
  showIcons = true,
  toolTipContent,
  toolTipProps,
  style,
  truncateContent = true,
  forwardRef,
  ...rest
}) => {
  const theme = useEuiTheme();
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const tooltipRef = useRef<EuiToolTipRef>(null);
  const combinedButtonRefs = useMemo(
    () => [buttonRef, forwardRef],
    [forwardRef]
  );
  const setButtonRef = useCombinedRefs(combinedButtonRefs);
  const previousIsFocused = useRef(isFocused);
  const isMounted = useRef(false);

  const hasToolTip =
    // we're using isValidElement here as EuiToolTipAnchor uses
    // cloneElement to enhance the element with required attributes
    isValidElement(children) && !disabled && toolTipContent;

  useEffect(() => {
    if (isMounted.current && isFocused && !previousIsFocused.current) {
      buttonRef.current?.scrollIntoView?.({ block: 'nearest' });
    }

    if (
      hasToolTip &&
      (!isMounted.current || isFocused !== previousIsFocused.current)
    ) {
      if (isFocused) {
        tooltipRef.current?.showToolTip();
      } else {
        tooltipRef.current?.hideToolTip();
      }
    }

    previousIsFocused.current = isFocused;
    isMounted.current = true;
  }, [hasToolTip, isFocused]);

  const styles = euiFilterSelectItemStyles(theme);
  const cssStyles = [styles.euiFilterSelectItem, isFocused && styles.isFocused];

  const classes = classNames('euiFilterSelectItem', className);

  let anchorProps = undefined;

  if (hasToolTip) {
    const anchorStyles = toolTipProps?.anchorProps?.style
      ? { ...toolTipProps?.anchorProps?.style, ...style }
      : style;

    anchorProps = toolTipProps?.anchorProps
      ? {
          ...toolTipProps.anchorProps,
          style: anchorStyles,
        }
      : { style };
  }

  let iconNode;
  if (showIcons) {
    const { icon, color } = resolveIconAndColor(checked);
    iconNode = (
      <EuiFlexItem grow={false}>
        <EuiIcon color={color} type={icon} />
      </EuiFlexItem>
    );
  }

  const optionItem = (
    <button
      ref={setButtonRef}
      role="option"
      type="button"
      aria-selected={checked === 'on'}
      className={classes}
      css={cssStyles}
      disabled={disabled}
      aria-disabled={disabled}
      style={!hasToolTip ? style : undefined}
      {...rest}
    >
      <EuiFlexGroup
        alignItems="center"
        gutterSize="s"
        component="span"
        responsive={false}
      >
        {iconNode}
        <EuiFlexItem
          className={classNames(
            'euiFilterSelectItem__content',
            truncateContent && 'eui-textTruncate'
          )}
          component="span"
        >
          {children}
        </EuiFlexItem>
      </EuiFlexGroup>
    </button>
  );

  return hasToolTip ? (
    <EuiToolTip
      ref={tooltipRef}
      display="block"
      content={toolTipContent}
      position="left"
      {...toolTipProps}
      anchorProps={anchorProps}
    >
      {optionItem}
    </EuiToolTip>
  ) : (
    optionItem
  );
};

/**
 * @deprecated - Use EuiSelectable instead
 */
export const EuiFilterSelectItem = EuiFilterSelectItemComponent;
