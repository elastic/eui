import React, { useState } from 'react';

import { EuiButton, EuiSpacer, EuiSwitch } from '../../../../src/components';

export default () => {
  const [loadingButton, setLoadingButton] = useState(true);

  return (
    <>
      <EuiSwitch
        compressed
        label="Is loading"
        checked={loadingButton}
        onChange={() => setLoadingButton(!loadingButton)}
      />
      <EuiSpacer />
      <EuiButton isLoading={loadingButton} fill>
        {loadingButton ? 'Loading...' : 'Button'}
      </EuiButton>
    </>
  );
};
