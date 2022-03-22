import React, { ReactElement } from 'react';
import {
  EuiTimeline,
  EuiTimelineProps,
  EuiText,
  EuiAvatar,
  EuiPanel,
} from '../../../../src/components';

const wrapper = (children: ReactElement) => (
  <EuiPanel paddingSize="none" color="transparent">
    <EuiText size="s">{children}</EuiText>
  </EuiPanel>
);

const items: EuiTimelineProps['items'] = [
  {
    icon: <EuiAvatar name="email" iconType="email" color="subdued" />,
    alignItems: 'center',
    children: wrapper(
      <p>
        <strong>janet@elastic.co</strong> was invited to the project
      </p>
    ),
  },
  {
    icon: <EuiAvatar name="pencil" iconType="pencil" color="subdued" />,
    alignItems: 'center',
    children: wrapper(
      <p>
        The project was renamed to <strong>Revenue Dashboard</strong>
      </p>
    ),
  },
  {
    icon: (
      <EuiAvatar name="folder closed" iconType="folderClosed" color="subdued" />
    ),
    alignItems: 'center',
    children: wrapper(<p>The project was archived</p>),
  },
];

export default () => <EuiTimeline items={items} />;
