import React from 'react';
import DelayHide from './delay_hide';
import { GuideSectionTypes } from '../../components';
import { EuiCode, EuiDelayHide } from '../../../../src/components';
import { renderToHtml } from '../../services';

const delayHideSource = require('!!raw-loader!./delay_hide');
const delayHideHtml = renderToHtml(DelayHide);

export const DelayHideExample = {
  title: 'Delay Hide',
  sections: [
    {
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
          <EuiCode>EuiDelayHide</EuiCode> is a component for conditionally
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
