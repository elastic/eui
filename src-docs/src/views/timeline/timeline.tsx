import React from 'react';
import {
  EuiTimeline,
  EuiTimelineProps,
  EuiText,
} from '../../../../src/components';

const items: EuiTimelineProps['items'] = [
  {
    icon: 'email',
    verticalAlign: 'center',
    children: (
      <EuiText size="s">
        <p>
          <strong>janet@elastic.co</strong> was invited to the project.
        </p>
      </EuiText>
    ),
  },
  {
    icon: 'pencil',
    verticalAlign: 'center',
    children: (
      <EuiText size="s">
        <p>
          The project was renamed to <strong>Revenue Dashboard</strong>.
        </p>
      </EuiText>
    ),
  },
  {
    icon: 'folderClosed',
    verticalAlign: 'center',
    children: (
      <EuiText size="s">
        <p>The project was archived</p>.
      </EuiText>
    ),
  },
];

export default () => <EuiTimeline items={items} />;
