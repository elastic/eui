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

import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { CommonProps } from '../../common';
import { ColorStop } from '../color_stops';

export type EuiLinearFixedGradientProps = CommonProps & {
  /**
   * Array of color `strings` or an array of #ColorStop. The stops must be numbers in an ordered range.
   */
  palette: string[] | ColorStop[];
};

export const EuiLinearFixedGradient: FunctionComponent<EuiLinearFixedGradientProps> = ({
  palette,
  className,
}) => {
  const paletteHasStops = palette.some((item: string | ColorStop) => {
    return typeof item === 'object';
  });

  const classes = classnames('euiLinearFixedGradient', className);

  if (paletteHasStops) {
    const paletteColorStop = palette as ColorStop[];

    return (
      <span className={classes}>
        <span className="euiLinearFixedGradient__inner">
          {paletteColorStop.map((colorStop: any, index: number) => {
            const lastColorStopArrayPosition = palette.length - 1;

            const lastColorStopDecimal =
              100 / paletteColorStop[lastColorStopArrayPosition].stop;

            const isFirstColorStop = index === 0;

            let previousColorStopWidth;

            if (isFirstColorStop) {
              previousColorStopWidth = 0;
            } else {
              previousColorStopWidth = Math.round(
                paletteColorStop[index - 1].stop * lastColorStopDecimal
              );
            }

            const currentColorStopWidth = Math.round(
              colorStop.stop * lastColorStopDecimal
            );

            const colorStopWidth =
              currentColorStopWidth - previousColorStopWidth;

            return (
              <span
                style={{
                  backgroundColor: colorStop.color,
                  width: `${colorStopWidth}%`,
                }}
                key={`${colorStop.color}-${index}`}
              />
            );
          })}
        </span>
      </span>
    );
  } else {
    const paletteColorStop = palette as String[];

    return (
      <span className={classes}>
        <span className="euiLinearFixedGradient__inner">
          {paletteColorStop.map((hexCode: any, index) => (
            <span
              style={{ backgroundColor: hexCode }}
              key={`${hexCode}-${index}`}
              className="euiLinearFixedGradient__colorStop--widthAuto"
            />
          ))}
        </span>
      </span>
    );
  }
};
