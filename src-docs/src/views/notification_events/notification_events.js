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
    setIsRead(true);
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
          type="Alert"
          severity="Critical"
          healthStatus="danger"
          iconType="logoCloud"
          time="2 min ago"
          isRead={isRead}
          onRead={onRead}
          contextMenuItems={contextMenuItems}
        />
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>No Severity</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ ...panelStyle }}>
        <EuiNotificationEventMeta
          type="Cloud"
          healthStatus="warning"
          iconType="logoCloud"
          time="2 min ago"
          isRead={isRead}
          onRead={onRead}
        />
      </EuiPanel>
      <EuiSpacer />

      <EuiTitle size="xs">
        <h3>Only required props</h3>
      </EuiTitle>
      <EuiSpacer size="s" />
      <EuiPanel paddingSize="s" hasShadow={true} style={{ ...panelStyle }}>
        <EuiNotificationEventMeta type="Cloud" time="2 min ago" />
      </EuiPanel>
    </>
  );
};
