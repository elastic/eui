import React from 'react';
import { EuiEmptyPrompt } from '../../../../../src/components';
import { typesOfUseCases } from '../_types_of_use_cases';

const example: any = typesOfUseCases.licenseUpgrade.example;

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
