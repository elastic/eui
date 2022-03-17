import React from 'react';
import {
  EuiTimeline,
  EuiTimelineProps,
} from '../../../../src/components/timeline';
import { EuiPanel } from '../../../../src/components/';

const body = <EuiPanel hasBorder>Lorem</EuiPanel>;

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
