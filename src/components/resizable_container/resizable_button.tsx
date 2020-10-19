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

import React, {
  FunctionComponent,
  ButtonHTMLAttributes,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { htmlIdGenerator } from '../../services';
import { useEuiResizableContainerContext } from './context';
import {
  EuiResizableButtonController,
  EuiResizableButtonMouseEvent,
  EuiResizableButtonKeyDownEvent,
} from './types';

export type EuiResizableButtonSize = 's' | 'm' | 'l' | 'xl';

interface EuiResizableButtonControls {
  onKeyDown: (eve: EuiResizableButtonKeyDownEvent) => void;
  onMouseDown: (eve: EuiResizableButtonMouseEvent) => void;
  onTouchStart: (eve: EuiResizableButtonMouseEvent) => void;
  onFocus: (id: string) => void;
  onBlur: () => void;
  registration: {
    register: (resizer: EuiResizableButtonController) => void;
    deregister: (resizerId: EuiResizableButtonController['id']) => void;
  };
  isHorizontal: boolean;
}

export interface EuiResizableButtonProps
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      keyof EuiResizableButtonControls
    >,
    CommonProps,
    Partial<EuiResizableButtonControls> {
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

const generatePanelId = htmlIdGenerator('resizable-button');

export const EuiResizableButton: FunctionComponent<EuiResizableButtonProps> = ({
  isHorizontal,
  className,
  size = 'm',
  id,
  registration,
  disabled,
  onFocus,
  onBlur,
  ...rest
}) => {
  const resizerId = useRef(id || generatePanelId());
  const {
    registry: { resizers } = { resizers: {} },
  } = useEuiResizableContainerContext();
  const isDisabled = useMemo(
    () =>
      disabled ||
      (resizers[resizerId.current] && resizers[resizerId.current].isDisabled),
    [resizers, disabled]
  );
  const classes = classNames(
    'euiResizableButton',
    size ? sizeToClassNameMap[size] : null,
    {
      'euiResizableButton--vertical': !isHorizontal,
      'euiResizableButton--horizontal': isHorizontal,
      'euiResizableButton--disabled': disabled,
    },
    className
  );

  const previousRef = useRef<HTMLElement>();
  const onRef = useCallback(
    (ref: HTMLElement | null) => {
      if (!registration) return;
      const id = resizerId.current;
      if (ref) {
        previousRef.current = ref;
        registration.register({ id, ref, isDisabled: disabled || false });
      } else {
        if (previousRef.current != null) {
          registration.deregister(id);
          previousRef.current = undefined;
        }
      }
    },
    [registration, disabled]
  );

  const setFocus = (e: MouseEvent<HTMLButtonElement>) =>
    e.currentTarget.focus();

  const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
    if (
      e.relatedTarget &&
      (e.relatedTarget as HTMLElement).classList.contains(
        'euiResizablePanel__toggleButton'
      )
    )
      return;
    onBlur && onBlur();
  };

  return (
    <EuiI18n
      tokens={[
        'euiResizableButton.horizontalResizerAriaLabel',
        'euiResizableButton.verticalResizerAriaLabel',
      ]}
      defaults={[
        'Press left or right to adjust panels size',
        'Press up or down to adjust panels size',
      ]}>
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          id={resizerId.current}
          ref={onRef}
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="splitPanelResizer"
          type="button"
          onClick={setFocus}
          onFocus={() => onFocus && onFocus(resizerId.current)}
          onBlur={handleBlur}
          disabled={isDisabled}
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
