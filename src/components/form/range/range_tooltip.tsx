import React, { FunctionComponent, ReactNode } from 'react';
import classNames from 'classnames';

export interface EuiRangeTooltipProps {
  value?: number | string;
  valueAppend?: ReactNode;
  valuePrepend?: ReactNode;
  max: number;
  min: number;
  name?: string;
  showTicks?: boolean;
  compressed?: boolean;
}

export const EuiRangeTooltip: FunctionComponent<EuiRangeTooltipProps> = ({
  value,
  valueAppend,
  valuePrepend,
  max,
  min,
  name,
  showTicks,
  compressed,
}) => {
  const classes = classNames('euiRangeTooltip', {
    'euiRangeTooltip--compressed': compressed,
  });

  // Calculate the left position based on value
  let val = 0;
  if (typeof value === 'number') {
    val = value;
  } else if (typeof value === 'string') {
    val = parseFloat(value);
  }
  const decimal = (val - min) / (max - min);
  // Must be between 0-100%
  let valuePosition = decimal <= 1 ? decimal : 1;
  valuePosition = valuePosition >= 0 ? valuePosition : 0;

  let valuePositionSide;
  let valuePositionStyle;
  if (valuePosition > 0.5) {
    valuePositionSide = 'left';
    valuePositionStyle = { right: `${(1 - valuePosition) * 100}%` };
  } else {
    valuePositionSide = 'right';
    valuePositionStyle = { left: `${valuePosition * 100}%` };
  }

  // Change left/right position based on value (half way point)
  const valueClasses = classNames(
    'euiRangeTooltip__value',
    `euiRangeTooltip__value--${valuePositionSide}`,
    {
      'euiRangeTooltip__value--hasTicks': showTicks,
    }
  );

  return (
    <div className={classes}>
      <output
        className={valueClasses}
        htmlFor={name}
        style={valuePositionStyle}>
        {valuePrepend}
        {value}
        {valueAppend}
      </output>
    </div>
  );
};
