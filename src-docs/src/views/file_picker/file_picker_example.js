import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiFilePicker,
} from '../../../../src/components';

import FilePicker from './file_picker';
const filePickerSource = require('!!raw-loader!./file_picker');
const filePickerHtml = renderToHtml(FilePicker);

export const FilePickerExample = {
  title: 'FilePicker',
  sections: [{
    title: 'FilePicker',
    source: [{
      type: GuideSectionTypes.JS,
      code: filePickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filePickerHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiFilePicker</EuiCode> component.
      </p>
    ),
    components: { EuiFilePicker },
    demo: <FilePicker />,
  }],
};
