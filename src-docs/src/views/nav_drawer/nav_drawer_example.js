import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiNavDrawer,
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
        The nav drawer is made up of several individual components.
      </p>
    ),
    props: {
      EuiNavDrawer,
    },
    demo: <NavDrawer />,
  }]
};
