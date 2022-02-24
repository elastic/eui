import React from 'react';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.startAddingCases;

export default () => (
  <EuiEmptyPrompt
    iconType={example.iconType}
    title={example.title}
    body={example.body}
    actions={example.actions}
    footer={example.footer}
  />
);
