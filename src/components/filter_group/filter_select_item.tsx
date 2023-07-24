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
import { EuiIcon } from '../icon';

import { euiFilterSelectItemStyles } from './filter_select_item.styles';

export type FilterChecked = 'on' | 'off';
export interface EuiFilterSelectItemProps
  extends CommonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: FilterChecked;
  showIcons?: boolean;
  isFocused?: boolean;
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
      ...rest
    } = this.props;

    const styles = euiFilterSelectItemStyles(theme);
    const cssStyles = [
      styles.euiFilterSelectItem,
      isFocused && styles.isFocused,
    ];

    const classes = classNames('euiFilterSelectItem', className);

    let iconNode;
    if (showIcons) {
      const { icon, color } = resolveIconAndColor(checked);
      iconNode = (
        <EuiFlexItem grow={false}>
          <EuiIcon color={color} type={icon} />
        </EuiFlexItem>
      );
    }

    return (
      <button
        ref={(ref) => (this.buttonRef = ref)}
        role="option"
        type="button"
        aria-selected={isFocused}
        className={classes}
        css={cssStyles}
        disabled={disabled}
        aria-disabled={disabled}
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
  }
}

/**
 * @deprecated - Use EuiSelectable instead
 */
export const EuiFilterSelectItem = withEuiTheme<EuiFilterSelectItemProps>(
  EuiFilterSelectItemClass
);
