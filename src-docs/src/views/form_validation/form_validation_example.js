import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiForm,
  EuiFormRow,
  EuiFieldText,
  EuiSelect,
  EuiTextArea,
} from '../../../../src/components';

import Validation from './validation';
const validationSource = require('!!raw-loader!./validation');
const validationHtml = renderToHtml(Validation);

export const FormValidationExample = {
  title: 'Form validation',
  sections: [
    {
      text: (
        <p>
          Validation is achieved by applying <EuiCode>isInvalid</EuiCode> and
          the optional <EuiCode>error<EuiCode> props onto the{' '}
          <strong>EuiForm</strong> and <strong>EuiFormRow</strong> components. 
          Errors are optional and are passed as an array in case you need to 
          list more than one. You can also hide the callout by passing{' '}
          <EuiCode language="ts">{'invalidCallout="none"'}</EuiCode>
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: validationSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: validationHtml,
        },
      ],
      props: {
        EuiForm,
        EuiSelect,
        EuiFormRow,
        EuiTextArea,
        EuiFieldText,
      },
      demo: <Validation />,
    },
  ],
};
