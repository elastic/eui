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
  MouseEvent,
} from 'react';

import { useEuiMemoizedStyles } from '../../../../services';
import { useEuiI18n } from '../../../i18n';
import { EuiPopover } from '../../../popover';
import { EuiFormAppendPrependButtonProps, EuiFormPrepend } from '../../../form';
import { euiQuickSelectPopoverStyles } from './quick_select_popover.styles';
import { EuiQuickSelectPanel } from './quick_select_panel';
import { EuiQuickSelect } from './quick_select';
import { EuiCommonlyUsedTimeRanges } from './commonly_used_time_ranges';
import { EuiRecentlyUsed } from './recently_used';
import { EuiRefreshInterval } from '../../auto_refresh/refresh_interval';
import { TimeOptions } from '../time_options';
import {
  DurationRange,
  ApplyRefreshInterval,
  RefreshUnitsOptions,
  ApplyTime,
  QuickSelect,
  QuickSelectPanel,
  Milliseconds,
} from '../../types';

export type EuiQuickSelectButtonProps = Partial<
  Omit<EuiFormAppendPrependButtonProps, 'children' | 'isDisabled'>
>;

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
  refreshInterval: Milliseconds;
  refreshMinInterval?: Milliseconds;
  intervalUnits?: RefreshUnitsOptions;
  start: string;
  timeOptions: TimeOptions;
  buttonProps?: EuiQuickSelectButtonProps;
}

export const EuiQuickSelectPopover: FunctionComponent<
  EuiQuickSelectPopoverProps
> = ({ applyTime: _applyTime, buttonProps = {}, ...props }) => {
  const { onClick: buttonOnClick, ...quickSelectButtonProps } = buttonProps;

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

  const quickSelectButtonOnClick = (
    e: MouseEvent<HTMLButtonElement> & MouseEvent<HTMLAnchorElement>
  ) => {
    togglePopover();
    buttonOnClick?.(e);
  };

  const quickSelectButton = (
    <EuiFormPrepend
      element="button"
      iconLeft="calendar"
      iconRight="arrowDown"
      isDisabled={props.isDisabled}
      onClick={quickSelectButtonOnClick}
      aria-label={buttonlabel}
      title={buttonlabel}
      data-test-subj="superDatePickerToggleQuickMenuButton"
      {...quickSelectButtonProps}
    />
  );

  return (
    <EuiPopover
      button={quickSelectButton}
      isOpen={isOpen}
      closePopover={closePopover}
      anchorPosition="downLeft"
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
  Omit<EuiQuickSelectPopoverProps, 'isDisabled' | 'buttonProps'> & {
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
  refreshMinInterval,
  intervalUnits,
  applyRefreshInterval,
  applyTime,
  prevQuickSelect,
}) => {
  const styles = useEuiMemoizedStyles(euiQuickSelectPopoverStyles);

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
      minInterval={refreshMinInterval}
      intervalUnits={intervalUnits}
    />
  );

  const customQuickSelectPanelsElement = useMemo(() => {
    if (!customQuickSelectPanels) {
      return null;
    }
    return customQuickSelectPanels.map(({ title, content }) => {
      return (
        <EuiQuickSelectPanel key={title} title={title}>
          {React.cloneElement(content, { applyTime })}
        </EuiQuickSelectPanel>
      );
    });
  }, [customQuickSelectPanels, applyTime]);

  return (
    <div
      css={styles.euiQuickSelectPopover}
      className="euiQuickSelectPopover"
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
