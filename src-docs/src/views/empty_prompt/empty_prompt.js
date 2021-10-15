import React, { Fragment } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiText,
  EuiIcon,
  EuiLink,
  EuiTitle,
} from '../../../../src/components';

export default () => (
  <EuiEmptyPrompt
    iconType="logoSecurity"
    title={<h2>No cases</h2>}
    body={
      <Fragment>
        <p>
          There are no cases to display. Please create a new case or change your
          filter settings.
        </p>
      </Fragment>
    }
    actions={
      <EuiButton color="primary" fill>
        Add new case
      </EuiButton>
    }
    footer={
      <>
        <EuiTitle size="xxs">
          <h3>Want to learn more?</h3>
        </EuiTitle>
        <EuiText size="s">
          <EuiLink href="#" color="subdued">
            <EuiIcon type="documentation" /> Read documentation
          </EuiLink>
        </EuiText>
      </>
    }
  />
);
