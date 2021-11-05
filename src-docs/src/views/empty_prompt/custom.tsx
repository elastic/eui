import React from 'react';

import { EuiEmptyPrompt, EuiButton } from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="securityAnalyticsApp"
    iconColor="default"
    title={<h2>Start adding cases</h2>}
    titleSize="xs"
    body={
      <>
        <p>
          There are no cases to display. Add a new case or change your filter
          settings.
        </p>
      </>
    }
    actions={
      <EuiButton size="s" color="primary" fill>
        Add a case
      </EuiButton>
    }
  />
);
