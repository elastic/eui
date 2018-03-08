import React from 'react';

import {
  EuiToolTip,
  EuiLink,
  EuiText,
} from '../../../../src/components';

export default () => (
  <EuiText>
    <p style={{ overflow: 'hidden' }}>
      This tooltip appears on the{' '}
      <EuiToolTip
        position="left"
        title="I am a tooltip title"
        content="Here is some tooltip text. Lets add some more content to see how it wraps."
      >
        <EuiLink>left</EuiLink>
      </EuiToolTip>
    </p>
    <p style={{ overflow: 'hidden' }}>
      This tooltip appears on the{' '}
      <EuiToolTip position="right" content="Here is some tooltip text">
        <EuiLink>right</EuiLink>
      </EuiToolTip>
    </p>
    <p style={{ overflow: 'hidden' }}>
      This tooltip appears on the{' '}
      <EuiToolTip position="top" content="Here is some tooltip text">
        <EuiLink>top</EuiLink>
      </EuiToolTip>
    </p>
    <p style={{ overflow: 'hidden' }}>
      This tooltip appears on the{' '}
      <EuiToolTip position="bottom" clickOnly content="Here is some tooltip text">
        <EuiLink>bottom</EuiLink>
      </EuiToolTip>
    </p>
  </EuiText>
);
