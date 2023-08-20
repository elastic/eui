import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSection } from '../../components/guide_section/guide_section';
import { GuideSectionTypes } from '../../components/guide_section/guide_section_types';

import {
  EuiText,
  EuiSpacer,
  EuiCode,
  EuiCallOut,
  EuiPageHeader,
  EuiPageSection,
  EuiPageSidebar,
  EuiPageTemplate_Deprecated,
} from '../../../../src';

import { _EuiPageTemplate } from '../../../../src/components/page_template/page_template';
import { _EuiPageBottomBar } from '../../../../src/components/page_template/bottom_bar/page_bottom_bar';
import { _EuiPageEmptyPrompt } from '../../../../src/components/page_template/empty_prompt/page_empty_prompt';

import { PageDemo } from './_page_demo';
import Sidebar from './page_template_sidebar';
const SidebarSource = require('!!raw-loader!./page_template_sidebar');
import BottomBar from './page_template_bottom_bar';
const BottomBarSource = require('!!raw-loader!./page_template_bottom_bar');
import Empty from './page_template_empty';
const EmptySource = require('!!raw-loader!./page_template_empty');

import Deprecated from './deprecated';
const DeprecatedSource = require('!!raw-loader!./deprecated');

// @ts-ignore Importing JS file
import { pageTemplateConfig } from './playground';

// This array is used inside routes.js to create the sidenav sub-sections
export const pageTemplateExamplesSections = [
  {
    id: 'simple-page-with-header-and-sections',
    title: 'Simple page with header and sections',
    fullScreen: {
      showButton: false,
      slug: 'full-page',
      demo: (
        <PageDemo
          slug="full-page"
          fullscreen
          toggle={{
            panelledGroup: true,
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
    id: 'providing-a-sidebar',
    title: 'Providing a sidebar',
    fullScreen: {
      showButton: false,
      slug: 'sidebar',
      demo: (
        <PageDemo
          slug="sidebar"
          fullscreen
          template={Sidebar}
          toggle={{
            panelledSwitch: true,
            sidebar: true,
            sidebarSticky: true,
            border: true,
          }}
          show={{
            sidebar: true,
          }}
        />
      ),
    },
  },
  {
    id: 'showing-a-bottom-bar',
    title: 'Showing a bottom bar',
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
    id: 'empty-pages-or-content',
    title: 'Empty pages or content',
    fullScreen: {
      showButton: false,
      slug: 'centered-body',
      demo: (
        <PageDemo
          slug="centered-body"
          fullscreen
          template={Empty}
          toggle={{
            pageHeader: true,
            panelledSwitch: true,
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
  {
    id: 'deprecated',
    title: 'Deprecated',
  },
];

export const PageTemplateInfo = {
  title: 'Page template',
  intro: (
    <>
      <EuiCallOut
        iconType="warning"
        color="warning"
        title={
          <>
            The previous version of <strong>EuiPageTemplate</strong> has been
            deprecated to <strong>EuiPageTemplate_Deprecated</strong>.{' '}
            <Link to="#deprecated">More info below.</Link>
          </>
        }
      />
      <EuiSpacer />
      <EuiText>
        <p>
          The new <strong>EuiPageTemplate</strong> is a namespaced component for
          creating the different types of page layout patterns described in
          these docs. It is somewhat opinionated, but still has the ability to
          customize most of the inner components directly on their instance.
        </p>
      </EuiText>
    </>
  ),
};

export const PageTemplateExample = () => (
  <>
    <GuideSection
      title={pageTemplateExamplesSections[0].title}
      id={pageTemplateExamplesSections[0].id}
      wrapText={false}
      text={
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
              With the exception of <EuiCode>.Sidebar</EuiCode> and{' '}
              <EuiCode>.BottomBar</EuiCode>, the stacking order of the page
              contents is determined by the order they are passed in. You can
              also override the outer props by simply applying them directly to
              the child element.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut color="primary">
            <p>
              If you have a fixed position{' '}
              <Link to="/layout/header#fixed-header">headers</Link>, the
              template will automatically account for the padding{' '}
              <EuiCode>offset</EuiCode> based on the total number of page
              headers. If you do not want the template to calculate this, you
              can pass <EuiCode>0</EuiCode> in as the manual{' '}
              <EuiCode>offset</EuiCode>.
            </p>
          </EuiCallOut>
          <PageDemo
            slug="full-page"
            toggle={{
              panelledGroup: true,
              restrictedWidth: true,
            }}
            show={{
              tabs: true,
            }}
            props={{
              EuiPageTemplate: _EuiPageTemplate,
              'EuiPageTemplate.Header': EuiPageHeader,
              'EuiPageTemplate.Section': EuiPageSection,
            }}
          />
        </>
      }
    />

    <GuideSection
      title={pageTemplateExamplesSections[1].title}
      id={pageTemplateExamplesSections[1].id}
      wrapText={false}
      text={
        <>
          <EuiText>
            <p>
              If your application requires the use of side navigation or other
              sidebar content, you can pass and{' '}
              <strong>EuiPageTemplate.Sidebar</strong> component containing your
              sidebar content. The template will automatically adjust the layout
              when this content is provided.
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
          <EuiSpacer />
          <EuiCallOut
            iconType="warning"
            color="warning"
            title="Sidebars must be direct children declared in the same component."
          >
            <p>
              In order for the template configurations to properly account for
              the existence of a sidebar, it needs to clone the element which
              can only be performed on direct children.
            </p>
          </EuiCallOut>
          <PageDemo
            slug="sidebar"
            toggle={{
              panelledSwitch: true,
              sidebar: true,
              border: true,
            }}
            show={{
              sidebar: true,
            }}
            template={Sidebar}
            source={SidebarSource}
            props={{
              'EuiPageTemplate.Sidebar': EuiPageSidebar,
            }}
          />
        </>
      }
    />

    <GuideSection
      title={pageTemplateExamplesSections[2].title}
      id={pageTemplateExamplesSections[2].id}
      wrapText={false}
      text={
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
              It will also keep its content constrained to the{' '}
              <EuiCode>restrictedWidth</EuiCode> value so the contents are
              always horizontally aligned.
            </p>
          </EuiText>
          <EuiSpacer />

          <EuiCallOut
            iconType="warning"
            color="warning"
            title={
              <>
                For proper alignment in case of short content, at least one{' '}
                <strong>EuiPageTemplate.Section</strong> must have{' '}
                <EuiCode>{'grow={true}'}</EuiCode>.
              </>
            }
          />
          <PageDemo
            slug="bottom-bar"
            template={BottomBar}
            source={BottomBarSource}
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
      }
    />

    <GuideSection
      title={pageTemplateExamplesSections[3].title}
      id={pageTemplateExamplesSections[3].id}
      wrapText={false}
      text={
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
              panelledSwitch: true,
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
      }
    />

    <GuideSection
      title={pageTemplateExamplesSections[4].title}
      id={pageTemplateExamplesSections[4].id}
      text={
        <>
          <p>
            The previous version of <strong>EuiPageTemplate</strong> has been
            deprecated and renamed to{' '}
            <strong>EuiPageTemplate_Deprecated</strong>.
          </p>
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
        </>
      }
      demo={
        <div className="guideDemo__highlightLayout guideDemo__highlightLayout--border">
          <Deprecated />
        </div>
      }
      source={[
        {
          type: GuideSectionTypes.JS,
          code: DeprecatedSource,
        },
      ]}
      demoPanelProps={{ paddingSize: 'none' }}
      props={{ EuiPageTemplate_Deprecated }}
      playground={pageTemplateConfig}
    />
  </>
);
