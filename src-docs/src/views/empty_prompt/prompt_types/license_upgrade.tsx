import React from 'react';
import { EuiEmptyPrompt } from '../../../../../src/components';
// @ts-ignore Importing from JS file
import { examples, examplesType } from '../_examples';

const example: examplesType = examples.licenseUpgrade;

export default () => (
  <EuiEmptyPrompt
    iconType={example.iconType}
    title={example.title}
    layout="vertical"
    hasBorder
    body={example.body}
    actions={example.actions}
    footer={example.footer}
  />
);
