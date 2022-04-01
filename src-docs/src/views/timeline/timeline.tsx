import React, { ReactElement } from 'react';
import {
  EuiTimeline,
  EuiTimelineProps,
  EuiText,
  EuiAvatar,
} from '../../../../src/components';

const wrapper = (children: ReactElement) => (
  <EuiText size="s">{children}</EuiText>
);

const items: EuiTimelineProps['items'] = [
  {
    icon: <EuiAvatar name="Invitation" iconType="email" color="subdued" />,
    verticalAlign: 'center',
    children: wrapper(
      <p>
        <strong>janet@elastic.co</strong> was invited to the project
      </p>
    ),
  },
  {
    icon: <EuiAvatar name="Project edited" iconType="pencil" color="subdued" />,
    verticalAlign: 'center',
    children: wrapper(
      <p>
        The project was renamed to <strong>Revenue Dashboard</strong>
      </p>
    ),
  },
  {
    icon: (
      <EuiAvatar
        name="Project closed"
        iconType="folderClosed"
        color="subdued"
      />
    ),
    verticalAlign: 'center',
    children: wrapper(<p>The project was archived</p>),
  },
];

export default () => <EuiTimeline items={items} />;
