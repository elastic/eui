import React from 'react';

import { GuideSectionTypes } from '../../components';

import {
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
          type: GuideSectionTypes.JS,
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
          type: GuideSectionTypes.JS,
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
  ],
};
