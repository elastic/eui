import React from 'react';

import {
  EuiButtonIcon,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButtonIcon
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
      aria-label="Next"
    />

    <EuiButtonIcon
      size="s"
      color="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
      aria-label="Next"
    />

    <EuiButtonIcon
      size="s"
      color="disabled"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
      aria-label="Next"
    />
  </div>
);

