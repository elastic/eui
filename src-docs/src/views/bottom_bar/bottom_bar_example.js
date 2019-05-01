import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiBottomBar, EuiCode } from '../../../../src/components';

import BottomBar from './bottom_bar';
const bottomBarSource = require('!!raw-loader!./bottom_bar');
const bottomBarHtml = renderToHtml(BottomBar);

export const BottomBarExample = {
  title: 'Bottom Bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: bottomBarHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>BottomBar</EuiCode> is a simple wrapper component that does
            nothing but fix a bottom bar (usually filled with buttons) to the
            bottom of the page. Use it when you have really long pages or
            complicated, multi-page forms. In the case of forms, only invoke it
            if a form is in a savable state.
          </p>
          <p>
            Like many of our other wrapper components,{' '}
            <EuiCode>BottomBar</EuiCode> accepts a{' '}
            <EuiCode>paddingSize</EuiCode> prop, which can be set to{' '}
            <EuiCode>s / m / l / none</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiBottomBar },
      demo: <BottomBar />,
    },
  ],
};
