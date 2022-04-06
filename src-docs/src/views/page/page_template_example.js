import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
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
  EuiBottomBar,
} from '../../../../src/components';

import PageBottomBar from './composed/page_bottom_bar';
const pageBottomBarSource = require('!!raw-loader!./composed/page_bottom_bar');
import PageBottomBarTemplate from './templates/page_bottom_bar';
const PageBottomBarTemplateSource = require('!!raw-loader!./templates/page_bottom_bar');

import PageRestrictingWidth from './composed/page_restricting_width';
const PageRestrictingWidthSource = require('!!raw-loader!./composed/page_restricting_width');
import PageRestrictingWidthTemplate from './templates/page_restricting_width';
const PageRestrictingWidthTemplateSource = require('!!raw-loader!./templates/page_restricting_width');

import PageFullHeight from './composed/page_full_height';
const PageFullHeightSource = require('!!raw-loader!./composed/page_full_height');
import PageFullHeightTemplate from './templates/page_full_height';
const PageFullHeightTemplateSource = require('!!raw-loader!./templates/page_full_height');

import PageCustomContent from './composed/page_custom_content';
const PageCustomContentSource = require('!!raw-loader!./composed/page_custom_content');
import PageCustomContentTemplate from './templates/page_custom_content';
const PageCustomContentTemplateSource = require('!!raw-loader!./templates/page_custom_content');

import PageLegacy from './page';
const PageLegacySource = require('!!raw-loader!./page');

