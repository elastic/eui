import React, { useState } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiTitle } from '../../../../src/components/title';
import { EuiSpacer } from '../../../../src/components/spacer';
import {
  EuiContextMenuItem,
  EuiContextMenuPanelProps,
} from '../../../../src/components/context_menu';
import { EuiNotificationEvents } from '../../../../src/components/notification/notification_events';
import { EuiNotificationEventMeta } from '../../../../src/components/notification/notification_event_meta';

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
      title: {
        label:
          '[APM 500 Server errors] is now active and the title is very long so it should wrap',
        href: '#',
      },
      primaryAction: {
        onClick: () => {
          console.log('go to');
        },
        children: 'View and go',
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
      title: {
        label: '[Maps] Geo Alert',
        href: '#',
      },
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
      title: {
        label: '[Error Monitoring Report] is generated',
        href: '#',
      },
      primaryAction: {
        href: 'http://www.elastic.co',
        iconType: 'download',
        children: 'Download',
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
      title: {
        label: '[Error Monitoring Report] is generated',
        href: '#',
      },
      primaryAction: {
        href: 'http://www.elastic.co',
        iconType: 'download',
        children: 'Download',
      },
      notifications: ['The reported was generated at 17:12:16 GMT+4'],
      isRead: false,
    },
  ];

  const [notifications, setNotifications] = useState(notificationEventsData);
  const [contextMenuItems, setContextMenuItems] = useState<
    EuiContextMenuPanelProps['items']
  >();
  const [isRead, setIsRead] = useState(false);

  const onReadEvent = () => {
    setIsRead(!isRead);
  };

  const onRead = (id: string, isRead: boolean) => {
    const nextState = notifications.map((event) =>
      event.id === id ? { ...event, isRead: isRead } : event
    );

    setNotifications(nextState);
  };

  const onFilterByType = (type: string) => {
    const nextState = notifications.filter((event) =>
      type.includes(event.meta.type)
    );

    setNotifications(nextState);
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

  const contextMenuItemsArray = [
    <EuiContextMenuItem key="contextMenuItemA" onClick={onReadEvent}>
      Mark as read
    </EuiContextMenuItem>,

    <EuiContextMenuItem key="contextMenuItemB" onClick={() => {}}>
      View messages like this
    </EuiContextMenuItem>,

    <EuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
      Don’t notify me about this
    </EuiContextMenuItem>,
  ];

  return (
    <>
      <EuiTitle size="xs">
        <h3>All props</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ maxWidth: '540px' }}>
        <EuiNotificationEventMeta
          type="This is a very long type"
          severity="And a very long severity"
          badgeColor="danger"
          iconType="logoCloud"
          iconAriaLabel="cloud"
          time="This notification was received 1 min ago. You should check it."
          isRead={isRead}
          onRead={onReadEvent}
          contextMenuItems={contextMenuItemsArray}
          eventName="event-01"
        />
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>Events</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
        <EuiNotificationEvents
          events={notifications}
          onRead={onRead}
          // onOpenContextMenu={onOpenContextMenu}
          // contextMenuItems={contextMenuItems}
        />
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
        <EuiNotificationEvents events={notifications} onRead={onRead} />
      </EuiPanel>
    </>
  );
};
