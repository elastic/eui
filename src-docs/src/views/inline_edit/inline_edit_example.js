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

import InlineEditConfirm from './inline_edit_confirm';
const inlineEditConfirmSource = require('!!raw-loader!././inline_edit_confirm');

import InlineEditStates from './inline_edit_states';
const inlineEditStatesSource = require('!!raw-loader!././inline_edit_states');

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
      title: 'Retrieving edited text',
      text: (
        <>
          <p>
            Use the <EuiCode>onSave</EuiCode> property to retrieve the value of
            the edited text when the save button is pressed, and the{' '}
            <EuiCode>onConfirm</EuiCode> callback (if passed) returns{' '}
            <EuiCode>true</EuiCode> .{' '}
          </p>
        </>
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
      title: 'Loading and invalid states',
      text: (
        <>
          <p>
            Setting the <EuiCode>isLoading</EuiCode> prop to true will add a
            spinner to the input element in <EuiCode>editMode</EuiCode> and add
            the loading state to the confirm and cancel input buttons.
          </p>
          <p>
            Setting the <EuiCode>isInvalid</EuiCode> prop to true will display{' '}
            <strong>EuiInlineEdit</strong>&apos;s error state. Optionally, use{' '}
            <EuiCode>editModeProps.formRowProps.error</EuiCode> to pass an error
            message that will be displayed on the form control.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditStatesSource,
        },
      ],
      demo: <InlineEditStates />,
    },
    {
      title: 'Confirm inline edit',
      text: (
        <>
          <p>
            Use the <EuiCode>onConfirm</EuiCode> property to pass a function
            that will prompt users to confirm their changes.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditConfirmSource,
        },
      ],
      demo: <InlineEditConfirm />,
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
