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
        <p>Left aligned paragraph.</p>
      </EuiTextAlign>
      <EuiTextAlign textAlign="center">
        <p>Center aligned paragraph.</p>
      </EuiTextAlign>
      <EuiTextAlign textAlign="right">
        <p>Right aligned paragraph.</p>
      </EuiTextAlign>
    </EuiText>
    <EuiSpacer />
    <EuiText textAlign="center">
      <p>
        You can also pass alignment to <EuiCode>EuiText</EuiCode> directly with
        a prop
      </p>
    </EuiText>
    <EuiText textAlign="center" color="secondary">
      <p>And in conjunction with coloring.</p>
    </EuiText>
  </div>
);
