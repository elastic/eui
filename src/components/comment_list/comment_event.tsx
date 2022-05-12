/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ReactNode } from 'react';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';
import classNames from 'classnames';
import { IconType } from '../icon';
import { EuiPanel, EuiPanelProps } from '../panel';
import { EuiAvatar } from '../avatar';
import {
  euiCommentEventStyles,
  euiCommentEventHeaderStyles,
} from './comment_event.styles';

export interface EuiCommentEventProps extends CommonProps {
  /**
   * Author of the comment. When no `avatarName` is defined, the avatar uses the `username` as the avatar name.
   */
  username?: string;
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
   * Accepts any ReactNode.
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
   * A message that displays in the event header. Below the metadata.
   */
  eventMessage?: ReactNode;
  /**
   * Background color for the event header.
   */
  headerColor?: EuiPanelProps['color'];
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
  eventMessage,
  headerColor,
}) => {
  const classes = classNames('euiCommentEvent', className);

  const hasEventElements =
    eventIcon || username || timestamp || event || actions || eventMessage;

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

  const euiTheme = useEuiTheme();

  const styles = euiCommentEventStyles(euiTheme);
  const cssStyles = [styles.euiCommentEvent, styles[type]];

  const headerStyles = euiCommentEventHeaderStyles(euiTheme);
  const cssHeaderStyles = [
    headerStyles.euiCommentEvent__header,
    headerColor && headerStyles.hasHeaderColor,
  ];
  const cssHeaderPanelStyles = headerStyles.euiCommentEvent__headerPanel;
  const cssHeaderUsernameStyles = headerStyles.euiCommentEvent__headerUsername;
  const cssHeaderEventStyles = headerStyles.euiCommentEvent__headerEvent;
  const cssHeaderTimestampStyles =
    headerStyles.euiCommentEvent__headerTimestamp;
  const cssHeaderMainStyles = headerStyles.euiCommentEvent__headerMain;
  const cssHeaderDataStyles = headerStyles.euiCommentEvent__headerData;
  const cssHeaderActionsStyles = headerStyles.euiCommentEvent__headerActions;
  const cssHeaderEventMessageStyles =
    headerStyles.euiCommentEvent__headerEventMessage;

  const isFigure =
    isTypeRegular || (isTypeUpdate && typeof eventMessage !== 'undefined');

  const Element = isFigure ? 'figure' : 'div';
  const HeaderElement = isFigure ? 'figcaption' : 'div';

  const panelProps = headerColor
    ? { color: headerColor, paddingSize: 's' }
    : { color: 'transparent', paddingSize: 'none' };

  const eventHeader = (
    <HeaderElement css={cssHeaderStyles}>
      <EuiPanel {...(panelProps as EuiPanelProps)} css={cssHeaderPanelStyles}>
        <div css={cssHeaderMainStyles}>
          <div css={cssHeaderDataStyles}>
            {eventIcon && (
              <EuiAvatar
                size="s"
                iconType={eventIcon}
                name={eventIconAriaLabel ? eventIconAriaLabel : ''}
                color="subdued"
                aria-hidden={!eventIconAriaLabel}
              />
            )}

            {username && <div css={cssHeaderUsernameStyles}>{username}</div>}

            {event && <div css={cssHeaderEventStyles}>{event}</div>}

            {timestamp && (
              <div css={cssHeaderTimestampStyles}>
                <time>{timestamp}</time>
              </div>
            )}
          </div>

          {actions && <div css={cssHeaderActionsStyles}>{actions}</div>}
        </div>

        {eventMessage && (
          <div css={cssHeaderEventMessageStyles}>{eventMessage}</div>
        )}
      </EuiPanel>
    </HeaderElement>
  );

  return (
    <Element className={classes} css={cssStyles}>
      {hasEventElements && eventHeader}

      {children && <div className="euiCommentEvent__body">{children}</div>}
    </Element>
  );
};
