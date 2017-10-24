import React from 'react';

import {
  EuiButton,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButton
      onClick={() => window.alert('Button clicked')}
      iconType="arrowUp"
    >
      Primary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      fill
      iconType="arrowDown"
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconType="arrowLeft"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconType="arrowRight"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      iconSide="right"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowUp"
    >
      Primary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconSide="right"
      iconType="arrowLeft"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconSide="right"
      iconType="arrowRight"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      iconSide="right"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowUp"
      isDisabled
    >
      Disabled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconSide="right"
      fill
      iconType="arrowDown"
      onClick={() => window.alert('Button clicked')}
      isDisabled
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconSide="right"
      iconType="arrowLeft"
      size="small"
      onClick={() => window.alert('Button clicked')}
      isDisabled
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      iconSide="right"
      iconType="arrowRight"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
      isDisabled
    >
      small and filled
    </EuiButton>
  </div>
);
