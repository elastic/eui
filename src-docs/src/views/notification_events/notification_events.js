import React, { useState } from 'react';

import {
  EuiNotificationEventMeta,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
} from '../../../../src/components';

export default () => {
  const [isRead, setIsRead] = useState(false);

  const onRead = () => {
    setIsRead(true);
  };

  const panelStyle = { maxWidth: '400px' };

  return (
    <>
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
