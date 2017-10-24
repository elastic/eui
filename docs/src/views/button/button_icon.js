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
      type="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
    />

    <EuiButtonIcon
      size="small"
      type="disabled"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowRight"
    />
  </div>
);

