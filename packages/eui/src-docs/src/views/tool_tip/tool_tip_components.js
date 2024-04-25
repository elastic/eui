import React from 'react';

import {
  EuiToolTip,
  EuiFieldText,
  EuiSpacer,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <div>
    <EuiToolTip
      position="top"
      content={
        <p>
          Works on any kind of element &mdash; buttons, inputs, you name it!
        </p>
      }
    >
      <EuiButton onClick={() => {}}>Hover me</EuiButton>
    </EuiToolTip>

    <EuiSpacer />

    <EuiToolTip
      position="top"
      content="Here is some tooltip text."
      display="block"
    >
      <EuiButton fullWidth>
        I am a block level tooltip, applied to a button with fullWidth
      </EuiButton>
    </EuiToolTip>

    <EuiSpacer />

    <EuiToolTip
      position="right"
      content="Tooltip remains visible while the child is focused."
    >
      <EuiFieldText
        placeholder="Focus me"
        aria-label="Example of input wrapped with tooltip"
      />
    </EuiToolTip>
  </div>
);
