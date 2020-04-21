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

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';

export type EuiResizableButtonMouseEvent = React.MouseEvent<
  HTMLButtonElement,
  MouseEvent
>;
export type EuiResizableButtonKeyDownEvent = React.KeyboardEvent<
  HTMLButtonElement
>;

export type EuiResizableButtonSize = 's' | 'm' | 'l' | 'xl';

interface EuiResizableButtonControls {
  onKeyDown: (eve: EuiResizableButtonKeyDownEvent) => void;
  onMouseDown: (eve: EuiResizableButtonMouseEvent) => void;
  isHorizontal: boolean;
}

export interface EuiResizableButtonProps
  extends Omit<
      HTMLAttributes<HTMLButtonElement>,
      keyof EuiResizableButtonControls
    >,
    CommonProps,
    EuiResizableButtonControls {
  /**
   * The size of the Resizer (the space between panels)
   */
  size?: EuiResizableButtonSize;
}

const sizeToClassNameMap = {
  s: 'euiResizableButton--sizeSmall',
  m: 'euiResizableButton--sizeMedium',
  l: 'euiResizableButton--sizeLarge',
  xl: 'euiResizableButton--sizeExtraLarge',
};

export const SIZES = Object.keys(sizeToClassNameMap);

export const EuiResizableButton: FunctionComponent<EuiResizableButtonProps> = ({
  isHorizontal,
  className,
  size = 'm',
  ...rest
}) => {
  const classes = classNames(
    'euiResizableButton',
    size ? sizeToClassNameMap[size] : null,
    {
      'euiResizableButton--vertical': !isHorizontal,
      'euiResizableButton--horizontal': isHorizontal,
    },
    className
  );

  return (
    <EuiI18n
      tokens={[
        'euiResizableButton.horizontalResizerAriaLabel',
        'euiResizableButton.verticalResizerAriaLabel',
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
          type="button"
          {...rest}
        />
      )}
    </EuiI18n>
  );
};

export function euiResizableButtonWithControls(
  controls: EuiResizableButtonControls
) {
  return (props: CommonProps) => (
    <EuiResizableButton {...controls} {...props} />
  );
}
