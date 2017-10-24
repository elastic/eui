import React from 'react';

import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuidePage,
  GuideSection,
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import SideNav from './side_nav';
const sideNavSource = require('!!raw-loader!./side_nav');
const sideNavHtml = renderToHtml(SideNav);

import SideNavInPanel from './side_nav_in_panel';
const sideNavInPanelSource = require('!!raw-loader!./side_nav_in_panel');
const sideNavInPanelHtml = renderToHtml(SideNavInPanel);

export default props => (
  <GuidePage title={props.route.name}>
    <GuideSection
      title="SideNav"
      source={[{
        type: GuideSectionTypes.JS,
        code: sideNavSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: sideNavHtml,
      }]}
      text={
        <p>
          <EuiCode>SideNav</EuiCode> is a responsive menu system that usually sits on the left side of a page layout.
          It will exapand to the width of its container. This is the menu that is used on the left side of the
          page you are looking at.
        </p>
      }
      demo={
        <SideNav />
      }
    />

    <GuideSection
      title="SideNav can be used in Panels"
      source={[{
        type: GuideSectionTypes.JS,
        code: sideNavInPanelSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: sideNavInPanelHtml,
      }]}
      text={
        <p>
          <EuiCode>SideNav</EuiCode> accepts a <EuiCode>type=&ldquo;inPanel&rdquo;</EuiCode> prop
          that gives it more contextual styling when included within a <Link to="/page">Panel</Link> (like
          this documentation page). Note that in mobile mode it drops itself down to the original styling
          and still works responsively.
        </p>
      }
      demo={
        <SideNavInPanel />
      }
    />
  </GuidePage>
);
