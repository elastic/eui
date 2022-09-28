import React from 'react';

import {
  EuiForm,
  EuiFieldSearch,
  EuiRange,
  EuiTextArea,
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  EuiButton,
} from '../../../../src/components';

export default () => (
  <EuiForm
    fullWidth
    onSubmit={(e) => {
      e.preventDefault();
    }}
  >
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFieldSearch
          placeholder="Search..."
          aria-label="An example of search with fullWidth"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton>Search</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer size="l" />

    <EuiFormRow
      label="Works on form rows too"
      helpText="Note that the fullWidth prop is not passed to any of these elements, it's read from the parent <EuiForm> component."
    >
      <EuiRange min={0} max={100} name="range" />
    </EuiFormRow>

    <EuiFormRow label="Often useful for text areas">
      <EuiTextArea
        placeholder="There is a reason we do not make forms ALWAYS 100% width.
          See how this text area becomes extremely hard to read when the individual
          lines get this long? It is much more readable when contained to a scannable max-width."
      />
    </EuiFormRow>
  </EuiForm>
);
