import React from 'react';

import { EuiInlineEdit, EuiSpacer } from '../../../../src';

export default () => (
  <>
    <p>EuiInlineEdit - Text</p>
    <EuiInlineEdit
      display="text"
      inputAriaLabel="textControlInput"
      defaultValue="Hello World!"
    />

    <EuiSpacer />

    <p>EuiInlineEdit - Title</p>
    <EuiInlineEdit
      display="title"
      inputAriaLabel="textControlInput"
      defaultValue="Hello World (but as a title)!"
    />
  </>
);
