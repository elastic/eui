import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiBadge,
  EuiCallOut,
  EuiCheckbox,
  EuiCheckboxGroup,
  EuiCode,
  EuiFieldNumber,
  EuiFieldPassword,
  EuiFieldSearch,
  EuiFieldText,
  EuiFilePicker,
  EuiFormFieldset,
  EuiFormLegend,
  EuiFormControlLayout,
  EuiFormControlLayoutDelimited,
  EuiLink,
  EuiRadio,
  EuiRadioGroup,
  EuiSelect,
  EuiSwitch,
  EuiTextArea,
  EuiSpacer,
} from '../../../../src/components';

import {
  FieldTextConfig,
  FieldSearchConfig,
  FieldNumberConfig,
  FieldPasswordConfig,
  TextAreaConfig,
  CheckboxConfig,
  RadioConfig,
  SwitchConfig,
} from './playground';

import FieldSearch from './field_search';
const fieldSearchSource = require('!!raw-loader!./field_search');
const fieldSearchHtml = renderToHtml(FieldSearch);
const fieldSearchSnippet = [
  `<EuiFieldSearch
  placeholder="Search this"
  value={value}
  isClearable={isClearable}
  onChange={onChange}
/>`,
];

import FieldText from './field_text';
const fieldTextSource = require('!!raw-loader!./field_text');
const fieldTextHtml = renderToHtml(FieldText);
const fieldTextSnippet = [
  `<EuiFieldText
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldNumber from './field_number';
const fieldNumberSource = require('!!raw-loader!./field_number');
const fieldNumberHtml = renderToHtml(FieldNumber);
const fieldNumberSnippet = [
  `<EuiFieldNumber
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldPassword from './field_password';
const fieldPasswordSource = require('!!raw-loader!./field_password');
const fieldPasswordHtml = renderToHtml(FieldPassword);
const fieldPasswordSnippet = [
  `<EuiFieldPassword
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
  type="dual"
/>`,
];

import TextArea from './text_area';
const textAreaSource = require('!!raw-loader!./text_area');
const textAreaHtml = renderToHtml(TextArea);
const textAreaSnippet = [
  `<EuiTextArea
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FilePicker from './file_picker';
const filePickerSource = require('!!raw-loader!./file_picker');
const filePickerHtml = renderToHtml(FilePicker);
const filePickerSnippet = [
  `<EuiFilePicker
  id={filePickerId}
  multiple
  initialPromptText="content that appears in the dropzone if no file is attached"
  onChange={onChange}
/>`,
];

import FilePickerRemove from './file_picker_remove';
const filePickerRemoveSource = require('!!raw-loader!./file_picker_remove');
const filePickerRemoveSnippet = [
  `<EuiFilePicker
  id={filePickerId}
  ref={filePickerRef}
  multiple
  initialPromptText="content that appears in the dropzone if no file is attached"
  onChange={onChange}
/>`,
];

import Select from './select';
const selectSource = require('!!raw-loader!./select');
const selectHtml = renderToHtml(Select);
const selectSnippet = [
  `<EuiSelect
  options={[
    {
      value: 'option_one',
      text: 'Option one',
    }
  ]}
  value={value}
  onChange={onChange}
/>`,
];

import Checkbox from './checkbox';
const checkboxSource = require('!!raw-loader!./checkbox');
const checkboxHtml = renderToHtml(Checkbox);
const checkboxSnippet = [
  `<EuiCheckbox
  id={checkboxId}
  label="I am a checkbox"
  checked={checked}
  onChange={onChange}
/>`,
  `<EuiCheckbox
  id={checkboxId}
  label="I am an indeterminate checkbox"
  indeterminate={indeterminate}
  onChange={onChangeIndeterminate}
/>`,
];

import CheckboxGroup from './checkbox_group';
const checkboxGroupSource = require('!!raw-loader!./checkbox_group');
const checkboxGroupHtml = renderToHtml(CheckboxGroup);

import Radio from './radio';
const radioSource = require('!!raw-loader!./radio');
const radioHtml = renderToHtml(Radio);
const radioSnippet = [
  `<EuiRadio
  label="I am a radio"
  checked={checked}
  onChange={onChange}
/>`,
];

import RadioGroup from './radio_group';
const radioGroupSource = require('!!raw-loader!./radio_group');
const radioGroupHtml = renderToHtml(RadioGroup);

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchHtml = renderToHtml(Switch);
const switchSnippet = [
  `<EuiSwitch
  label="I am a switch"
  checked={checked}
  onChange={onChange}
/>`,
];

import PrependAppend from './prepend_append';
const PrependAppendSource = require('!!raw-loader!./prepend_append');
const PrependAppendHtml = renderToHtml(PrependAppend);

import Fieldset from './fieldset';
const fieldsetSource = require('!!raw-loader!./fieldset');
const fieldsetHtml = renderToHtml(Fieldset);

import FormControlLayout from './form_control_layout';
const formControlLayoutSource = require('!!raw-loader!./form_control_layout');
const formControlLayoutHtml = renderToHtml(FormControlLayout);

import FormControlLayoutRange from './form_control_layout_range';
const formControlLayoutRangeSource = require('!!raw-loader!./form_control_layout_range');
const formControlLayoutRangeHtml = renderToHtml(FormControlLayoutRange);

export const FormControlsExample = {
  title: 'Form controls',
  sections: [
    {
      title: 'Text field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldTextSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldTextHtml,
        },
      ],
      snippet: fieldTextSnippet,
      props: {
        EuiFieldText,
      },
      demo: <FieldText />,
      playground: FieldTextConfig,
    },
    {
      title: 'Search field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldSearchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldSearchHtml,
        },
      ],
      snippet: fieldSearchSnippet,
      props: {
        EuiFieldSearch,
      },
      demo: <FieldSearch />,
      playground: FieldSearchConfig,
    },
    {
      title: 'Number field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldNumberSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldNumberHtml,
        },
      ],
      snippet: fieldNumberSnippet,
      props: {
        EuiFieldNumber,
      },
      demo: <FieldNumber />,
      playground: FieldNumberConfig,
    },
    {
      title: 'Password field',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldPasswordSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldPasswordHtml,
        },
      ],
      snippet: fieldPasswordSnippet,
      props: {
        EuiFieldPassword,
      },
      demo: <FieldPassword />,
      playground: FieldPasswordConfig,
    },
    {
      title: 'Select',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectHtml,
        },
      ],
      text: (
        <p>
          This component renders a basic HTML{' '}
          <EuiCode language="html">&lt;select&gt;</EuiCode> element. If you need
          more customization for how the options and/or selected values render,
          use the{' '}
          <Link to="/forms/super-select">
            <strong>EuiSuperSelect</strong>
          </Link>
          . Another option is to use the{' '}
          <Link to="/forms/combo-box">
            <strong>EuiComboBox</strong>
          </Link>
          , which has search and multi-select capabilities, but also has
          restrictions on how items are rendered.
        </p>
      ),
      snippet: selectSnippet,
      props: {
        EuiSelect,
      },
      demo: <Select />,
    },
    {
      title: 'Textarea',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: textAreaSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: textAreaHtml,
        },
      ],
      snippet: textAreaSnippet,
      props: {
        EuiTextArea,
      },
      demo: <TextArea />,
      playground: TextAreaConfig,
    },
    {
      title: 'File Picker',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filePickerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: filePickerHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiFilePicker</strong> is a stylized, but generic HTML{' '}
          <EuiCode language="html">&lt;input type=&quot;file&quot;&gt;</EuiCode>{' '}
          tag. It supports drag and drop as well as on click style selection of
          files. The example below shows how to grab the files using the{' '}
          <EuiLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/FileList"
            target="_blank">
            FileList API
          </EuiLink>
          . Like other form elements, you can wrap it in a{' '}
          <strong>EuiFormRow</strong> to apply a label.
        </p>
      ),
      components: { EuiFilePicker },
      snippet: filePickerSnippet,
      demo: <FilePicker />,
      props: { EuiFilePicker },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: filePickerRemoveSource,
        },
      ],
      text: (
        <>
          <h3>Removing files programmatically</h3>
          <p>
            The current file selection can be cleared programmatically by
            calling the <EuiCode>removeFiles</EuiCode> method, which can be
            accessed on a component instance via React <EuiCode>ref</EuiCode>:{' '}
            <EuiCode>filePickerRef.current.removeFiles()</EuiCode>.
          </p>
        </>
      ),
      snippet: filePickerRemoveSnippet,
      demo: <FilePickerRemove />,
      props: { EuiFilePicker },
    },
    {
      title: 'Checkbox',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: checkboxHtml,
        },
      ],
      snippet: checkboxSnippet,
      props: {
        EuiCheckbox,
      },
      demo: <Checkbox />,
      playground: CheckboxConfig,
    },
    {
      title: 'Checkbox group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: checkboxGroupHtml,
        },
      ],
      props: {
        EuiCheckboxGroup,
      },
      demo: <CheckboxGroup />,
      snippet: `<EuiCheckboxGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idToSelectedMap={{ id1: true }}
  onChange={onChange}
/>`,
    },
    {
      title: 'Radio',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: radioHtml,
        },
      ],
      snippet: radioSnippet,
      props: {
        EuiRadio,
      },
      demo: <Radio />,
      playground: RadioConfig,
    },
    {
      title: 'Radio group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: radioGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: radioGroupHtml,
        },
      ],
      props: {
        EuiRadioGroup,
      },
      demo: <RadioGroup />,
      snippet: `<EuiRadioGroup
  options={[
    {
      id: id1,
      label: 'Option one',
    },
  ]}
  idSelected={id1}
  onChange={onChange}
  name="radio group"
  legend={{
    children: 'A legend',
  }}
/>`,
    },
    {
      title: 'Switch',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: switchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: switchHtml,
        },
      ],
      snippet: switchSnippet,
      props: {
        EuiSwitch,
      },
      demo: <Switch />,
      playground: SwitchConfig,
    },
    {
      title: 'Fieldset and legend',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldsetSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: fieldsetHtml,
        },
      ],
      text: (
        <Fragment>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            size="s"
            title={
              <span>
                &quot;[Use a fieldset and legend] for groups of related controls
                where the individual labels for each control do not provide a
                sufficient description, and an additional group level
                description is needed.&quot;{' '}
                <EuiLink
                  external
                  href="https://www.w3.org/WAI/WCAG21/Techniques/html/H71">
                  WCAG Spec
                </EuiLink>
              </span>
            }
          />
          <EuiSpacer />
          <p>
            <strong>EuiFormFieldset</strong> simply wraps its children in a{' '}
            <EuiCode language="html">&lt;fieldset&gt;</EuiCode> with the option
            to add a <EuiCode language="html">&lt;legend&gt;</EuiCode> via the{' '}
            <EuiCode>legend</EuiCode> object prop.
          </p>
        </Fragment>
      ),
      props: {
        EuiFormFieldset,
        EuiFormLegend,
      },
      demo: <Fieldset />,
      snippet: [
        `<EuiFormFieldset legend={{ children: 'Legend' }}>
  <!-- Controls -->
</EuiFormFieldset>`,
        `<EuiFormFieldset legend={{ children: 'Hidden legend', display: 'hidden' }}>
  <!-- Controls -->
</EuiFormFieldset>`,
      ],
    },
    {
      title: 'Prepend and Append',
      text: (
        <Fragment>
          <p>
            Most form controls accept a <EuiCode>prepend</EuiCode> and{' '}
            <EuiCode>append</EuiCode> prop that allows passing a single
            node/string or an array of nodes/strings. Strings will be converted
            into form labels and connected to the input via{' '}
            <EuiCode>htmlFor</EuiCode> for accessibility.
          </p>
          <p>
            These are great for demarcating the input&apos;s metric like
            &quot;px&quot; or &quot;ms&quot;. You can also pass buttons for
            input settings or additional filters. Just be sure to use
            <EuiCode language="js">
              &lt;EuiButtonEmpty size=&quot;xs&quot; /&gt;
            </EuiCode>
            .
          </p>
        </Fragment>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PrependAppendSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: PrependAppendHtml,
        },
      ],
      demo: <PrependAppend />,
      snippet: [
        `<EuiFieldText
  prepend="Label"
  append="px"
/>`,
        `<EuiFieldText
  prepend={prepend}
  append={append}
/>`,
      ],
    },
    {
      title: 'Form control layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formControlLayoutSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formControlLayoutHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <EuiBadge color={'warning'}>Building block only</EuiBadge>
          </p>

          <p>
            <strong>EuiFormControlLayout</strong> is generally used internally
            to consistently style form controls, but it&rsquo;s published in
            case you want to create your own form control which matches those of
            EUI. The examples below demonstrate its various states.
          </p>

          <EuiCallOut title="Additional padding required" color="warning">
            <p>
              The padding on the <EuiCode>input</EuiCode> itself doesn&rsquo;t
              take into account the presence of the various icons supported by{' '}
              <strong>EuiFormControlLayout</strong>. Any input component
              provided to <strong>EuiFormControlLayout</strong> is responsible
              for its own padding.
            </p>
          </EuiCallOut>
        </Fragment>
      ),
      props: {
        EuiFormControlLayout,
      },
      demo: <FormControlLayout />,
    },
    {
      title: 'Form control layout delimited',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: formControlLayoutRangeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: formControlLayoutRangeHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <EuiBadge color={'warning'}>Building block only</EuiBadge>
          </p>

          <p>
            Like <strong>EuiFormControlLayout</strong>,{' '}
            <strong>EuiFormControlLayoutDelimited</strong> is generally used
            internally to consistently style form controls. This component
            specifically lays out two form controls with center text or icon.
          </p>
          <p>
            It takes all of the same props as{' '}
            <strong>EuiFormControlLayout</strong> except for{' '}
            <EuiCode>children</EuiCode>. Instead it requires both a{' '}
            <strong>single</strong> <EuiCode>startControl</EuiCode> and a{' '}
            <strong>single</strong> <EuiCode>endControl</EuiCode>. You can
            optionally change the center content to a different string or node
            (like an EuiIcon).
          </p>
        </Fragment>
      ),
      props: {
        EuiFormControlLayoutDelimited,
      },
      demo: <FormControlLayoutRange />,
    },
  ],
};
