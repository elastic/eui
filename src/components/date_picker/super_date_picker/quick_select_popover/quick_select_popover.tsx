/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { Component, Fragment, ReactNode, ReactElement } from 'react';

import { EuiButtonEmpty } from '../../../button';
import { EuiIcon } from '../../../icon';
import { EuiPopover } from '../../../popover';
import { EuiTitle } from '../../../title';
import { EuiText } from '../../../text';

import { EuiQuickSelect } from './quick_select';
import { EuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { EuiRecentlyUsed } from './recently_used';
import { EuiRefreshInterval } from '../../auto_refresh/refresh_interval';
import { TimeOptions } from '../time_options';
import {
  DurationRange,
  ApplyRefreshInterval,
  ApplyTime,
  QuickSelect,
  QuickSelectPanel,
} from '../../types';

export type CustomQuickSelectRenderOptions = {
  quickSelect: ReactElement<typeof EuiQuickSelect>;
  commonlyUsedTimes: ReactElement<typeof EuiCommonlyUsedTimeRanges>;
  recentlyUsedTimes: ReactElement<typeof EuiRecentlyUsed>;
  customQuickSelectPanels?: ReactElement<QuickSelectPanel[]>;
  applyRefreshIntervalPanel?: ReactElement<typeof EuiRefreshInterval>;
};

export interface EuiQuickSelectPopoverProps {
  applyRefreshInterval?: ApplyRefreshInterval;
  applyTime: ApplyTime;
  commonlyUsedRanges: DurationRange[];
  customQuickSelectPanels?: QuickSelectPanel[];
  customQuickSelectRender?: (
    options: CustomQuickSelectRenderOptions
  ) => ReactNode;
  dateFormat: string;
  end: string;
  isDisabled: boolean;
  isPaused: boolean;
  recentlyUsedRanges: DurationRange[];
  refreshInterval: number;
  start: string;
  timeOptions: TimeOptions;
}

interface EuiQuickSelectPopoverState {
  isOpen: boolean;
  prevQuickSelect?: QuickSelect;
}

export class EuiQuickSelectPopover extends Component<
  EuiQuickSelectPopoverProps,
  EuiQuickSelectPopoverState
> {
  state: EuiQuickSelectPopoverState = {
    isOpen: false,
  };

  closePopover = () => {
    this.setState({ isOpen: false });
  };

  togglePopover = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  applyTime: ApplyTime = ({
    start,
    end,
    quickSelect,
    keepPopoverOpen = false,
  }) => {
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

  renderQuickSelectMenuSections = () => {
    const {
      commonlyUsedRanges,
      dateFormat,
      end,
      recentlyUsedRanges,
      start,
      timeOptions,
      customQuickSelectRender,
      applyRefreshInterval,
      isPaused,
      refreshInterval,
    } = this.props;
    const { prevQuickSelect } = this.state;

    const quickSelectElement = (
      <EuiQuickSelect
        applyTime={this.applyTime}
        start={start}
        end={end}
        prevQuickSelect={prevQuickSelect}
        timeOptions={timeOptions}
      />
    );

    const commonlyUsedElement = (
      <EuiCommonlyUsedTimeRanges
        applyTime={this.applyTime}
        commonlyUsedRanges={commonlyUsedRanges}
      />
    );

    const recentlyUsedElement = (
      <EuiRecentlyUsed
        applyTime={this.applyTime}
        commonlyUsedRanges={commonlyUsedRanges}
        dateFormat={dateFormat}
        recentlyUsedRanges={recentlyUsedRanges}
      />
    );

    const customQuickSelectPanelsElement = (
      <>{this.renderCustomQuickSelectPanels()}</>
    );

    const refreshIntervalElement = applyRefreshInterval && (
      <EuiRefreshInterval
        onRefreshChange={applyRefreshInterval}
        isPaused={isPaused}
        refreshInterval={refreshInterval}
      />
    );
    return (
      <Fragment>
        {customQuickSelectRender ? (
          customQuickSelectRender({
            quickSelect: quickSelectElement,
            commonlyUsedTimes: commonlyUsedElement,
            recentlyUsedTimes: recentlyUsedElement,
            customQuickSelectPanels: customQuickSelectPanelsElement,
            applyRefreshIntervalPanel: refreshIntervalElement,
          })
        ) : (
          <>
            {quickSelectElement}
            {commonlyUsedElement}
            {recentlyUsedElement}
            {customQuickSelectPanelsElement}
            {applyRefreshInterval && refreshIntervalElement}
          </>
        )}
      </Fragment>
    );
  };

  renderCustomQuickSelectPanels = () => {
    const { customQuickSelectPanels } = this.props;
    if (!customQuickSelectPanels) {
      return null;
    }

    return customQuickSelectPanels.map(({ title, content }) => {
      return (
        <div key={title}>
          <EuiTitle size="xxxs">
            <span>{title}</span>
          </EuiTitle>
          <EuiText size="s" className="euiQuickSelectPopover__section">
            {React.cloneElement(content, { applyTime: this.applyTime })}
          </EuiText>
        </div>
      );
    });
  };

  render() {
    const { isDisabled } = this.props;
    const { isOpen } = this.state;

    const quickSelectButton = (
      <EuiButtonEmpty
        className="euiFormControlLayout__prepend"
        textProps={{ className: 'euiQuickSelectPopover__buttonText' }}
        onClick={this.togglePopover}
        aria-label="Date quick select"
        size="xs"
        iconType="arrowDown"
        iconSide="right"
        isDisabled={isDisabled}
        data-test-subj="superDatePickerToggleQuickMenuButton"
      >
        <EuiIcon type="calendar" />
      </EuiButtonEmpty>
    );

    return (
      <EuiPopover
        button={quickSelectButton}
        isOpen={isOpen}
        closePopover={this.closePopover}
        anchorPosition="downLeft"
        anchorClassName="euiQuickSelectPopover__anchor"
      >
        <div
          className="euiQuickSelectPopover__content"
          data-test-subj="superDatePickerQuickMenu"
        >
          {this.renderQuickSelectMenuSections()}
        </div>
      </EuiPopover>
    );
  }
}
