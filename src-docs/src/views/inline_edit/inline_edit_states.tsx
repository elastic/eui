import React, { useState } from 'react';
import {
  EuiFlexGroup,
  EuiInlineEditText,
  EuiSwitch,
  EuiSpacer,
} from '../../../../src';

export default () => {
  const [toggleLoading, setToggleLoading] = useState(true);

  const [toggleValid, setToggleValid] = useState(false);

  const errorMessage = ["Here's an example of an error"];

  return (
    <>
      <EuiFlexGroup>
        <EuiSwitch
          label="Toggle loading state"
          checked={toggleLoading}
          onChange={(e) => setToggleLoading(e.target.checked)}
        />

        <EuiSwitch
          label="Toggle validation state"
          checked={toggleValid}
          onChange={(e) => setToggleValid(e.target.checked)}
        />
      </EuiFlexGroup>

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="Hello World!"
        size="m"
        isLoading={toggleLoading}
        isInvalid={toggleValid}
        editModeProps={{ formRowProps: { error: errorMessage } }}
        startWithEditOpen={true}
      />
    </>
  );
};
