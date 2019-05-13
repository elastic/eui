import React, { Fragment } from 'react';

import {
  EuiCheckbox,
  EuiFlexGroup,
  EuiFlexItem,
  EuiIconTip,
  EuiSpacer,
  EuiText,
  EuiCode,
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
      size="xl"
      type="alert"
      color="warning"
      content="I do not think it means what you think it means"
    />

    <EuiSpacer />

    <EuiText>
      <p>
        Pass a position utility class via <EuiCode>iconProps</EuiCode> to shift
        for better alignment.
        <EuiIconTip
          type="iInCircle"
          color="subdued"
          content={
            <span>
              This was passed <EuiCode>.eui-alignTop</EuiCode>
            </span>
          }
          iconProps={{
            className: 'eui-alignTop',
          }}
        />
      </p>
    </EuiText>
  </Fragment>
);
