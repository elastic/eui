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
      color="secondary"
      onClick={() => window.alert('Button clicked')}
    >
      Secondary
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="secondary"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="secondary"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="secondary"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      color="warning"
      onClick={() => window.alert('Button clicked')}
    >
      Warning
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="warning"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="warning"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="warning"
      size="small"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      small and filled
    </EuiButton>

    <br/><br/>

    <EuiButton
      color="danger"
      onClick={() => window.alert('Button clicked')}
    >
      Danger
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="danger"
      fill
      onClick={() => window.alert('Button clicked')}
    >
      Filled
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="danger"
      size="small"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButton>

    &nbsp;&nbsp;

    <EuiButton
      color="danger"
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
