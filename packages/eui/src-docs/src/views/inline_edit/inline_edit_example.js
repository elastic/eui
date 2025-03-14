import React from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiInlineEditText,
  EuiInlineEditTitle,
} from '../../../../src';

import { inlineEditTextConfig, inlineEditTitleConfig } from './playground';

import InlineEditText from './inline_edit_text';
const inlineEditTextSource = require('!!raw-loader!./inline_edit_text');
const inlineEditTextSnippet = `<EuiInlineEditText
  inputAriaLabel="Edit text inline"
  defaultValue="Hello World!"
  size="m"
/>`;

import InlineEditTitle from './inline_edit_title';
const inlineEditTitleSource = require('!!raw-loader!./inline_edit_title');
const inlineEditTitleSnippet = `<EuiInlineEditTitle
  inputAriaLabel="Edit title inline"
  defaultValue="Hello World (but as a title)!"
  heading="h3"
  size="m"
/>`;

import InlineEditControlled from './inline_edit_controlled';
const inlineEditControlledSource = require('!!raw-loader!./inline_edit_controlled');
const inlineEditControlledSnippet = `<EuiInlineEditText
  inputAriaLabel="Edit title inline"
  value={inlineEditValue}
  onChange={inlineEditOnChange}
  onCancel={(previousValue) => {
  setInlineEditValue(previousValue);
  }}
/>`;

import InlineEditPlaceholder from './inline_edit_placeholder';
const inlineEditPlaceholderSource = require('!!raw-loader!./inline_edit_placeholder');
const inlineEditPlaceholderSnippet = `<EuiInlineEditText
  inputAriaLabel="Edit text inline"
  defaultValue=""
  placeholder="This is placeholder text!"
/>`;

import InlineEditSave from './inline_edit_save';
const inlineEditSaveSource = require('!!raw-loader!././inline_edit_save');
const inlineEditModeSaveSnippet = `<EuiInlineEditText
  inputAriaLabel="Edit text inline"
  defaultValue={defaultInlineEditValue}
  onSave={(newInlineEditValue: string) => {
    localStorage.setItem('inlineEditValue', newInlineEditValue);
  }}
/>`;

import InlineEditValidation from './inline_edit_validation';
const inlineEditValidationSource = require('!!raw-loader!././inline_edit_validation');

import InlineEditStartInEdit from './inline_edit_start_in_edit';
const inlineEditStartInEditSource = require('!!raw-loader!././inline_edit_start_in_edit');
const inlineEditStartInEditSnippet = `<EuiInlineEditText
  inputAriaLabel="Edit text inline"
  defaultValue="This text starts in edit mode"
  startsInEditOpen={true}
/>`;

import InlineEditReadOnly from './inline_edit_read_only';
const InlineEditReadOnlySource = require('!!raw-loader!././inline_edit_read_only');
const inlineEditReadOnlySnippet = `<EuiInlineEditText
  inputAriaLabel="Edit text inline"
  defaultValue="This is read only text!"
  isReadOnly={isReadOnly}
/>`;

import InlineEditModeProps from './inline_edit_mode_props';
const inlineEditModePropsSource = require('!!raw-loader!./inline_edit_mode_props');
const inlineEditModePropsSnippet = `<EuiInlineEditText
  inputAriaLabel="Edit text inline for readMode and editMode props"
  defaultValue="This inline edit component has been customized!"
  size="m"
  readModeProps={{
    color: 'primary',
    iconSide: 'left',
  }}
  editModeProps={{
    inputProps: {
      prepend: 'Prepend example',
    },
    formRowProps: {
      helpText: 'Example help text',
    },
    saveButtonProps: {
      color: 'primary',
    },
    cancelButtonProps: {
      display: 'empty',
    },
  }}
/>`;

