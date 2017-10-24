import React from 'react';

import {
  EuiSpacer,
  EuiText,
  EuiTextColor,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiTitle>
      <h2>
        <EuiTextColor color="default">You </EuiTextColor>
        <EuiTextColor color="primary">can </EuiTextColor>
        <EuiTextColor color="secondary">use </EuiTextColor>
        <EuiTextColor color="accent">it </EuiTextColor>
        <EuiTextColor color="warning">on </EuiTextColor>
        <EuiTextColor color="danger">anything!</EuiTextColor>
      </h2>
    </EuiTitle>

    <EuiSpacer size="l" />

    <EuiText>
      <p>
        <EuiTextColor color="default">
          Default text color
        </EuiTextColor>
      </p>
      <p>
        <EuiTextColor color="subdued">
          Subdued text color
        </EuiTextColor>
      </p>
      <p>
        <EuiTextColor color="primary">
          Primary text color
        </EuiTextColor>
      </p>
      <p>
        <EuiTextColor color="secondary">
          Secondary text color
        </EuiTextColor>
      </p>
      <p>
        <EuiTextColor color="accent">
          Accent text color
        </EuiTextColor>
      </p>
      <p>
        <EuiTextColor color="warning">
          Warning text color
        </EuiTextColor>
      </p>
      <p>
        <EuiTextColor color="danger">
          Danger text color
        </EuiTextColor>
      </p>
      <p>
        <span style={{ background: '#222' }}>
          <EuiTextColor color="ghost">
            Ghost text color is always white regardless of theme.
          </EuiTextColor>
        </span>
      </p>
    </EuiText>
  </div>
);
