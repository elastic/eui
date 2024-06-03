import React, { useState } from 'react';

import { EuiSelectable, EuiSwitch, EuiSpacer } from '../../../../src';

export default () => {
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const emptyMessage = 'You have no spice';
  const loadingMessage = "Hey, I'm loading here!";
  const errorMessage = 'Error!';

  return (
    <>
      <EuiSwitch
        label="Custom message"
        onChange={(e) => setUseCustomMessage(e.target.checked)}
        checked={useCustomMessage}
      />
      &emsp;
      <EuiSwitch
        label="Show loading"
        onChange={(e) => setIsLoading(e.target.checked)}
        checked={isLoading}
      />
      &emsp;
      <EuiSwitch
        label="Show error"
        onChange={(e) => setHasError(e.target.checked)}
        checked={hasError}
      />
      <EuiSpacer />
      <EuiSelectable
        aria-label="Messaging example"
        options={[]}
        style={{ width: 300 }}
        listProps={{ bordered: true }}
        isLoading={isLoading}
        loadingMessage={useCustomMessage ? loadingMessage : undefined}
        emptyMessage={useCustomMessage ? emptyMessage : undefined}
        errorMessage={hasError ? errorMessage : undefined}
      >
        {(list) => list}
      </EuiSelectable>
    </>
  );
};
