import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiHorizontalRule,
} from '../../../../src/components';

import HorizontalRule from './horizontal_rule';
import HorizontalRulePlayground from './horizontal_rule_playground';
const horizontalRuleSource = require('!!raw-loader!./horizontal_rule');
const horizontalRuleHtml = renderToHtml(HorizontalRule);

// import HorizontalRuleMargin from './horizontal_rule_margin';
// const horizontalRuleMarginSource = require('!!raw-loader!./horizontal_rule_margin');
// const horizontalRuleMarginHtml = renderToHtml(HorizontalRuleMargin);

export const HorizontalRuleExample = {
  title: 'Horizontal Rule',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: horizontalRuleSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: horizontalRuleHtml,
    }],
    text: (
      <p>
        <EuiCode>HorizontalRule</EuiCode> can carry a size. By default it will be
        full. <EuiCode>HorizontalRule</EuiCode> margins can also be defined.
        Don&rsquo;t forget that margins will collapse against items that proceed / follow.
      </p>
    ),
    playground: <HorizontalRulePlayground />,
    demo: <HorizontalRule />,
    props: { EuiHorizontalRule }
  }],
};
