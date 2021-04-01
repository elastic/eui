import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import { pageTemplateConfig } from './playground';
import { PageDemo } from './_page_demo';

import {
  EuiCode,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentBody,
  EuiPageHeader,
  EuiPageSideBar,
  EuiText,
  EuiEmptyPrompt,
  EuiPageTemplate,
  EuiCallOut,
  EuiSpacer,
} from '../../../../src/components';

import PageNew from './page_new';
const pageNewSource = require('!!raw-loader!./page_new');
import PageTemplate from './page_template';
const PageTemplateSource = require('!!raw-loader!./page_template');

import PageRestricingWidth from './page_restricting_width';
const PageRestricingWidthSource = require('!!raw-loader!./page_restricting_width');
import PageRestricingWidthTemplate from './page_restricting_width_template';
const PageRestricingWidthTemplateSource = require('!!raw-loader!./page_restricting_width_template');

import PageCenteredBody from './page_centered_body';
const PageCenteredBodySource = require('!!raw-loader!./page_centered_body');
import PageCenteredBodyTemplate from './page_centered_body_template';
const PageCenteredBodyTemplateSource = require('!!raw-loader!./page_centered_body_template');

import PageCenteredContent from './page_centered_content';
const PageCenteredContentSource = require('!!raw-loader!./page_centered_content');
import PageCenteredContentTemplate from './page_centered_content_template';
const PageCenteredContentTemplateSource = require('!!raw-loader!./page_centered_content_template');

import PageSimple from './page_simple';
const PageSimpleSource = require('!!raw-loader!./page_simple');
import PageSimpleTemplate from './page_simple_template';
const PageSimpleTemplateSource = require('!!raw-loader!./page_simple_template');

import PageSimpleCenteredBody from './page_simple_content_body';
const PageSimpleCenteredBodySource = require('!!raw-loader!./page_simple_content_body');
import PageSimpleCenteredBodyTemplate from './page_simple_content_body_template';
const PageSimpleCenteredBodyTemplateSource = require('!!raw-loader!./page_simple_content_body_template');

import PageSimpleEmptyContent from './page_simple_empty_content';
const PageSimpleEmptyContentSource = require('!!raw-loader!./page_simple_empty_content');
import PageSimpleEmptyContentTemplate from './page_simple_empty_content_template';
const PageSimpleEmptyContentTemplateSource = require('!!raw-loader!./page_simple_empty_content_template');

import PageCustomContent from './page_custom_content';
const PageCustomContentSource = require('!!raw-loader!./page_custom_content');
import PageCustomContentTemplate from './page_custom_content_template';
const PageCustomContentTemplateSource = require('!!raw-loader!./page_custom_content_template');

import PageLegacy from './page';
const PageLegacySource = require('!!raw-loader!./page');

