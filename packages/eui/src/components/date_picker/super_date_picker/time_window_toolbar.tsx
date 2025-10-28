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

  // TODO rename handlers?
  const {
    prettyInterval,
    stepForward,
    stepBackward,
    zoomOut: zoom,
  } = useTimeWindow(start, end, applyTime);

  // Previous
  const previousId = useGeneratedHtmlId({ prefix: 'previous' });
  const previousLabel = 'Previous'; // TODO translate
  const previousTooltipContent = `Previous ~${prettyInterval}`; // TODO translate

  // Zoom out
  const zoomOutId = useGeneratedHtmlId({ prefix: 'zoom_out' });
  const zoomOutLabel = 'Zoom out'; // TODO translate

  // Next
  const nextId = useGeneratedHtmlId({ prefix: 'next' });
  const nextLabel = 'Next'; // TODO translate
  const nextTooltipContent = `Next ~${prettyInterval}`; // TODO translate

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
          onClick={zoom}
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
 *
 * Partly adapted from date_picker/super_date_picker/quick_select_popover/quick_select.tsx
 *
 * @todo check variable names, most of them are terrible
 */
export function useTimeWindow(
  start: ShortDate,
  end: ShortDate,
  apply: ApplyTime
) {
  const min = dateMath.parse(start) as Moment;
  const max = dateMath.parse(end, { roundUp: true }) as Moment;
  const diff = max.diff(min);
  // terrible name, I meant what's added on the edges
  // e.g. 25% substracted to the start, 25% added to the end
  const edgeDiff = diff * (ZOOM_FACTOR / 2);

  const prettyInterval = usePrettyInterval(false, diff, {
    shortHand: true,
  });
  // const prettyZoomInterval = usePrettyInterval(false, diff + edgeDiff * 2, {
  //   shortHand: true,
  // });

  return {
    prettyInterval,
    stepForward,
    stepBackward,
    zoomOut,
  };

  function stepForward() {
    apply({
      start: moment(max).toISOString(),
      end: moment(max).add(diff, 'ms').toISOString(),
    });
  }

  function stepBackward() {
    apply({
      start: moment(min).subtract(diff, 'ms').toISOString(),
      end: moment(min).toISOString(),
    });
  }

  function zoomOut() {
    apply({
      start: moment(min).subtract(edgeDiff, 'ms').toISOString(),
      end: moment(max).add(edgeDiff, 'ms').toISOString(),
    });
  }
}