export const PageTemplateExample = {
  title: 'Page template',
  intro: (
    <>
      <EuiText>
        <p>
          You can use the provided <strong>EuiPageTemplate</strong> as a
          shortcut for creating the different types of page layout patterns
          described in these docs. It is somewhat opinionated, but still has the
          ability to customize most of the inner components with props like{' '}
          <EuiCode>pageSideBarProps</EuiCode> and{' '}
          <EuiCode>pageContentProps</EuiCode>.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="documentation"
        title="The following examples showcase the both the template and custom built usages of the page components."
      >
        <p>
          You&apos;ll find the code for each in their own tab and if you go to
          fullscreen, you can see how they would behave in a typical application
          layout.
        </p>
      </EuiCallOut>
      <EuiSpacer />
      <EuiCallOut
        color="danger"
        iconType="alert"
        title="Do not nest multiple EuiPageTemplate components."
      >
        <p>
          The template is a very fragile component that will cause unexpected
          results if nested.
        </p>
      </EuiCallOut>
    </>
  ),
  sections: [
    {
      title: 'Simple page with header',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              For ease of placing as specific page title using{' '}
              <strong>EuiPageHeader</strong> within your page layouts,{' '}
              <strong>EuiPageTemplate</strong> provides passing the{' '}
              <strong>EuiPageHeader</strong> props directly to the{' '}
              <EuiCode>pageHeader</EuiCode> prop.
            </p>
            <p>
              When a page header is provided this way, it will always be the
              first content displayed within the page contents. For full
              customization, we suggest providing the{' '}
              <EuiCode>{'<EuiPageHeader />'}</EuiCode> component directly as a
              child.
            </p>
          </EuiText>
          <PageDemo
            slug="full-page"
            sidebar={false}
            props={{
              EuiPageTemplate,
              EuiPageHeader,
            }}
          />
        </>
      ),
      fullScreen: {
        slug: 'full-page',
        demo: <PageDemo slug="full-page" fullscreen sidebar={false} />,
        showButton: false,
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
              sidebar content, you can pass that content directly to{' '}
              <EuiCode>pageSideBar</EuiCode>. The template will automatically
              adjust the layout when this content is provided.
            </p>
            <p>
              You can make further adjustments to this portion of the template
              through the <EuiCode>pageSideBarProps</EuiCode> prop which is an
              object <strong>EuiPageSideBar</strong> props.
            </p>
          </EuiText>
          <PageDemo
            slug="sidebar"
            props={{
              EuiPageTemplate,
              EuiPageSideBar,
            }}
          />
        </>
      ),
      fullScreen: {
        slug: 'sidebar',
        demo: <PageDemo slug="sidebar" fullscreen />,
        showButton: false,
      },
    },
    {
      title: 'Restricting page width',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              Most content does not scale well to the full width of the window.
              You can restrict this to EUI&apos;s default max-width and center
              the page by setting the <EuiCode>restrictWidth</EuiCode> prop to{' '}
              <EuiCode>true</EuiCode>. You can also pass an integer to this
              property to set the max-width to a custom pixel value or a string
              with a custom measurement.
            </p>
          </EuiText>
          <PageDemo
            slug="restricting-page-width"
            showTemplates={['default']}
            composed={PageRestrictingWidth}
            template={PageRestrictingWidthTemplate}
            source={{
              template: PageRestrictingWidthTemplateSource,
              composed: PageRestrictingWidthSource,
            }}
            props={{
              EuiPageTemplate,
            }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'restricting-page-width',
        demo: (
          <PageDemo
            slug="restricting-page-width"
            composed={PageRestrictingWidth}
            template={PageRestrictingWidthTemplate}
            showTemplates={['default']}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Showing a bottom bar',
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
              a <EuiCode>bottomBar</EuiCode> prop for passing the contents of
              your bottom bar, and <EuiCode>bottomBarProps</EuiCode> that
              extends <strong>EuiBottomBar</strong>.
            </p>
            <p>
              It uses the <EuiCode>sticky</EuiCode> position so that it sticks
              to the bottom of and remains within the bounds of page body. This
              way it will never overlap the sidebar, no matter the screen size.
              It also means not needing to accommodate for the height of the bar
              in the body element.
            </p>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut
            color="warning"
            title={
              <>
                <strong>EuiPageTemplate</strong> only supports bottom bars in
                the <EuiCode>default</EuiCode> template.
              </>
            }
          />
          <PageDemo
            slug="bottom-bar"
            showTemplates={['default']}
            toggleSidebar
            composed={PageBottomBar}
            template={PageBottomBarTemplate}
            source={{
              template: PageBottomBarTemplateSource,
              composed: pageBottomBarSource,
            }}
            props={{
              EuiPageTemplate,
              EuiBottomBar,
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
            composed={PageBottomBar}
            template={PageBottomBarTemplate}
            showTemplates={['default']}
            toggleSidebar
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Empty pages or content',
      text: (
        <>
          <EuiText>
            <p>
              When the content is in an empty/pre-setup state, we recommend then
              using an{' '}
              <Link to="/display/empty-prompt">
                <strong>EuiEmptyPrompt</strong>
              </Link>{' '}
              to direct users on next steps. This prompt can be centered
              vertically and horizontally by using{' '}
              <EuiCode>{'template="centeredBody"'}</EuiCode>.
            </p>
            <p>
              We do not typically recommend this template when used in
              conjunction with a page header. Instead, we recommend using{' '}
              <EuiCode>{'template="centeredContent"'}</EuiCode> with a{' '}
              <EuiCode>subdued</EuiCode> <strong>EuiEmptyPrompt</strong> color.
            </p>
          </EuiText>
          <PageDemo
            slug="centered-body"
            toggleSidebar
            showTemplates={['centeredBody', 'centeredContent']}
            props={{ EuiPageTemplate, EuiEmptyPrompt }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'centered-body',
        demo: (
          <PageDemo
            slug="centered-body"
            toggleSidebar
            showTemplates={['centeredBody', 'centeredContent']}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Full height layout',
      wrapText: false,
      text: (
        <>
          <EuiText>
            <p>
              Though it is not recommended for most layouts, some require the
              control of scrolling to be handled through child components. You
              can achieve this through nested flex groups and overflow
              properties; adding certain combinations of{' '}
              <Link to="/utilities/css-utility-classes#overflows">
                CSS overflow utility classes
              </Link>{' '}
              to these children. There are a few <strong>caveats</strong> to
              understand when trying to achieve full height layouts with{' '}
              <strong>EuiPageTemplate</strong>.
            </p>
            <ol>
              <li>
                Using the <EuiCode>{'fullHeight'}</EuiCode> prop adds an extra
                layer of{' '}
                <Link to="/layout/flex">
                  <strong>EuiFlexGroup</strong> and <strong>EuiFlexItem</strong>
                </Link>{' '}
                around the template children to negate the negative margins.
              </li>
              <li>
                Using <EuiCode>{'fullHeight=true'}</EuiCode> will automatically
                add scrolling behavior to the <strong>EuiFlexItem</strong> that
                wraps the children.
              </li>
              <li>
                Using <EuiCode>{'fullHeight="noscroll"'}</EuiCode> removes all
                scrolling behavior and your layouts will break if you do not
                manually add them.
              </li>
              <li>
                When using either values for <EuiCode>{'fullHeight'}</EuiCode>,
                there will always be a minimum height of{' '}
                <EuiCode>460px</EuiCode> to the page contents.
              </li>
              <li>
                Full height layouts are restricted to{' '}
                <strong>medium breakpoints</strong> and above. We recommend
                retaining any responsive behavior and allowing normal page
                scroll on smaller screens.
              </li>
            </ol>
          </EuiText>
          <EuiSpacer />
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            size="s"
            title={
              <>
                When applying the <EuiCode>.eui-yScroll</EuiCode> class, it is
                recommended to also apply <EuiCode>tabindex=0</EuiCode> to
                ensure keyboard users can scroll these containers.
              </>
            }
          />
          <PageDemo
            slug="full-height"
            composed={PageFullHeight}
            template={PageFullHeightTemplate}
            showTemplates={['empty']}
            source={{
              template: PageFullHeightTemplateSource,
              composed: PageFullHeightSource,
            }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'full-height',
        demo: (
          <PageDemo
            slug="full-height"
            composed={PageFullHeight}
            template={PageFullHeightTemplate}
            showTemplates={['empty']}
            fullscreen
          />
        ),
      },
    },
    {
      title: 'Custom content',
      text: (
        <>
          <EuiText>
            <p>
              You can ignore most of the configurations of{' '}
              <strong>EuiPageTemplate</strong> and pass your own completely
              custom content, with or without a custom page header. This allows
              you to create dashboard style layouts with lots of panels or
              prepend the page contents with a callout.
            </p>
          </EuiText>
          <PageDemo
            slug="simple-custom-content"
            composed={PageCustomContent}
            template={PageCustomContentTemplate}
            showTemplates={['empty']}
            pageHeaderTabs={false}
            source={{
              template: PageCustomContentTemplateSource,
              composed: PageCustomContentSource,
            }}
          />
        </>
      ),
      fullScreen: {
        showButton: false,
        slug: 'simple-custom-content',
        demo: (
          <PageDemo
            slug="simple-custom-content"
            composed={PageCustomContent}
            template={PageCustomContentTemplate}
            showTemplates={['empty']}
            pageHeaderTabs={false}
            fullscreen
          />
        ),
      },
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
