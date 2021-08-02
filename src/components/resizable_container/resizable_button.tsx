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
import { htmlIdGenerator } from '../../services';
import { useEuiResizableContainerContext } from './context';
import {
  EuiResizableButtonController,
  EuiResizableButtonMouseEvent,
  EuiResizableButtonKeyDownEvent,
} from './types';

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
    Partial<EuiResizableButtonControls> {}

const generatePanelId = htmlIdGenerator('resizable-button');

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
      const id = resizerId.current;
      if (ref) {
        previousRef.current = ref;
        registration.register({
          id,
          ref,
          isFocused: false,
          isDisabled: disabled || false,
        });
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

  const handleFocus = () => {
    onFocus && onFocus(resizerId.current);
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
