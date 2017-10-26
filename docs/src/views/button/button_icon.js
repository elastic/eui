import React from 'react';

import {
  EuiButtonIcon,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButtonIcon
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
    />

    <EuiButtonIcon
      size="small"
      color="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
    />

    <EuiButtonIcon
      size="small"
      color="disabled"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
    />
  </div>
);

