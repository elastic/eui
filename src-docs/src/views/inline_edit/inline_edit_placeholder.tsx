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
        defaultValue="This is placeholder text"
        displayDefaultValueAsPlaceholder={true}
      />

      <EuiSpacer />

      <EuiInlineEditTitle
        heading="h3"
        inputAriaLabel="Edit title inline"
        defaultValue="This is a placeholder title"
        displayDefaultValueAsPlaceholder={true}
      />
    </>
  );
};
