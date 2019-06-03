import React from 'react';
import DelayRender from './delay_render';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiDelayRender } from '../../../../src/components';
import { renderToHtml } from '../../services';

const delayRenderSource = require('!!raw-loader!./delay_render');
const delayRenderHtml = renderToHtml(DelayRender);

export const DelayRenderExample = {
  title: 'Delay Render',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: delayRenderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: delayRenderHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>EuiDelayRender</EuiCode> is a component for conditionally
          toggling the visibility of a child component. It will ensure that the
          child is hidden for at least 500ms (default). This allows delay UI
          rendering. That is helpful when you need to update aria live region(s)
          repeatedly.
        </p>
      ),
      props: { EuiDelayRender },
      demo: <DelayRender />,
    },
  ],
};
