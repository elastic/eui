import React, { Fragment } from 'react';

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

export default () => (
  <Fragment>
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
      label="Works on form rows too"
      fullWidth
      helpText="Note that the fullWidth prop is not passed to the form row's child">
      <EuiRange fullWidth min={0} max={100} name="range" />
    </EuiFormRow>

    <EuiFormRow label="Often useful for text areas" fullWidth>
      <EuiTextArea
        fullWidth
        placeholder="There is a reason we do not make forms ALWAYS 100% width.
          See how this text area becomes extremely hard to read when the individual
          lines get this long? It is much more readable when contained to a scannable max-width."
      />
    </EuiFormRow>
  </Fragment>
);
