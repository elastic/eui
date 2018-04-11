import React, { Fragment } from 'react';

import {
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIconTip,
  EuiSpacer,
} from '../../../../src/components';

export default () => (
  <Fragment>
    <EuiFlexGroup alignItems="center" gutterSize="s" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiCheckbox
          id="explainedCheckbox"
          label="Use source maps"
          onChange={() => {}}
        />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiIconTip
          content="Source maps allow browser dev tools to map minified code to the original source code"
          position="right"
        />
      </EuiFlexItem>
    </EuiFlexGroup>

    <EuiSpacer />

    <EuiIconTip
      aria-label="Warning"
      type="alert"
      color="warning"
      content="I do not think it means what you think it means"
    />
  </Fragment>
);
