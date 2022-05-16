import React from 'react';
import { Link } from 'react-router-dom';

import { PageDemo } from './_page_demo';

import {
  EuiCode,
  EuiPageHeader,
  EuiPageSideBar,
  EuiText,
  EuiEmptyPrompt,
  EuiPageTemplate,
  EuiCallOut,
  EuiSpacer,
  EuiBottomBar,
} from '../../../../src/components';

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
            showTabs
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
        demo: <PageDemo slug="full-page" fullscreen showTabs sidebar={false} />,
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
            toggleSidebar={true}
            togglePageHeader={false}
            props={{
              EuiPageTemplate,
              EuiPageSideBar,
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
            toggleSidebar={true}
            togglePageHeader={false}
            toggleSidebarSticky={true}
          />
        ),
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
            togglePageHeader={false}
            toggleSidebar={true}
            togglePanelled={false}
            toggleRestrictedWidth={true}
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
            togglePageHeader={false}
            toggleSidebar={true}
            togglePanelled={false}
            toggleRestrictedWidth={true}
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
            bottomBar
            toggleSidebar
            togglePageHeader={false}
            togglePanelled={false}
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
            bottomBar
            toggleSidebar
            togglePageHeader={false}
            togglePanelled={false}
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
            emptyPrompt
            toggleSidebar
            props={{ EuiPageTemplate, EuiEmptyPrompt }}
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
            toggleSidebar
            emptyPrompt={true}
            fullscreen
          />
        ),
      },
    },
  ],
};
