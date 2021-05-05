/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useMouseMove } from '../../../services';

export interface EuiRangeDraggableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
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
    },
    className
  );

  const handleChange = (
    { x }: { x: number; y: number },
    isFirstInteraction?: boolean
  ) => {
    onChange(x, isFirstInteraction);
  };

  const [handleMouseDown, handleInteraction] = useMouseMove(handleChange);

  return (
    // TODO: ARIA
    <div className={classes} style={outerStyle} tabIndex={0} {...rest}>
      <div
        className="euiRangeDraggle__inner"
        onMouseDown={handleMouseDown}
        onTouchStart={handleInteraction}
        onTouchMove={handleInteraction}
      />
    </div>
  );
};
