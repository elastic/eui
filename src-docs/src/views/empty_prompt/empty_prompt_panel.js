import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiTitle,
  EuiLink,
} from '../../../../src/components';

export default ({ color }) => {
  return (
    <EuiEmptyPrompt
      iconType="securityAnalyticsApp"
      title={<h2>Start adding cases</h2>}
      color={color}
      body={
        <p>
          There are no cases to display. Add a new case or change your filter
          settings.
        </p>
      }
      actions={
        <EuiButton color="primary" fill>
          Add a case
        </EuiButton>
      }
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
};
