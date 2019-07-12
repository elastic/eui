import React, {
  ButtonHTMLAttributes,
  FunctionComponent,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import find from 'lodash/find';

export interface EuiRangeTick {
  value: number;
  label: ReactNode;
}

export type EuiRangeTicksProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  ticks?: EuiRangeTick[];
  tickSequence: number[];
  value?: number | number[] | string | string[];
  min: number;
  max: number;
  interval?: number;
};

export const EuiRangeTicks: FunctionComponent<EuiRangeTicksProps> = ({
  disabled,
  onChange,
  ticks,
  tickSequence,
  value,
  max,
  min,
  interval = 0,
}) => {
  // Calculate the width of each tick mark
  const percentageWidth = (interval / (max - min + interval)) * 100;

  // Align with item labels across the range by adding
  // left and right negative margins that is half of the tick marks
  const ticksStyle = !!ticks
    ? undefined
    : { margin: `0 ${percentageWidth / -2}%`, left: 0, right: 0 };

  return (
    <div className="euiRangeTicks" style={ticksStyle}>
      {tickSequence.map(tickValue => {
        const tickStyle: { left?: string; width?: string } = {};
        let customTick;
        if (ticks) {
          customTick = find(ticks, o => o.value === tickValue);

          if (customTick) {
            tickStyle.left = `${((customTick.value - min) / (max - min)) *
              100}%`;
          }
        } else {
          tickStyle.width = `${percentageWidth}%`;
        }

        const tickClasses = classNames('euiRangeTick', {
          'euiRangeTick--selected': value === tickValue,
          'euiRangeTick--isCustom': customTick,
        });

        const label = customTick ? customTick.label : tickValue;

        return (
          <button
            type="button"
            className={tickClasses}
            key={tickValue}
            value={tickValue}
            disabled={disabled}
            onClick={onChange}
            style={tickStyle}
            tabIndex={-1}
            title={label}>
            {label}
          </button>
        );
      })}
    </div>
  );
};
