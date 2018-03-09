import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiFilePicker,
  EuiLink,
} from '../../../../src/components';

import { FilePicker } from './file_picker';
const filePickerSource = require('!!raw-loader!./file_picker');
const filePickerHtml = renderToHtml(FilePicker);

export const FilePickerExample = {
  title: 'File Picker',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: filePickerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: filePickerHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiFilePicker</EuiCode> is a stylized, but generic
        HTML <EuiCode>&lt;input type=&quot;file&quot;&gt;</EuiCode> tag.
        It supports drag and drop as well as on click style selection of files.
        The example below shows how to grab the files using
        the <EuiLink href="https://developer.mozilla.org/en-US/docs/Web/API/FileList" target="_blank">FileList API</EuiLink>.
        Like other form elements, you can wrap it in a <EuiCode>EuiFormRow</EuiCode> to apply
        a label.
      </p>
    ),
    components: { EuiFilePicker },
    demo: <FilePicker />,
    props: { EuiFilePicker }
  }],
};
