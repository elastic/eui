import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import {
  commonlyUsedRangeShape,
  recentlyUsedRangeShape,
  quickSelectPanelShape,
} from '../types';

import { EuiButtonEmpty } from '../../../button';
import { EuiIcon } from '../../../icon';
import { EuiPopover } from '../../../popover';
import { EuiTitle } from '../../../title';
import { EuiSpacer } from '../../../spacer';
import { EuiHorizontalRule } from '../../../horizontal_rule';
import { EuiText } from '../../../text';

import { EuiQuickSelect } from './quick_select';
import { EuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { EuiRecentlyUsed } from './recently_used';
import { EuiRefreshInterval } from './refresh_interval';

export class EuiQuickSelectPopover extends Component {
  state = {
    isOpen: false,
  };

  closePopover = () => {
    this.setState({ isOpen: false });
  };

  togglePopover = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }));
  };

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
  };

  renderDateTimeSections = () => {
    if (this.props.isAutoRefreshOnly) {
      return null;
    }

    return (
      <Fragment>
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
        {this.renderCustomQuickSelectPanels()}
      </Fragment>
    );
  };

  renderCustomQuickSelectPanels = () => {
    if (!this.props.customQuickSelectPanels) {
      return null;
    }

    return this.props.customQuickSelectPanels.map(({ title, content }) => {
      return (
        <Fragment key={title}>
          <EuiTitle size="xxxs">
            <span>{title}</span>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText size="s" className="euiQuickSelectPopover__section">
            {React.cloneElement(content, { applyTime: this.applyTime })}
          </EuiText>
          <EuiHorizontalRule margin="s" />
        </Fragment>
      );
    });
  };

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
        data-test-subj="superDatePickerToggleQuickMenuButton">
        <EuiIcon
          type={
            !this.props.isAutoRefreshOnly && this.props.isPaused
              ? 'calendar'
              : 'clock'
          }
        />
      </EuiButtonEmpty>
    );

    return (
      <EuiPopover
        id="QuickSelectPopover"
        button={quickSelectButton}
        isOpen={this.state.isOpen}
        closePopover={this.closePopover}
        anchorPosition="downLeft"
        ownFocus>
        <div
          className="euiQuickSelectPopover__content"
          data-test-subj="superDatePickerQuickMenu">
          {this.renderDateTimeSections()}
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
  isAutoRefreshOnly: PropTypes.bool.isRequired,
  isAutoRefreshOnly: PropTypes.bool.isRequired,
  customQuickSelectPanels: PropTypes.arrayOf(quickSelectPanelShape),
};
