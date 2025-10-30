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
 * Toolbar for managing the time window with controls for shifting the time window
 * forwards and backwards, and zooming out.
 *
 * @todo
 * - [ ] translate labels, etc.
 * - [ ] is `aria-pressed` being rendered causing any trouble?
 * - [ ] use `euiButtonGroup__buttons` class?
 * - [ ] check if hiding tooltips when isDisabled is the right thing to do
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
  const buttonSize = compressed ? 'compressed' : 'm';
  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);

  const { displayInterval, stepForward, stepBackward, expandWindow } =
    useTimeWindow(start, end, applyTime, { zoomFactor });

  // Previous
  const previousId = useGeneratedHtmlId({ prefix: 'previous' });
  const previousLabel = 'Previous'; // TODO translate
  const previousTooltipContent = `Previous ${displayInterval}`; // TODO translate

  // Zoom out
  const zoomOutId = useGeneratedHtmlId({ prefix: 'zoom_out' });
  const zoomOutLabel = 'Zoom out'; // TODO translate

  // Next
  const nextId = useGeneratedHtmlId({ prefix: 'next' });
  const nextLabel = 'Next'; // TODO translate
  const nextTooltipContent = `Next ${displayInterval}`; // TODO translate

  if (!zoomOut && !shiftArrows) return null;

  return (
    <div
      className="euiButtonGroup__buttons"
      css={[styles.euiButtonGroup__buttons, styles[buttonSize]]}
    >
      {shiftArrows && (
        <EuiButtonGroupButton
          color={buttonColor}
          onClick={stepBackward}
          id={previousId}
          label={previousLabel}
          toolTipContent={!isDisabled && previousTooltipContent}
          iconType="arrowLeft"
          isIconOnly
          size={buttonSize}
          isSelected={false}
          isDisabled={isDisabled}
        />
      )}
      {zoomOut && (
        <EuiButtonGroupButton
          color={buttonColor}
          onClick={expandWindow}
          id={zoomOutId}
          label={zoomOutLabel}
          toolTipContent={!isDisabled && zoomOutLabel}
          iconType="magnifyWithMinus"
          isIconOnly
          size={buttonSize}
          isSelected={false}
          isDisabled={isDisabled}
        />
      )}
      {shiftArrows && (
        <EuiButtonGroupButton
          color={buttonColor}
          onClick={stepForward}
          id={nextId}
          label={nextLabel}
          toolTipContent={!isDisabled && nextTooltipContent}
          iconType="arrowRight"
          isIconOnly
          size={buttonSize}
          isSelected={false}
          isDisabled={isDisabled}
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
  const zoomFactor = getPercentageMultiplier(options?.zoomFactor ?? ZOOM_FACTOR_DEFAULT);
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
function getPercentageMultiplier(
  value: number | string
) {
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
