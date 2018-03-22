import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

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
  sections: [{
    text: (
      <p>
        Form elements will automatically flex to a max-width of <EuiCode>400px</EuiCode>.
        You can optionally pass the <EuiCode>fullWidth</EuiCode> prop to both individual field
        and row components to expand to their container. This should be done rarely and usually
        you will only need it for isolated controls like search bars and sliders.
      </p>
    ),
    source: [{
      type: GuideSectionTypes.JS,
      code: validationSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: validationHtml,
    }],
    props: {
      EuiForm,
      EuiSelect,
      EuiFormRow,
      EuiTextArea,
      EuiFieldText,
    },
    demo: <Validation />,
  }],
};

