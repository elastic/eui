import React, { useState } from 'react';

import {
  EuiPanel,
  EuiSpacer,
  EuiTitle,
  EuiContextMenuItem,
} from '../../../../src/components';

import { EuiNotificationEventMeta } from '../../../../src/components/notification/notification_event_meta';

export default () => {
  const [isRead, setIsRead] = useState(false);

  const onRead = () => {
    setIsRead(!isRead);
  };

  const panelStyle = { maxWidth: '400px' };

  const contextMenuItems = [
    <EuiContextMenuItem key="contextMenuItemA" onClick={onRead}>
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
      <EuiTitle size="s">
        <h2>EuiNotificationEventMeta</h2>
      </EuiTitle>
      <EuiSpacer size="m" />
      <EuiTitle size="xs">
        <h3>All props</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ ...panelStyle }}>
        <EuiNotificationEventMeta
          type="This is a very long type"
          severity="And a very long severity"
          badgeColor="danger"
          iconType="logoCloud"
          iconAriaLabel="cloud"
          time="This notification was received 1 min ago. You should check it."
          isRead={isRead}
          onRead={onRead}
          contextMenuItems={contextMenuItems}
          eventName="event-01"
        />
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>All props</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ ...panelStyle }}>
        <EuiNotificationEventMeta
          type="Alert"
          iconType="logoCloud"
          iconAriaLabel="alert icon"
          time="This notification was received 1 min ago"
          isRead={isRead}
          onRead={onRead}
          contextMenuItems={contextMenuItems}
          eventName="event-02"
        />
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>No Severity</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ ...panelStyle }}>
        <EuiNotificationEventMeta
          type="Cloud "
          badgeColor="warning"
          iconType="logoCloud"
          time={<span>2 min ago</span>}
          isRead={isRead}
          onRead={onRead}
          eventName="event-03"
        />
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>Only required props</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ ...panelStyle }}>
        <EuiNotificationEventMeta
          type="Cloud"
          time={<span>2 min ago</span>}
          eventName="event-04"
        />
      </EuiPanel>
    </>
  );
};
