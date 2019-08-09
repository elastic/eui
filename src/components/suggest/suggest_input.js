/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFilterButton } from '../filter_group';
import { EuiFieldText } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';
import { EuiPopover, EuiInputPopover } from '../popover';

export class EuiSuggestInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isPopoverOpen: false,
    };
  }

  onFieldChange(e) {
    this.setState({
      value: e.target.value,
      isPopoverOpen: !this.state.isPopoverOpen,
    });
    this.props.sendValue(e.target.value);
  }

  closePopover() {
    this.setState({
      isPopoverOpen: false,
    });
  }

  render() {
    const {
      className,
      status,
      append,
      prefix,
      suggestions,
      sendValue,
      ...rest
    } = this.props;

    const statusMap = {
      notYetSaved: {
        icon: 'dot',
        color: '#DD0A73',
        tooltip: "You've made changes to this saved query. Click to save them.",
      },
      saved: {
        icon: 'checkInCircleFilled',
        color: 'secondary',
      },
      noNewChanges: {
        icon: '',
        color: 'secondary',
      },
    };

    let icon;
    let color;
    let tooltip;

    if (statusMap[status]) {
      icon = statusMap[status].icon;
      color = statusMap[status].color;
      tooltip = statusMap[status].tooltip;
    }
    const classes = classNames('euiSuggestInput', className);

    // EuiFieldText's append accepts an array of elements so start by creating an empty arry
    const appendArray = [];

    const statusElement = status !== 'isLoading' && (
      <EuiToolTip
        position="left"
        content={tooltip}
        anchorClassName="statusIcon">
        <EuiIcon color={color} type={icon} />
      </EuiToolTip>
    );

    // Push the status element to the array if it is not undefined
    if (statusElement) appendArray.push(statusElement);

    // Check to see if consumer passed an append item and if so, add it to the array
    if (append) appendArray.push(append);

    const customInput = (
      <EuiFieldText
        value={this.state.value}
        fullWidth
        prepend={prefix}
        append={appendArray}
        isLoading={status === 'isLoading' ? true : false}
        onChange={this.onFieldChange.bind(this)}
        {...rest}
      />
    );

    return (
      <div className={classes}>
        <EuiInputPopover
          id="popover"
          input={customInput}
          isOpen={this.state.isPopoverOpen}
          panelPaddingSize="none"
          closePopover={this.closePopover.bind(this)}>
          <div>{suggestions}</div>
        </EuiInputPopover>
      </div>
    );
  }
}

EuiSuggestInput.propTypes = {
  className: PropTypes.string,
  /**
   * Status of the current query 'notYetSaved', 'saved', 'noNewChanges' or 'isLoading'.
   */
  status: PropTypes.oneOf([
    'notYetSaved',
    'saved',
    'noNewChanges',
    'isLoading',
  ]),
  /**
   * Element to be appended to the input bar.
   */
  append: PropTypes.node,
  /**
   * Element to be prepended to the input bar.
   */
  prefix: PropTypes.node,
  /**
   * List of suggestions to display using 'suggestItem'.
   */
  suggestions: PropTypes.array,
};

EuiSuggestInput.defaultProps = { suggestions: 'Sample suggestion' };
