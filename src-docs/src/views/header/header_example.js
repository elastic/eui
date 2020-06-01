import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';
import lightColors from '!!sass-vars-to-js-loader!../../../../src/global_styling/variables/_colors.scss';

import {
  EuiHeader,
  EuiHeaderAlert,
  EuiHeaderBreadcrumbs,
  EuiHeaderSection,
  EuiHeaderSectionItem,
  EuiHeaderSectionItemButton,
  EuiHeaderLogo,
  EuiCode,
  EuiHeaderLinks,
  EuiHeaderLink,
} from '../../../../src/components';

import { EuiHeaderSectionsProp } from './props';

import Header from './header';
const headerSource = require('!!raw-loader!./header');
const headerHtml = renderToHtml(Header);

import HeaderSections from './header_sections';
const headerSectionsSource = require('!!raw-loader!./header_sections');
const headerSectionsHtml = renderToHtml(HeaderSections);

import HeaderPosition from './header_position';
const headerPositionSource = require('!!raw-loader!./header_position');
const headerPositionHtml = renderToHtml(HeaderPosition);

import HeaderAlert from './header_alert';
const headerAlertSource = require('!!raw-loader!./header_alert');
const headerAlertHtml = renderToHtml(HeaderAlert);

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');
const headerLinksHtml = renderToHtml(HeaderLinks);

import HeaderDark from './header_dark';
const headerDarkSource = require('!!raw-loader!./header_dark');
const headerDarkHtml = renderToHtml(HeaderDark);

import HeaderStacked from './header_stacked';
const headerStackedSource = require('!!raw-loader!./header_stacked');
const headerStackedHtml = renderToHtml(HeaderStacked);

const headerSnippet = `<EuiHeader>
  <EuiHeaderSection grow={false}>
    <EuiHeaderSectionItem border="right">
      <!-- HeaderSectionItem content -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>

  <!-- You can render breadcrumbs here using EuiHeaderBreadcrumbs -->

  <EuiHeaderSection side="right">
    <EuiHeaderSectionItem>
      <!-- HeaderSectionItem content -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>
</EuiHeader>`;

const headerSectionsSnippet = `<EuiHeader
  sections={[
    {
      items: [...],
      borders: 'right',
      breadcrumbs: [...],
    },
    {
      items: [...],
      borders: 'none',
    },
    {
      items: [...],
    },
  ]}
/>`;

const headerLinksSnippet = `<EuiHeader>
  <EuiHeaderSectionItem border="right">
    <EuiHeaderLogo
      iconType="iconName"
      href="#"
    />
  </EuiHeaderSectionItem>

  <EuiHeaderLinks>
    <EuiHeaderLink href="#" isActive>
      <!-- First link -->
    </EuiHeaderLink>

    <EuiHeaderLink href="#">
      <!-- Second link -->
    </EuiHeaderLink>
  </EuiHeaderLinks>
</EuiHeader>`;

