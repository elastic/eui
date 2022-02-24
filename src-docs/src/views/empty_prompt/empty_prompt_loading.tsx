import React from 'react';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.loading;

export default () => (
  <EuiEmptyPrompt icon={example.iconLoading} title={example.title} />
);
