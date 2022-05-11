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
  euiCommentEventUpdatePanelStyles,
} from './comment_event.styles';

export interface EuiCommentEventProps extends CommonProps {
  /**
   * Author of the comment. When no `timelineIcon` is passed the username initial letter is used to generate an avatar.
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
   * Use `update` when the comment is primarily showing info about actions that the user or the system has performed (e.g. "user1 edited a case").
   * Use `custom` when passing a children that doesn't require the event header. Elements like `username`, `timestamp`, `event` and `actions` won't show.
   */
  type?: EuiCommentType;

  /**
   * Accepts any ReactNode.
   */
  children?: ReactNode;

  /**
   * Custom icon that shows before the username only when the `type` is `"update"`.
   */
  updateIcon?: IconType;
  /**
   * Specify an `aria-label` for the `updateIcon`.
   * If no `aria-label` is passed we assume the icon is purely decorative.
   */
  updateIconAriaLabel?: string;
  /**
   * A sub header
   */
  updateMessage?: ReactNode;
  /**
   * Background color for the event header.
   */
  headerColor?: EuiPanelProps['color'];
}

export const TYPES = ['regular', 'update', 'custom'] as const;
export type EuiCommentType = typeof TYPES[number];

export const EuiCommentEvent: FunctionComponent<EuiCommentEventProps> = ({
  children,
  className,
  username,
  timestamp,
  event,
  actions,
  updateIcon,
  updateIconAriaLabel,
  updateMessage,
  headerColor,
}) => {
  const classes = classNames('euiCommentEvent', className);

  const hasEventElements = username || updateIcon || username || actions;

  const isTypeRegular = children && hasEventElements;
  const isTypeUpdate = !children && hasEventElements;

  let type: EuiCommentType;

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
  const cssHeaderStyles = headerStyles.euiCommentEvent__header;
  const cssHeaderPanelStyles = headerStyles.euiCommentEvent__headerPanel;
  const cssHeaderUsernameStyles = headerStyles.euiCommentEvent__headerUsername;
  const cssHeaderMainStyles = headerStyles.euiCommentEvent__headerMain;
  const cssHeaderDataStyles = headerStyles.euiCommentEvent__headerData;
  const cssHeaderActionsStyles = headerStyles.euiCommentEvent__headerActions;
  const cssHeaderUpdateMessageStyles =
    headerStyles.euiCommentEvent__headerUpdateMessage;

  const updatePanelStyles = euiCommentEventUpdatePanelStyles(euiTheme);
  const cssUpdatePanelStyles = updatePanelStyles.euiCommentEvent__updatePanel;

  const isFigure =
    isTypeRegular || (isTypeUpdate && typeof updateMessage !== 'undefined');

  const Element = isFigure ? 'figure' : 'div';
  const HeaderElement = isFigure ? 'figcaption' : 'div';

  // const { updateColor, updateIcon, updateIconAriaLabel } = updateProps;

  const panelProps = headerColor
    ? { color: headerColor, paddingSize: 's' }
    : { color: 'transparent', paddingSize: 'none', css: cssUpdatePanelStyles };

  const eventHeader = (
    <HeaderElement className="euiCommentEvent__header" css={cssHeaderStyles}>
      <EuiPanel {...(panelProps as EuiPanelProps)} css={cssHeaderPanelStyles}>
        <div css={cssHeaderMainStyles}>
          <div css={cssHeaderDataStyles}>
            {updateIcon && (
              <EuiAvatar
                size="s"
                iconType={updateIcon}
                name={updateIconAriaLabel ? updateIconAriaLabel : ''}
                color="subdued"
                className="euiCommentEvent__updateIconUpdate"
                aria-hidden={!updateIconAriaLabel}
              />
            )}

            {username && <div css={cssHeaderUsernameStyles}>{username}</div>}

            {event && (
              <div className="euiCommentEvent__headerEvent">{event}</div>
            )}

            {timestamp && (
              <div className="euiCommentEvent__headerTimestamp">
                <time>{timestamp}</time>
              </div>
            )}
          </div>

          {actions && <div css={cssHeaderActionsStyles}>{actions}</div>}
        </div>

        {updateMessage && (
          <div css={cssHeaderUpdateMessageStyles}>{updateMessage}</div>
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
