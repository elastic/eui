import React, { useState } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiButton } from '../../../../src/components/button';
import {
  EuiContextMenuItem,
  EuiContextMenuPanelProps,
} from '../../../../src/components/context_menu';
import { EuiNotificationEvent } from '../../../../src/components/notification/notification_event';

const notificationEventsData = [
  {
    id: 'alert-01',
    meta: {
      type: 'Alert',
      severity: 'Warning',
      iconType: 'logoMaps',
      badgeColor: 'warning',
      eventName: 'alert-warning-01',
      time: '1 min ago',
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
    id: 'report-01',
    meta: {
      type: 'Report',
      iconType: 'logoKibana',
      eventName: 'report-01',
      time: '3 min ago',
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
    id: 'news-01',
    meta: {
      type: 'News',
      iconType: 'logoElastic',
      eventName: 'news-01',
      time: '6 min ago',
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
  {
    id: 'alert-02',
    meta: {
      type: 'Alert',
      severity: 'Critical',
      iconType: 'logoKibana',
      badgeColor: 'danger',
      eventName: 'alert-warning-01',
      time: '8 min ago',
    },
    title: 'Index Threshold Alert',
    messages: ['[prod-server-001] is above 700'],
    isRead: false,
  },
  {
    id: 'background-search-01',
    meta: {
      type: 'Background Search',
      iconType: 'logoKibana',
      eventName: 'alert-warning-01',
      time: '10 min ago',
    },
    title: '[Flights] Flight Count and Average Ticket Price',
    messages: ['The request completed at 12:32:33 GMT+4'],
    isRead: false,
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

  const onResetData = () => {
    setEvents(notificationEventsData);
  };

  const notificationEvents = events.map((event) => {
    // we want to make the news title unclickable
    const onClickTitle = event.meta.type === 'News' ? undefined : () => {};

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
        onClickPrimaryAction={() => {}}
        onClickTitle={onClickTitle!}
      />
    );
  });

  return (
    <>
      <EuiButton size="s" onClick={onResetData}>
        Reset Data
      </EuiButton>
      <EuiSpacer />
      <EuiPanel
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
        {notificationEvents}
      </EuiPanel>
    </>
  );
};
