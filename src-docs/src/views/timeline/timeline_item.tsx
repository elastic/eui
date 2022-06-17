import React from 'react';
import {
  EuiTimeline,
  EuiTimelineItem,
  EuiText,
  EuiCode,
} from '../../../../src/components';

export default () => (
  <EuiTimeline aria-label="Timeline item example">
    <EuiTimelineItem icon="dot" iconAriaLabel="Main icon">
      <EuiText size="s">
        <p>
          I&apos;m the <EuiCode>children</EuiCode> and you can find the{' '}
          <EuiCode>icon</EuiCode> on the left side.
        </p>
      </EuiText>
    </EuiTimelineItem>
  </EuiTimeline>
);
