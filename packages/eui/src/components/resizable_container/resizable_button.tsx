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
  forwardRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { EuiI18n } from '../i18n';
import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';

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
     * Defaults to displaying a resizer for vertical (y-axis) resizing.
     * Set to `true` to display a resizer for horizontal (x-axis) resizing.
     */
    isHorizontal?: boolean;
    /**
     * By default, EuiResizableButton will show a grab handle to indicate resizability.
     * This indicator can be optionally hidden to show a plain border instead.
     */
    indicator?: 'handle' | 'border';
    /**
     * Allows customizing the alignment of grab `handle` indicators (does nothing for
     * border indicators). Defaults to `center`, but consider using `start` for extremely
     * tall content that scrolls off-screen
     */
    alignIndicator?: 'center' | 'start' | 'end';
    /**
     * By default, EuiResizableButton will overlap into the panels before/after it.
     * This can occasionally occlude interactive elements like scrollbars. To prevent
     * this overlap, use this prop to remove the overlap for the specified side.
     */
    accountForScrollbars?: 'before' | 'after' | 'both';
    /**
     * When disabled, the resizer button will be completely hidden
     */
    disabled?: boolean;
  };

/**
 * A generic button for indicating/facilitating resizable content,
 * usable outside of the EuiResizableContainer context
 */
export const EuiResizableButton = forwardRef<
  HTMLButtonElement,
  EuiResizableButtonProps
>(
  (
    {
      isHorizontal,
      indicator = 'handle',
      alignIndicator = 'center',
      accountForScrollbars,
      className,
      ...rest
    },
    ref
  ) => {
    const classes = classNames('euiResizableButton', className);

    const resizeDirection = isHorizontal ? 'horizontal' : 'vertical';

    const styles = useEuiMemoizedStyles(euiResizableButtonStyles);
    const cssStyles = [
      styles.euiResizableButton,
      styles[indicator],
      styles[`${indicator}Direction`][resizeDirection],
      styles[resizeDirection],
      indicator === 'handle' && styles.alignIndicator[alignIndicator],
      styles.accountForScrollbars[resizeDirection][
        accountForScrollbars ?? 'none'
      ],
    ];

    return (
      <EuiI18n
        tokens={[
          'euiResizableButton.horizontalResizerAriaLabel',
          'euiResizableButton.verticalResizerAriaLabel',
        ]}
        defaults={[
          'Press the left or right arrow keys to adjust panels size',
          'Press the up or down arrow keys to adjust panels size',
        ]}
      >
        {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
          <button
            ref={ref}
            aria-label={
              isHorizontal
                ? horizontalResizerAriaLabel
                : verticalResizerAriaLabel
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
  }
);
EuiResizableButton.displayName = 'EuiResizableButton';

/**
 * Resizer button specific to controlled EuiResizableContainer usage
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
      ref={onRef}
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
