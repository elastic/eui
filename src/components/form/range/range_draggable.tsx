/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useMouseMove } from '../../../services';

export interface EuiRangeDraggableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  min: number;
  max: number;
  value: number[];
  disabled?: boolean;
  compressed?: boolean;
  showTicks?: boolean;
  lowerPosition: string;
  upperPosition: string;
  onChange: (x: number, isFirstInteraction?: boolean) => void;
}

export const EuiRangeDraggable: FunctionComponent<EuiRangeDraggableProps> = ({
  className,
  showTicks,
  lowerPosition,
  upperPosition,
  compressed,
  onChange,
  min,
  max,
  disabled,
  value,
  ...rest
}) => {
  const outerStyle: React.CSSProperties = {
    left: `calc(${lowerPosition})`,
    right: `calc(100% - ${upperPosition} - 16px)`,
  };

  const classes = classNames(
    'euiRangeDraggable',
    {
      'euiRangeDraggable--hasTicks': showTicks,
      'euiRangeDraggable--compressed': compressed,
      'euiRangeDraggable--disabled': disabled,
    },
    className
  );

  const handleChange = (
    { x }: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    if (disabled) return;
    onChange(x, isFirstInteraction);
  };

  const [handleMouseDown, handleInteraction] = useMouseMove(handleChange);

  const commonProps = {
    className: classes,
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value[0],
    'aria-valuetext': `${value[0]}, ${value[1]}`,
    'aria-disabled': !!disabled,
    tabIndex: !!disabled ? -1 : 0,
  };

  return (
    <div style={outerStyle} {...commonProps} {...rest}>
      <div
        className="euiRangeDraggle__inner"
        onMouseDown={handleMouseDown}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      />
    </div>
  );
};
