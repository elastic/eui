import React from 'react';
import { Link } from 'react-router-dom';

import { PageDemo } from './_page_demo';

import {
  EuiCode,
  EuiPageHeader,
  EuiText,
  EuiCallOut,
  EuiSpacer,
  EuiPageSection,
} from '../../../../src';

import { _EuiPageTemplate } from '../../../../src/components/page_template/page_template';
import { _EuiPageSidebar } from '../../../../src/components/page_template/sidebar';
import { _EuiPageBottomBar } from '../../../../src/components/page_template/bottom_bar/page_bottom_bar';
import { _EuiPageEmptyPrompt } from '../../../../src/components/page_template/empty_prompt/page_empty_prompt';

import Sidebar from './page_template_sidebar';
const SidebarSource = require('!!raw-loader!./page_template_sidebar');
import BottomBar from './page_template_bottom_bar';
const BottomBarSource = require('!!raw-loader!./page_template_bottom_bar');
import Empty from './page_template_empty';
const EmptySource = require('!!raw-loader!./page_template_empty');

export const PageTemplateExample = {
  title: 'Page template',
  isBeta: true,
  isNew: true,
  intro: (
    <>
      <EuiText>
        <p>
          The new <strong>EuiPageTemplate</strong> is a namespaced component for
          creating the different types of page layout patterns described in
          these docs. It is somewhat opinionated, but still has the ability to
          customize most of the inner components directly on their instance.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="alert"
        color="warning"
        title="The previous version of EuiPageTemplate has been deprecated to EuiPageTemplate__Deprecated"
      >
        <p>
          To continue using the previous version, you can update your import
          statement to{' '}
          <EuiCode language="ts">
            {
              "import { EuiPageTemplate_Deprecated as EuiPageTemplate } from '@elastic/eui'"
            }
          </EuiCode>
          .
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Simple page with header and sections',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              All templates should start with a wrapping{' '}
              <EuiCode>EuiPageTemplate</EuiCode> to control some shared settings
              like <EuiCode>paddingSize</EuiCode>,{' '}
              <EuiCode>bottomBorder</EuiCode>, <EuiCode>restrictWidth</EuiCode>,
              and <EuiCode>panelled</EuiCode>. Then each direct child will be
              evaluated for if it is one of the other namespaced components. If
              so, it will place it in the appropriate spot and apply the
              appropriate props based on the full configuration of child
              elements. These namespaced components include:
            </p>
            <ul>
              <li>
                <strong>EuiPageTemplate.Sidebar</strong> extends{' '}
                <Link to="#providing-a-sidebar">
                  <strong>EuiPageSidebar</strong>
                </Link>
              </li>
              <li>
                <strong>EuiPageTemplate.Header</strong> extends{' '}
                <Link to="/layout/page-header">
                  <strong>EuiPageHeader</strong>
                </Link>
              </li>
              <li>
                <strong>EuiPageTemplate.Section</strong> extends{' '}
                <Link to="/layout/page-components#page-sections">
                  <strong>EuiPageSection</strong>
                </Link>
              </li>
              <li>
                <strong>EuiPageTemplate.BottomBar</strong> extends{' '}
                <Link to="/layout/bottom-bar">
                  <strong>EuiBottomBar</strong>
                </Link>
              </li>
              <li>
                <strong>EuiPageTemplate.EmptyPrompt</strong> extends{' '}
                <Link to="/display/empty-prompt">
                  <strong>EuiEmptyPrompt</strong>
                </Link>
              </li>
            </ul>
            <p>
              With the exception of Sidebar and BottomBar, the stacking order of
              the page contents is determined by the order they are passed in.
              You can also override the outer props by simply applying them
              directly to the child element.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut
            iconType="alert"
            color="warning"
            title="Each direct child that is not a namespaced component will be wrapped in EuiPageTemplate.Section"
          >
            <p>
              So be careful when placing spacers or other non-content based
              components as direct children. React fragments will be treated as
              a single child.
            </p>
          </EuiCallOut>
          <EuiSpacer />
          <EuiText>
            <p>
              If you have an fixed position{' '}
              <Link to="/display/header">headers</Link>, the template will
              automatically account for the padding <EuiCode>offset</EuiCode>{' '}
              based on the total number of page headers. If you do not want the
              template to calculate this, you can pass <EuiCode>0</EuiCode> in
              as the manual <EuiCode>offset</EuiCode>.
            </p>
          </EuiText>
          <PageDemo
            slug="full-page"
            toggle={{
              panelled: true,
              restrictedWidth: true,
            }}
            show={{
              tabs: true,
            }}
            props={{
              'EuiPageTemplate.Outer': _EuiPageTemplate,
              'EuiPageTemplate.Header': EuiPageHeader,
              'EuiPageTemplate.Section': EuiPageSection,
            }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'full-page',
        demo: (
          <PageDemo
            slug="full-page"
            fullscreen
            toggle={{
              panelled: true,
              restrictedWidth: true,
            }}
            show={{
              tabs: true,
            }}
          />
        ),
      },
    },
    {
      title: 'Providing a sidebar',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              If your application requires the use of side navigation or other
              sidebar content, you can pass and{' '}
              <strong>EuiPageTemplate.Sidebar</strong>
              component containing your sidebar content. The template will
              automatically adjust the layout when this content is provided.
            </p>
            <p>
              This component will set its content to stick to the top of the
              browser window and scroll independently of the rest of the layout.
              If you have any fixed{' '}
              <Link to="/display/page-header">
                <strong>EuiHeaders</strong>
              </Link>
              , these will be accounted for as well. You can turn this behavior
              off with <EuiCode language="tsx">{'sticky={false}'}</EuiCode>.
            </p>
            <p>
              Typically when a sidebar is included and{' '}
              <EuiCode>restrictedWidth</EuiCode> is defined, we recommend
              keeping the{' '}
              <EuiCode language="tsx">{'borderBottom={true}'}</EuiCode> though
              you can also expand particular sections with{' '}
              <EuiCode language="tsx">{'borderBottom="extended"'}</EuiCode>.
            </p>
          </EuiText>
          <PageDemo
            slug="sidebar"
            toggle={{
              panelled: true,
              sidebar: true,
              border: true,
            }}
            show={{
              sidebar: true,
            }}
            template={Sidebar}
            source={SidebarSource}
            props={{
              'EuiPageTemplate.Sidebar': _EuiPageSidebar,
            }}
          />
        </>
      ),
      fullScreen: {
        slug: 'sidebar',
        demo: (
          <PageDemo
            slug="sidebar"
            fullscreen
            template={Sidebar}
            toggle={{
              panelled: true,
              sidebar: true,
              sidebarSticky: true,
              border: true,
            }}
            show={{
              sidebar: true,
            }}
          />
        ),
        showButton: false,
      },
    },
    {
      title: 'Showing a bottom bar',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              Adding an{' '}
              <Link to="/layout/bottom-bar">
                <strong>EuiBottomBar</strong>
              </Link>{' '}
              can be tricky to use and account for any sidebars.{' '}
              <strong>EuiPageTemplate</strong> handles this nicely by supplying
              a <strong>EuiPageTemplate.BottomBar</strong> component for passing
              the contents of your bottom bar that extends{' '}
              <strong>EuiBottomBar</strong>.
            </p>
            <p>
              It uses the <EuiCode>sticky</EuiCode> position so that it sticks
              to the bottom of and remains within the bounds of page body. This
              way it will never overlap the sidebar, no matter the screen size.
              It also means not needing to accommodate for the height of the bar
              in the body element.
            </p>
            <p>
              It will also keep its content contstrained to the{' '}
              <EuiCode>restrictedWidth</EuiCode> value so the contents are
              always horizontally aligned.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiCallOut
            iconType="alert"
            color="warning"
            title="For proper alignment in case of short content, at least on EuiPageTemplate.Section must have grow = true."
          />
          <PageDemo
            slug="bottom-bar"
            template={BottomBar}
            source={BottomBarSource}
            bottomBar
            toggleSidebar
            toggleRestrictedWidth
            togglePageHeader={false}
            togglePanelled={false}
            toggle={{
              restrictedWidth: true,
              sidebar: true,
            }}
            show={{
              bottomBar: true,
              sidebar: true,
            }}
            props={{
              'EuiPageTemplate.BottomBar': _EuiPageBottomBar,
            }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'bottom-bar',
        demo: (
          <PageDemo
            slug="bottom-bar"
            fullscreen
            template={BottomBar}
            toggle={{
              restrictedWidth: true,
              sidebar: true,
              sidebarSticky: true,
            }}
            show={{
              bottomBar: true,
              sidebar: true,
            }}
          />
        ),
      },
    },
    {
      title: 'Empty pages or content',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              When the content is in an empty/pre-setup state, we recommend then
              using an{' '}
              <Link to="/display/empty-prompt">
                <strong>EuiEmptyPrompt</strong>
              </Link>{' '}
              to direct users on next steps. Using{' '}
              <strong>EuiPageTemplate.EmptyPrompt</strong> will automatically
              center the prompt vertically and horizontally.
            </p>
            <p>
              The prompt&apos;s panel color depends on the other configurations
              but can be manually passed in via the <EuiCode>color</EuiCode>{' '}
              prop.
            </p>
          </EuiText>
          <PageDemo
            slug="centered-body"
            template={Empty}
            source={EmptySource}
            toggle={{
              pageHeader: true,
              panelled: true,
              sidebar: true,
            }}
            show={{
              emptyPrompt: true,
              sidebar: true,
            }}
            props={{
              'EuiPageTemplate.EmptyPrompt': _EuiPageEmptyPrompt,
            }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'centered-body',
        emptyPrompt: true,
        demo: (
          <PageDemo
            slug="centered-body"
            fullscreen
            template={Empty}
            toggle={{
              pageHeader: true,
              panelled: true,
              sidebar: true,
            }}
            show={{
              emptyPrompt: true,
              sidebar: true,
            }}
          />
        ),
      },
    },
  ],
};
