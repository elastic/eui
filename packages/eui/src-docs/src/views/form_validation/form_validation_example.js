import React from 'react';

import { GuideSectionTypes } from '../../components';

import Guidelines from './guidelines';

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

export const FormValidationExample = {
  title: 'Form validation',
  guidelines: <Guidelines />,
  sections: [
    {
      text: (
        <p>
          Validation is achieved by applying <EuiCode>isInvalid</EuiCode> and
          optionally error props onto the <strong>EuiForm</strong> or{' '}
          <strong>EuiFormRow</strong> components. Errors are optional and are
          passed as an array in case you need to list more than one. You can
          also hide the callout by passing
          <EuiCode>invalidCallout=&ldquo;none&ldquo;</EuiCode>
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: validationSource,
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
