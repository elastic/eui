import React, { Fragment } from 'react';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';
import { Link } from 'react-router-dom';
import { EuiNotificationEventMeta } from '../../../../src/components/notification/notification_event_meta';
import {
  EuiNotificationEvent,
  EuiText,
  EuiContextMenuItem,
  EuiSpacer,
  EuiCode,
  EuiTextColor,
} from '../../../../src/components';
import { notificationEventReadButtonConfig } from './playground';
import { EuiNotificationEventPrimaryAction } from './props';

import NotificationEvent from './notification_event';
const notificationEventSource = require('!!raw-loader!./notification_event');
const notificationEventHtml = renderToHtml(NotificationEvent);

import NotificationsFeed from './notifications_feed';
const notificationsFeedSource = require('!!raw-loader!./notifications_feed');
const notificationsFeedHtml = renderToHtml(NotificationsFeed);

const notificationEventSnippet = `<EuiNotificationEvent
  id={id}
  meta={{
    type: 'Alert',
    severity: 'Warning',
    iconType: 'logoMaps',
    badgeColor: 'warning',
    eventName: 'alert-warning-01',
    time: '1 min ago',
  }}
  title={title}
  isRead={isRead}
  primaryAction={primaryAction}
  messages={messages}
  onRead={onRead}
  onOpenContextMenu={onOpenContextMenu}
  onClickPrimaryAction={() => {}}
  onClickTitle={() => {}}
/>`;

const notificationEventFeedSnippet = `// we're looping through an array of objects to render multiple EuiNotificationEvent's
const notificationEvents = events.map((event) => (
  <EuiNotificationEvent
    key={event.id}
    id={event.id}
    meta={event.meta}
    title={event.title}
    isRead={event.isRead}
    primaryAction={event.primaryAction}
    messages={event.messages}
    onRead={onRead}
    onOpenContextMenu={onOpenContextMenu}
    onClickPrimaryAction={onClickPrimaryAction}
    onClickTitle={onClickTitle!}
  />
));
`;

const required = <EuiTextColor color="danger">(required)</EuiTextColor>;

export const NotificationEventExample = {
  title: 'Notification event',
  beta: true,
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
      <EuiSpacer />
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
      title: 'Props and methods',
      text: (
        <>
          <EuiText>
            <p>
              A <strong>EuiNotificationEvent</strong> is comprised of different
              props:
            </p>
            <ul>
              <li>
                <EuiCode>{'id'}</EuiCode> {required}: a unique id.
              </li>
              <li>
                <EuiCode>{'meta'}</EuiCode> {required}: an object with multiple
                props like <EuiCode>{'type'}</EuiCode>,{' '}
                <EuiCode>{'severity'}</EuiCode>,{' '}
                <EuiCode>{'badgeColor'}</EuiCode>,{' '}
                <EuiCode>{'iconType'}</EuiCode> and <EuiCode>{'time'}</EuiCode>.
              </li>
              <li>
                <EuiCode>{'title'}</EuiCode> {required}: the{' '}
                <EuiCode>{'title'}</EuiCode> of the event.
              </li>
              <li>
                <EuiCode>{'primaryAction'}</EuiCode>: an object with a{' '}
                <EuiCode>{'label'}</EuiCode> and other{' '}
                <EuiCode>{'EuiButtonEmptyProps'}</EuiCode> props like a{' '}
                <EuiCode>{'iconType'}</EuiCode>.
              </li>
              <li>
                <EuiCode>{'messages'}</EuiCode> {required}: notification
                messages as an array of strings.
              </li>
            </ul>
          </EuiText>
          <EuiSpacer />
          <EuiText>
            <p>Methods for helping to deal to common action types:</p>
            <ul>
              <li>
                <EuiCode>onRead</EuiCode>: returns the <EuiCode>id</EuiCode>,{' '}
                <EuiCode>isRead</EuiCode> and applies an{' '}
                <EuiCode>onClick</EuiCode> handler to the{' '}
                <EuiCode>read</EuiCode> indicator.
              </li>
              <li>
                <EuiCode>onOpenContextMenu</EuiCode>: provided the{' '}
                <EuiCode>id</EuiCode> of the event must return an array of{' '}
                <EuiCode>EuiContextMenuItem</EuiCode> elements.
              </li>
              <li>
                <EuiCode>onClickPrimaryAction</EuiCode>: returns the{' '}
                <EuiCode>id</EuiCode> and applies an <EuiCode>onClick</EuiCode>{' '}
                handler to the <EuiCode>primaryAction</EuiCode>.
              </li>
              <li>
                <EuiCode>onClickTitle</EuiCode>: returns the{' '}
                <EuiCode>id</EuiCode> and applies an <EuiCode>onClick</EuiCode>{' '}
                handler to the <EuiCode>title</EuiCode>.
              </li>
            </ul>
          </EuiText>
          <EuiSpacer />
          <EuiText>
            <p>See the snippet and props table for full details.</p>
          </EuiText>
        </>
      ),
      props: {
        EuiNotificationEvent,
        EuiNotificationEventMeta,
        EuiNotificationEventPrimaryAction,
        EuiContextMenuItem,
      },
      snippet: notificationEventSnippet,
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
      snippet: notificationEventFeedSnippet,
      demo: <NotificationsFeed />,
    },
  ],
  playground: notificationEventReadButtonConfig,
};
