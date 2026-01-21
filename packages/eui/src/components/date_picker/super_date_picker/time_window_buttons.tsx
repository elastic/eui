/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import dateMath from '@elastic/datemath';
import moment from 'moment';

import { ShortDate, ApplyTime } from '../types';
import { usePrettyInterval } from './pretty_interval';
import { isRelativeToNow } from './relative_utils';

import { EuiButtonGroupButton } from '../../button/button_group/button_group_button';
import { euiButtonGroupButtonsStyles } from '../../button/button_group/button_group.styles';
import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../services';
import { useEuiI18n } from '../../i18n';

export const ZOOM_FACTOR_DEFAULT = 0.5;

export interface EuiTimeWindowButtonsConfig {
  /**
   * Show button for zooming out
   * @default true
   */
  showZoomOut?: boolean;
  /**
   * Show button for zooming in.
   * Defaults to false because it's a less common use case
   * @default false
   */
  showZoomIn?: boolean;
  /**
   * Show buttons for shifting the time window forward and backward
   * @default true
   */
  showShiftArrows?: boolean;
  /**
   * How much the time window is increased when zooming.
   * A number between 0 and 1 e.g. 0.25, or a string representing a percentage e.g. 25%
   * @default 0.5
   * */
  zoomFactor?: number | string;
}

