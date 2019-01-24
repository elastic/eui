import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { EuiButton } from '../../button';
import { EuiToolTip } from '../../tool_tip';

export class EuiSuperUpdateButton extends Component {
  static propTypes = {
    hasChanged: PropTypes.bool,
    isLoading: PropTypes.bool,
    isInvalid: PropTypes.bool,
    onApply: PropTypes.func.isRequired,
  }

  static defaultProps = {
    hasChanged: false,
    isLoading: false,
    isInvalid: false,
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (this.props.hasChanged && !this.props.isInvalid && !this.props.isLoading) {
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
  }

  hideTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.hideToolTip();
  }

  render() {
    const {
      hasChanged,
      isLoading,
      isInvalid,
      onApply,
      ...rest
    } = this.props;

    let buttonText = 'Refresh';
    if (hasChanged || isLoading) {
      buttonText = isLoading ? 'Updating' : 'Update';
    }

    let tooltipContent;
    if (isInvalid) {
      tooltipContent = 'Can\'t update, values are invalid';
    } else if (hasChanged && !isLoading) {
      tooltipContent = 'Click to apply';
    }

    return (
      <EuiToolTip
        ref={this.setTootipRef}
        content={tooltipContent}
        position="bottom"
      >
        <EuiButton
          className="euiSuperDatePicker__updateButton"
          color={hasChanged || isLoading ? 'secondary' : 'primary'}
          fill
          iconType={hasChanged || isLoading ? 'kqlFunction' : 'refresh'}
          textProps={{ className: 'euiSuperDatePicker__updateButtonText' }}
          disabled={isInvalid}
          onClick={onApply}
          isLoading={isLoading}
          {...rest}
        >
          {buttonText}
        </EuiButton>
      </EuiToolTip>
    );
  }
}
