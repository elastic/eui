import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiEmptyPrompt } from '../../../../src/components';

import EmptyPrompt from './empty_prompt';
const emptyPromptSource = require('!!raw-loader!./empty_prompt');
const emptyPromptHtml = renderToHtml(EmptyPrompt);

import Custom from './custom';
const customSource = require('!!raw-loader!./custom');
const customHtml = renderToHtml(Custom);

import Simple from './simple';
const simpleSource = require('!!raw-loader!./simple');
const simpleHtml = renderToHtml(Simple);

export const EmptyPromptExample = {
  title: 'EmptyPrompt',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: emptyPromptSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: emptyPromptHtml,
        },
      ],
      text: (
        <p>
          Use the <EuiCode>EuiEmptyPrompt</EuiCode> as a placeholder for an
          empty table or list of content.
        </p>
      ),
      props: { EuiEmptyPrompt },
      demo: <EmptyPrompt />,
    },
    {
      title: 'Custom sizes and colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customHtml,
        },
      ],
      text: (
        <p>
          You can control sizes and colors with the <EuiCode>iconColor</EuiCode>
          , and <EuiCode>titleSize</EuiCode> props.
        </p>
      ),
      props: { EuiEmptyPrompt },
      demo: <Custom />,
    },
    {
      title: 'Less content, more actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: simpleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: simpleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>You can remove parts of the prompt to simplify it, if you wish.</p>
          <p>
            You can also provide an array of multiple actions. Be sure to list
            primary actions first and secondary actions last.
          </p>
        </Fragment>
      ),
      props: { EuiEmptyPrompt },
      demo: <Simple />,
    },
  ],
};
