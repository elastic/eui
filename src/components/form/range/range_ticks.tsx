/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  ButtonHTMLAttributes,
  MouseEventHandler,
  FunctionComponent,
  ReactNode,
  CSSProperties,
  MutableRefObject,
  useMemo,
} from 'react';

import { calculateThumbPosition, EUI_THUMB_SIZE } from './utils';

import { useInnerText } from '../../inner_text';

import { useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';
import { euiRangeTicksStyles, euiRangeTickStyles } from './range_ticks.styles';

export interface EuiRangeTick {
  value: number;
  label: ReactNode;
}

export type EuiRangeTicksProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'value'
> & {
  ticks?: EuiRangeTick[];
  tickSequence: number[];
  value?: number | string | Array<string | number>;
  min: number;
  max: number;
  compressed?: boolean;
  interval?: number;
  disabled?: boolean;
  onChange?: MouseEventHandler<HTMLButtonElement>;
};

const EuiTickValue: FunctionComponent<
  EuiRangeTicksProps & {
    ticksRef: MutableRefObject<HTMLDivElement | null>;
    tickValue: any;
    percentageWidth: number;
    compressed?: boolean;
  }
> = ({
  disabled,
  ticks,
  min,
  max,
  value,
  onChange,
  percentageWidth,
  tickValue,
  ticksRef,
  compressed,
}) => {
  const euiTheme = useEuiTheme();

  const hasCustomTicks = !!ticks;

  const tickObject = useMemo(() => {
    return hasCustomTicks
      ? ticks.find((o) => o.value === tickValue)
      : { value: tickValue, label: tickValue };
  }, [hasCustomTicks, ticks, tickValue]);

  const isMinTick = tickObject?.value === min;
  const isMaxTick = tickObject?.value === max;
  const label = tickObject ? tickObject.label : tickValue;

  // Math worked out by trial and error
  // Shifts the label into the reserved margin of EuiRangeTrack
  const labelShiftVal = useMemo(() => {
    return (isMinTick || isMaxTick) && label.length > 3
      ? Math.min(label.length * 0.25, 1.25)
      : 0;
  }, [isMinTick, isMaxTick, label]);

  const tickStyle = useMemo(() => {
    const styles: CSSProperties = {};
    const shift = `-${labelShiftVal}em`;

    if (isMaxTick && !!labelShiftVal) {
      styles.right = '0%';
      styles.marginRight = shift;
    } else {
      const trackWidth = ticksRef.current?.clientWidth ?? 0;
      const position = calculateThumbPosition(tickValue, min, max, trackWidth);
      const thumbOffset = labelShiftVal ? 0 : EUI_THUMB_SIZE / 2;

      styles.left = `calc(${position}% + ${thumbOffset}px)`;

      if (labelShiftVal) styles.marginLeft = shift;
    }

    styles.maxWidth = hasCustomTicks ? undefined : `${percentageWidth}%`;

    return logicalStyles(styles);
  }, [
    isMaxTick,
    labelShiftVal,
    ticksRef,
    tickValue,
    min,
    max,
    hasCustomTicks,
    percentageWidth,
  ]);

  // Some ticks need an actual DOM element instead of using a ::before
  const pseudoTick = tickObject && !!labelShiftVal && (isMinTick || isMaxTick);
  const pseudoShift = useMemo(() => {
    if (!labelShiftVal) return {};

    const marginProperty = isMaxTick ? 'marginRight' : 'marginLeft';
    const tickOffset = euiTheme.euiTheme.size.xs; // xs derived from .euiRangeTicks left/right offset

    return logicalStyles({
      [marginProperty]: `calc(${labelShiftVal}em + ${tickOffset})`,
    });
  }, [labelShiftVal, isMaxTick, euiTheme.euiTheme.size.xs]);

  const styles = euiRangeTickStyles(euiTheme);
  const cssTickStyles = [
    styles.euiRangeTick,
    value === String(tickValue) && styles.selected,
    hasCustomTicks && styles.isCustom,
    labelShiftVal && isMinTick && styles.isMin,
    labelShiftVal && isMaxTick && styles.isMax,
    !pseudoTick && styles.hasPseudoTickMark,
    compressed ? styles.compressed : styles.regular,
  ];

  const [ref, innerText] = useInnerText();

  return (
    <button
      type="button"
      className="euiRangeTick"
      css={cssTickStyles}
      value={tickValue}
      disabled={disabled}
      onClick={onChange}
      style={tickStyle}
      tabIndex={-1}
      ref={ref}
      title={typeof label === 'string' ? label : innerText}
    >
      {pseudoTick && (
        <span
          className="euiRangeTick__pseudo"
          css={styles.euiRangeTick__pseudo}
          aria-hidden
          style={pseudoShift}
        />
      )}
      {label}
    </button>
  );
};

export const EuiRangeTicks: FunctionComponent<EuiRangeTicksProps> = (props) => {
  const { ticks, tickSequence, max, min, interval = 1, compressed } = props;

  const ticksRef = React.useRef<HTMLDivElement | null>(null);

  // Calculate the width of each tick mark
  const percentageWidth = useMemo(
    () => (interval / (max - min + interval)) * 100,
    [interval, min, max]
  );

  const euiTheme = useEuiTheme();
  const styles = euiRangeTicksStyles(euiTheme);
  const cssStyles = [
    styles.euiRangeTicks,
    compressed ? styles.compressed : styles.regular,
    ticks && styles.isCustom,
  ];

  return (
    <div className="euiRangeTicks" css={cssStyles} ref={ticksRef}>
      {tickSequence.map((tickValue) => (
        <EuiTickValue
          key={tickValue}
          {...props}
          percentageWidth={percentageWidth}
          tickValue={tickValue}
          ticksRef={ticksRef}
          compressed={compressed}
        />
      ))}
    </div>
  );
};
