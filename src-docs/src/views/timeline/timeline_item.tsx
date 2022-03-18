import React from 'react';
import {
  EuiTimelineItem,
  EuiText,
  EuiBadge,
  EuiTextArea,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon="dot"
      eventHeader={
        <EuiText size="s">
          <p>
            The <EuiBadge>icon</EuiBadge> is on the left side and I&apos;m an{' '}
            <EuiBadge>eventHeader</EuiBadge>
          </p>
        </EuiText>
      }
    />

    <EuiTimelineItem
      icon="dot"
      eventBody={
        <EuiTextArea
          placeholder="You can pass any type of component"
          value=""
          onChange={() => {}}
        />
      }
    />
  </div>
);
