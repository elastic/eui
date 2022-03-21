import React from 'react';
import {
  EuiTimelineItem,
  EuiText,
  EuiTitle,
  EuiCode,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTimelineItem
      icon="editorComment"
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
