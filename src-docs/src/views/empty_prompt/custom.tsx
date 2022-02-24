import React from 'react';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.startAddingCases;

export default () => (
  <EuiEmptyPrompt
    iconType={example.iconTypeApp}
    iconColor="default"
    title={example.title}
    titleSize="xs"
    body={example.body}
    actions={example.actions}
  />
);
