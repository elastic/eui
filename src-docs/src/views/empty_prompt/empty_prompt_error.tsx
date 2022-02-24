import React from 'react';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.unableToLoadDashboards;

export default () => (
  <EuiEmptyPrompt
    iconType={example.iconType}
    color="danger"
    title={example.title}
    body={example.body}
  />
);
