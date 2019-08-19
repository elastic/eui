import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import { EuiButton } from '../../button';
import { EuiI18n } from '../../i18n';
import { EuiToolTip } from '../../tool_tip';

export class EuiSuperUpdateButton extends Component {
  static propTypes = {
    needsUpdate: PropTypes.bool,
    isLoading: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    /**
     * Passes props to `EuiToolTip`
     */
    toolTipProps: PropTypes.object,
  };

  static defaultProps = {
    needsUpdate: false,
    isLoading: false,
    isDisabled: false,
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (
      this.props.needsUpdate &&
      !this.props.isDisabled &&
      !this.props.isLoading
    ) {
      this.showTooltip();
      this.tooltipTimeout = setTimeout(() => {
        this.hideTooltip();
      }, 2000);
    }
  }

  setTootipRef = node => (this.tooltip = node);

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
      className,
      needsUpdate,
      isLoading,
      isDisabled,
      onClick,
      toolTipProps,
      ...rest
    } = this.props;

    const classes = classNames('euiSuperUpdateButton', className);

    let buttonText = (
      <EuiI18n
        token="euiSuperUpdateButton.refreshButtonLabel"
        default="Refresh"
      />
    );
    if (needsUpdate || isLoading) {
      buttonText = isLoading ? (
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

    return (
      <EuiToolTip
        ref={this.setTootipRef}
        content={tooltipContent}
        position="bottom"
        {...toolTipProps}>
        <EuiButton
          className={classes}
          color={needsUpdate || isLoading ? 'secondary' : 'primary'}
          fill
          iconType={needsUpdate || isLoading ? 'kqlFunction' : 'refresh'}
          textProps={{ className: 'euiSuperUpdateButton__text' }}
          isDisabled={isDisabled}
          onClick={onClick}
          isLoading={isLoading}
          {...rest}>
          {buttonText}
        </EuiButton>
      </EuiToolTip>
    );
  }
}
