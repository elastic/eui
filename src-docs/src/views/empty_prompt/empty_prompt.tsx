import React from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import { EuiEmptyPrompt } from '../../../../src/components';
import { examples, examplesType } from './_examples';

const example: examplesType = examples.startAddingCases;

const EmptyPrompt = () => (
  <EuiEmptyPrompt
    iconType={example.iconType}
    title={example.title}
    body={example.body}
    actions={example.actions}
    footer={example.footer}
  />
);

export default EmptyPrompt;

// exporting as a JSX string for the DEMO JS
export const emptyPromptJSXString = `
import React from 'react';
import { EuiEmptyPrompt, EuiButton, EuiTitle, EuiLink } from '@elastic/eui';

export default () => (
  ${reactElementToJSXString(
    <EuiEmptyPrompt
      iconType={example.iconType}
      title={example.title}
      body={example.body}
      actions={example.actions}
      footer={example.footer}
    />
  )}
);
`;
