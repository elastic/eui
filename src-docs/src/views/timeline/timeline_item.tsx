import React from 'react';
import {
  EuiTimelineItem,
  EuiText,
  EuiCode,
  EuiAvatar,
  EuiPanel,
} from '../../../../src/components';

export default () => (
  <EuiTimelineItem
    icon={<EuiAvatar size="s" name="dot" iconType="dot" color="subdued" />}
    verticalAlign="center"
  >
    <EuiPanel paddingSize="none" color="transparent">
      <EuiText size="s">
        <p>
          I&apos;m a <EuiCode>children</EuiCode> and you can find the{' '}
          <EuiCode>icon</EuiCode> on the left side.
        </p>
      </EuiText>
    </EuiPanel>
  </EuiTimelineItem>
);
