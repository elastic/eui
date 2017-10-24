import React from 'react';

import {
  EuiButton,
} from '../../../../src/components/';

export default () => (
  <div>
    <EuiButton
      onClick={() => window.alert('Button clicked')}
    >
      Primary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      type="secondary"
      onClick={() => window.alert('Button clicked')}
    >
      Secondary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="secondary"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="secondary"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="secondary"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      type="warning"
      onClick={() => window.alert('Button clicked')}
    >
      Warning
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="warning"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="warning"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="warning"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      type="danger"
      onClick={() => window.alert('Button clicked')}
    >
      Danger
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="danger"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="danger"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      type="danger"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      isDisabled
      onClick={() => window.alert('Button clicked')}
    >
      Disabled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      isDisabled
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      isDisabled
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      isDisabled
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

  </div>
);
