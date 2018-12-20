import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

import { EuiPopover } from '../../../popover';

import { formatTimeString } from '../pretty_duration';
import { EuiDatePopoverContent } from './date_popover_content';

export class EuiDatePopoverButton extends Component {
  static propTypes = {
    position: PropTypes.oneOf(['start', 'end']),
    isInvalid: PropTypes.bool,
    needsUpdating: PropTypes.bool,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    dateFormat: PropTypes.string.isRequired,
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
      onChange,
      dateFormat,
      ...rest
    } = this.props;

    const classes = classNames([
      'euiDatePopoverButton',
      `euiDatePopoverButton--${position}`,
      {
        'euiDatePopoverButton-isSelected': this.state.isOpen,
        'euiDatePopoverButton-isInvalid': isInvalid,
        'euiDatePopoverButton-needsUpdating': needsUpdating
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
        data-test-subj={`superDatePicker${this.props.position}DatePopoverButton`}
        {...buttonProps}
      >
        {formatTimeString(value, dateFormat, roundUp)}
      </button>
    );

    return (
      <EuiPopover
        className="euiDatePopoverButton__popover"
        button={button}
        isOpen={this.state.isOpen}
        closePopover={this.closePopover}
        anchorPosition={this.props.position === 'start' ? 'downLeft' : 'downRight'}
        anchorClassName="euiDatePopoverButton__popoverAnchor"
        panelPaddingSize="none"
        ownFocus
        {...rest}
      >
        <EuiDatePopoverContent
          value={value}
          roundUp={roundUp}
          onChange={onChange}
          dateFormat={dateFormat}
        />
      </EuiPopover>
    );
  }
}