export const InlineEditExample = {
  title: 'Inline edit',
  intro: (
    <>
      <EuiText>
        The <strong>EuiInlineEdit</strong> components are useful for updating
        single lines of text outside a form. The component has two states:{' '}
        <EuiCode>readMode</EuiCode> shows editable text inside of a button and{' '}
        <EuiCode>editMode</EuiCode> displays a form control to update the text.
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'Display and edit basic text',
      text: (
        <>
          <p>
            Use <strong>EuiInlineEditText</strong> to display and edit basic
            text. Adjust the <EuiCode>size</EuiCode> property to change the font
            size in both <EuiCode>readMode</EuiCode> and{' '}
            <EuiCode>editMode</EuiCode>.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditTextSource,
        },
      ],
      demo: <InlineEditText />,
      props: { EuiInlineEditText },
      snippet: inlineEditTextSnippet,
      playground: inlineEditTextConfig,
    },
    {
      title: 'Display and edit headings and titles',
      text: (
        <>
          <p>
            Use <strong>EuiInlineEditTitle</strong> to display and edit titles.
            Use the <EuiCode>heading</EuiCode> property to set the heading level
            in <EuiCode>readMode</EuiCode>.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditTitleSource,
        },
      ],
      demo: <InlineEditTitle />,
      props: { EuiInlineEditTitle },
      snippet: inlineEditTitleSnippet,
      playground: inlineEditTitleConfig,
    },
    {
      title: 'Controlled values',
      text: (
        <>
          <p>
            To control the text value for inline edit, use the{' '}
            <EuiCode>value</EuiCode> prop to continually pass a text value. An
            <EuiCode>onChange</EuiCode> callback is required to receive and
            update <EuiCode>value</EuiCode> based on user input. An{' '}
            <EuiCode>onCancel</EuiCode> callback is required to reset the value
            to the previous read mode text value.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditControlledSource,
        },
      ],
      demo: <InlineEditControlled />,
      props: { EuiInlineEditText },
      snippet: inlineEditControlledSnippet,
    },
    {
      title: 'Saving edited text',
      text: (
        <p>
          Use the <EuiCode>onSave</EuiCode> property to retrieve the value of
          the edited text when the save button is pressed.{' '}
          <EuiCode>onSave</EuiCode> does not fire if the user cancels their
          edit.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditSaveSource,
        },
      ],
      demo: <InlineEditSave />,
      snippet: inlineEditModeSaveSnippet,
    },
    {
      title: 'Validating edited text',
      text: (
        <>
          <p>
            Validation states (<EuiCode>isLoading</EuiCode> and{' '}
            <EuiCode>isInvalid</EuiCode>) only display while the user is in edit
            mode.
          </p>
          <p>
            Return a boolean from your <EuiCode>onSave</EuiCode> callback to
            validate text after pressing Save. You can also return a boolean
            from a promise. Validation happens before the user returns to read
            mode.
          </p>
          <p>
            Returning <EuiCode>false</EuiCode> from <EuiCode>onSave</EuiCode>{' '}
            will keep the user in edit mode, where you can then display
            validation state and messages. Returning <EuiCode>true</EuiCode> or{' '}
            <EuiCode>undefined</EuiCode> will return the user to read mode.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditValidationSource,
        },
      ],
      demo: <InlineEditValidation />,
    },
    {
      title: 'Setting placeholder instructions',
      text: (
        <>
          <p>
            The <EuiCode>placeholder</EuiCode> property will display in both
            read and edit mode whenever the <strong>EuiInlineEdit</strong>'s
            value is empty. Use placeholder text to provide guidance or
            instructions to consumers as to what they're editing.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditPlaceholderSource,
        },
      ],
      demo: <InlineEditPlaceholder />,
      snippet: inlineEditPlaceholderSnippet,
    },
    {
      title: 'Start in edit mode',
      text: (
        <p>
          Use the <EuiCode>startWithEditOpen</EuiCode> prop to default to
          opening in edit mode.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditStartInEditSource,
        },
      ],
      demo: <InlineEditStartInEdit />,
      snippet: inlineEditStartInEditSnippet,
    },
    {
      title: 'Read only',
      text: (
        <p>
          Use the <EuiCode>isReadOnly</EuiCode> prop to lock{' '}
          <EuiCode>EuiInlineEdit</EuiCode> in read mode and display the text
          value. This does not affect the input form control in edit mode.
        </p>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: InlineEditReadOnlySource,
        },
      ],
      demo: <InlineEditReadOnly />,
      snippet: inlineEditReadOnlySnippet,
    },
    {
      title: 'Customizing read and edit modes',
      text: (
        <>
          <p>
            Customize the read mode by passing <EuiCode>readModeProps</EuiCode>,
            which accepts any{' '}
            <Link to="/navigation/button#empty-button">
              <strong>EuiButtonEmpty</strong>
            </Link>{' '}
            properties.
          </p>

          <p>
            Customize the edit mode by passing <EuiCode>editModeProps</EuiCode>.
            This prop contains nested object properties that are applied to
            various child components in edit mode:
          </p>
          <ul>
            <li>
              <EuiCode>editMode.formRowProps</EuiCode> accepts any{' '}
              <Link to="/forms/form-layouts#form-and-form-rows">
                <strong>EuiFormRow</strong>
              </Link>{' '}
              properties
            </li>
            <li>
              <EuiCode>editMode.inputProps</EuiCode> accepts any{' '}
              <Link to="/forms/form-controls#text-field">
                <strong>EuiFieldText</strong>
              </Link>{' '}
              properties
            </li>
            <li>
              <EuiCode>editMode.saveButtonProps</EuiCode> accepts any{' '}
              <Link to="/navigation/button#icon-buttons">
                <strong>EuiButtonIcon</strong>
              </Link>{' '}
              properties
            </li>
            <li>
              <EuiCode>editMode.cancelButtonProps</EuiCode> accepts any{' '}
              <Link to="/navigation/button#icon-buttons">
                <strong>EuiButtonIcon</strong>
              </Link>{' '}
              properties
            </li>
          </ul>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditModePropsSource,
        },
      ],
      demo: <InlineEditModeProps />,
      snippet: inlineEditModePropsSnippet,
    },
  ],
};
