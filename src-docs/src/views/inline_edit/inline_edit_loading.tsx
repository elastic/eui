import React, { useState } from 'react';
import { EuiInlineEditText, EuiSwitch, EuiSpacer } from '../../../../src';

export default () => {
  const [toggleLoading, setToggleLoading] = useState(true);

  return (
    <>
      <EuiSwitch
        label="Toggle loading state"
        checked={toggleLoading}
        onChange={(e) => setToggleLoading(e.target.checked)}
      />

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size="m"
        isLoading={toggleLoading}
        startWithEditOpen={true}
      />
    </>
  );
};
