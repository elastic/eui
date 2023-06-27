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
        placeholder="Hello!"
      />

      <EuiSpacer />

      <EuiInlineEditTitle
        heading="h3"
        inputAriaLabel="Edit title inline"
        defaultValue=""
        placeholder="hey!"
      />
    </>
  );
};
