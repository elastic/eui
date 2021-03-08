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
import classNames from 'classnames';

export interface EuiRangeHighlightProps {
  className?: string;
  background?: string[];
  compressed?: boolean;
  hasFocus?: boolean;
  showTicks?: boolean;
  lowerValue: number;
  upperValue: number;
  max: number;
  min: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  stepped?: boolean;
}

export const EuiRangeHighlight: FunctionComponent<EuiRangeHighlightProps> = ({
  className,
  hasFocus,
  showTicks,
  lowerValue,
  upperValue,
  max,
  min,
  compressed,
  background,
  onClick,
  stepped = false,
}) => {
  // Calculate the width the range based on value
  // const rangeWidth = (value - min) / (max - min);
  const leftPosition = (lowerValue - min) / (max - min);
  const rangeWidth = (upperValue - lowerValue) / (max - min);

  let backgroundStyles;

  if (stepped) {
    let backgroundImageStepped: string = '';
    let backgroundSizeStepped: string = '';
    let percentageSteps = 0;
    if (background) {
      percentageSteps = 100 / background.length;
    }
    background?.forEach((backgroundItem) => {
      backgroundImageStepped = backgroundImageStepped.concat(
        `linear-gradient(${backgroundItem} , ${backgroundItem}), `
      );
      backgroundSizeStepped = backgroundSizeStepped.concat(
        `${percentageSteps}%, `
      );
      percentageSteps = percentageSteps + 100 / background?.length;
    });

    backgroundStyles = {
      backgroundImage: backgroundImageStepped.substring(
        0,
        backgroundImageStepped.length - 2
      ),
      backgroundSize: backgroundSizeStepped.substring(
        0,
        backgroundSizeStepped.length - 2
      ),
      backgroundRepeat: 'no-repeat',
    };
  } else {
    if (background) {
      backgroundStyles = {
        background: `linear-gradient(to right,${background})`,
      };
    }
  }

  const rangeWidthStyle = {
    ...backgroundStyles,
    marginLeft: `${leftPosition * 100}%`,
    width: `${rangeWidth * 100}%`,
  };

  const classes = classNames(
    'euiRangeHighlight',
    {
      'euiRangeHighlight--hasTicks': showTicks,
      'euiRangeHighlight--compressed': compressed,
    },
    className
  );

  const progressClasses = classNames('euiRangeHighlight__progress', {
    'euiRangeHighlight__progress--hasFocus': hasFocus,
  });

  return (
    <div className={classes} onClick={onClick}>
      <div className={progressClasses} style={rangeWidthStyle} />
    </div>
  );
};
