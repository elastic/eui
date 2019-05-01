import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSideNav } from '../../../../src/components';

import SideNav from './side_nav';
const sideNavSource = require('!!raw-loader!./side_nav');
const sideNavHtml = renderToHtml(SideNav);

import SideNavComplex from './side_nav_complex';
const sideNavComplexSource = require('!!raw-loader!./side_nav_complex');
const sideNavComplexHtml = renderToHtml(SideNavComplex);

import SideNavForceOpen from './side_nav_force_open';
const sideNavForceOpenSource = require('!!raw-loader!./side_nav_force_open');
const sideNavForceOpenHtml = renderToHtml(SideNavForceOpen);

export const SideNavExample = {
  title: 'Side Nav',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavHtml,
        },
      ],
      text: (
        <div>
          <p>
            <EuiCode>SideNav</EuiCode> is a responsive menu system that usually
            sits on the left side of a page layout. It will expand to the width
            of its container. This is the menu that is used on the left side of
            the page you are currently looking at.
          </p>

          <p>
            Configure the content of a <EuiCode>SideNav</EuiCode> by passing in
            an <EuiCode>items</EuiCode> prop. Refer to the source code for an
            example of this data structure&rsquo;s anatomy.
          </p>
        </div>
      ),
      props: { EuiSideNav },
      demo: <SideNav />,
    },
    {
      title: 'Complex side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavComplexHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>SideNav</EuiCode> also supports deeply-nested tree-based
          data.
        </p>
      ),
      demo: <SideNavComplex />,
    },
    {
      title: 'Forced open side nav',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sideNavForceOpenSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: sideNavForceOpenHtml,
        },
      ],
      text: (
        <p>
          <EuiCode>SideNav</EuiCode> items can be forced open by setting{' '}
          <EuiCode>items[n].forceOpen = true</EuiCode>
        </p>
      ),
      demo: <SideNavForceOpen />,
    },
  ],
};
