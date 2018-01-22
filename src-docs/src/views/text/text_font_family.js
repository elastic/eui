import React from 'react';

import {
  EuiTextFontFamily,
  EuiText,
  EuiCode,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiText>
      <EuiTextFontFamily fontFamily="default">
        <p>Default font family</p>
      </EuiTextFontFamily>

      <EuiTextFontFamily fontFamily="code">
        <p>Code font family</p>
      </EuiTextFontFamily>
    </EuiText>

    <EuiText fontFamily="code">
      Font family can also be applied to <EuiCode>EuiText</EuiCode> directly as a prop.
    </EuiText>
  </div>
);
