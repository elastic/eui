import React from 'react';

import { EuiInlineEdit, EuiSpacer } from '../../../../src';

export default () => (
  <>
    <p>EuiInlineEdit - Text</p>
    <EuiInlineEdit display="text" inputLabel="textControlInput" />

    <EuiSpacer />

    <p>EuiInlineEdit - Title</p>
    <EuiInlineEdit display="title" inputLabel="titleControlInput" />
  </>
);
