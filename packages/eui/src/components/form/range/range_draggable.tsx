/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  HTMLAttributes,
  useCallback,
  useMemo,
} from 'react';
import classNames from 'classnames';

import { useMouseMove, useEuiTheme } from '../../../services';
import { logicalStyles } from '../../../global_styling';

import type { EuiDualRangeProps } from './types';

import {
  euiRangeDraggableStyles,
  euiRangeDraggableInnerStyles,
} from './range_draggable.styles';

export interface EuiRangeDraggableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>,
    Pick<
      EuiDualRangeProps,
      'min' | 'max' | 'value' | 'disabled' | 'showTicks'
    > {
  lowerPosition: string;
  upperPosition: string;
  onChange: (x: number, isFirstInteraction?: boolean) => void;
}

export const EuiRangeDraggable: FunctionComponent<EuiRangeDraggableProps> = ({
  className,
  showTicks,
  lowerPosition,
  upperPosition,
  onChange,
  min,
  max,
  disabled,
  value,
  ...rest
}) => {
  const euiTheme = useEuiTheme();

  const outerStyle: React.CSSProperties = useMemo(() => {
    return logicalStyles({
      left: lowerPosition,
      right: `calc(100% - ${upperPosition} - ${euiTheme.euiTheme.size.base})`,
    });
  }, [lowerPosition, upperPosition, euiTheme.euiTheme.size.base]);

  const handleChange = useCallback(
    ({ x }: { x: number; y: number }, isFirstInteraction?: boolean) => {
      if (disabled) return;
      onChange(x, isFirstInteraction);
    },
    [disabled, onChange]
  );
  const [handleMouseDown, handleInteraction] = useMouseMove(handleChange);

  const classes = classNames('euiRangeDraggable', className);

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
    'aria-valuenow': Number(value[0]),
    'aria-valuetext': `${value[0]}, ${value[1]}`,
    'aria-disabled': !!disabled,
    tabIndex: !!disabled ? -1 : 0,
  };

  return (
    <div style={outerStyle} {...commonProps} {...rest}>
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
