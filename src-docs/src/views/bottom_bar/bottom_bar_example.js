import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiBottomBar, EuiCode } from '../../../../src/components';

import BottomBar from './bottom_bar';
const bottomBarSource = require('!!raw-loader!./bottom_bar');
const bottomBarHtml = renderToHtml(BottomBar);

const bottomBarSnippet = `<EuiBottomBar paddingSize="s">
  <!-- Content goes here -->
</EuiBottomBar>`;

export const BottomBarExample = {
  title: 'Bottom bar',
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
            <strong>EuiBottomBar</strong> is a simple wrapper component that
            does nothing but fix a bottom bar (usually filled with buttons) to
            the bottom of the page. Use it when you have really long pages or
            complicated, multi-page forms. In the case of forms, only invoke it
            if a form is in a savable state.
          </p>
          <p>
            There is a <EuiCode>affordForDisplacement</EuiCode> prop (defaulting
            to <EuiCode>true</EuiCode>), which determines whether the component
            makes room for itself by adding vertical padding equivalent to its
            own height on the document body element - setting this to{' '}
            <EuiCode>false</EuiCode> can be useful in cases such as a web app
            where it is desired that the appearance of vertical scrollbars is
            minimized.
          </p>
          <p>
            Like many of our other wrapper components,{' '}
            <strong>EuiBottomBar</strong> accepts a{' '}
            <EuiCode>paddingSize</EuiCode> prop, which can be set to{' '}
            <EuiCode>s / m / l / none</EuiCode> - by default, it is set to{' '}
            <EuiCode>m</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiBottomBar },
      snippet: bottomBarSnippet,
      demo: <BottomBar />,
    },
  ],
};
