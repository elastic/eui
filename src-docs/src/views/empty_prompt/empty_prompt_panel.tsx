import React, { FunctionComponent } from 'react';
import {
  EuiEmptyPrompt,
  EuiEmptyPromptProps,
} from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.startAddingCases;

export const Panel: FunctionComponent<{
  color: EuiEmptyPromptProps['color'];
}> = ({ color }) => {
  return (
    <EuiEmptyPrompt
      iconType={example.iconTypeApp}
      title={example.title}
      color={color}
      body={example.body}
      actions={example.actions}
      footer={example.footer}
    />
  );
};
