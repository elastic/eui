import React, { Fragment } from 'react';

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFlexGroup responsive={false} wrap gutterSize="s" alignItems="center">
      <EuiFlexItem grow={false}>
        <EuiButton href="#/navigation/button#buttons-as-links">
          Button with href
        </EuiButton>
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButtonEmpty href="#/navigation/button#buttons-as-links">
          Empty button with href
        </EuiButtonEmpty>
      </EuiFlexItem>
    </EuiFlexGroup>
  </Fragment>
);
