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
        inputAriaLabel="Edit text inline"
        defaultValue=""
        placeholder="This is placeholder text!"
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
