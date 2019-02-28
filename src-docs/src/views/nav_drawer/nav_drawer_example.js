import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiNavDrawer,
  EuiCode,
} from '../../../../src/components';

import NavDrawer from './nav_drawer';
const navDrawerSource = require('!!raw-loader!./nav_drawer');
const navDrawerHtml = renderToHtml(NavDrawer);

export const NavDrawerExample = {
  title: 'Nav Drawer',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: navDrawerSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: navDrawerHtml,
    }],
    text: (
      <p>
        <EuiCode>EuiNavDrawer</EuiCode> provides a side navigation feature that
        is complete with interactions and a mobile-friendly design. It can
        contain one or more <EuiCode>EuiListGroup</EuiCode> components and is
        designed to be used in conjunction with <EuiCode>EuiHeader</EuiCode>.
      </p>
    ),
    props: {
      EuiNavDrawer,
    },
    demo: <NavDrawer />,
  }]
};
