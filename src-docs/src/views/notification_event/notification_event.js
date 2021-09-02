import React, { useState } from 'react';
import { EuiPanel } from '../../../../src/components/panel';
import { EuiContextMenuItem } from '../../../../src/components/context_menu';
import { EuiNotificationEvent } from '../../../../src/components/notification/notification_event';

export default () => {
  const [isRead, setIsRead] = useState(false);

  const onRead = (id, isRead) => {
    setIsRead(!isRead);
  };

  const onOpenContextMenu = (id) => {
    return [
      <EuiContextMenuItem
        key="contextMenuItemA"
        onClick={() => onRead(id, isRead)}
      >
        {isRead ? 'Mark as unread' : 'Mark as read'}
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemB" onClick={() => {}}>
        View messages like this
      </EuiContextMenuItem>,

      <EuiContextMenuItem key="contextMenuItemC" onClick={() => {}}>
        Don’t notify me about this
      </EuiContextMenuItem>,
    ];
  };

  return (
    <EuiPanel paddingSize="none" hasShadow={true} style={{ maxWidth: '540px' }}>
      <EuiNotificationEvent
        id="report"
        type="Report"
        iconType="logoKibana"
        iconAriaLabel="Kibana"
        time="1 min ago"
        title="[Error Monitoring Report] is generated"
        primaryAction="Download"
        primaryActionProps={{
          iconType: 'download',
        }}
        messages={['The reported was generated at 17:12:16 GMT+4']}
        isRead={isRead}
        onRead={onRead}
        onOpenContextMenu={onOpenContextMenu}
        onClickPrimaryAction={() => {}}
        onClickTitle={() => {}}
      />
    </EuiPanel>
  );
};
