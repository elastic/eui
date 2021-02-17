import React, { useState } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiTitle } from '../../../../src/components/title';
import { EuiSpacer } from '../../../../src/components/spacer';
import {
  EuiContextMenuItem,
  EuiContextMenuPanelProps,
} from '../../../../src/components/context_menu';
import { EuiNotificationEvent } from '../../../../src/components/notification/notification_event';

export default () => {
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
      notifications: [
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
      notifications: [
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
      notifications: [
        'The reported was generated at 17:12:16 GMT+4 and due to a error it was was generated again at 17:13:17 GMT+4',
      ],
      isRead: false,
    },
    {
      id: 'notificationD',
      meta: {
        type: 'Alert',
        iconType: 'logoKibana',
        eventName: 'report-01',
        time: '2 min ago',
      },
      title: '[Error Monitoring Report] is generated',
      notifications: ['The reported was generated at 17:12:16 GMT+4'],
      isRead: false,
    },
  ];

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
        Mark as read
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
    return (
      <EuiNotificationEvent
        key={event.id}
        id={event.id}
        meta={event.meta}
        title={event.title}
        isRead={event.isRead}
        primaryAction={event.primaryAction}
        notifications={event.notifications}
        onRead={onRead}
        contextMenuItems={contextMenuItems}
        onOpenContextMenu={onOpenContextMenu}
        onClickTitle={onClickEventTitle}
        onClickPrimaryAction={onClickEventPrimaryAction}
      />
    );
  });

  const notificationEventsNoContextMenu = events.map((event) => {
    return (
      <EuiNotificationEvent
        key={event.id}
        id={event.id}
        meta={event.meta}
        title={event.title}
        isRead={event.isRead}
        primaryAction={event.primaryAction}
        notifications={event.notifications}
        onRead={onRead}
        onClickTitle={onClickEventTitle}
        onClickPrimaryAction={onClickEventPrimaryAction}
      />
    );
  });

  return (
    <>
      <EuiTitle size="xs">
        <h3>Events</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
        {notificationEvents}
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>Events with no context menu</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
        {notificationEventsNoContextMenu}
      </EuiPanel>
    </>
  );
};
