import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

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
  EuiText,
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
const fieldTextSnippet = [
  `<EuiFieldText
  label="Text field"
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldNumber from './field_number';
const fieldNumberSource = require('!!raw-loader!./field_number');
const fieldNumberSnippet = [
  `<EuiFieldNumber
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FieldPassword from './field_password';
const fieldPasswordSource = require('!!raw-loader!./field_password');
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
const textAreaSnippet = [
  `<EuiTextArea
  placeholder="Placeholder text"
  value={value}
  onChange={onChange}
/>`,
];

import FilePicker from './file_picker';
const filePickerSource = require('!!raw-loader!./file_picker');
const filePickerSnippet = [
  `<EuiFilePicker
  id={filePickerId}
  multiple
  initialPromptText="content that appears in the dropzone if no file is attached"
  onChange={onChange}
/>`,
];

import Select from './select';
const selectSource = require('!!raw-loader!./select');
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

import Radio from './radio';
const radioSource = require('!!raw-loader!./radio');
const radioSnippet = [
  `<EuiRadio
  label="I am a radio"
  checked={checked}
  onChange={onChange}
/>`,
];

import RadioGroup from './radio_group';
const radioGroupSource = require('!!raw-loader!./radio_group');

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchSnippet = [
  `<EuiSwitch
  label="I am a switch"
  checked={checked}
  onChange={onChange}
/>`,
];

import PrependAppend from './prepend_append';
const PrependAppendSource = require('!!raw-loader!./prepend_append');

import Fieldset from './fieldset';
const fieldsetSource = require('!!raw-loader!./fieldset');

import FormControlLayout from './form_control_layout';
const formControlLayoutSource = require('!!raw-loader!./form_control_layout');

import FormControlLayoutRange from './form_control_layout_range';
const formControlLayoutRangeSource = require('!!raw-loader!./form_control_layout_range');

export const FormControlsExample = {
  title: 'Form controls',
  sections: [
    {
      title: 'Text field',
      text: (
        <>
          <p>
            A simple wrapper around{' '}
            <EuiCode language="html">{'<input type="text" >'}</EuiCode>.
          </p>
          <EuiCallOut>
            <EuiText size="m">
              <p>
                <strong>EuiTextField</strong> is <strong>currently</strong> the
                only field component to accept{' '}
                <Link to="/forms/form-layouts#form-and-form-rows">
                  <strong>EuiFormRow</strong>
                </Link>{' '}
                props directly. For instance, when providing the{' '}
                <EuiCode>label</EuiCode> prop, it will automically wrap itself
                in a <strong>EuiFormRow</strong>. Other promoted props include{' '}
                <EuiCode>helpText</EuiCode>, <EuiCode>error</EuiCode> , and{' '}
                <EuiCode>display</EuiCode>. Providing form row props at this
                level also decreases the need for duplicate props like{' '}
                <EuiCode>isInvalid</EuiCode> and <EuiCode>fullWidth</EuiCode>.
              </p>
            </EuiText>
          </EuiCallOut>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: fieldTextSource,
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
      title: 'Checkbox',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: checkboxSource,
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
