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

export type EuiResizableButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  CommonProps & {
    /**
     * Defaults to displaying a resize handle button for vertical (y-axis) resizing.
     * Set to `true` to display a handle for horizontal (x-axis) resizing.
     */
    isHorizontal?: boolean;
    /**
     * When disabled, the button will be completely hidden
     */
    disabled?: boolean;
  };

/**
 * A generic resizable button/drag handle, usable outside of the EuiResizableContainer context
 */
export const EuiResizableButton: FunctionComponent<EuiResizableButtonProps> = ({
  isHorizontal,
  className,
  ...rest
}) => {
  const classes = classNames('euiResizableButton', className);
  const euiTheme = useEuiTheme();
  const styles = euiResizableButtonStyles(euiTheme);
  const cssStyles = [
    styles.euiResizableButton,
    isHorizontal ? styles.horizontal : styles.vertical,
  ];

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
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          css={cssStyles}
          data-test-subj="euiResizableButton"
          type="button"
          {...rest}
        />
      )}
    </EuiI18n>
  );
};

/**
 * Button specific to controlled EuiResizableContainer usage
 */
export type EuiResizableButtonControls = Omit<
  EuiResizableButtonProps,
  'onFocus'
> & {
  registration: {
    register: (resizer: EuiResizableButtonController) => void;
    deregister: (resizerId: EuiResizableButtonController['id']) => void;
  };
  onKeyDown: (e: EuiResizableButtonKeyEvent) => void;
  onKeyUp: (e: EuiResizableButtonKeyEvent) => void;
  onMouseDown: (e: EuiResizableButtonMouseEvent) => void;
  onTouchStart: (e: EuiResizableButtonMouseEvent) => void;
  onBlur: () => void;
  onFocus: (id: string) => void;
};

export const EuiResizableButtonControlled: FunctionComponent<
  Partial<EuiResizableButtonControls>
> = ({ registration, id, disabled, onFocus, ...rest }) => {
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
    <EuiResizableButton
      id={resizerId}
      // ref={onRef} TODO - forwardRef
      disabled={isDisabled}
      onClick={(e) => e.currentTarget.focus()}
      onFocus={() => onFocus?.(resizerId)}
      {...rest}
    />
  );
};

export const euiResizableButtonWithControls =
  (controls: EuiResizableButtonControls) => (props: CommonProps) =>
    <EuiResizableButtonControlled {...controls} {...props} />;
