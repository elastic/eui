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

import SideNavComplicated from './side_nav_complicated';
const sideNavComplicatedSource = require('!!raw-loader!./side_nav_complicated');
const sideNavComplicatedHtml = renderToHtml(SideNavComplicated);

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
      title="Complicated side nav"
      source={[{
        type: GuideSectionTypes.JS,
        code: sideNavSource,
      }, {
        type: GuideSectionTypes.HTML,
        code: sideNavHtml,
      }]}
      text={
        <p>
          <EuiCode>SideNav</EuiCode> can also handle more stylized, tree based layouts. In the below
          example icons with titles have been added within the <EuiCode>EuiSideNavTitle</EuiCode>.
          This requires the addition of the <EuiCode>iconsInTitles</EuiCode> prop on
          <EuiCode>EuiSideNav</EuiCode> for extra spacing. The inner tree bordering is added by
          wrapping <EuiCode>EuiSideNavItems</EuiCode> with <EuiCode>EuiSideNavGroup</EuiCode>.
          Note that they can be nested for even deeper trees.
        </p>
      }
      demo={
        <SideNavComplicated />
      }
    />
  </GuidePage>
);
