import React from 'react';

import { EuiEmptyPrompt } from '../../../../../src/components';
// @ts-ignore Importing from JS file
import { examples, examplesType } from '../_examples';

const example: examplesType = examples.noPrivileges;

export default () => (
  <EuiEmptyPrompt
    iconType={example.iconType}
    color="subdued"
    title={example.title}
    body={example.body}
  />
);
