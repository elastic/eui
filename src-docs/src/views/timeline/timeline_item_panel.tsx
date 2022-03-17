import React from 'react';
import {
  EuiTimelineItem,
  EuiTimelineItemPanel,
  EuiAvatar,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem icon={<EuiAvatar name="Checked" iconType="check" />}>
      <EuiTimelineItemPanel header="ok">
        <p>Lorem ipsum</p>
      </EuiTimelineItemPanel>
    </EuiTimelineItem>
    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="dot" size="s" color="shade" />}
    >
      <EuiTimelineItemPanel>
        <p>No header just a panel</p>
      </EuiTimelineItemPanel>
    </EuiTimelineItem>

    <EuiTimelineItem
      icon={<EuiAvatar name="system" iconType="dot" size="s" color="shade" />}
    >
      <EuiTimelineItemPanel>
        <p>No header just a panel</p>
      </EuiTimelineItemPanel>
    </EuiTimelineItem>
  </div>
);
