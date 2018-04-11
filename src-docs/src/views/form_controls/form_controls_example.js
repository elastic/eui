import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCheckbox,
  EuiCheckboxGroup,
  EuiCode,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiFilePicker,
  EuiLink,
  EuiRadio,
  EuiRange,
  EuiSelect,
  EuiSwitch,
  EuiTextArea,
} from '../../../../src/components';

import FieldSearch from './field_search';
const fieldSearchSource = require('!!raw-loader!./field_search');
const fieldSearchHtml = renderToHtml(FieldSearch);

import FieldText from './field_text';
const fieldTextSource = require('!!raw-loader!./field_text');
const fieldTextHtml = renderToHtml(FieldText);

import FieldNumber from './field_number';
const fieldNumberSource = require('!!raw-loader!./field_number');
const fieldNumberHtml = renderToHtml(FieldNumber);

import FieldPassword from './field_password';
const fieldPasswordSource = require('!!raw-loader!./field_password');
const fieldPasswordHtml = renderToHtml(FieldPassword);

import TextArea from './text_area';
const textAreaSource = require('!!raw-loader!./text_area');
const textAreaHtml = renderToHtml(TextArea);

import { FilePicker } from './file_picker';
const filePickerSource = require('!!raw-loader!./file_picker');
const filePickerHtml = renderToHtml(FilePicker);

import Select from './select';
const selectSource = require('!!raw-loader!./select');
const selectHtml = renderToHtml(Select);

import Checkbox from './checkbox';
const checkboxSource = require('!!raw-loader!./checkbox');
const checkboxHtml = renderToHtml(Checkbox);

import CheckboxGroup from './checkbox_group';
const checkboxGroupSource = require('!!raw-loader!./checkbox_group');
const checkboxGroupHtml = renderToHtml(CheckboxGroup);

import Radio from './radio';
const radioSource = require('!!raw-loader!./radio');
const radioHtml = renderToHtml(Radio);

import RadioGroup from './radio_group';
const radioGroupSource = require('!!raw-loader!./radio_group');
const radioGroupHtml = renderToHtml(RadioGroup);

import Range from './range';
const rangeSource = require('!!raw-loader!./range');
const rangeHtml = renderToHtml(Range);

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchHtml = renderToHtml(Switch);

export const FormControlsExample = {
  title: 'Form controls',
  sections: [{
    title: 'Search field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldSearchSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldSearchHtml,
    }],
    props: {
      EuiFieldSearch,
    },
    demo: <FieldSearch />,
  }, {
    title: 'Text field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldTextSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldTextHtml,
    }],
    props: {
      EuiFieldText,
    },
    demo: <FieldText />,
  }, {
    title: 'Number field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldNumberSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldNumberHtml,
    }],
    props: {
      EuiFieldText,
    },
    demo: <FieldNumber />,
  }, {
    title: 'Password field',
    source: [{
      type: GuideSectionTypes.JS,
      code: fieldPasswordSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: fieldPasswordHtml,
    }],
    props: {
      EuiFieldPassword,
    },
    demo: <FieldPassword />,
  }, {
    title: 'Textarea',
    source: [{
      type: GuideSectionTypes.JS,
      code: textAreaSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: textAreaHtml,
    }],
    props: {
      EuiTextArea,
    },
    demo: <TextArea />,
  }, {
    title: 'File Picker',
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
  }, {
    title: 'Select',
    source: [{
      type: GuideSectionTypes.JS,
      code: selectSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: selectHtml,
    }],
    props: {
      EuiSelect,
    },
    demo: <Select />,
  }, {
    title: 'Checkbox',
    source: [{
      type: GuideSectionTypes.JS,
      code: checkboxSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: checkboxHtml,
    }],
    props: {
      EuiCheckbox,
    },
    demo: <Checkbox />,
  }, {
    title: 'Checkbox group',
    source: [{
      type: GuideSectionTypes.JS,
      code: checkboxGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: checkboxGroupHtml,
    }],
    props: {
      EuiCheckboxGroup,
    },
    demo: <CheckboxGroup />,
  }, {
    title: 'Radio',
    source: [{
      type: GuideSectionTypes.JS,
      code: radioSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: radioHtml,
    }],
    props: {
      EuiRadio,
    },
    demo: <Radio />,
  }, {
    title: 'Radio group',
    source: [{
      type: GuideSectionTypes.JS,
      code: radioGroupSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: radioGroupHtml,
    }],
    props: {
      EuiRadio,
    },
    demo: <RadioGroup />,
  }, {
    title: 'Range',
    source: [{
      type: GuideSectionTypes.JS,
      code: rangeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: rangeHtml,
    }],
    props: {
      EuiRange,
    },
    demo: <Range />,
  }, {
    title: 'Switch',
    source: [{
      type: GuideSectionTypes.JS,
      code: switchSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: switchHtml,
    }],
    props: {
      EuiSwitch,
    },
    demo: <Switch />,
  }],
};

