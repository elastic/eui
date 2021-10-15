import React, { Fragment } from 'react';

import { EuiEmptyPrompt, EuiButton } from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="securityAnalyticsApp"
    iconColor="default"
    title={<h2>No cases</h2>}
    titleSize="xs"
    body={
      <Fragment>
        <p>
          There are no cases to display. Please create a new case or change your
          filter settings.
        </p>
      </Fragment>
    }
    actions={
      <EuiButton size="s" color="primary" fill>
        Add new case
      </EuiButton>
    }
  />
);
