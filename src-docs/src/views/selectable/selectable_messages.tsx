import React, { useState, Fragment } from 'react';

import { EuiSelectable } from '../../../../src/components/selectable';
import { EuiSwitch } from '../../../../src/components/form/switch';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const emptyMessage = 'You have no spice';
  const loadingMessage = "Hey, I'm loading here!";

  return (
    <Fragment>
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
      <EuiSpacer />
      <EuiSelectable
        aria-label="Messaging example"
        options={[]}
        style={{ width: 300 }}
        listProps={{ bordered: true }}
        isLoading={isLoading}
        loadingMessage={useCustomMessage ? loadingMessage : undefined}
        emptyMessage={useCustomMessage ? emptyMessage : undefined}
      >
        {(list) => list}
      </EuiSelectable>
    </Fragment>
  );
};
