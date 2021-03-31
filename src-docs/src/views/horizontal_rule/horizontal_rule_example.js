import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiHorizontalRule, EuiCode } from '../../../../src/components';

import { horizontalRuleConfig } from './playground';

import HorizontalRule from './horizontal_rule';
const horizontalRuleSource = require('!!raw-loader!./horizontal_rule');

import HorizontalRuleMargin from './horizontal_rule_margin';
const horizontalRuleMarginSource = require('!!raw-loader!./horizontal_rule_margin');

const horizontalRuleSnippet = '<EuiHorizontalRule />';
const horizontalRuleMarginSnippet = '<EuiHorizontalRule margin="xs" />';

export const HorizontalRuleExample = {
  title: 'Horizontal rule',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleSource,
        },
      ],
      text: (
        <p>
          <strong>EuiHorizontalRule</strong> is a styled{' '}
          <EuiCode>{'<hr>'}</EuiCode> element. It can be one of three provided
          sizes (lengths), by default it will be <EuiCode>full</EuiCode>.
        </p>
      ),
      props: { EuiHorizontalRule },
      snippet: horizontalRuleSnippet,
      demo: (
        <div className="eui-textCenter">
          <HorizontalRule />
        </div>
      ),
      playground: horizontalRuleConfig,
    },
    {
      title: 'Margins',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: horizontalRuleMarginSource,
        },
      ],
      text: (
        <p>
          The spacing added before and after <strong>EuiHorizontalRule</strong>{' '}
          can be adjusted using the <EuiCode>margin</EuiCode> prop. Don&rsquo;t
          forget that margins will collapse against items that proceed and/or
          follow.
        </p>
      ),
      snippet: horizontalRuleMarginSnippet,
      demo: (
        <div className="guideDemo__highlightHR">
          <HorizontalRuleMargin />
        </div>
      ),
    },
  ],
};
