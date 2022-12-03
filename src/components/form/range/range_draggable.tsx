/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useMouseMove, useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import {
  euiRangeDraggableStyles,
  euiRangeDraggableInnerStyles,
} from './range_draggable.styles';

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
  const euiTheme = useEuiTheme();

  const outerStyle: React.CSSProperties = {
    left: lowerPosition,
    right: `calc(100% - ${upperPosition} - ${euiTheme.euiTheme.size.base})`,
  };

  const classes = classNames('euiRangeDraggable', className);

  const handleChange = (
    { x }: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    if (disabled) return;
    onChange(x, isFirstInteraction);
  };

  const [handleMouseDown, handleInteraction] = useMouseMove(handleChange);

  const styles = euiRangeDraggableStyles(euiTheme);
  const cssStyles = [
    styles.euiRangeDraggable,
    showTicks && styles.hasTicks,
    disabled && styles.disabled,
  ];
  const innerStyles = euiRangeDraggableInnerStyles(euiTheme);
  const cssInnerStyles = [
    innerStyles.euiRangeDraggable__inner,
    disabled ? styles.disabled : innerStyles.enabled,
  ];

  const commonProps = {
    className: classes,
    css: cssStyles,
    role: 'slider',
    'aria-valuemin': min,
    'aria-valuemax': max,
    'aria-valuenow': value[0],
    'aria-valuetext': `${value[0]}, ${value[1]}`,
    'aria-disabled': !!disabled,
    tabIndex: !!disabled ? -1 : 0,
  };

  return (
    <div style={logicalStyles(outerStyle)} {...commonProps} {...rest}>
      <div
        className="euiRangeDraggable__inner"
        css={cssInnerStyles}
        onMouseDown={handleMouseDown}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      />
    </div>
  );
};
