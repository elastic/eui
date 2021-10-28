import React from 'react';

import {
  EuiEmptyPrompt,
  EuiButton,
  EuiButtonEmpty,
  EuiImage,
} from '../../../../../src/components';

import illustration from '../../../images/empty-prompt_illustration.svg';

export default () => (
  <EuiEmptyPrompt
    icon={<EuiImage size="fullWidth" src={illustration} alt="" />}
    title={<h2>Page not found</h2>}
    layout="vertical"
    body={
      <p>
        The page you are looking for might have been removed or temporarily
        unavailable.
      </p>
    }
    actions={[
      <EuiButton color="primary" fill>
        Go home
      </EuiButton>,
      <EuiButtonEmpty iconType="arrowLeft" flush="left">
        Go back
      </EuiButtonEmpty>,
    ]}
  />
);
