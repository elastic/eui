import React from 'react';

import {
  EuiText,
  EuiTextAlign,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiText>
      <EuiTextAlign textAlign="left">
        <p>Left</p>
      </EuiTextAlign>
      <EuiTextAlign textAlign="center">
        <p>Center</p>
      </EuiTextAlign>
      <EuiTextAlign textAlign="right">
        <p>Right</p>
      </EuiTextAlign>
    </EuiText>
    <EuiSpacer />
    <EuiText textAlign="center">
      <p>You can also pass alignment to <EuiCode>EuiText</EuiCode> directly with a prop</p>
    </EuiText>
  </div>
);
