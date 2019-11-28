import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCallOut,
  EuiText,
  EuiCode,
  EuiResizableContainer,
} from '../../../../src/components';

import ResizableContainer from './resizable_container';
const ResizableContainerSource = require('!!raw-loader!./resizable_container');
const ResizableContainerHtml = renderToHtml(ResizableContainer);

export const ResizableContainerExample = {
  title: 'Resizable Container',
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
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: ResizableContainerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: ResizableContainerHtml,
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
      props: { EuiResizableContainer },
      demo: (
        <div className="guideDemo__highlightSpacer">
          <ResizableContainer />
        </div>
      ),
    },
  ],
};
