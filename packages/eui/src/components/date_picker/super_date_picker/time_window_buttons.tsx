/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import dateMath from '@elastic/datemath';
import moment, { Moment } from 'moment';

import { ShortDate, ApplyTime } from '../types';
import { usePrettyInterval } from './pretty_interval';

import { EuiButtonGroupButton } from '../../button/button_group/button_group_button';
import { euiButtonGroupButtonsStyles } from '../../button/button_group/button_group.styles';
import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../services';
import { useEuiI18n } from '../../i18n';

export const ZOOM_FACTOR_DEFAULT = 0.5;

export interface TimeWindowButtonsConfig {
  /**
   * Show button for zooming out
   * @default true
   */
  zoomOut?: boolean;
  /**
   * Show buttons for shifting the time window forward and backward
   * @default true
   */
  shiftArrows?: boolean;
  /**
   * How much the time window is increased when zooming.
   * Can be a number (0.25) or a string representing a percentage (25%)
   * @default 0.5
   * */
  zoomFactor?: number | string;
}

export type TimeWindowButtonsProps = TimeWindowButtonsConfig & {
  applyTime: ApplyTime;
  start: ShortDate;
  end: ShortDate;
  compressed?: boolean;
  isDisabled?: boolean;
};

/**
 * Button group with time window controls for shifting the time window
 * forwards and backwards, and zooming out.
 */
export const TimeWindowButtons: React.FC<TimeWindowButtonsProps> = ({
  applyTime,
  start,
  end,
  compressed,
  isDisabled,
  zoomOut = true,
  shiftArrows = true,
  zoomFactor = ZOOM_FACTOR_DEFAULT,
}) => {
  const buttonColor = 'text';
  const buttonSize = compressed ? 's' : 'm';
  const iconSize = compressed ? 's' : 'm';
  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);

  const { displayInterval, stepForward, stepBackward, expandWindow } =
    useTimeWindow(start, end, applyTime, { zoomFactor });

  const previousId = useGeneratedHtmlId({ prefix: 'previous' });
  const previousLabel = useEuiI18n(
    'euiTimeWindowButtons.previousLabel',
    'Previous'
  );
  const previousTooltipContent = useEuiI18n(
    'euiTimeWindowButtons.previousDescription',
    'Previous {displayInterval}',
    { displayInterval }
  );

  const zoomOutId = useGeneratedHtmlId({ prefix: 'zoom_out' });
  const zoomOutLabel = useEuiI18n(
    'euiTimeWindowButtons.zoomOutLabel',
    'Zoom out'
  );

  const nextId = useGeneratedHtmlId({ prefix: 'next' });
  const nextLabel = useEuiI18n('euiTimeWindowButtons.nextLabel', 'Next');
  const nextTooltipContent = useEuiI18n(
    'euiTimeWindowButtons.nextDescription',
    'Next {displayInterval}',
    { displayInterval }
  );

  if (!zoomOut && !shiftArrows) return null;

  return (
    <div
      className="euiSuperDatePicker__timeWindowButtons"
      css={[styles.euiButtonGroup__buttons, styles[buttonSize]]}
      data-test-subj="timeWindowButtons"
    >
      {shiftArrows && (
        <EuiButtonGroupButton
          id={previousId}
          data-test-subj="timeWindowButtonsPrevious"
          label={previousLabel}
          title=""
          toolTipContent={!isDisabled && previousTooltipContent}
          color={buttonColor}
          size={buttonSize}
          iconType="arrowLeft"
          iconSize={iconSize}
          isIconOnly
          isSelected={false}
          isDisabled={isDisabled}
          onClick={stepBackward}
        />
      )}
      {zoomOut && (
        <EuiButtonGroupButton
          id={zoomOutId}
          data-test-subj="timeWindowButtonsZoomOut"
          label={zoomOutLabel}
          title=""
          toolTipContent={!isDisabled && zoomOutLabel}
          toolTipProps={{ disableScreenReaderOutput: true }}
          color={buttonColor}
          size={buttonSize}
          iconType="magnifyWithMinus"
          iconSize={iconSize}
          isIconOnly
          isSelected={false}
          isDisabled={isDisabled}
          onClick={expandWindow}
        />
      )}
      {shiftArrows && (
        <EuiButtonGroupButton
          id={nextId}
          data-test-subj="timeWindowButtonsNext"
          label={nextLabel}
          title=""
          toolTipContent={!isDisabled && nextTooltipContent}
          color={buttonColor}
          size={buttonSize}
          iconType="arrowRight"
          iconSize={iconSize}
          isIconOnly
          isSelected={false}
          isDisabled={isDisabled}
          onClick={stepForward}
        />
      )}
    </div>
  );
};

/**
 * Partly adapted from date_picker/super_date_picker/quick_select_popover/quick_select.tsx
 */
export function useTimeWindow(
  start: ShortDate,
  end: ShortDate,
  apply: ApplyTime,
  options?: { zoomFactor?: TimeWindowButtonsConfig['zoomFactor'] }
) {
  const min = dateMath.parse(start) as Moment;
  const max = dateMath.parse(end, { roundUp: true }) as Moment;
  const windowDuration = max.diff(min);
  const zoomFactor = getPercentageMultiplier(
    options?.zoomFactor ?? ZOOM_FACTOR_DEFAULT
  );
  // Gets added to each end, that's why it's split in half
  const zoomAddition = windowDuration * (zoomFactor / 2);

  let displayInterval = usePrettyInterval(false, windowDuration);
  if (!isRelativeToNow(start, end) && !isExactMinuteRange(windowDuration)) {
    displayInterval = `~${displayInterval}`;
  }

  return {
    displayInterval,
    stepForward,
    stepBackward,
    expandWindow,
  };

  function stepForward() {
    apply({
      start: moment(max).toISOString(),
      end: moment(max).add(windowDuration, 'ms').toISOString(),
    });
  }

  function stepBackward() {
    apply({
      start: moment(min).subtract(windowDuration, 'ms').toISOString(),
      end: moment(min).toISOString(),
    });
  }

  function expandWindow() {
    apply({
      start: moment(min).subtract(zoomAddition, 'ms').toISOString(),
      end: moment(max).add(zoomAddition, 'ms').toISOString(),
    });
  }
}

/**
 * Get a number out of either 0.2 or "20%"
 */
function getPercentageMultiplier(value: number | string) {
  if (typeof value === 'number') return value;
  return parseInt(String(value).replace('%', '').trim()) / 100;
}

/**
 * Useful to determine whether to show the tilde in the display
 */
function isExactMinuteRange(diffMs: number) {
  // 60 * 1000 = ms per minute
  return diffMs % (60 * 1000) === 0;
}

function isRelativeToNow(start: ShortDate, end: ShortDate) {
  return String(end).includes('now') || String(start).includes('now');
}
