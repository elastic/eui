import React, { Fragment } from 'react';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import { Link } from 'react-router-dom';
import { EuiNotificationEventMeta } from '../../../../src/components/notification/notification_event_meta';
import {
  EuiNotificationEvent,
  EuiText,
  EuiContextMenuItem,
} from '../../../../src/components';
import { notificationEventReadButtonConfig } from './playground';
import { EuiNotificationEventPrimaryAction } from './props';

import NotificationEvent from './notification_event';
const notificationEventSource = require('!!raw-loader!./notification_event');
const notificationEventHtml = renderToHtml(NotificationEvent);

import NotificationsFeed from './notifications_feed';
const notificationsFeedSource = require('!!raw-loader!./notifications_feed');
const notificationsFeedHtml = renderToHtml(NotificationsFeed);

export const NotificationEventExample = {
  title: 'Notification event',
  isNew: true,
  intro: (
    <Fragment>
      <EuiText>
        <p>
          Use <strong>EuiNotificationEvent</strong> to display notifications
          about new events in your product like alerts, support, or news. This
          component is meant to live inside a{' '}
          <strong>
            <Link to="/layout/flyout/">EuiFlyout</Link>
          </strong>{' '}
          so that users can quickly be informed or take action. The{' '}
          <strong>EuiNotificationEvent</strong> takes into account that an event
          can be purely informative or actionable. It&apos;s flexible enough and
          adapts the design according to the passed props.
        </p>
      </EuiText>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationEventSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationEventHtml,
        },
      ],
      props: {
        EuiNotificationEvent,
        EuiNotificationEventMeta,
        EuiNotificationEventPrimaryAction,
        EuiContextMenuItem,
      },
      demo: <NotificationEvent />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationsFeedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationsFeedHtml,
        },
      ],
      title: 'Notifications feed',
      text: (
        <p>
          You can create a notifications feed by rendering multiple{' '}
          <strong>EuiNotificationEvent</strong>&apos;s. These components should
          live inside a container without other components on the same level.
          This way, we ensure that feed styles are applied correctly. Consuming
          applications should implement all the logic to filter and save
          read/unread states.
        </p>
      ),
      props: {
        EuiNotificationEvent,
        EuiNotificationEventMeta,
        EuiNotificationEventPrimaryAction,
        EuiContextMenuItem,
      },
      demo: <NotificationsFeed />,
    },
  ],
  playground: notificationEventReadButtonConfig,
};
