/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
import { useGeneratedHtmlId } from '../../services';
import { useEuiResizableContainerContext } from './context';
import {
  EuiResizableButtonController,
  EuiResizableButtonMouseEvent,
  EuiResizableButtonKeyEvent,
} from './types';

interface EuiResizableButtonControls {
  onKeyDown: (eve: EuiResizableButtonKeyEvent) => void;
  onKeyUp: (eve: EuiResizableButtonKeyEvent) => void;
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
    Partial<EuiResizableButtonControls> {}

export const EuiResizableButton: FunctionComponent<EuiResizableButtonProps> = ({
  isHorizontal,
  className,
  id,
  registration,
  disabled,
  onFocus,
  onBlur,
  ...rest
}) => {
  const resizerId = useGeneratedHtmlId({
    prefix: 'resizable-button',
    conditionalId: id,
  });
  const {
    registry: { resizers } = { resizers: {} },
  } = useEuiResizableContainerContext();
  const isDisabled = useMemo(
    () => disabled || (resizers[resizerId] && resizers[resizerId].isDisabled),
    [resizers, resizerId, disabled]
  );
  const classes = classNames(
    'euiResizableButton',
    {
      'euiResizableButton--vertical': !isHorizontal,
      'euiResizableButton--horizontal': isHorizontal,
      'euiResizableButton--disabled': isDisabled,
    },
    className
  );

  const previousRef = useRef<HTMLElement>();
  const onRef = useCallback(
    (ref: HTMLElement | null) => {
      if (!registration) return;
      if (ref) {
        previousRef.current = ref;
        registration.register({
          id: resizerId,
          ref,
          isFocused: false,
          isDisabled: disabled || false,
        });
      } else {
        if (previousRef.current != null) {
          registration.deregister(resizerId);
          previousRef.current = undefined;
        }
      }
    },
    [registration, resizerId, disabled]
  );

  const setFocus = (e: MouseEvent<HTMLButtonElement>) =>
    e.currentTarget.focus();

  const handleFocus = () => {
    onFocus && onFocus(resizerId);
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
      ]}
    >
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          id={resizerId}
          ref={onRef}
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="euiResizableButton"
          type="button"
          onClick={setFocus}
          onFocus={handleFocus}
          onBlur={onBlur}
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
