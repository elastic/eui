import React, { useState } from 'react';

import {
  EuiInlineEditText,
  EuiInlineEditTitle,
  EuiSpacer,
  EuiSwitch,
} from '../../../../src';

export default () => {
  const [isReadOnly, setIsReadOnly] = useState(true);

  return (
    <>
      <EuiSwitch
        label="Toggle read only"
        checked={isReadOnly}
        onChange={(e) => setIsReadOnly(e.target.checked)}
      />

      <EuiSpacer />

      <EuiInlineEditText
        inputAriaLabel="Edit text inline"
        defaultValue="This is read only text!"
        isReadOnly={isReadOnly}
      />

      <EuiSpacer />

      <EuiInlineEditTitle
        heading="h3"
        inputAriaLabel="Edit title inline"
        defaultValue="This is a read only title!"
        isReadOnly={isReadOnly}
      />
    </>
  );
};
