import React, { useState } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiSpacer } from '../../../../src/components/spacer';
import { EuiButtonGroup } from '../../../../src/components/button';
import {
  EuiContextMenuItem,
  EuiContextMenuPanelProps,
} from '../../../../src/components/context_menu';
import { EuiNotificationEvent } from '../../../../src/components/notification/notification_event';

const notificationEventsData = [
  {
    id: 'report',
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
    messages: ['The reported was generated at 17:12:16 GMT+4'],
    isRead: false,
  },
  {
    id: 'alert',
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
    id: 'news',
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
  const [event, setEvent] = useState<any>(notificationEventsData[0]);
  const [contextMenuItems, setContextMenuItems] = useState<
    EuiContextMenuPanelProps['items']
  >();

  const onRead = (id: string, isRead: boolean) => {
    const nextState = { ...event, isRead: !isRead };

    setEvent(nextState);
  };

  const onOpenContextMenu = (id: string, isRead: boolean) => {
    const nextContextMenus = [
      <EuiContextMenuItem
        key="contextMenuItemA"
        onClick={() => onRead(id, isRead)}>
        {isRead ? ' Mark as unread' : 'Mark as read'}
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemB" onClick={() => {}}>
        View messages like this
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
        Don’t notify me about this
      </EuiContextMenuItem>,
    ];

    setContextMenuItems(nextContextMenus);
  };

  const [toggleIdSelected, setToggleIdSelected] = useState('alertButton');

  const toggleButtons = [
    {
      id: 'reportButton',
      label: 'Report',
    },
    {
      id: 'alertButton',
      label: 'Alert',
    },
    {
      id: 'newsButton',
      label: 'News',
    },
  ];

  const onChangeButtonGroup = (optionId: string) => {
    setToggleIdSelected(optionId);
    const eventId = optionId.replace('Button', '');
    const event = notificationEventsData.find((event) => event.id === eventId);
    setEvent(event);
  };

  return (
    <>
      <EuiButtonGroup
        legend="This is a primary group"
        options={toggleButtons}
        onChange={onChangeButtonGroup}
        idSelected={toggleIdSelected}
        type="single"
      />
      <EuiSpacer size="s" />
      <EuiPanel
        paddingSize="none"
        hasShadow={true}
        style={{ maxWidth: '540px' }}>
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
          onClickTitle={event.id !== 'news' ? () => {} : undefined}
        />
      </EuiPanel>
    </>
  );
};
