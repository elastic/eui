import React, { Fragment } from 'react';

import { Link } from 'react-router';

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

import Switch from './switch';
const switchSource = require('!!raw-loader!./switch');
const switchHtml = renderToHtml(Switch);

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
      props: {
        EuiFieldText,
      },
      demo: <FieldText />,
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
      props: {
        EuiFieldSearch,
      },
      demo: <FieldSearch />,
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
      props: {
        EuiFieldNumber,
      },
      demo: <FieldNumber />,
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
      props: {
        EuiFieldPassword,
      },
      demo: <FieldPassword />,
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
          This component renders a basic HTML <code>&lt;select&gt;</code>{' '}
          element. If you need more customization for how the options and/or
          selected values render, use the{' '}
          <Link to="/forms/superselect">EuiSuperSelect</Link>. Another option is
          to use the <Link to="/forms/combo-box">EuiComboBox</Link>, which has
          search and multi-select capabilities, but also has restrictions on how
          items are rendered.
        </p>
      ),
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
      props: {
        EuiTextArea,
      },
      demo: <TextArea />,
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
          <EuiCode>EuiFilePicker</EuiCode> is a stylized, but generic HTML{' '}
          <EuiCode>&lt;input type=&quot;file&quot;&gt;</EuiCode> tag. It
          supports drag and drop as well as on click style selection of files.
          The example below shows how to grab the files using the{' '}
          <EuiLink
            href="https://developer.mozilla.org/en-US/docs/Web/API/FileList"
            target="_blank">
            FileList API
          </EuiLink>
          . Like other form elements, you can wrap it in a{' '}
          <EuiCode>EuiFormRow</EuiCode> to apply a label.
        </p>
      ),
      components: { EuiFilePicker },
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
        {
          type: GuideSectionTypes.HTML,
          code: checkboxHtml,
        },
      ],
      props: {
        EuiCheckbox,
      },
      demo: <Checkbox />,
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
    {
      id: id2,
      label: 'Option two',
    }
  ]}
  idToSelectedMap={{ id1: true }}
  onChange={(id) => {}}
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
      props: {
        EuiRadio,
      },
      demo: <Radio />,
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
    {
      id: id2,
      label: 'Option two',
    }
  ]}
  idSelected={id1}
  onChange={(id) => {}}
  name={groupName}
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
      props: {
        EuiSwitch,
      },
      demo: <Switch />,
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
            <EuiCode>EuiFormFieldset</EuiCode> simply wraps its children in a{' '}
            <EuiCode>&lt;fieldset&gt;</EuiCode> with the option to add a{' '}
            <EuiCode>&lt;legend&gt;</EuiCode> via the <EuiCode>legend</EuiCode>{' '}
            object prop.
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
  /* Controls */
</EuiFormFieldset>`,
        `<EuiFormFieldset legend={{ children: 'Hidden legend', display: 'hidden' }}>
  /* Controls */
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
            <EuiCode>&lt;EuiButtonEmpty size=&quot;xs&quot; /&gt;</EuiCode>.
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
  prepend={
    <EuiPopover
      button={
        <EuiButtonEmpty size="xs" iconType="arrowDown" iconSide="right">
          Popover
        </EuiButtonEmpty>
      }
      closePopover={() => {}}
    />
  }
  append={[
    <EuiButtonIcon iconType="gear" />,
    "Label",
  ]}
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
            <EuiCode>EuiFormControlLayout</EuiCode> is generally used internally
            to consistently style form controls, but it&rsquo;s published in
            case you want to create your own form control which matches those of
            EUI. The examples below demonstrate its various states.
          </p>

          <EuiCallOut title="Additional padding required" color="warning">
            <p>
              The padding on the <EuiCode>input</EuiCode> itself doesn&rsquo;t
              take into account the presence of the various icons supported by{' '}
              <EuiCode>EuiFormControlLayout</EuiCode>. Any input component
              provided to <EuiCode>EuiFormControlLayout</EuiCode> is responsible
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
            Like <EuiCode>EuiFormControlLayout</EuiCode>,{' '}
            <EuiCode>EuiFormControlLayoutDelimited</EuiCode> is generally used
            internally to consistently style form controls. This component
            specifically lays out two form controls with center text or icon.
          </p>
          <p>
            It takes all of the same props as{' '}
            <EuiCode>EuiFormControlLayout</EuiCode> except for{' '}
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
