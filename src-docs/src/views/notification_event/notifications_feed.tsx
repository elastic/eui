import React, { useState } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import {
  EuiContextMenuItem,
  EuiContextMenuPanelProps,
} from '../../../../src/components/context_menu';
import { EuiNotificationEvent } from '../../../../src/components/notification/notification_event';

const notificationEventsData = [
  {
    id: 'notificationA',
    meta: {
      type: 'This is a very long type',
      iconType: 'logoObservability',
      iconAriaLabel: 'alert icon',
      eventName: 'alert-critical-01',
      time: 'This notification was received 1 min ago. You should check it.',
    },
    title:
      '[APM 500 Server errors] is now active and the title is very long so it should wrap',

    primaryAction: {
      label: 'View and go',
    },
    messages: [
      'The request completed at 12:32:33 GMT+4',
      'The request completed at 12:32:33 GMT+4',
      'A background request started at 12:32:33 GMT+4',
    ],
    isRead: true,
  },
  {
    id: 'notificationB',
    meta: {
      type: 'Alert',
      iconType: 'logoMaps',
      badgeColor: 'warning',
      eventName: 'alert-warning-01',
      time: 'This notification was received 1 min ago',
    },
    title: '[Maps] Geo Alert',
    messages: [
      'The request completed at 12:32:33 GMT+4',
      'The request completed at 12:32:33 GMT+4',
      'A background request started at 12:32:33 GMT+4',
    ],
    isRead: false,
  },
  {
    id: 'notificationC',
    meta: {
      type: 'Report',
      iconType: 'logoKibana',
      eventName: 'report-01',
      time: '2 min ago',
    },
    title: '[Error Monitoring Report] is generated',
    primaryAction: {
      iconType: 'download',
      label: 'Download',
    },
    messages: [
      'The reported was generated at 17:12:16 GMT+4 and due to an error it was was generated again at 17:13:17 GMT+4',
    ],
    isRead: false,
  },
  {
    id: 'notificationD',
    meta: {
      type: 'News',
      iconType: 'logoElastic',
      eventName: 'news-01',
      time: '2 min ago',
      badgeColor: 'accent',
    },
    title: 'Search more, spend less',
    messages: [
      'Retain and search more data with searchable snapshots on low-cost object stores + a new cold data tier in 7.11.',
    ],
    isRead: false,
    primaryAction: {
      label: 'View and go',
    },
  },
];

export default () => {
  const [events, setEvents] = useState(notificationEventsData);
  const [contextMenuItems, setContextMenuItems] = useState<
    EuiContextMenuPanelProps['items']
  >();

  const onRead = (id: string, isRead: boolean) => {
    const nextState = events.map((event) => {
      return event.id === id ? { ...event, isRead: !isRead } : event;
    });

    setEvents(nextState);
  };

  const onFilterByType = (type: string) => {
    const nextState = events.filter((event) => type.includes(event.meta.type));

    setEvents(nextState);
  };

  const onOpenContextMenu = (id: string, isRead: boolean, type: string) => {
    const nextContextMenus = [
      <EuiContextMenuItem
        key="contextMenuItemA"
        onClick={() => onRead(id, isRead)}>
        {isRead ? ' Mark as unread' : 'Mark as read'}
      </EuiContextMenuItem>,

      <EuiContextMenuItem
        key="contextMenuItemB"
        onClick={() => onFilterByType(type)}>
        View messages like this
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
        Don’t notify me about this
      </EuiContextMenuItem>,
    ];

    setContextMenuItems(nextContextMenus);
  };

  const onClickEventTitle = (id: string) => {
    console.log(`title with id "${id}" was clicked`);
  };

  const onClickEventPrimaryAction = (id: string) => {
    console.log(`primary action with id "${id}" was clicked`);
  };

  const notificationEvents = events.map((event) => {
    const onClickNoNewsTitles =
      event.meta.type === 'News' ? undefined : onClickEventTitle;

    return (
      <EuiNotificationEvent
        key={event.id}
        id={event.id}
        meta={event.meta}
        title={event.title}
        isRead={event.isRead}
        primaryAction={event.primaryAction}
        messages={event.messages}
        onRead={onRead}
        contextMenuItems={contextMenuItems}
        onOpenContextMenu={onOpenContextMenu}
        onClickPrimaryAction={onClickEventPrimaryAction}
        onClickTitle={onClickNoNewsTitles!}
      />
    );
  });

  return (
    <EuiPanel paddingSize="none" hasShadow={true} style={{ maxWidth: '540px' }}>
      {notificationEvents}
    </EuiPanel>
  );
};
