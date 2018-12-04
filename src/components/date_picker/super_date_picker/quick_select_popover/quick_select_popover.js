import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { commonlyUsedRangeShape, recentlyUsedRangeShape } from '../types';

/*
import { timeHistory } from '../../timefilter/time_history';
import { RefreshIntervalForm } from './refresh_interval_form';*/

import {
  EuiButtonEmpty,
  EuiButton,
  EuiButtonIcon,
} from '../../../button';

import {
  EuiFlexGrid,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../flex';

import {
  EuiIcon,
} from '../../../icon';

import {
  EuiPopover,
} from '../../../popover';

import {
  EuiTitle,
} from '../../../title';

import {
  EuiSpacer,
} from '../../../spacer';

import {
  EuiText,
} from '../../../text';

import {
  EuiHorizontalRule,
} from '../../../horizontal_rule';

import {
  EuiLink,
} from '../../../link';

import { QuickSelect } from './quick_select';
import { CommonlyUsed } from './commonly_used';
import { RecentlyUsed } from './recently_used';

export class QuickSelectPopover extends Component {

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

  applyTime = ({ from, to }) => {
    this.props.applyTime({
      from,
      to,
    });
    this.closePopover();
  }

  renderTimeNavigation = () => {
    return (
      <Fragment>
        <EuiButtonIcon
          onClick={this.props.stepBackward}
          iconType="arrowLeft"
          aria-label="Move backward in time"
        />
        <EuiButtonIcon
          onClick={this.props.stepForward}
          iconType="arrowRight"
          aria-label="Move forward in time"
        />
      </Fragment>
    );
  }

  render() {
    const quickSelectButton = (
      <EuiButtonEmpty
        className="euiFormControlLayout__prepend euiSuperDatePicker__quickSelectButton"
        textProps={{ className: 'euiSuperDatePicker__quickSelectButtonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
      >
        <EuiIcon type={this.props.isPaused ? 'calendar': 'clock'} />
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
        <div style={{ width: 400, maxWidth: '100%' }}>
          <QuickSelect
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
          />
          <EuiHorizontalRule margin="s" />
          <CommonlyUsed
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
          />
          <EuiHorizontalRule margin="s" />
          <RecentlyUsed
            applyTime={this.applyTime}
            commonlyUsedRanges={this.props.commonlyUsedRanges}
            dateFormat={this.props.dateFormat}
            recentlyUsedRanges={this.props.recentlyUsedRanges}
          />
          <EuiHorizontalRule margin="s" />
        </div>
      </EuiPopover>
    );
  }
}

QuickSelectPopover.propTypes = {
  applyTime: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
  isPaused: PropTypes.bool.isRequired,
  refreshInterval: PropTypes.number,
  commonlyUsedRanges: PropTypes.arrayOf(commonlyUsedRangeShape).isRequired,
  dateFormat: PropTypes.string.isRequired,
  recentlyUsedRanges: PropTypes.arrayOf(recentlyUsedRangeShape).isRequired,
};
