import React from 'react';
import {
  EuiTimelineItem,
  EuiText,
  EuiTitle,
  EuiCode,
  EuiAvatar,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon={<EuiAvatar size="s" name="dot" iconType="dot" color="subdued" />}
      header={
        <EuiTitle size="xs">
          <h2>
            I&apos;m an event <EuiCode>header</EuiCode>
          </h2>
        </EuiTitle>
      }
      body={
        <EuiText size="s">
          <p>
            I&apos;m an event <EuiCode>body</EuiCode> and you can find the{' '}
            <EuiCode>icon</EuiCode> on the left side.
          </p>
        </EuiText>
      }
    />
  </div>
);
