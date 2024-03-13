/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  Component,
  MouseEventHandler,
  ElementRef,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { EuiButton, EuiButtonProps } from '../../button';
import { EuiI18n } from '../../i18n';
import { EuiToolTip, EuiToolTipProps } from '../../tool_tip';
import { EuiBreakpointSize } from '../../../services/breakpoint';
import { EuiHideFor, EuiShowFor } from '../../responsive';

type ToolTipRef = ElementRef<typeof EuiToolTip> | null;

type EuiSuperUpdateButtonInternalProps = {
  isDisabled?: boolean;
  isLoading?: boolean;
  needsUpdate?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export type EuiSuperUpdateButtonProps = {
  /**
   * Overrides the default button label with a custom React node.
   *
   * When defined, you're responsible for updating the custom label
   * when the data needs updating (the `needsUpdate` prop)
   * or is loading (the `isLoading` prop).
   */
  children?: ReactNode;

  /**
   * Show the "Click to apply" tooltip
   */
  showTooltip?: boolean;

  /**
   * Passes props to `EuiToolTip`
   */
  toolTipProps?: EuiToolTipProps;

  /**
   * Returns an IconButton instead
   */
  iconOnly?: boolean;

  /**
   * Forces state to be `iconOnly` when within provided breakpoints.
   * Remove completely with `false` or provide your own list of breakpoints.
   */
  responsive?: false | EuiBreakpointSize[];
} & Partial<
  Omit<EuiButtonProps, 'isDisabled' | 'isLoading' | 'onClick' | 'children'>
>;

export class EuiSuperUpdateButton extends Component<
  EuiSuperUpdateButtonInternalProps & EuiSuperUpdateButtonProps
> {
  static defaultProps = {
    needsUpdate: false,
    isLoading: false,
    isDisabled: false,
    showTooltip: false,
    responsive: ['xs', 's'],
    fill: true,
  };
  _isMounted = false;
  tooltipTimeout: number | undefined;
  tooltip: ToolTipRef = null;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (
      this.props.showTooltip &&
      this.props.needsUpdate &&
      !this.props.isDisabled &&
      !this.props.isLoading
    ) {
      this.showTooltip();
      this.tooltipTimeout = setTimeout(() => {
        this.hideTooltip();
      }, 2000) as unknown as number | undefined;
    }
  }

  setTootipRef = (node: ToolTipRef) => {
    this.tooltip = node;
  };

  showTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.showToolTip();
  };

  hideTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.hideToolTip();
  };

  render() {
    const {
      children,
      className,
      needsUpdate,
      isLoading,
      isDisabled,
      onClick,
      toolTipProps,
      showTooltip,
      iconOnly,
      responsive: _responsive,
      textProps: restTextProps,
      fill,
      ...rest
    } = this.props;
    // Force responsive for "all" if `iconOnly = true`
    const responsive = iconOnly ? 'all' : _responsive;

    const classes = classNames('euiSuperUpdateButton', className);

    let buttonContent = children;

    if (buttonContent === undefined) {
      buttonContent = (
        <EuiI18n
          token="euiSuperUpdateButton.refreshButtonLabel"
          default="Refresh"
        />
      );
      if (needsUpdate || isLoading) {
        buttonContent = isLoading ? (
          <EuiI18n
            token="euiSuperUpdateButton.updatingButtonLabel"
            default="Updating"
          />
        ) : (
          <EuiI18n
            token="euiSuperUpdateButton.updateButtonLabel"
            default="Update"
          />
        );
      }
    }

    let tooltipContent;
    if (isDisabled) {
      tooltipContent = (
        <EuiI18n
          token="euiSuperUpdateButton.cannotUpdateTooltip"
          default="Cannot update"
        />
      );
    } else if (needsUpdate && !isLoading) {
      tooltipContent = (
        <EuiI18n
          token="euiSuperUpdateButton.clickToApplyTooltip"
          default="Click to apply"
        />
      );
    }

    const sharedButtonProps = {
      color: needsUpdate || isLoading ? 'success' : 'primary',
      iconType: needsUpdate || isLoading ? 'kqlFunction' : 'refresh',
      isDisabled: isDisabled,
      onClick: onClick,
      isLoading: isLoading,
    };

    return (
      <EuiToolTip
        ref={this.setTootipRef}
        content={tooltipContent}
        position="bottom"
        {...toolTipProps}
      >
        <>
          <EuiShowFor sizes={responsive || 'none'}>
            <EuiButton
              className={classes}
              minWidth={false}
              {...(sharedButtonProps as EuiButtonProps)}
              fill={fill}
              textProps={{
                ...restTextProps,
                className: classNames(
                  'euiScreenReaderOnly',
                  restTextProps && restTextProps.className
                ),
              }}
              {...rest}
            >
              {buttonContent}
            </EuiButton>
          </EuiShowFor>
          <EuiHideFor sizes={responsive || 'none'}>
            <EuiButton
              className={classes}
              minWidth={118}
              {...(sharedButtonProps as EuiButtonProps)}
              fill={fill}
              textProps={restTextProps}
              {...rest}
            >
              {buttonContent}
            </EuiButton>
          </EuiHideFor>
        </>
      </EuiToolTip>
    );
  }
}
