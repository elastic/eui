import React from 'react';

import {
  EuiButtonEmpty,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiButtonEmpty
      onClick={() => window.alert('Button clicked')}
    >
      Primary
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      size="s"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      size="xs"
      onClick={() => window.alert('Button clicked')}
    >
      extra small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
    >
      Primary
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
    >
      Primary
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
    >
      small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      color="danger"
      onClick={() => window.alert('Button clicked')}
    >
      Danger
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="s"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="xs"
      onClick={() => window.alert('Button clicked')}
    >
      extra small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      color="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
    >
      Danger
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
    >
      Danger
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
    >
      small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      color="text"
      onClick={() => window.alert('Button clicked')}
    >
      Text
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="text"
      size="s"
      onClick={() => window.alert('Button clicked')}
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="text"
      size="xs"
      onClick={() => window.alert('Button clicked')}
    >
      extra small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      color="text"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
    >
      Text
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="text"
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="text"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
    >
      Text
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="text"
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
    >
      small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      color="danger"
      onClick={() => window.alert('Button clicked')}
      isDisabled
    >
      Disabled
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="s"
      onClick={() => window.alert('Button clicked')}
      isDisabled
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="xs"
      onClick={() => window.alert('Button clicked')}
      isDisabled
    >
      extra small
    </EuiButtonEmpty>

    <br/><br/>

    <EuiButtonEmpty
      color="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      isDisabled
    >
      Disabled
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      isDisabled
    >
      small
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
      isDisabled
    >
      Disabled
    </EuiButtonEmpty>

    &nbsp;&nbsp;

    <EuiButtonEmpty
      color="danger"
      size="s"
      onClick={() => window.alert('Button clicked')}
      iconType="arrowDown"
      iconSide="right"
      isDisabled
    >
      small
    </EuiButtonEmpty>
  </div>
);
