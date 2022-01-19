import React from 'react';

import { EuiEmptyPrompt } from '../../../../../src/components';
// @ts-ignore Importing from JS file
import { typesOfUseCases } from '../_types_of_use_cases';

const example: any = typesOfUseCases.noPrivileges.example;

export default () => (
  <EuiEmptyPrompt
    iconType={example.iconType}
    color="subdued"
    title={example.title}
    body={example.body}
  />
);
