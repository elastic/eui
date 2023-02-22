import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiText, EuiInlineEdit } from '../../../../src';

import InlineEdit from './inline_edit';
const inlineEditSource = require('!!raw-loader!./inline_edit');

import InlineEditTitle from './inline_edit_title';
const inlineEditTitleSource = require('!!raw-loader!./inline_edit_title');

export const InlineEditExample = {
  title: 'Inline edit',
  intro: (
    <>
      <EuiText>This is where the description will go</EuiText>
    </>
  ),
  sections: [
    {
      title: 'InlineEdit - Text',
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
          code: inlineEditSource,
        },
      ],
      demo: <InlineEdit />,
      props: { EuiInlineEdit },
    },
    {
      title: 'InlineEdit - Title',
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
      props: { EuiInlineEdit },
    },
  ],
};
