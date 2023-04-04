import React, { useState } from 'react';
import { EuiInlineEditText, EuiSwitch, EuiSpacer } from '../../../../src';

export default () => {
  const [toggleValid, setToggleValid] = useState(true);

  const errorMessage = "Here's an example of an error";

  return (
    <>
      <EuiSwitch
        label="Toggle validation state"
        checked={toggleValid}
        onChange={(e) => setToggleValid(e.target.checked)}
      />

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size="m"
        isInvalid={toggleValid}
        editModeProps={{ error: errorMessage }}
        startWithEditOpen={true}
      />
    </>
  );
};
