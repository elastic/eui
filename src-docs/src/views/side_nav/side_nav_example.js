import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import SideNav from './side_nav';
const sideNavSource = require('!!raw-loader!./side_nav');
const sideNavHtml = renderToHtml(SideNav);

import SideNavComplex from './side_nav_complex';
const sideNavComplexSource = require('!!raw-loader!./side_nav_complex');
const sideNavComplexHtml = renderToHtml(SideNavComplex);

export const SideNavExample = {
  title: 'SideNav',
  sections: [{
    title: 'SideNav',
    source: [{
      type: GuideSectionTypes.JS,
      code: sideNavSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: sideNavHtml,
    }],
    text: (
      <div>
        <p>
          <EuiCode>SideNav</EuiCode> is a responsive menu system that usually sits on the left side of a page layout.
          It will exapand to the width of its container. This is the menu that is used on the left side of the
          page you are looking at.
        </p>

        <p>
          Configure the content of a <EuiCode>SideNav</EuiCode> by passing in an <EuiCode>items</EuiCode> prop.
          Referring to the source code for an example of this data structure&rsquo;s anatomy.
        </p>
      </div>
    ),
    demo: <SideNav />,
  }, {
    title: 'Complex side nav',
    source: [{
      type: GuideSectionTypes.JS,
      code: sideNavComplexSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: sideNavComplexHtml,
    }],
    text: (
      <p>
        <EuiCode>SideNav</EuiCode> also supports deeply-nested tree-based data.
      </p>
    ),
    demo: <SideNavComplex />,
  }],
};
