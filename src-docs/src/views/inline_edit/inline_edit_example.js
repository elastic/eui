import React from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiText,
  EuiInlineEditText,
  EuiInlineEditTitle,
} from '../../../../src';

import InlineEditText from './inline_edit_text';
const inlineEditTextSource = require('!!raw-loader!./inline_edit_text');

import InlineEditTitle from './inline_edit_title';
const inlineEditTitleSource = require('!!raw-loader!./inline_edit_title');

import InlineEditModeProps from './inline_edit_mode_props';
const inlineEditModePropsSource = require('!!raw-loader!./inline_edit_mode_props');

import InlineEditSave from './inline_edit_save';
const inlineEditSaveSource = require('!!raw-loader!././inline_edit_save');

import InlineEditValidation from './inline_edit_validation';
const inlineEditValidationSource = require('!!raw-loader!././inline_edit_validation');

export const InlineEditExample = {
  title: 'Inline edit',
  intro: (
    <>
      <EuiText>
        The <strong>EuiInlineEdit</strong> components are useful for updating
        single-line text outside of a form. The component has two states:{' '}
        <EuiCode>readMode</EuiCode> shows editable text inside of a button and{' '}
        <EuiCode>editMode</EuiCode> displays a form control to update the text.
      </EuiText>
    </>
  ),
  isNew: true,
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
            To validate text when the user presses the save button but before
            the user is returned to read mode, return a boolean (or an async
            promise returning a boolean) from your <EuiCode>onSave</EuiCode>{' '}
            callback.
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
      title: 'Customizing read and edit modes',
      text: (
        <>
          <p>
            Customize the <EuiCode>readMode</EuiCode> state by passing{' '}
            <EuiCode>readModeProps</EuiCode>. <EuiCode>readMode</EuiCode>{' '}
            accepts{' '}
            <Link to="/navigation/button#empty-button">
              <strong>EuiButtonEmpty</strong>
            </Link>{' '}
            properties with the exception of <EuiCode>onClick</EuiCode>.
          </p>

          <p>
            Customize the <EuiCode>editMode</EuiCode> state by passing{' '}
            <EuiCode>editModeProps</EuiCode>. These properties are applied
            directly to the{' '}
            <Link to="/forms/form-layouts#form-and-form-rows">
              <strong>EuiFormRow</strong>
            </Link>{' '}
            and{' '}
            <Link to="/forms/form-controls#text-field">
              <strong>EuiFieldText</strong>
            </Link>{' '}
            components.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditModePropsSource,
        },
      ],
      demo: <InlineEditModeProps />,
    },
  ],
};
