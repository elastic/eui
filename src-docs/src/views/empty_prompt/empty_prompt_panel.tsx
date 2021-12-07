import React, { FunctionComponent } from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiTitle,
  EuiLink,
  EuiEmptyPromptProps,
} from '../../../../src/components';

export const Panel: FunctionComponent<{
  color: EuiEmptyPromptProps['color'];
}> = ({ color }) => {
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
