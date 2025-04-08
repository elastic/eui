import React from 'react';
import { css } from '@emotion/react';

import { EuiText, euiScreenReaderOnly } from '@elastic/eui';

export const FunctionPreview = () => {
  return (
    <EuiText size="s">
      <p>The next paragraph is hidden except for screen readers.</p>
      <p
        css={css`
          ${euiScreenReaderOnly()}
        `}
      >
        I am hidden except for screen readers
      </p>
    </EuiText>
  );
};
