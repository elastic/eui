/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EuiFilterButton } from '../filter_group';
import { EuiFieldText } from '../form';
import { EuiToolTip } from '../tool_tip';
import { EuiIcon } from '../icon';
import { EuiPopover } from '../popover';

export class EuiSuggestInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSuggestions: false,
      value: '',
      menuWidth: null,
    };
  }

  // onFieldFocus() {
  //   this.setState({
  //     showSuggestions: true,
  //   });
  // }

  onFieldBlur() {
    this.setState({
      showSuggestions: false,
    });
  }

  setPopoverRef = ref => {
    this.inputRef = ref;
  };

  onFieldChange(e) {
    this.setState({
      value: e.target.value,
      showSuggestions: e.target.value === '' ? false : true,
    });

    const focusSelected = () => {
      requestAnimationFrame(() => {
        this.setState({
          menuWidth: this.inputRef.getBoundingClientRect().width + 50,
        });
      });
    };

    requestAnimationFrame(focusSelected);
  }

  render() {
    const {
      className,
      status,
      label,
      prefix,
      suggestions,
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
    const statusElement = (
      <EuiToolTip position="left" content={tooltip}>
        {status === 'isLoading' ? (
          <span className="euiLoadingSpinner euiLoadingSpinner--medium" />
        ) : (
          <div className="statusIcon">
            <EuiIcon color={color} type={icon} />
            <span className="statusLabel">{label}</span>
          </div>
        )}
      </EuiToolTip>
    );
    const classes = classNames('euiSuggestInput', className);

    return (
      <div className={classes}>
        <EuiFieldText
          value={this.state.value}
          fullWidth
          prepend={prefix}
          append={statusElement}
          onChange={this.onFieldChange.bind(this)}
          inputRef={this.setPopoverRef}
          // onFocus={this.onFieldFocus.bind(this)}
          onBlur={this.onFieldBlur.bind(this)}
          {...rest}
        />
        <div style={{ width: this.state.menuWidth }}
          className={
            this.state.showSuggestions
              ? 'euiSuggestInput__popOverPanel euiPanel euiPopover__panel euiPopover__panel--bottom euiPopover__panel-isOpen'
              : 'euiSuggestInput__popOverPanel euiPanel euiPopover__panel euiPopover__panel--bottom'
          }>
          {suggestions}
        </div>
      </div>
    );
  }
};

EuiSuggestInput.propTypes = {
  className: PropTypes.string,
  /**
   * Status of the current query 'notYetSaved', 'saved', 'noNewChanges' or 'isLoading'.
   */
  status: PropTypes.string,
  /**
   * Label to go with status elements (e.g. KQL).
   */
  label: PropTypes.node,
  prefix: PropTypes.node,
  suggestions: PropTypes.node,
};

EuiSuggestInput.defaultProps = { suggestions: 'Sample suggestion' };
