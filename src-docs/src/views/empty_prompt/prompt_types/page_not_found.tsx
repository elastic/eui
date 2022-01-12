import React from 'react';
import { EuiEmptyPrompt } from '../../../../../src/components';
// @ts-ignore Importing from JS file
import { typesOfUseCases } from '../_types_of_use_cases';

const example: any = typesOfUseCases.errorPages.example;

export default () => (
  <EuiEmptyPrompt
    icon={example.icon}
    title={example.title}
    layout="vertical"
    body={example.body}
    actions={example.actions}
  />
);