export const PageExample = {
  title: 'Page',
  intro: (
    <>
      <EuiText>
        <p>
          Page layouts are modular and fit together in a precise manner, though
          certain parts can also be added or removed as needed. EUI provides
          both the indivdual page components and an over-arching template for
          easily creating some pre-defined layouts.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="document"
        title="The following examples showcase the both the template and custom built usages of the page components.">
        <p>
          You&apos;ll find the code for each in their own tab and if you go to
          full screen, you can see how they would behave in a typical
          applicaiton layout.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'A full page with everything',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: pageNewSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <div>
          <p>
            EUI provides a family of components using the{' '}
            <EuiCode>EuiPage</EuiCode> prefix that work together to build
            consistent page layouts that work responsively.
          </p>
          <ul>
            <li>
              <strong>EuiPage</strong> and <strong>EuiPageBody</strong> provide
              the overall wrapper with a column flex display.
            </li>
            <li>
              <strong>EuiPageSideBar</strong> provides a way to add side
              navigation that can be made <EuiCode>sticky</EuiCode> to scroll
              independent of the page content. See{' '}
              <Link to="/navigation/side-nav">
                <strong>EuiSideNav</strong>
              </Link>{' '}
              for contents.
            </li>
            <li>
              <Link to="/layout/page-header">
                <strong>EuiPageHeader</strong>
              </Link>{' '}
              provides a title, description, section for actions and possible
              tabs.
            </li>
            <li>
              <strong>EuiPageContent</strong> provides the main content
              container and extends{' '}
              <Link to="/layout/panel">
                <strong>EuiPanel</strong>
              </Link>
              .
            </li>
            <li>
              <strong>EuiPageContentBody</strong> wraps the content that comes
              after the page header.
            </li>
          </ul>
          <p>
            Or you can use the provided <strong>EuiPageTemplate</strong>, which
            is simply a shortcut for creating the different types of page layout
            patterns described in these docs. It is somewhat opinionated, but
            still has the ability to customize most of the inner components with
            props like <EuiCode>pageSideBarProps</EuiCode> and{' '}
            <EuiCode>pageContentProps</EuiCode>.
          </p>
        </div>
      ),
      props: {
        EuiPageTemplate,
        EuiPage,
        EuiPageBody,
        EuiPageSideBar,
        EuiPageHeader,
        EuiPageContent,
        EuiPageContentBody,
      },
      playground: pageTemplateConfig,
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageNew
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'Restricting page width',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageRestricingWidthTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageRestricingWidthSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            Most content does not scale well to the full width of the window.
            You can restrict this to a typical width and center the page by
            setting the <EuiCode>restrictWidth</EuiCode> prop to{' '}
            <EuiCode>true</EuiCode> on <strong>EuiPageHeader</strong> and{' '}
            <strong>EuiPageContent</strong>. You can also pass an integer to
            this property to max out the width at a custom pixel value or a
            string with a custom measurement.
          </p>
          <EuiCallOut
            size="s"
            title={
              <>
                The <strong>EuiPageTemplate</strong> allows setting this
                property at the top level and defaults to{' '}
                <EuiCode>true</EuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageRestricingWidthTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageRestricingWidth
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'Centered body',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredBodyTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredBodySource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            When the content for the page is minimal or in an empty/pre-setup
            state, the page content can be centered vertically and horizontally.
            We recommend then using the{' '}
            <Link to="/display/empty-prompt">
              <strong>EuiEmptyPrompt</strong>
            </Link>{' '}
            for the content.
          </p>
          <EuiCallOut
            size="s"
            title={
              <>
                This layout can be achieved in <strong>EuiPageTemplate</strong>{' '}
                by setting <EuiCode>{'template="centeredBody"'}</EuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageCenteredBodyTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageCenteredBody
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
      props: { EuiPageTemplate, EuiEmptyPrompt },
    },
    {
      title: 'Centered content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredContentTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageCenteredContentSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            Similar to the previous example, you can create a centered panel to
            emphasize incompleteness even with a page header. For this setup, we
            recommend using setting <strong>EuiPageContent</strong> to use the{' '}
            <EuiCode>subdued</EuiCode> color as to not have nested shadows.
          </p>
          <EuiCallOut
            size="s"
            title={
              <>
                This layout can be achieved in <strong>EuiPageTemplate</strong>{' '}
                by setting <EuiCode>{'template="centeredContent"'}</EuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageCenteredContentTemplate
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            ) : (
              <PageCenteredContent
                button={<Button />}
                content={<Content />}
                sideNav={<SideNav />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'A simple page with tabs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            When leaving off the <strong>EuiPageSideBar</strong>, we recommend a
            slightly different configuration by pulling the page hader out of
            the <strong>EuiPageContent</strong> and removing the shadow from{' '}
            <strong>EuiPageContent</strong>.
          </p>
          <EuiCallOut
            size="s"
            title={
              <>
                This layout will automatically be achieved through{' '}
                <strong>EuiPageTemplate</strong> by leaving{' '}
                <EuiCode>pageSideBar</EuiCode> as <EuiCode>undefined</EuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageSimpleTemplate button={<Button />} content={<Content />} />
            ) : (
              <PageSimple button={<Button />} content={<Content />} />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'Simple layout with centered body',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleCenteredBodyTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleCenteredBodySource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <p>
          Similar to the version with a side bar, when the content for the page
          is minimal or in an empty/pre-setup state, the page content can be
          centered vertically and horizontally. We recommend then using the{' '}
          <Link to="/display/empty-prompt">
            <strong>EuiEmptyPrompt</strong>
          </Link>{' '}
          for the content.
        </p>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageSimpleCenteredBodyTemplate
                button={<Button />}
                content={<Content />}
              />
            ) : (
              <PageSimpleCenteredBody
                button={<Button />}
                content={<Content />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'Simple layout with centered content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleEmptyContentTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageSimpleEmptyContentSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <p>
          Also similar to the previous examples, you can create a centered panel
          to emphasis incompleteness even with a page header. For this setup,
          You will need to use nested <strong>EuiPageContent</strong> components
          in order for the centering to work.
        </p>
      ),
      demo: (
        <PageDemo centered>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageSimpleEmptyContentTemplate
                button={<Button />}
                content={<Content />}
              />
            ) : (
              <PageSimpleEmptyContent
                button={<Button />}
                content={<Content />}
              />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'A simple page layout with custom content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageCustomContentTemplateSource,
          displayName: 'Template JS',
        },
        {
          type: GuideSectionTypes.JS,
          code: PageCustomContentSource,
          displayName: 'Components JS',
        },
      ],
      text: (
        <>
          <p>
            You can replace the inner parts of <strong>EuiPageBody</strong> with
            your own content, with or without a page header. This allows you to
            create dashboard style layouts with lots of panels. It is not
            recommended, however, to use this setup when you also have side bar.
          </p>
          <EuiCallOut
            size="s"
            title={
              <>
                This layout can be achieved in <strong>EuiPageTemplate</strong>{' '}
                by setting <EuiCode>{'template="empty"'}</EuiCode>.
              </>
            }
          />
        </>
      ),
      demo: (
        <PageDemo>
          {(Button, Content, SideNav, showTemplate) =>
            showTemplate ? (
              <PageCustomContentTemplate button={<Button />} />
            ) : (
              <PageCustomContent button={<Button />} />
            )
          }
        </PageDemo>
      ),
    },
    {
      title: 'Legacy layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: PageLegacySource,
        },
      ],
      text: (
        <p>
          In previous versions of EUI, we emulated page layouts where the{' '}
          <strong>EuiPageContent</strong> had margins all around created by
          padding on <strong>EuiPage</strong>. This layout is still achievable
          but not through <strong>EuiPageTemplate</strong>. You must use the{' '}
          <strong>EuiPage</strong> components manually as seen in this example.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightLayout--legacy">
          <PageLegacy />
        </div>
      ),
      props: {
        EuiPage,
        EuiPageBody,
        EuiPageSideBar,
        EuiPageHeader,
        EuiPageContent,
        EuiPageContentBody,
      },
    },
  ],
};
