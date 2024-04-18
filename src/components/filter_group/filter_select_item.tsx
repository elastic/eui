/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { ButtonHTMLAttributes, Component } from 'react';
import classNames from 'classnames';

import { withEuiTheme, WithEuiThemeProps } from '../../services';
import { CommonProps } from '../common';

import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiToolTip, EuiToolTipProps } from '../tool_tip';
import { EuiIcon } from '../icon';

import { euiFilterSelectItemStyles } from './filter_select_item.styles';

export type FilterChecked = 'on' | 'off';
export interface EuiFilterSelectItemProps
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: FilterChecked;
  showIcons?: boolean;
  isFocused?: boolean;
  /**
   * Optional custom tooltip content for the button
   */
  toolTipContent?: EuiToolTipProps['content'];
  /**
   * Optional props to pass to the underlying **[EuiToolTip](/#/display/tooltip)**
   */
  toolTipProps?: Partial<Omit<EuiToolTipProps, 'content' | 'children'>>;
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

  state = {
    hasFocus: false,
  };

  focus = () => {
    if (this.buttonRef) {
      this.buttonRef.focus();
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
      ...rest
    } = this.props;

    const styles = euiFilterSelectItemStyles(theme);
    const cssStyles = [
      styles.euiFilterSelectItem,
      isFocused && styles.isFocused,
    ];

    const classes = classNames('euiFilterSelectItem', className);

    const hasToolTip =
      !disabled && React.isValidElement(children) && toolTipContent;

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
        ref={(ref) => (this.buttonRef = ref)}
        role="option"
        type="button"
        aria-selected={isFocused}
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
      // This extra wrapper is needed to ensure that the tooltip has a correct context
      // for positioning while also ensuring to wrap the interactive option
      <span style={style}>
        <EuiToolTip
          display="block"
          content={toolTipContent}
          {...toolTipProps}
          isOpen={isFocused}
        >
          {optionItem}
        </EuiToolTip>
      </span>
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
