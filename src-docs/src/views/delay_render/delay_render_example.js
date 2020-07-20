import React from 'react';
import DelayRender from './delay_render';
import { GuideSectionTypes } from '../../components';
import { EuiDelayRender, EuiDelayHide } from '../../../../src/components';
import { renderToHtml } from '../../services';
import DelayHide from './delay_hide';

const delayHideSource = require('!!raw-loader!./delay_hide');
const delayHideHtml = renderToHtml(DelayHide);

const delayRenderSource = require('!!raw-loader!./delay_render');
const delayRenderHtml = renderToHtml(DelayRender);

export const DelayRenderExample = {
  title: 'Delay',
  sections: [
    {
      title: 'Delay render',
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
          <strong>EuiDelayRender</strong> is a component for conditionally
          toggling the visibility of a child component. It will ensure that the
          child is hidden for at least 500ms (default). This allows delay UI
          rendering. That is helpful when you need to update aria live region(s)
          repeatedly.
        </p>
      ),
      props: { EuiDelayRender },
      demo: <DelayRender />,
    },
    {
      title: 'Delay hide',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: delayHideSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: delayHideHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiDelayHide</strong> is a component for conditionally
          toggling the visibility of a child component. It will ensure that the
          child is visible for at least 1000ms (default). This avoids UI
          glitches that are common with loading spinners and other elements that
          are rendered conditionally and potentially for a short amount of time.
        </p>
      ),
      props: { EuiDelayHide },
      demo: <DelayHide />,
    },
  ],
};
