import React from 'react';
import { EuiTimelineItem, EuiText, EuiBadge } from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon="editorComment"
      eventHeader={
        <EuiText size="s">
          <p>
            The <EuiBadge>icon</EuiBadge> is on the left side and I&apos;m an{' '}
            <EuiBadge>eventHeader</EuiBadge>
          </p>
        </EuiText>
      }
      eventBody={
        <EuiText size="s">
          <p>
            The <EuiBadge>icon</EuiBadge> is on the left side and I&apos;m an{' '}
            <EuiBadge>eventBody</EuiBadge>
          </p>
        </EuiText>
      }
      eventProps={{
        paddingSize: 's',
        hasBorder: true,
        headerColor: 'subdued',
      }}
    />
  </div>
);
