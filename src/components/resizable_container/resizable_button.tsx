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
  useCallback,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { useEuiTheme, useGeneratedHtmlId } from '../../services';

import { useEuiResizableContainerContext } from './context';
import {
  EuiResizableContainerRegistry,
  EuiResizableButtonController,
  EuiResizableButtonMouseEvent,
  EuiResizableButtonKeyEvent,
} from './types';
import { euiResizableButtonStyles } from './resizable_button.styles';

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
    registry: { resizers } = { resizers: {} } as EuiResizableContainerRegistry,
  } = useEuiResizableContainerContext();
  const isDisabled = useMemo(
    () => disabled || resizers[resizerId]?.isDisabled,
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
  const euiTheme = useEuiTheme();
  const styles = euiResizableButtonStyles(euiTheme);
  const cssStyles = [styles.euiResizableButton];

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
          css={cssStyles}
          data-test-subj="euiResizableButton"
          type="button"
          onClick={(e) => e.currentTarget.focus()}
          onFocus={() => onFocus?.(resizerId)}
          onBlur={onBlur}
          disabled={isDisabled}
          hidden={isDisabled}
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
