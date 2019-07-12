import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiHorizontalRule } from '../../../../src/components';

import HorizontalRule from './horizontal_rule';
const horizontalRuleSource = require('!!raw-loader!./horizontal_rule');
const horizontalRuleHtml = renderToHtml(HorizontalRule);

import HorizontalRuleMargin from './horizontal_rule_margin';
const horizontalRuleMarginSource = require('!!raw-loader!./horizontal_rule_margin');
const horizontalRuleMarginHtml = renderToHtml(HorizontalRuleMargin);

const horizontalRuleSnippet = '<EuiHorizontalRule size="quarter" />';
const horizontalRuleMarginSnippet = '<EuiHorizontalRule margin="xs" />';

export const HorizontalRuleExample = {
  title: 'Horizontal Rule',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: horizontalRuleHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>HorizontalRule</EuiCode> can carry a size. By default it will
          be full.
        </p>
      ),
      props: { EuiHorizontalRule },
      snippet: horizontalRuleSnippet,
      demo: <HorizontalRule />,
    },
    {
      title: 'Margins',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleMarginSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: horizontalRuleMarginHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>HorizontalRule</EuiCode> margins can also be defined.
          Don&rsquo;t forget that margins will collapse against items that
          proceed / follow.
        </p>
      ),
      snippet: horizontalRuleMarginSnippet,
      demo: <HorizontalRuleMargin />,
    },
  ],
};
