import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
  EuiLink,
  EuiTitle,
} from '../../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="logoKibana"
    title={<h2>Do more with Kibana!</h2>}
    layout="vertical"
    hasBorder
    body={
      <p>
        Start a free trial or upgrade your license to use anomaly detection.
      </p>
    }
    actions={[
      <EuiButton color="primary" fill>
        Upgrade
      </EuiButton>,
      <EuiButtonEmpty>Start a free trial</EuiButtonEmpty>,
    ]}
    footer={
      <>
        <EuiTitle size="xxs">
          <h3>Want to learn more?</h3>
        </EuiTitle>
        <EuiLink href="#" target="_blank">
          Read documentation
        </EuiLink>
      </>
    }
  />
);
