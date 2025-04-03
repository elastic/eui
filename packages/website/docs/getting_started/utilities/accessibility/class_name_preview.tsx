import React from 'react';

import { EuiText } from '@elastic/eui';

export const ClassNamePreview = () => {
  return (
    <EuiText size="s">
      <p>The next paragraph is hidden except for screen readers.</p>
      <p className="euiScreenReaderOnly">
        I am hidden except for screen readers
      </p>
    </EuiText>
  );
};
