import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCallOut,
  EuiText,
  EuiCode,
  EuiSpacer,
} from '../../../../src/components';

import Spacer from './spacer';
const spacerSource = require('!!raw-loader!./spacer');
const spacerHtml = renderToHtml(Spacer);

export default props => (
  <GuidePage title={props.route.name}>
    <EuiCallOut
      title="Try not to stuff these in loops"
      type="warning"
    >
      <EuiText size="s">
        <p>
          This component is handy for setting space between two different
          components, be it a block level element or two pieces of isolated text. You
          should not use it in loops of repeatable components. In those situations
          it is almost always more preferable to define the spacing on the component
          itself.
        </p>
      </EuiText>
    </EuiCallOut>
    <EuiSpacer size="l" />
    <GuideSection
      title="Spacer"
      source={[{
        type: GuideSectionTypes.JS,
        code: spacerSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: spacerHtml,
      }]}
      text={
        <p>
          The <EuiCode>Spacer</EuiCode> component is a fancy break tag. Use
          it to add vertical space between items. Please do not stack them.
        </p>
      }
      demo={
        <div className="guideDemo__highlightSpacer">
          <Spacer />
        </div>
      }
    />
  </GuidePage>
);
