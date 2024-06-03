import React from 'react';

import {
  EuiInlineEditText,
  EuiInlineEditTitle,
  EuiSpacer,
} from '../../../../src';

export default () => {
  return (
    <>
      <EuiInlineEditText
        inputAriaLabel="Placeholder text example"
        defaultValue=""
        placeholder="Add a description"
      />

      <EuiSpacer />

      <EuiInlineEditTitle
        heading="h3"
        inputAriaLabel="Placeholder title example"
        defaultValue=""
        placeholder="Set your username"
      />
    </>
  );
};
