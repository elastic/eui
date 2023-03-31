import React, { useState } from 'react';
import { EuiInlineEditText, EuiSwitch, EuiSpacer } from '../../../../src';

export default () => {
  const [toggleLoading, setToggleLoading] = useState(true);

  const onChange = (e: any) => {
    setToggleLoading(e.target.checked);
  };

  return (
    <>
      <EuiSwitch
        label="Toggle loading state"
        checked={toggleLoading}
        onChange={(e) => onChange(e)}
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
