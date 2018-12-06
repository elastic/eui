import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import { EuiPopover } from '../../../popover';

import { DatePopoverContent } from './date_popover_content';

export class DatePopoverButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(['start', 'end']),
    isInvalid: PropTypes.bool,
    needsUpdating: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onValueChange: PropTypes.func,
    roundUp: PropTypes.bool,
  }

  state = {
    isOpen: false,
  }

  togglePopover = () => {
    this.setState((prevState) => {
      return { isOpen: !prevState.isOpen };
    });
  }

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  }

  render() {
    const {
      position,
      isInvalid,
      needsUpdating,
      value,
      buttonProps,
      roundUp,
      onValueChange,
      ...rest
    } = this.props;

    const classes = classNames([
      'euiSuperDatePicker__dateText',
      'euiSuperDatePicker__dateButton',
      `euiSuperDatePicker__dateButton--${position}`,
      {
        'euiSuperDatePicker__dateButton-isSelected': this.state.isOpen,
        'euiSuperDatePicker__dateButton-isInvalid': isInvalid,
        'euiSuperDatePicker__dateButton-needsUpdating': needsUpdating
      }
    ]);

    let title = value;
    if (isInvalid) {
      title = `Invalid date: ${title}`;
    } else if (needsUpdating) {
      title = `Update needed: ${title}`;
    }

    const button = (
      <button
        onClick={this.togglePopover}
        className={classes}
        title={title}
        {...buttonProps}
      >
        {value}
      </button>
    );

    return (
      <EuiPopover
        button={button}
        isOpen={this.state.isOpen}
        closePopover={this.closePopover}
        anchorPosition="downRight"
        panelPaddingSize="none"
        ownFocus
        {...rest}
      >
        <DatePopoverContent
          value={value}
          roundUp={roundUp}
          onValueChange={onValueChange}
        />
      </EuiPopover>
    );
  }
}
