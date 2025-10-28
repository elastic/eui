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

interface TimeWindowToolbarProps {
  applyTime: ApplyTime;
  start: ShortDate;
  end: ShortDate;
  compressed?: boolean;
  isDisabled?: boolean;
  /** @default true */
  zoomOut?: boolean;
  /** @default true */
  navigationArrows?: boolean;
}

// How much time is added to the interval (or window)
// e.g. 60 minutes * 0.3 -> 18 minutes will be added (9 on each end)
const ZOOM_FACTOR = 0.3;

/**
 * Toolbar for managing the time window with controls for moving the time window
 * forwards and backwards, and zooming out.
 *
 * We're using EuiButtonGroupButton wrapped in role=toolbar,
 * whenever we have something like EuiToolbar, this might get refactored.
 *
 * @todo
 * - [ ] translate labels, etc.
 * - [ ] is `aria-pressed` being rendered causing any trouble?
 * - [ ] use `euiButtonGroup__buttons` class?
 * - [ ] check if hiding tooltips when isDisabled is the right thing to do
 */
export const TimeWindowToolbar: React.FC<TimeWindowToolbarProps> = ({
  applyTime,
  start,
  end,
  compressed,
  isDisabled,
  zoomOut = true,
  navigationArrows = true,
}) => {
  const buttonColor = 'text';
  const buttonSize = compressed ? 'compressed' : 'm';
  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);

  const { displayInterval, stepForward, stepBackward, expandWindow } =
    useTimeWindow(start, end, applyTime);

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

  if (!zoomOut && !navigationArrows) return null;

  return (
    <div
      role="toolbar"
      className="euiButtonGroup__buttons"
      css={[styles.euiButtonGroup__buttons, styles[buttonSize]]}
    >
      {navigationArrows && (
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
      {navigationArrows && (
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
  options?: { zoomFactor?: number }
) {
  const min = dateMath.parse(start) as Moment;
  const max = dateMath.parse(end, { roundUp: true }) as Moment;
  const windowDuration = max.diff(min);
  const zoomFactor = options?.zoomFactor ?? ZOOM_FACTOR;
  // Gets added to each end, that's why it's split in half
  const zoomAddition = windowDuration * (zoomFactor / 2);

  let displayInterval = usePrettyInterval(false, windowDuration, {
    shortHand: true,
  });
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

function isRelativeToNow(start: ShortDate, end: ShortDate) {
  return String(end).includes('now') || String(start).includes('now');
}

function isExactMinuteRange(diffMs: number) {
  // 60 * 1000 = ms per minute
  return diffMs % (60 * 1000) === 0;
}
