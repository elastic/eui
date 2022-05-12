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
} from 'react';
import classNames from 'classnames';

import { calculateThumbPosition, EUI_THUMB_SIZE } from './utils';

import { useInnerText } from '../../inner_text';

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
  }
> = ({
  disabled,
  ticks: customTicks,
  min,
  max,
  value,
  onChange,
  percentageWidth,
  tickValue,
  ticksRef,
}) => {
  const tickStyle: CSSProperties = {};
  const tickObject = customTicks
    ? customTicks.find((o) => o.value === tickValue)
    : { value: tickValue, label: tickValue };
  const isMinTick = tickObject?.value === min;
  const isMaxTick = tickObject?.value === max;

  const label = tickObject ? tickObject.label : tickValue;

  // Math worked out by trial and error
  // Shifts the label into the reserved margin of EuiRangeTrack
  const labelShiftVal =
    (isMinTick || isMaxTick) && label.length > 3
      ? Math.min(label.length * 0.25, 1.25)
      : 0;

  if (isMaxTick && !!labelShiftVal) {
    tickStyle.right = '0%';
  } else {
    const trackWidth = ticksRef.current?.clientWidth ?? 0;

    const position = calculateThumbPosition(tickValue, min, max, trackWidth);

    const thumbOffset = labelShiftVal ? 0 : EUI_THUMB_SIZE / 2;
    tickStyle.left = `calc(${position}% + ${thumbOffset}px)`;
  }
  tickStyle.maxWidth = customTicks ? undefined : `${percentageWidth}%`;

  const pseudoShift: CSSProperties = {};
  if (labelShiftVal) {
    const labelShift = isMaxTick ? 'marginRight' : 'marginLeft';
    tickStyle[labelShift] = `-${labelShiftVal}em`;
    pseudoShift[labelShift] = `calc(${labelShiftVal}em + 4px)`; // 4px derived from .euiRangeTicks left/right offset
  }

  const pseudoTick = tickObject && !!labelShiftVal && (isMinTick || isMaxTick);

  const tickClasses = classNames('euiRangeTick', {
    'euiRangeTick--selected': value === tickValue,
    'euiRangeTick--isCustom': customTicks,
    'euiRangeTick--isMin': labelShiftVal && isMinTick,
    'euiRangeTick--isMax': labelShiftVal && isMaxTick,
    'euiRangeTick--hasTickMark': pseudoTick,
  });

  const [ref, innerText] = useInnerText();

  return (
    <button
      type="button"
      className={tickClasses}
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
  const percentageWidth = (interval / (max - min + interval)) * 100;

  const classes = classNames('euiRangeTicks', {
    'euiRangeTicks--compressed': compressed,
    'euiRangeTicks--isCustom': ticks,
  });

  return (
    <div className={classes} ref={ticksRef}>
      {tickSequence.map((tickValue) => (
        <EuiTickValue
          key={tickValue}
          {...props}
          percentageWidth={percentageWidth}
          tickValue={tickValue}
          ticksRef={ticksRef}
        />
      ))}
    </div>
  );
};
