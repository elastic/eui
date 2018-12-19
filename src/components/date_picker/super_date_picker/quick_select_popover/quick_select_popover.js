
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { commonlyUsedRangeShape, recentlyUsedRangeShape } from '../types';

import {
  EuiButtonEmpty,
} from '../../../button';

import {
  EuiIcon,
} from '../../../icon';

import {
  EuiPopover,
} from '../../../popover';

import { EuiQuickSelect } from './quick_select';
import { EuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { EuiRecentlyUsed } from './recently_used';
import { EuiRefreshInterval } from './refresh_interval';

export class EuiQuickSelectPopover extends Component {

  state = {
    isOpen: false,
  }

  closePopover = () => {
    this.setState({ isOpen: false });
  }

  togglePopover = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen
    }));
  }

  applyTime = ({ start, end, quickSelect, keepPopoverOpen = false }) => {
    this.props.applyTime({
      start,
      end,
    });
    if (quickSelect) {
      this.setState({ prevQuickSelect: quickSelect });
    }
    if (!keepPopoverOpen) {
      this.closePopover();
    }
  }

  render() {
    const quickSelectButton = (
      <EuiButtonEmpty
        className="euiFormControlLayout__prepend"
        textProps={{ className: 'euiQuickSelectPopover__buttonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
        data-test-subj="superDatePickerToggleQuickMenuButton"
      >
        <EuiIcon type={this.props.isPaused ? 'calendar' : 'clock'} />
      </EuiButtonEmpty>
    );

    return (
      <EuiPopover
        id="QuickSelectPopover"
        button={quickSelectButton}
        isOpen={this.state.isOpen}
        closePopover={this.closePopover}
        anchorPosition="downLeft"
        ownFocus
      >
        <div
          style={{ width: 400, maxWidth: '100%' }}
          data-test-subj="superDatePickerQuickMenu"
        >
          <EuiQuickSelect
            applyTime={this.applyTime}
            start={this.props.start}
            end={this.props.end}
            prevQuickSelect={this.state.prevQuickSelect}
          />
          <EuiCommonlyUsedTimeRanges
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
          />
          <EuiRecentlyUsed
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
            dateFormat={this.props.dateFormat}
            recentlyUsedRanges={this.props.recentlyUsedRanges}
          />
          <EuiRefreshInterval
            applyRefreshInterval={this.props.applyRefreshInterval}
            isPaused={this.props.isPaused}
            refreshInterval={this.props.refreshInterval}
          />
        </div>
      </EuiPopover>
    );
  }
}

EuiQuickSelectPopover.propTypes = {
  applyTime: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
  applyRefreshInterval: PropTypes.func,
  isPaused: PropTypes.bool.isRequired,
  refreshInterval: PropTypes.number.isRequired,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
  dateFormat: PropTypes.string.isRequired,
  recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape).isRequired,
};
