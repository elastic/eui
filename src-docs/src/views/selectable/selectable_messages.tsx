import React, { useState, Fragment } from 'react';

import {
  EuiSelectable,
  EuiSelectableMessage,
} from '../../../../src/components/selectable';
import { EuiSwitch } from '../../../../src/components/form/switch';
import { EuiSpacer } from '../../../../src/components/spacer';

export default () => {
  const [useCustomMessage, setUseCustomMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const customMessage = (
    <EuiSelectableMessage>You have no spice</EuiSelectableMessage>
  );

  return (
    <Fragment>
      <EuiSwitch
        label="Custom message"
        onChange={e => setUseCustomMessage(e.target.checked)}
        checked={!isLoading && useCustomMessage}
        disabled={isLoading}
      />
      &emsp;
      <EuiSwitch
        label="Show loading"
        onChange={e => setIsLoading(e.target.checked)}
        checked={isLoading}
      />
      <EuiSpacer />
      <EuiSelectable options={[]} style={{ width: 200 }} isLoading={isLoading}>
        {list => (useCustomMessage && !isLoading ? customMessage : list)}
      </EuiSelectable>
    </Fragment>
  );
};
