import React from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
} from '../../../../src/components';

export default () => (
  <div className="guideDemo__ghostBackground">
    <EuiButton
      type="ghost"
      onClick={() => window.alert('Button clicked')}
    >
      Primary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      fill
      type="ghost"
      size="small"
      iconType="check"
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      size="small"
      type="ghost"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonIcon
      size="small"
      type="ghost"
      iconType="user"
      onClick={() => window.alert('Button clicked')}
    />
  </div>
);
