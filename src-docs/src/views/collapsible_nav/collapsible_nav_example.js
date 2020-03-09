import React from 'react';
import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiCollapsibleNav,
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCollapsibleNavList,
  EuiCollapsibleNavGroup,
} from '../../../../src/components';
import { EuiCollapsibleNavListItem } from './props';

import CollapsibleNav from './collapsible_nav';
const collapsibleNavSource = require('!!raw-loader!./collapsible_nav');
const collapsibleNavHtml = renderToHtml(CollapsibleNav);

import CollapsibleNavGroup from './collapsible_nav_group';
const collapsibleNavGroupSource = require('!!raw-loader!./collapsible_nav_group');
const collapsibleNavGroupHtml = renderToHtml(CollapsibleNavGroup);

import CollapsibleNavGroupList from './collapsible_nav_list';
const collapsibleNavGroupListSource = require('!!raw-loader!./collapsible_nav_list');
const collapsibleNavGroupListHtml = renderToHtml(CollapsibleNavGroupList);

export const CollapsibleNavExample = {
  title: 'Collapsible nav',
  intro: (
    <EuiText>
      <p>
        This is a high level component that creates a flyout-style navigational
        pane. It is the next evolution of{' '}
        <Link to="/layout/nav-drawer">
          <strong>EuiNavDrawer</strong>
        </Link>{' '}
        which will be deprecated in the coming months.
      </p>
      <EuiSpacer size="m" />
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiCollapsibleNav</strong> is a similar implementation to{' '}
            <Link to="/layout/flyout">
              <strong>EuiFlyout</strong>
            </Link>
            ; the visibility of which must be maintained by the consuming
            application. An extra feature that it provides is the ability to{' '}
            <EuiCode>dock</EuiCode> the flyout. This affixes the flyout to the
            window and pushes the body content by adding left side padding.
          </p>
          <EuiCallOut
            iconType="tableOfContents"
            title="Docking is not possible on small screens because it would force less real estate for the page content."
          />
        </>
      ),
      props: { EuiCollapsibleNav },
      demo: <CollapsibleNav />,
      snippet: `<EuiButton onClick={() => setNavIsOpen(!navIsOpen)}>Toggle nav</EuiButton>
{navIsOpen && (
  <EuiCollapsibleNav
    docked={navIsDocked}
    onClose={() => setNavIsOpen(false)}
  />
)}`,
    },
    {
      title: 'Collapsible nav group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            An <strong>EuiCollapsibleNavGroup</strong> adds some basic borders
            and <EuiCode>background</EuiCode> color of <EuiCode>none</EuiCode>,{' '}
            <EuiCode>light</EuiCode>, or <EuiCode>dark</EuiCode>. Give each
            seaction a heading by providing an optional <EuiCode>title</EuiCode>{' '}
            and <EuiCode>iconType</EuiCode>. Make the section collapsible (
            <Link to="/layout/accordion">accordion style</Link>) with{' '}
            <EuiCode language="js">isCollapsible=true</EuiCode>.
          </p>
          <p>
            When in <EuiCode>isCollapsible</EuiCode> mode, a{' '}
            <EuiCode>title</EuiCode> and{' '}
            <EuiCode language="ts">initialIsOpen:boolean</EuiCode> is required.
          </p>
        </>
      ),
      props: {
        EuiCollapsibleNavGroup,
      },
      demo: <CollapsibleNavGroup />,
      snippet: `<EuiCollapsibleNavGroup
  title="Nav group"
  iconType="logo"
  isCollapsible={true}
  initialIsOpen={true}
  background="none"
/>`,
    },
    {
      title: 'Nav group list',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: collapsibleNavGroupListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: collapsibleNavGroupListHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiCollapsibleNavList</strong> is simply an extra wrapper
            around an{' '}
            <Link to="/display/list-group">
              <strong>EuiListGroup</strong>
            </Link>{' '}
            with some added defaults like{' '}
            <EuiCode language="js">gutterSize=&quot;none&quot;&#10;</EuiCode>{' '}
            and <EuiCode language="js">color=&quot;subdued&quot;</EuiCode>. It
            also provides the visual indicators for <strong>pinning</strong>.
          </p>
          <p>
            Pinning is the concept that users can click a pin icon and add it to
            a subset of links (most likely shown in different nav group). By
            providing an <EuiCode>onPinClick</EuiCode> handler, the component
            will automatically add the pin action to the item. However, the
            consuming application must manage the <EuiCode>listItem</EuiCode>s
            and their <EuiCode>pinned</EuiCode> state.
          </p>
          <p>
            In order to get the full benefit of using{' '}
            <strong>EuiCollapsibleNavList</strong>, the component only supports
            providing list items via the <EuiCode>listItem</EuiCode> prop and
            does not support <EuiCode>children</EuiCode>.
          </p>
        </>
      ),
      props: { EuiCollapsibleNavList, EuiCollapsibleNavListItem },
      demo: <CollapsibleNavGroupList />,
      snippet: `<EuiCollapsibleNavList
  onPinClick={item => {}}
  listItems={[
    {
      label: 'A link',
      href: '#',
      pinned: true,
      isActive: true,
    },
  ]}
/>`,
    },
  ],
};
