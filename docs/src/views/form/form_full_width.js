import React from 'react';

import {
  EuiFieldSearch,
  EuiRange,
  EuiTextArea,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiButton,
} from '../../../../src/components';

// Don't use this, make proper ids instead. This is just for the example.
function makeId() {
  return Math.random().toString(36).substr(2, 5);
}

export default () => (
  <div>
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFieldSearch placeholder="Search..." fullWidth />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton>Search</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="l" />

    <EuiFormRow
      id={makeId()}
      label="Works on form rows too"
      fullWidth
      helpText="Note that fullWidth prop is passed to both the row and the child in this example"
    >
      <EuiRange
        min={0}
        max={100}
        name="range"
        fullWidth
      />
    </EuiFormRow>
    <EuiFormRow
      id={makeId()}
      label="Often useful for text areas"
      fullWidth
      helpText="Again, passed to both the row and the textarea."
    >
      <EuiTextArea
        fullWidth
        placeholder="There is a reason we do not make forms ALWAYS 100% width.
          See how this text area becomes extremely hard to read when the individual
          lines get this long? It is much more readable when contained to a scannable max-width."
      />
    </EuiFormRow>


    <br />
    <br />

  </div>
);
