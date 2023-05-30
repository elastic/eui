/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  ReactElement,
} from 'react';

import { EuiButtonEmpty } from '../../../button';
import { EuiIcon } from '../../../icon';
import { EuiPopover } from '../../../popover';
import { EuiTitle } from '../../../title';
import { EuiText } from '../../../text';
import { useEuiI18n } from '../../../i18n';

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
  commonlyUsedRanges: ReactElement<typeof EuiCommonlyUsedTimeRanges>;
  recentlyUsedRanges: ReactElement<typeof EuiRecentlyUsed>;
  refreshInterval?: ReactElement<typeof EuiRefreshInterval>;
  customQuickSelectPanels?: ReactNode;
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

export const EuiQuickSelectPopover: FunctionComponent<
  EuiQuickSelectPopoverProps
> = ({ applyTime: _applyTime, ...props }) => {
  const [prevQuickSelect, setQuickSelect] = useState<QuickSelect>();
  const [isOpen, setIsOpen] = useState(false);
  const closePopover = useCallback(() => setIsOpen(false), []);
  const togglePopover = useCallback(() => setIsOpen((isOpen) => !isOpen), []);

  const applyTime: ApplyTime = useCallback(
    ({ start, end, quickSelect, keepPopoverOpen = false }) => {
      _applyTime({ start, end });
      if (quickSelect) {
        setQuickSelect(quickSelect);
      }
      if (!keepPopoverOpen) {
        closePopover();
      }
    },
    [_applyTime, closePopover]
  );

  const buttonlabel = useEuiI18n(
    'euiQuickSelectPopover.buttonLabel',
    'Date quick select'
  );

  const quickSelectButton = (
    <EuiButtonEmpty
      className="euiFormControlLayout__prepend"
      textProps={{ className: 'euiQuickSelectPopover__buttonText' }}
      onClick={togglePopover}
      aria-label={buttonlabel}
      title={buttonlabel}
      size="xs"
      iconType="arrowDown"
      iconSide="right"
      isDisabled={props.isDisabled}
      data-test-subj="superDatePickerToggleQuickMenuButton"
    >
      <EuiIcon type="calendar" />
    </EuiButtonEmpty>
  );

  return (
    <EuiPopover
      button={quickSelectButton}
      isOpen={isOpen}
      closePopover={closePopover}
      anchorPosition="downLeft"
      anchorClassName="euiQuickSelectPopover__anchor"
    >
      <EuiQuickSelectPanels
        {...props}
        applyTime={applyTime}
        prevQuickSelect={prevQuickSelect}
      />
    </EuiPopover>
  );
};

export const EuiQuickSelectPanels: FunctionComponent<
  Omit<EuiQuickSelectPopoverProps, 'isDisabled'> & {
    prevQuickSelect?: QuickSelect;
  }
> = ({
  start,
  end,
  dateFormat,
  timeOptions,
  commonlyUsedRanges,
  recentlyUsedRanges,
  customQuickSelectPanels,
  customQuickSelectRender,
  isPaused,
  refreshInterval,
  applyRefreshInterval,
  applyTime,
  prevQuickSelect,
}) => {
  const quickSelectElement = (
    <EuiQuickSelect
      applyTime={applyTime}
      start={start}
      end={end}
      prevQuickSelect={prevQuickSelect}
      timeOptions={timeOptions}
    />
  );

  const commonlyUsedElement = (
    <EuiCommonlyUsedTimeRanges
      applyTime={applyTime}
      commonlyUsedRanges={commonlyUsedRanges}
    />
  );

  const recentlyUsedElement = (
    <EuiRecentlyUsed
      applyTime={applyTime}
      commonlyUsedRanges={commonlyUsedRanges}
      dateFormat={dateFormat}
      recentlyUsedRanges={recentlyUsedRanges}
    />
  );

  const refreshIntervalElement = applyRefreshInterval && (
    <EuiRefreshInterval
      onRefreshChange={applyRefreshInterval}
      isPaused={isPaused}
      refreshInterval={refreshInterval}
    />
  );

  const customQuickSelectPanelsElement = useMemo(() => {
    if (!customQuickSelectPanels) {
      return null;
    }
    return customQuickSelectPanels.map(({ title, content }) => {
      return (
        <div key={title} className="euiQuickSelectPopover__panel">
          <EuiTitle size="xxxs">
            <span>{title}</span>
          </EuiTitle>
          <EuiText size="s" className="euiQuickSelectPopover__section">
            {React.cloneElement(content, { applyTime })}
          </EuiText>
        </div>
      );
    });
  }, [customQuickSelectPanels, applyTime]);

  return (
    <div
      className="euiQuickSelectPopover__content"
      data-test-subj="superDatePickerQuickMenu"
    >
      {customQuickSelectRender ? (
        customQuickSelectRender({
          quickSelect: quickSelectElement,
          commonlyUsedRanges: commonlyUsedElement,
          recentlyUsedRanges: recentlyUsedElement,
          refreshInterval: refreshIntervalElement,
          customQuickSelectPanels: customQuickSelectPanelsElement,
        })
      ) : (
        <>
          {quickSelectElement}
          {commonlyUsedElement}
          {recentlyUsedElement}
          {refreshIntervalElement}
          {customQuickSelectPanelsElement}
        </>
      )}
    </div>
  );
};
