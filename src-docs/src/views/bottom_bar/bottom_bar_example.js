import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiBottomBar, EuiCode } from '../../../../src/components';

import { bottomBarConfig } from './playground';

import BottomBar from './bottom_bar';
const bottomBarSource = require('!!raw-loader!./bottom_bar');

import BottomBarDisplacement from './bottom_bar_displacement';
const bottomBarDisplacementSource = require('!!raw-loader!./bottom_bar_displacement');

import BottomBarPosition from './bottom_bar_position';
const bottomBarPositionSource = require('!!raw-loader!./bottom_bar_position');

export const BottomBarExample = {
  title: 'Bottom bar',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiBottomBar</strong> is a simple wrapper component that
            does nothing but fix a bottom bar (usually filled with buttons) to
            the bottom of the page. Use it when you have really long pages or
            complicated, multi-page forms. In the case of forms, only invoke it
            if a form is in a savable state.
          </p>
          <p>
            Like many of our other wrapper components,{' '}
            <strong>EuiBottomBar</strong> accepts a{' '}
            <EuiCode>paddingSize</EuiCode> prop, which can be set to{' '}
            <EuiCode>s / m (default) / l / none</EuiCode>.
          </p>
        </>
      ),
      props: { EuiBottomBar },
      demo: <BottomBar />,
      playground: bottomBarConfig,
      snippet: `<EuiBottomBar paddingSize="s">
  <!-- Content goes here -->
</EuiBottomBar>`,
    },
    {
      title: 'Positions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarPositionSource,
        },
      ],
      text: (
        <>
          <p>
            Bottom bars default to being fixed position, in a portal at the
            bottom of the browser window. You can remove the portal or the
            displacement affordance when <EuiCode>fixed</EuiCode> position.
            Alternatively, you can change the <EuiCode>position</EuiCode> to{' '}
            <EuiCode>sticky</EuiCode> where it render in place but stick to the
            window only as the window edge nears. The <EuiCode>static</EuiCode>{' '}
            position reverts back to default DOM behavior.
          </p>
          <p>
            You can also apply a different set of positioning locations just by
            adjusting them in the <EuiCode>style</EuiCode> prop.
          </p>
        </>
      ),
      props: { EuiBottomBar },
      demo: <BottomBarPosition />,
      snippet: `<EuiBottomBar position="sticky" bottom={10}>
  <!-- Content goes here -->
</EuiBottomBar>`,
    },
    {
      title: 'Displacement',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: bottomBarDisplacementSource,
        },
      ],
      text: (
        <>
          <p>
            There is an <EuiCode>affordForDisplacement</EuiCode> prop
            (defaulting to <EuiCode>true</EuiCode>), which determines whether
            the component makes room for itself by adding bottom padding
            equivalent to its own height on the document{' '}
            <EuiCode language="html">{'<body>'}</EuiCode> element. Setting this
            to <EuiCode>false</EuiCode> can be useful to minimize scrollbar
            visibility but will cause the bottom bar to overlap body content.
          </p>
        </>
      ),
      props: { EuiBottomBar },
      demo: <BottomBarDisplacement />,
      snippet: `<EuiBottomBar affordForDisplacement={false}>
  <!-- Content goes here -->
</EuiBottomBar>`,
    },
  ],
};
