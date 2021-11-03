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
  EuiAccordion,
  EuiCodeBlock,
  EuiButtonEmpty as EuiPrimaryActionProps,
} from '../../../../src/components';
import NotificationEventPropsMethods from './notification_event_props_methods';

import NotificationEvent from './notification_event';
const notificationEventSource = require('!!raw-loader!./notification_event');
const notificationEventHtml = renderToHtml(NotificationEvent);

import NotificationEventFlexible from './notification_event_flexible';
const notificationEventFlexibleSource = require('!!raw-loader!./notification_event_flexible');
const notificationEventFlexibleHtml = renderToHtml(NotificationEventFlexible);

import NotificationsFeed from './notifications_feed';
const notificationsFeedSource = require('!!raw-loader!./notifications_feed');
const notificationsFeedHtml = renderToHtml(NotificationsFeed);

const notificationEventSnippet = `<EuiNotificationEvent
  id={id}
  type="Alert"
  iconType= "logoMaps"
  iconAriaLabel="Maps"
  time={time}
  title={title}
  isRead={isRead}
  primaryAction={primaryAction}
  messages={messages}
  onRead={onRead}
  onOpenContextMenu={onOpenContextMenu}
  onClickPrimaryAction={onClickPrimaryAction}
  onClickTitle={onClickTitle}
/>`;

const notificationEventFeedSnippet = `// we're looping through an array of objects to render multiple EuiNotificationEvent
const notificationEvents = events.map((event) => (
  <EuiNotificationEvent
    key={event.id}
    id={event.id}
    type={event.type}
    iconType={event.iconType}
    iconAriaLabel={event.iconAriaLabel}
    time={event.time}
    title={event.title}
    isRead={event.isRead}
    primaryAction={event.primaryAction}
    messages={event.messages}
    onRead={onRead}
    onOpenContextMenu={onOpenContextMenu}
    onClickPrimaryAction={onClickPrimaryAction}
    onClickTitle={onClickTitle}
  />
));

// the multiple EuiNotificationEvent should live inside the same container
<div>
 {notificationEvents}
</div>
`;

export const NotificationEventExample = {
  title: 'Notification event',
  beta: true,
  isNew: true,
  intro: (
    <EuiText>
      <p>
        Use <strong>EuiNotificationEvent</strong> to display notifications about
        new events in your product like alerts, support, or news. This component
        is meant to live inside a{' '}
        <strong>
          <Link to="/layout/flyout/">EuiFlyout</Link>
        </strong>{' '}
        so that users can quickly be informed or take action.
      </p>
    </EuiText>
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
        EuiContextMenuItem,
        EuiPrimaryActionProps,
      },
      snippet: notificationEventSnippet,
      demo: <NotificationEvent />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: notificationEventFlexibleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: notificationEventFlexibleHtml,
        },
      ],
      title: 'A flexible component',
      text: (
        <>
          <EuiText>
            <p>
              The <strong>EuiNotificationEvent</strong> takes into account that
              an event can be purely informative or actionable. It is flexible
              and adapts the design according to the props passed.
            </p>
          </EuiText>
          <EuiSpacer />
          <NotificationEventPropsMethods />
          <EuiSpacer size="xs" />
          <EuiAccordion
            id="propsSnippet"
            buttonContent={<small>Code snippet</small>}
          >
            <EuiSpacer size="xs" />
            <EuiCodeBlock language="ts" isCopyable paddingSize="s">
              {notificationEventSnippet}
            </EuiCodeBlock>
          </EuiAccordion>
          <EuiSpacer />
          <EuiText>
            <ul style={{ listStyleType: 'upper-alpha' }}>
              <li>
                <EuiCode>isRead</EuiCode>: Shows a button or icon that indicates
                the current <EuiCode>isRead</EuiCode> state of the event. Use{' '}
                <EuiCode>onRead</EuiCode> to allow users to toggle between read
                and unread states.
              </li>
              <li>
                <EuiCode>iconType</EuiCode>: Display an icon or logo to help
                users quickly identify where the event originated.
              </li>
              <li>
                <EuiCode>type</EuiCode> (required): Shows inside a badge
                denoting what type of event it is. Use in conjunction with{' '}
                <EuiCode>severity</EuiCode> and <EuiCode>badgeColor</EuiCode> to
                indicate the level of urgency.
              </li>
              <li>
                <EuiCode>time</EuiCode> (required): Indicates the time the event
                was received. It is recommended to display a relative time
                format like &apos;2 hours ago&apos;.
              </li>
              <li>
                <EuiCode>onContextMenu</EuiCode>: Use this prop when you have
                multiple events and you need to add individual actions to each
                event. You can add filters based on the event type or a more
                descriptive read/unread actions as an alternative to the read
                indicator.
              </li>
              <li>
                <EuiCode>title</EuiCode> (required): The title of the
                notification event. It should be descriptive enough so that
                users don&apos;t need to navigate away. But use it in
                conjunction with an <EuiCode>onClickTitle</EuiCode> to direct
                users to the respective app in case they need more information
                about the notification.
              </li>
              <li>
                <EuiCode>messages</EuiCode>: Provides more details about the
                event. You can provide a single message or multiple messages if
                the event executes in various steps.
              </li>
              <li>
                <EuiCode>primaryAction</EuiCode>: Use this prop in conjunction
                with <EuiCode>onClickPrimaryAction</EuiCode> to provide a call
                to action, like download a report or link to a page where an
                action is required. Most of the time, the clickable title is
                enough.
              </li>
            </ul>
          </EuiText>
          <EuiSpacer />
          <EuiText>
            <p>
              The following demo shows how you can combine different props to
              create different types of events like a report, alert, or simply
              news.
            </p>
          </EuiText>
        </>
      ),
      props: {
        EuiNotificationEvent,
        EuiNotificationEventMeta,
        EuiContextMenuItem,
        EuiPrimaryActionProps,
      },
      snippet: notificationEventSnippet,
      demo: <NotificationEventFlexible />,
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
          <strong>EuiNotificationEvent</strong>. These components should live
          inside a container without other components on the same level. This
          way, we ensure that feed styles are applied correctly. Consuming
          applications should implement all the logic to filter and save
          read/unread states.
        </p>
      ),
      props: {
        EuiNotificationEvent,
        EuiNotificationEventMeta,
        EuiContextMenuItem,
        EuiPrimaryActionProps,
      },
      snippet: notificationEventFeedSnippet,
      demo: <NotificationsFeed />,
    },
  ],
};
