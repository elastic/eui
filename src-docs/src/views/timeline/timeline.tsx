import React from 'react';
import {
  EuiTimeline,
  EuiTimelineProps,
  EuiText,
  EuiAvatar,
} from '../../../../src/components';

const items: EuiTimelineProps['items'] = [
  {
    icon: <EuiAvatar name="email" iconType="email" color="subdued" />,
    header: (
      <EuiText>
        <p>
          <strong>janet@elastic.co</strong> was invited to the project
        </p>
      </EuiText>
    ),
  },
  {
    icon: <EuiAvatar name="pencil" iconType="pencil" color="subdued" />,
    header: (
      <EuiText>
        <p>
          The project was renamed to <strong>Revenue Dashboard</strong>
        </p>
      </EuiText>
    ),
  },
  {
    icon: (
      <EuiAvatar name="folder closed" iconType="folderClosed" color="subdued" />
    ),
    header: (
      <EuiText>
        <p>The project was archived</p>
      </EuiText>
    ),
  },
];

export default () => <EuiTimeline items={items} />;