export type EuiTimeWindowButtonsProps = EuiTimeWindowButtonsConfig & {
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
export const EuiTimeWindowButtons: React.FC<EuiTimeWindowButtonsProps> = ({
  applyTime,
  start,
  end,
  compressed,
  isDisabled,
  showZoomOut = true,
  showZoomIn = false,
  showShiftArrows = true,
  zoomFactor = ZOOM_FACTOR_DEFAULT,
}) => {
  const buttonColor = 'text';
  const buttonSize = compressed ? 's' : 'm';
  const iconSize = 'm';
  const styles = useEuiMemoizedStyles(euiButtonGroupButtonsStyles);

  const {
    displayInterval,
    isInvalid,
    stepForward,
    stepBackward,
    expandWindow,
    shrinkWindow,
    isWindowDurationZero,
  } = useEuiTimeWindow(start, end, applyTime, { zoomFactor });

  const previousDescription = useEuiI18n(
    'euiTimeWindowButtons.previousDescription',
    'Previous {displayInterval}',
    { displayInterval }
  );
  const nextDescription = useEuiI18n(
    'euiTimeWindowButtons.nextDescription',
    'Next {displayInterval}',
    { displayInterval }
  );
  const invalidShiftDescription = useEuiI18n(
    'euiTimeWindowButtons.invalidShiftLabel',
    'Cannot shift invalid time window'
  );
  const invalidZoomInDescription = useEuiI18n(
    'euiTimeWindowButtons.invalidZoomInLabel',
    'Cannot zoom in invalid time window'
  );
  const cannotZoomInDescription = useEuiI18n(
    'euiTimeWindowButtons.cannotZoomInLabel',
    'Cannot zoom in any further'
  );
  const invalidZoomOutDescription = useEuiI18n(
    'euiTimeWindowButtons.invalidZoomOutLabel',
    'Cannot zoom out invalid time window'
  );

  const previousId = useGeneratedHtmlId({ prefix: 'previous' });
  const previousLabel = useEuiI18n(
    'euiTimeWindowButtons.previousLabel',
    'Previous'
  );
  const previousTooltipContent = isInvalid
    ? invalidShiftDescription
    : previousDescription;

  const zoomInId = useGeneratedHtmlId({ prefix: 'zoom_in' });
  const zoomInLabel = useEuiI18n('euiTimeWindowButtons.zoomInLabel', 'Zoom in');
  const zoomInTooltipContent = isInvalid
    ? invalidZoomInDescription
    : isWindowDurationZero
    ? cannotZoomInDescription
    : zoomInLabel;

  const zoomOutId = useGeneratedHtmlId({ prefix: 'zoom_out' });
  const zoomOutLabel = useEuiI18n(
    'euiTimeWindowButtons.zoomOutLabel',
    'Zoom out'
  );
  const zoomOutTooltipContent = isInvalid
    ? invalidZoomOutDescription
    : zoomOutLabel;

  const nextId = useGeneratedHtmlId({ prefix: 'next' });
  const nextLabel = useEuiI18n('euiTimeWindowButtons.nextLabel', 'Next');
  const nextTooltipContent = isInvalid
    ? invalidShiftDescription
    : nextDescription;

  if (!showZoomIn && !showZoomOut && !showShiftArrows) return null;

  return (
    <div
      className="euiSuperDatePicker__timeWindowButtons"
      css={[styles.euiButtonGroup__buttons, styles[buttonSize]]}
      data-test-subj="timeWindowButtons"
    >
      {showShiftArrows && (
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
          isDisabled={isWindowDurationZero || isDisabled}
          onClick={stepBackward}
        />
      )}
      {showZoomIn && (
        <EuiButtonGroupButton
          id={zoomInId}
          data-test-subj="timeWindowButtonsZoomIn"
          label={zoomInLabel}
          title=""
          toolTipContent={!isDisabled && zoomInTooltipContent}
          toolTipProps={{
            disableScreenReaderOutput: zoomInLabel === zoomInTooltipContent,
          }}
          color={buttonColor}
          size={buttonSize}
          iconType="magnifyWithPlus"
          iconSize={iconSize}
          isIconOnly
          isDisabled={isWindowDurationZero || isDisabled}
          onClick={shrinkWindow}
        />
      )}
      {showZoomOut && (
        <EuiButtonGroupButton
          id={zoomOutId}
          data-test-subj="timeWindowButtonsZoomOut"
          label={zoomOutLabel}
          title=""
          toolTipContent={!isDisabled && zoomOutTooltipContent}
          toolTipProps={{
            disableScreenReaderOutput: zoomOutLabel === zoomOutTooltipContent,
          }}
          color={buttonColor}
          size={buttonSize}
          iconType="magnifyWithMinus"
          iconSize={iconSize}
          isIconOnly
          isDisabled={isDisabled}
          onClick={expandWindow}
        />
      )}
      {showShiftArrows && (
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
          isDisabled={isWindowDurationZero || isDisabled}
          onClick={stepForward}
        />
      )}
    </div>
  );
};

/**
 * Partly adapted from date_picker/super_date_picker/quick_select_popover/quick_select.tsx
 */
export function useEuiTimeWindow(
  start: ShortDate,
  end: ShortDate,
  apply: ApplyTime,
  options?: { zoomFactor?: EuiTimeWindowButtonsConfig['zoomFactor'] }
) {
  const min = dateMath.parse(start);
  const max = dateMath.parse(end, { roundUp: true });
  const isInvalid = !min || !min.isValid() || !max || !max.isValid();
  const windowDuration = isInvalid ? -1 : max.diff(min);
  const isWindowDurationZero = windowDuration === 0;
  const zoomFactor = getPercentageMultiplier(
    options?.zoomFactor ?? ZOOM_FACTOR_DEFAULT
  );
  const zoomDelta = windowDuration * (zoomFactor / 2); // Gets added to each end, that's why it's split in half
  const prettyInterval = usePrettyInterval(false, windowDuration);
  let displayInterval = isInvalid ? '' : prettyInterval;
  if (
    !isInvalid &&
    !isRelativeToNow(start, end) &&
    !isExactMinuteRange(windowDuration)
  ) {
    displayInterval = `~${displayInterval}`;
  }

  return {
    displayInterval,
    isInvalid,
    stepForward,
    stepBackward,
    expandWindow,
    shrinkWindow,
    isWindowDurationZero,
  };

  function stepForward() {
    if (isInvalid || isWindowDurationZero) return;
    apply({
      start: moment(max).toISOString(),
      end: moment(max).add(windowDuration, 'ms').toISOString(),
    });
  }

  function stepBackward() {
    if (isInvalid || isWindowDurationZero) return;
    apply({
      start: moment(min).subtract(windowDuration, 'ms').toISOString(),
      end: moment(min).toISOString(),
    });
  }

  function expandWindow() {
    if (isInvalid) return;
    // when the window is 0 it'll remain 0 unless we help it a little
    const addition = zoomDelta === 0 ? 500 : zoomDelta;
    apply({
      start: moment(min).subtract(addition, 'ms').toISOString(),
      end: moment(max).add(addition, 'ms').toISOString(),
    });
  }

  function shrinkWindow() {
    if (isInvalid || isWindowDurationZero) return;
    apply({
      start: moment(min).add(zoomDelta, 'ms').toISOString(),
      end: moment(max).subtract(zoomDelta, 'ms').toISOString(),
    });
  }
}

/**
 * Get a number out of either 0.2 or "20%"
 */
function getPercentageMultiplier(value: number | string) {
  const result =
    typeof value === 'number'
      ? value
      : parseFloat(String(value).replace('%', '').trim());
  if (isNaN(result))
    throw new TypeError(
      'Please provide a valid number or percentage string e.g. "25%"'
    );
  return result > 1 ? result / 100 : result;
}

/**
 * Useful to determine whether to show the tilde in the display
 */
function isExactMinuteRange(diffMs: number) {
  // 60 * 1000 = ms per minute
  return diffMs % (60 * 1000) === 0;
}
