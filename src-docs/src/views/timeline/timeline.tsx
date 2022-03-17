import React from 'react';
import {
  EuiTimeline,
  EuiTimelineProps,
  EuiTimelineItemPanel,
} from '../../../../src/components/timeline';

const body = <EuiTimelineItemPanel paddingSize="s">Lorem</EuiTimelineItemPanel>;

const items: EuiTimelineProps['items'] = [
  {
    icon: 'user',
    children: body,
  },
  {
    icon: 'user',
    children: body,
  },
  {
    icon: 'user',
    children: body,
  },
];

export default () => <EuiTimeline items={items} />;
