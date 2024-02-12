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
        defaultValue="This text starts in edit mode"
        startWithEditOpen={true}
      />

      <EuiSpacer />

      <EuiInlineEditTitle
        heading="h3"
        inputAriaLabel="Edit title inline"
        defaultValue="This title starts in edit mode"
        startWithEditOpen={true}
      />
    </>
  );
};
