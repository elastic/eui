/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ButtonHTMLAttributes, Component, createRef } from 'react';
import classNames from 'classnames';

import { withEuiTheme, WithEuiThemeProps } from '../../services';
import { CommonProps } from '../common';

import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiToolTip } from '../tool_tip';
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
export class EuiFilterSelectItemClass extends Component<
  WithEuiThemeProps & EuiFilterSelectItemProps
> {
  static defaultProps = {
    showIcons: true,
  };

  buttonRef: HTMLButtonElement | null = null;
  tooltipRef = createRef<EuiToolTip>();

  state = {
    hasFocus: false,
  };

  setButtonRef = (node: HTMLButtonElement | null) => {
    this.buttonRef = node;
    this.props.forwardRef?.(node);
  };

  focus = () => {
    if (this.buttonRef) {
      this.buttonRef.focus();
    }
  };

  toggleToolTip = (isFocused: boolean) => {
    if (isFocused) {
      this.tooltipRef?.current?.showToolTip();
    } else {
      this.tooltipRef?.current?.hideToolTip();
    }
  };

  hasFocus = () => {
    return this.state.hasFocus;
  };

  render() {
    const {
      theme,
      children,
      className,
      disabled,
      checked,
      isFocused,
      showIcons,
      toolTipContent,
      toolTipProps,
      style,
      forwardRef,
      ...rest
    } = this.props;

    const styles = euiFilterSelectItemStyles(theme);
    const cssStyles = [
      styles.euiFilterSelectItem,
      isFocused && styles.isFocused,
    ];

    const classes = classNames('euiFilterSelectItem', className);

    const hasToolTip =
      // we're using isValidElement here as EuiToolTipAnchor uses
      // cloneElement to enhance the element with required attributes
      React.isValidElement(children) && !disabled && toolTipContent;

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

      this.toggleToolTip(isFocused ?? false);
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
        ref={this.setButtonRef}
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
            className="euiFilterSelectItem__content eui-textTruncate"
            component="span"
          >
            {children}
          </EuiFlexItem>
        </EuiFlexGroup>
      </button>
    );

    return hasToolTip ? (
      <EuiToolTip
        ref={this.tooltipRef}
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
  }
}

/**
 * @deprecated - Use EuiSelectable instead
 */
export const EuiFilterSelectItem = withEuiTheme<EuiFilterSelectItemProps>(
  EuiFilterSelectItemClass
);
