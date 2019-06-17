import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiText,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';

import Spacer from './spacer';
const spacerSource = require('!!raw-loader!./spacer');
const spacerHtml = renderToHtml(Spacer);

const spacerSnippet = '<EuiSpacer size="xs" />';

export const SpacerExample = {
  title: 'Spacer',
  intro: (
    <Fragment>
      <EuiCallOut title="Try not to stuff these in loops" color="warning">
        <EuiText size="s">
          <p>
            This component is handy for setting space between two different
            components, be it a block level element or two pieces of isolated
            text. You should not use it in loops of repeatable components. In
            those situations it is almost always more preferable to define the
            spacing on the component itself.
          </p>
        </EuiText>
      </EuiCallOut>

      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: spacerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: spacerHtml,
        },
      ],
      text: (
        <p>
          The <EuiCode>Spacer</EuiCode> component is a fancy break tag. Use it
          to add vertical space between items. Please do not stack them. If
          passed without a <EuiCode>size</EuiCode> prop, it will default to the
          large size, which matches the margins of <EuiCode>EuiFlex</EuiCode>{' '}
          elements.
        </p>
      ),
      props: { EuiSpacer },
      snippet: spacerSnippet,
      demo: (
        <div className="guideDemo__highlightSpacer">
          <Spacer />
        </div>
      ),
    },
  ],
};
