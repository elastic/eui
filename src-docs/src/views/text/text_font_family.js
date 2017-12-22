import React from 'react';

import {
  EuiTextFontFamily,
  EuiText,
} from '../../../../src/components';

export default () => (
  <EuiText>
    <EuiTextFontFamily fontFamily="default">
      <p>Default font family</p>
    </EuiTextFontFamily>

    <EuiTextFontFamily fontFamily="code">
      <p>Code font family</p>
    </EuiTextFontFamily>
  </EuiText>
);
