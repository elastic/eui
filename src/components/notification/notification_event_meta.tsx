/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useState,
  ReactNode,
  ReactElement,
} from 'react';
import classNames from 'classnames';
import { EuiIcon, IconType } from '../icon';
import { EuiBadge, EuiBadgeProps } from '../badge';
import { EuiPopover } from '../popover';
import { EuiButtonIcon } from '../button';
import {
  EuiContextMenuItem,
  EuiContextMenuItemProps,
  EuiContextMenuPanel,
} from '../context_menu';
import { EuiI18n } from '../i18n';
import { htmlIdGenerator } from '../../services';

export type EuiNotificationEventMetaProps = {
  id: string;
  /**
   * Type of event (e.g. "Alert", "Cloud", etc..). Shows inside a badge.
   */
  type: string;
  /**
   * A unique, human-friendly name for the event to be used in aria attributes (e.g. "alert-critical-01", "cloud-no-severity-12", etc..).
   */
  eventName: string;
  /**
   * Type of severity (e.g. "Critical", "Warning", etc..). Shows as a text after the `type` following the format "Alert: Critical".
   */
  severity?: string;
  /**
   * Accepts either our palette colors (primary, success ..etc) or a hex value `#FFFFFF`, `#000`.
   * **`secondary` color is DEPRECATED, use `success` instead**
   */
  badgeColor?: EuiBadgeProps['color'];
  /**
   * The icon used to visually represent this data type. Accepts any `EuiIcon IconType`.
   */
  iconType?: IconType;
  /**
   * Specify an `aria-label` for the icon.
   * If no `aria-label` is passed we assume the icon is purely decorative.
   */
  iconAriaLabel?: string;
  /**
   * Indicates when the event was received.
   */
  time: ReactNode;
  /**
   * Necessary to trigger `onOpenContextMenu` from #EuiNotificationEvent
   */
  onOpenContextMenu?: () => Array<
    ReactElement<EuiContextMenuItemProps, typeof EuiContextMenuItem>
  >;
};

export const EuiNotificationEventMeta: FunctionComponent<EuiNotificationEventMetaProps> = ({
  id,
  iconType,
  type,
  time,
  badgeColor = 'hollow',
  severity,
  eventName,
  iconAriaLabel,
  onOpenContextMenu,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const classes = classNames('euiNotificationEventMeta', {
    'euiNotificationEventMeta--hasContextMenu': onOpenContextMenu,
  });

  const [contextMenuItems, setContextMenuItems] = useState<
    ReturnType<NonNullable<typeof onOpenContextMenu>>
  >([]);

  const randomPopoverId = htmlIdGenerator()();

  const ariaAttribute = iconAriaLabel
    ? { 'aria-label': iconAriaLabel }
    : { 'aria-hidden': true };

  const onOpenPopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
    if (onOpenContextMenu) {
      setContextMenuItems(onOpenContextMenu());
    }
  };

  return (
    <div className={classes}>
      <div className="euiNotificationEventMeta__section">
        {iconType && (
          <EuiIcon
            className="euiNotificationEventMeta__icon"
            type={iconType}
            {...ariaAttribute}
          />
        )}

        {type && (
          <EuiBadge
            className="euiNotificationEventMeta__badge"
            color={badgeColor}
          >
            {severity ? `${type}: ${severity}` : type}
          </EuiBadge>
        )}
      </div>

      <div className="euiNotificationEventMeta__section">
        <span className="euiNotificationEventMeta__time">{time}</span>
      </div>

      {onOpenContextMenu && (
        <div className="euiNotificationEventMeta__contextMenuWrapper">
          <EuiPopover
            id={randomPopoverId}
            ownFocus
            repositionOnScroll
            isOpen={isPopoverOpen}
            panelPaddingSize="none"
            anchorPosition="leftUp"
            button={
              <EuiI18n
                token="euiNotificationEventMeta.contextMenuButton"
                default="Menu for {eventName}"
                values={{
                  eventName,
                }}
              >
                {(contextMenuButton: string) => (
                  <EuiButtonIcon
                    aria-label={contextMenuButton}
                    aria-controls={randomPopoverId}
                    aria-expanded={isPopoverOpen}
                    aria-haspopup="true"
                    iconType="boxesVertical"
                    color="subdued"
                    onClick={onOpenPopover}
                    data-test-subj={`${id}-notificationEventMetaButton`}
                  />
                )}
              </EuiI18n>
            }
            closePopover={() => setIsPopoverOpen(false)}
          >
            {/* The EuiContextMenu is wrapped with a div so it closes after an item is clicked */}
            <div onClick={() => setIsPopoverOpen(false)}>
              <EuiContextMenuPanel items={contextMenuItems} />
            </div>
          </EuiPopover>
        </div>
      )}
    </div>
  );
};