export const HeaderExample = {
  title: 'Header',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerHtml,
        },
      ],
      text: (
        <p>
          The header is made up of <strong>many</strong> individual components.
        </p>
      ),
      props: {
        EuiHeader,
        EuiHeaderBreadcrumbs,
        EuiHeaderSection,
        EuiHeaderSectionItem,
        EuiHeaderSectionItemButton,
        EuiHeaderLogo,
        EuiHeaderSectionsProp,
      },
      snippet: headerSnippet,
      demo: <Header />,
    },
    {
      title: 'Sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSectionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerSectionsHtml,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can pass an array objects to the{' '}
            <EuiCode>sections</EuiCode> props that takes a key of{' '}
            <EuiCode>items</EuiCode> (array of children to wrap in an{' '}
            <strong>EuiHeaderSectionItem</strong>) and/or{' '}
            <EuiCode>breadcrumbs</EuiCode> (array of{' '}
            <Link to="/navigation/breadcrumbs">breadcrumb</Link> objects). Each
            item in the array will be wrapped in an{' '}
            <strong>EuiHeaderSection</strong>.
          </p>
          <p>
            <strong>Note:</strong> Passing <EuiCode>sections</EuiCode> and{' '}
            <EuiCode>children</EuiCode> will disregard the{' '}
            <EuiCode>children</EuiCode> as it is not easily interpreted at what
            location the children should be placed.
          </p>
        </>
      ),
      props: {
        EuiHeader,
        EuiHeaderSectionsProp,
        EuiHeaderSection,
        EuiHeaderSectionItem,
      },
      snippet: headerSectionsSnippet,
      demo: <HeaderSections />,
    },
    {
      title: 'Fixed header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerPositionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerPositionHtml,
        },
      ],
      text: (
        <>
          <p>
            Most consumers need a header that does not scroll away with the page
            contents. You can apply this display by applying{' '}
            <EuiCode language="ts">{'position="fixed"'}</EuiCode>. It will also
            add a class of <EuiCode>.euiBody--headerIsFixed</EuiCode> to the
            window body.
          </p>
          <p>
            You will then need to apply your own padding to this class to afford
            for the header height. EUI supplies a helper mixin that also
            accounts for this height in flyouts and the collapsible nav. Simply
            add{' '}
            <EuiCode language="sass">@mixin euiHeaderAffordForFixed;</EuiCode>{' '}
            anywhere in your SASS.
          </p>
        </>
      ),
      snippet: [
        '<EuiHeader position="fixed" />',
        '@mixin euiHeaderAffordForFixed;',
      ],
      demo: <HeaderPosition />,
    },
    {
      title: 'Header links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerLinksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerLinksHtml,
        },
      ],
      text: (
        <p>
          If you&rsquo;re using EUI in a one-off site or page, you can use{' '}
          <strong>EuiHeaderLinks</strong>, &nbsp;
          <strong>EuiHeaderLinks</strong> instead of breadcrumbs.
        </p>
      ),
      props: {
        EuiHeaderLinks,
        EuiHeaderLink,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderLinks />,
    },
    {
      title: 'Dark theme',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerDarkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerDarkHtml,
        },
      ],
      text: (
        <p>
          To make site-wide navigation more prominent,{' '}
          <strong>EuiHeader</strong> supports reversing the colors to dark theme
          with <EuiCode language="js">{'theme="dark"'}</EuiCode>.{' '}
          <strong>However</strong>, it only supports a limited set of children
          that will also shift their theme. These components include{' '}
          <strong>EuiHeaderLogo, EuiHeaderLink(s),</strong> and{' '}
          <strong>EuiHeaderSectionItemButton</strong>. Any other content may not
          render correctly without custom configurations.
        </p>
      ),
      snippet: '<EuiHeader theme="dark" />',
      demo: <HeaderDark theme={lightColors} />,
    },
    {
      title: 'Alerts in the header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAlertSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerAlertHtml,
        },
      ],
      text: (
        <p>
          Use an <strong>EuiHeaderSectionItemButton</strong> to display
          additional information in an{' '}
          <Link to="/layout/popover">
            <strong>EuiPopover</strong>
          </Link>{' '}
          or{' '}
          <Link to="/layout/flyout">
            <strong>EuiFlyout</strong>
          </Link>
          , such as a user profile or news feed. In the latter example, this
          additional content can be presented in a list style format using{' '}
          <strong>EuiHeaderAlert</strong> components, as shown below.
        </p>
      ),
      props: {
        EuiHeaderAlert,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderAlert />,
    },
    {
      title: 'Stacked headers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerStackedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: headerStackedHtml,
        },
      ],
      text: (
        <p>
          Stacking multiple headers provide a great way to separate global
          navigation concerns. However, the{' '}
          <EuiCode language="ts">{'position="fixed"'}</EuiCode> option will not
          be aware of the number of headers. Therefore, if you do need fixed and
          stacked headers, you will need to apply the helper mixin and pass in
          the correct height to afford for.
        </p>
      ),
      snippet: [
        `<EuiHeader theme="dark" />
<EuiHeader />`,
        '@include euiHeaderAffordForFixed($euiHeaderHeightCompensation * 2);',
      ],
      demo: <HeaderStacked />,
    },
  ],
};
