import React from 'react';

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

import InlineEditConfirm from './inline_edit_confirm';
const inlineEditConfirmSource = require('!!raw-loader!././inline_edit_confirm');

import InlineEditLoading from './inline_edit_loading';
const inlineEditLoadingSource = require('!!raw-loader!././inline_edit_loading');

import InlineEditValidation from './inline_edit_validation';
const inlineEditValidationSource = require('!!raw-loader!././inline_edit_validation');

export const InlineEditExample = {
  title: 'Inline edit',
  intro: (
    <>
      <EuiText>This is where the description will go</EuiText>
    </>
  ),
  sections: [
    {
      title: 'InlineEditText',
      text: (
        <>
          <p>
            Description needed: how to use the <strong>EuiInlineEdit</strong>{' '}
            component.
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
      title: 'InlineEditTitle',
      text: (
        <>
          <p>
            Description needed: how to use the <strong>EuiInlineEdit</strong>{' '}
            component.
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
      title: 'Confirm inline edit',
      text: (
        <>
          <p>
            Description needed: how to use the <strong>EuiInlineEdit</strong>{' '}
            component.
          </p>
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.JS,
          code: inlineEditConfirmSource,
        },
      ],
      demo: <InlineEditConfirm />,
      props: { EuiInlineEditText },
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
        </>
      ),
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: inlineEditLoadingSource,
        },
      ],
      demo: <InlineEditLoading />,
    },
    {
      text: (
        <>
          <p>
            Setting the <EuiCode>isInvalid</EuiCode> prop to true will display{' '}
            <strong>EuiInlineEdit</strong>&apos;s error state. Optionally, use
            <EuiCode>editModeProps</EuiCode> to pass an error message that will
            be displayed on the form control.
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
  ],
};
