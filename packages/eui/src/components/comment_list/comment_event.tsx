/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { useEuiBorderColorCSS } from '../../global_styling';
import { CommonProps } from '../common';
import { IconType } from '../icon';
import { EuiPanel, EuiPanelProps } from '../panel';
import { EuiAvatar } from '../avatar';

import {
  euiCommentEventStyles,
  euiCommentEventHeaderStyles,
  euiCommentEventBodyStyles,
} from './comment_event.styles';

export interface EuiCommentEventProps extends CommonProps {
  /**
   * Author of the comment.
   */
  username: ReactNode;
  /**
   * Time of occurrence of the event. Its format is set on the consumer's side
   */
  timestamp?: ReactNode;
  /**
   * Describes the event that took place
   */
  event?: ReactNode;
  /**
   * Custom actions that the user can perform from the comment's header
   */
  actions?: ReactNode | ReactNode[];
  /**
   * Accepts any ReactNode. Renders in a panel within the comment event.
   */
  children?: ReactNode;

  /**
   * Custom icon that shows before the username.
   */
  eventIcon?: IconType;
  /**
   * Specify an `aria-label` for the `eventIcon`.
   * If no `aria-label` is passed we assume the icon is purely decorative.
   */
  eventIconAriaLabel?: string;
  /**
   * Background color for the comment's header.
   */
  eventColor?: EuiPanelProps['color'];
}

export const EuiCommentEvent: FunctionComponent<EuiCommentEventProps> = ({
  children,
  className,
  eventIcon,
  eventIconAriaLabel,
  username,
  timestamp,
  event,
  actions,
  eventColor,
}) => {
  const classes = classNames('euiCommentEvent', className);

  /**
   * Branching logic
   */
  // the username is required so we only check if other elements are define
  const hasEventElements = eventIcon || timestamp || event || actions;

  const isTypeRegular = children && hasEventElements;
  const isTypeUpdate = !children && hasEventElements;

  type CommentType = 'regular' | 'update' | 'custom';

  let type: CommentType;

  if (isTypeRegular) {
    type = 'regular';
  } else if (isTypeUpdate) {
    type = 'update';
  } else {
    type = 'custom';
  }

  if (isTypeRegular && !eventColor) {
    eventColor = 'highlighted';
  }
  if (isTypeUpdate && !eventColor) {
    eventColor = 'transparent';
  }
  const showEventBorders = isTypeRegular;

  const panelProps: EuiPanelProps = useMemo(
    () => ({
      color: type === 'custom' ? 'transparent' : eventColor,
      paddingSize: type === 'custom' ? 'none' : 's',
      borderRadius: type === 'regular' ? 'none' : 'm',
      hasShadow: false, // `plain` color needs this
    }),
    [type, eventColor]
  );

  const isFigure = isTypeRegular;
  const Element = isFigure ? 'figure' : 'div';
  const HeaderElement = isFigure ? 'figcaption' : 'div';

  /**
   * Styles
   */
  const borderColor = eventColor === 'highlighted' ? 'subdued' : eventColor;
  const borderStyles = useEuiBorderColorCSS();

  const styles = useEuiMemoizedStyles(euiCommentEventStyles);
  const cssStyles = [
    styles.euiCommentEvent,
    showEventBorders && styles.border,
    showEventBorders && borderStyles[borderColor!],
  ];

  const headerStyles = useEuiMemoizedStyles(euiCommentEventHeaderStyles);
  const cssHeaderStyles = [
    headerStyles.euiCommentEvent__header,
    showEventBorders && headerStyles.border,
    showEventBorders && borderStyles[borderColor!],
  ];

  const bodyStyles = useEuiMemoizedStyles(euiCommentEventBodyStyles);
  const cssBodyStyles = [bodyStyles.euiCommentEvent__body, bodyStyles[type]];

  return (
    <Element className={classes} css={cssStyles} data-type={type}>
      {hasEventElements && (
        <HeaderElement
          className="euiCommentEvent__header"
          css={cssHeaderStyles}
        >
          <EuiPanel {...panelProps}>
            <div
              className="euiCommentEvent__headerMain"
              css={headerStyles.euiCommentEvent__headerMain}
            >
              <div
                className="euiCommentEvent__headerData"
                css={headerStyles.euiCommentEvent__headerData}
              >
                {eventIcon && (
                  <EuiAvatar
                    className="euiCommentEvent__headerEventIcon"
                    css={headerStyles.euiCommentEvent__headerEventIcon}
                    size="s"
                    iconType={eventIcon}
                    name={eventIconAriaLabel ? eventIconAriaLabel : ''}
                    color="subdued"
                    aria-hidden={!eventIconAriaLabel}
                  />
                )}
                {username && (
                  <div
                    className="euiCommentEvent__headerUsername"
                    css={headerStyles.euiCommentEvent__headerUsername}
                  >
                    {username}
                  </div>
                )}
                {event && (
                  <div
                    className="euiCommentEvent__headerEvent"
                    css={headerStyles.euiCommentEvent__headerEvent}
                  >
                    {event}
                  </div>
                )}
                {timestamp && (
                  <div className="euiCommentEvent__headerTimestamp">
                    <time>{timestamp}</time>
                  </div>
                )}
              </div>
              {actions && (
                <div
                  className="euiCommentEvent__headerActions"
                  css={headerStyles.euiCommentEvent__headerActions}
                >
                  {actions}
                </div>
              )}
            </div>
          </EuiPanel>
        </HeaderElement>
      )}

      {children && (
        <div className="euiCommentEvent__body" css={cssBodyStyles}>
          {children}
        </div>
      )}
    </Element>
  );
};
