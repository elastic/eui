import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import { EuiPopover } from '../../../popover';

import { DateInput } from './date_input';

export class DateButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(['start', 'end']),
    isInvalid: PropTypes.bool,
    needsUpdating: PropTypes.bool,
    buttonOnly: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func,
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
      buttonOnly,
      roundUp, // eslint-disable-line no-unused-vars
      onChange, // eslint-disable-line no-unused-vars
      ...rest
    } = this.props;

    const classes = classNames([
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
        onClick={buttonOnly ? undefined : this.togglePopover}
        className={classes}
        title={title}
        {...buttonProps}
      >
        {value}
      </button>
    );

    if (buttonOnly) {
      return button;
    }

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
        <DateInput
          value={this.props.value}
          roundUp={this.props.roundUp}
          onChange={this.props.onChange}
        />
      </EuiPopover>
    );
  }
}
