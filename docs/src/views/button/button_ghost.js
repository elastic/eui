import React from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiButtonIcon,
} from '../../../../src/components';

export default () => (
  <div className="guideDemo__ghostBackground">
    <EuiButton
      color="ghost"
      onClick={() => window.alert('Button clicked')}
    >
      Primary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      fill
      color="ghost"
      size="s"
      iconType="check"
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      size="s"
      color="ghost"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonIcon
      size="s"
      color="ghost"
      iconType="user"
      onClick={() => window.alert('Button clicked')}
    />
  </div>
);
