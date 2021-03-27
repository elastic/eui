import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiBottomBar, EuiCode } from '../../../../src/components';
import Playground from './playground';

import BottomBar from './bottom_bar';
const bottomBarSource = require('!!raw-loader!./bottom_bar');

const bottomBarSnippet = `<EuiBottomBar paddingSize="s">
  <!-- Content goes here -->
</EuiBottomBar>`;

import BottomBarDisplacement from './bottom_bar_displacement';
const bottomBarDisplacementSource = require('!!raw-loader!./bottom_bar_displacement');

const bottomBarDisplacementSnippet = `<EuiBottomBar affordForDisplacement={false}>
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
      ],
      text: (
        <>
          <p>
            <strong>EuiBottomBar</strong> is a simple wrapper component that
            does nothing but fix a dark bar (usually filled with buttons) to the
            bottom of the page. Use it when you have really long pages or
            complicated, multi-page forms. In the case of forms, only invoke it
            if a form is in a savable state.
          </p>
          <p>
            Like many of our other wrapper components,{' '}
            <strong>EuiBottomBar</strong> accepts a{' '}
            <EuiCode>paddingSize</EuiCode> prop, which can be set to{' '}
            <EuiCode>s | m (default) | l | none</EuiCode>.
          </p>
        </>
      ),
      playground: Playground,
      props: { EuiBottomBar },
      snippet: bottomBarSnippet,
      demo: <BottomBar />,
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
            equivalent to its own height on the document&apos;s body element.
            Setting this to <EuiCode>false</EuiCode> can be useful to minimize
            scrollbar visibility but will cause the bottom bar to overlap body
            content.
          </p>
        </>
      ),
      props: { EuiBottomBar },
      snippet: bottomBarDisplacementSnippet,
      demo: <BottomBarDisplacement />,
    },
  ],
};
