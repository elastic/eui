import React from 'react';

import {
  EuiToolTip,
  EuiLink,
  EuiText,
  EuiFieldText,
  EuiSpacer,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiText>
      <p style={{ overflow: 'hidden' }}>
        This tooltip appears on the{' '}
        <EuiToolTip
          position="left"
          title="Tooltip titles are optional"
          content="Here is some tooltip text. Lets add some more content to see how it wraps."
        >
          <EuiLink>left</EuiLink>
        </EuiToolTip>
        {' '} and includes the optional title.
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
        <EuiToolTip position="bottom" clickOnly content="You need to click or leave focus to dismiss this one.">
          <EuiLink>bottom</EuiLink>
        </EuiToolTip>
        {' '} and requires a <strong>click to activate</strong>.
      </p>
    </EuiText>

    <EuiSpacer />

    <EuiToolTip position="right" content="Works on anything">
      <EuiFieldText placeholder="Hover over me" />
    </EuiToolTip>

    <EuiSpacer />

    <EuiToolTip position="top" content="Works on anything">
      <EuiButton onClick={() => alert('Buttons are still clickable within tooltips.')}>Hover over me</EuiButton>
    </EuiToolTip>
  </div>
);
