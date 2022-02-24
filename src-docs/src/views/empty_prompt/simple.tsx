import React from 'react';

import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.licenseUpgrade;

export default () => (
  <EuiEmptyPrompt title={example.title} actions={example.actions} />
);
