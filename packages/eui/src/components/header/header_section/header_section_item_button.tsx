/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  useIsWithinMaxBreakpoint,
} from '../../../services';
import {
  EuiNotificationBadgeProps,
  EuiNotificationBadge,
} from '../../badge/notification_badge/badge_notification';
import { EuiIcon } from '../../icon';
import { EuiButtonEmpty, EuiButtonEmptyProps } from '../../button';

import { euiHeaderSectionItemButtonStyles } from './header_section_item_button.styles';

export type EuiHeaderSectionItemButtonProps = PropsWithChildren &
  EuiButtonEmptyProps & {
    /**
     * Inserts the node into a EuiBadgeNotification and places it appropriately against the button.
     * Or pass `true` to render a simple dot
     */
    notification?: EuiNotificationBadgeProps['children'] | boolean;
    /**
     * Changes the color of the notification background
     */
    notificationColor?: EuiNotificationBadgeProps['color'];
  };

export type EuiHeaderSectionItemButtonRef =
  | (HTMLButtonElement & { euiAnimate: () => void })
  | null;

export const EuiHeaderSectionItemButton = forwardRef<
  EuiHeaderSectionItemButtonRef,
  EuiHeaderSectionItemButtonProps
>(
  (
    {
      children,
      className,
      notification,
      notificationColor = 'accent',
      ...rest
    },
    /**
     * Allows for animating with .euiAnimate()
     */
    ref
  ) => {
    const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement | null>(
      null
    );
    const animationTargetRef = useRef<HTMLSpanElement | null>(null);

    useImperativeHandle<
      EuiHeaderSectionItemButtonRef,
      EuiHeaderSectionItemButtonRef
    >(
      ref,
      () => {
        (buttonRef.current as any).euiAnimate = () => {
          const keyframes: Keyframe[] = [
            { transform: 'rotate(0)', offset: 0, easing: 'ease-in-out' },
            {
              transform: 'rotate(30deg)',
              offset: 0.01,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-28deg)',
              offset: 0.03,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(34deg)',
              offset: 0.05,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-32deg)',
              offset: 0.07,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(30deg)',
              offset: 0.09,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-28deg)',
              offset: 0.11,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(26deg)',
              offset: 0.13,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-24deg)',
              offset: 0.15,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(22deg)',
              offset: 0.17,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-20deg)',
              offset: 0.19,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(18deg)',
              offset: 0.21,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-16deg)',
              offset: 0.23,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(14deg)',
              offset: 0.25,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-12deg)',
              offset: 0.27,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(10deg)',
              offset: 0.29,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-8deg)',
              offset: 0.31,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(6deg)',
              offset: 0.33,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-4deg)',
              offset: 0.35,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(2deg)',
              offset: 0.37,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(-1deg)',
              offset: 0.39,
              easing: 'ease-in-out',
            },
            {
              transform: 'rotate(1deg)',
              offset: 0.41,
              easing: 'ease-in-out',
            },
            { transform: 'rotate(0)', offset: 0.43, easing: 'ease-in-out' },
            { transform: 'rotate(0)', offset: 1, easing: 'ease-in-out' },
          ];
          animationTargetRef.current?.animate(keyframes, {
            duration: 5000,
          });
        };
        return buttonRef.current as EuiHeaderSectionItemButtonRef;
      },
      []
    );

    const styles = useEuiMemoizedStyles(euiHeaderSectionItemButtonStyles);
    const classes = classNames('euiHeaderSectionItemButton', className);

    const isSmallScreen = useIsWithinMaxBreakpoint('s');
    const shouldShowDot =
      notification === true || !!(notification && isSmallScreen);

    const buttonNotification = useMemo(() => {
      const cssStyles = [
        styles.notification.euiHeaderSectionItemButton__notification,
        shouldShowDot ? styles.notification.dot : styles.notification.badge,
      ];

      if (shouldShowDot) {
        return (
          <EuiIcon
            className="euiHeaderSectionItemButton__notification euiHeaderSectionItemButton__notification--dot"
            css={cssStyles}
            color={notificationColor}
            type="dot"
            size="l"
          />
        );
      } else if (notification) {
        return (
          <EuiNotificationBadge
            className="euiHeaderSectionItemButton__notification euiHeaderSectionItemButton__notification--badge"
            css={cssStyles}
            color={notificationColor}
          >
            {notification}
          </EuiNotificationBadge>
        );
      }
    }, [notification, notificationColor, styles.notification, shouldShowDot]);

    return (
      <EuiButtonEmpty
        className={classes}
        css={styles.euiHeaderSectionItemButton}
        color="text"
        buttonRef={buttonRef}
        {...rest}
      >
        <span
          ref={animationTargetRef}
          className="euiHeaderSectionItemButton__content"
          css={styles.euiHeaderSectionItemButton__content}
        >
          {children}
        </span>
        {buttonNotification}
      </EuiButtonEmpty>
    );
  }
);

EuiHeaderSectionItemButton.displayName = 'EuiHeaderSectionItemButton';
