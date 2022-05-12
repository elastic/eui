import React from 'react';
import { EuiTimelineItem, EuiText, EuiCode } from '../../../../src/components';

export default () => (
  <EuiTimelineItem icon="dot" iconAriaLabel="Main icon" component="div">
    <EuiText size="s">
      <p>
        I&apos;m the <EuiCode>children</EuiCode> and you can find the{' '}
        <EuiCode>icon</EuiCode> on the left side.
      </p>
    </EuiText>
  </EuiTimelineItem>
);
