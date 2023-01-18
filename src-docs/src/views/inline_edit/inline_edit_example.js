import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiText, EuiInlineEdit } from '../../../../src';

import InlineEdit from './inline_edit';
const inlineEditSource = require('!!raw-loader!./inline_edit');

export const InlineEditExample = {
  title: 'Inline edit',
  intro: (
    <>
      <EuiText>
        Hello! This is where the EuiInlineEdit documentation intro will go!
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'InlineEdit',
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
  ],
};
