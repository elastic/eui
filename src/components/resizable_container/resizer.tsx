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

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';

export type ResizerMouseEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
export type ResizerKeyDownEvent = React.KeyboardEvent<HTMLButtonElement>;

export type ResizerSize = 'none' | 's' | 'm' | 'l';

interface Controls {
  onKeyDown: (eve: ResizerKeyDownEvent) => void;
  onMouseDown: (eve: ResizerMouseEvent) => void;
  isHorizontal: boolean;
}

interface Props extends CommonProps {
  /**
   * The size of the Resizer (the space between panels)
   */
  size?: ResizerSize;
}

const sizeToClassNameMap = {
  none: null,
  s: 'euiResizer--sizeSmall',
  m: 'euiResizer--sizeMedium',
  l: 'euiResizer--sizeLarge',
  xl: 'euiResizer--sizeExtraLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const Resizer: FunctionComponent<Props & Controls> = ({
  isHorizontal,
  className,
  size = 'm',
  ...rest
}) => {
  const classes = classNames(
    'euiResizer',
    size ? sizeToClassNameMap[size] : null,
    {
      'euiResizer--vertical': !isHorizontal,
      'euiResizer--horizontal': isHorizontal,
    },
    className
  );

  return (
    <EuiI18n
      tokens={[
        'euiResizer.horizontalResizerAriaLabel',
        'euiResizer.verticalResizerAriaLabel',
      ]}
      defaults={[
        'Press left/right to adjust panels size',
        'Press up/down to adjust panels size',
      ]}>
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="splitPanelResizer"
          {...rest}
        />
      )}
    </EuiI18n>
  );
};

export function resizerWithControls(controls: Controls) {
  return (props: CommonProps) => <Resizer {...controls} {...props} />;
}
