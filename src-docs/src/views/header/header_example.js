import React from 'react';
import { Link } from 'react-router-dom';

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

import HeaderSections from './header_sections';
const headerSectionsSource = require('!!raw-loader!./header_sections');

import HeaderPosition from './header_position';
const headerPositionSource = require('!!raw-loader!./header_position');

import HeaderAlert from './header_alert';
const headerAlertSource = require('!!raw-loader!./header_alert');

import HeaderAnimate from './header_animate';
const headerAnimateSource = require('!!raw-loader!./header_animate');

import HeaderLinks from './header_links';
const headerLinksSource = require('!!raw-loader!./header_links');

import HeaderDark from './header_dark';
const headerDarkSource = require('!!raw-loader!./header_dark');

import HeaderStacked from './header_stacked';
const headerStackedSource = require('!!raw-loader!./header_stacked');

import HeaderElasticPattern from './header_elastic_pattern';
const headerElasticPatternSource = require('!!raw-loader!./header_elastic_pattern');

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
</EuiHeader>
`;

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
      href=""
    />
  </EuiHeaderSectionItem>

  <EuiHeaderLinks>
    <EuiHeaderLink href="" isActive>
      <!-- First link -->
    </EuiHeaderLink>

    <EuiHeaderLink href="">
      <!-- Second link -->
    </EuiHeaderLink>
  </EuiHeaderLinks>
</EuiHeader>`;

const headerAlertSnippet = `<EuiHeader>
  <EuiHeaderSection grow={false}>
    <EuiHeaderSectionItem>
      <!-- HeaderSectionItem content -->
    </EuiHeaderSectionItem>
  </EuiHeaderSection>

  <EuiHeaderSection side="right">
    <EuiHeaderSectionItem>
      <!-- Button to trigger portal content like a EuiPopover or a EuiFlyout -->
      <EuiHeaderSectionItemButton
        aria-controls={portalContentId}
        aria-expanded={isPortalContentVisible}
        aria-label="Open portal content"
        onClick={showPortalContent}
        notification={showNotification}
      >
        <EuiIcon type="bell" />
      </EuiHeaderSectionItemButton>
    </EuiHeaderSectionItem>
  </EuiHeaderSection>
</EuiHeader>`;

const headerAnimateSnippet = `const bellRef = useRef();

// wrapping the 'euiAnimate' methods to make them available through this component's 'ref'
const euiAnimate = useCallback(() => {
  bellRef.current?.euiAnimate();
}, []);

// we're using the useImperativeHandle which allows the child to expose a function to the parent
useImperativeHandle(
  ref,
  () => ({
    euiAnimate,
  }),
  [euiAnimate]
);

const bellButton = (
  <EuiHeaderSectionItemButton
    ref={bellRef}
    aria-label={ariaLabel}
    notification={notification}>
    <EuiIcon type="bell" />
  </EuiHeaderSectionItemButton>
);`;

export const HeaderExample = {
  title: 'Header',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSource,
        },
      ],
      text: (
        <>
          <p>
            The header is made up of <strong>many</strong> individual components
            starting with <strong>EuiHeader</strong> as the container. You can
            manually configure your header with the following related
            components:
          </p>
          <ul>
            <li>
              <strong>EuiHeaderSection</strong>: Left/right containers with flex
              properties.
            </li>
            <li>
              <strong>EuiHeaderSectionItem</strong>: Containers for individual
              header items as flex items.
            </li>
            <li>
              <strong>EuiHeaderSectionItemButton</strong>: Specialized button
              that extends{' '}
              <Link to="/navigation/button#empty-button">
                <strong>EuiButtonEmpty</strong>
              </Link>{' '}
              but styled to fit the height of the header with additional{' '}
              <EuiCode>notification</EuiCode> props.
            </li>
            <li>
              <strong>EuiHeaderLogo</strong>: A helpful component for creating a
              linked logo that fits within the header sizing.
            </li>
            <li>
              <strong>EuiHeaderBreadcrumbs</strong>: A set of{' '}
              <Link to="/navigation/breadcrumbs">
                <strong>EuiBreadcrumbs</strong>
              </Link>{' '}
              specifically stylized to fit inside the header.
            </li>
          </ul>
        </>
      ),
      props: {
        EuiHeader,
        EuiHeaderSection,
        EuiHeaderSectionItem,
        EuiHeaderSectionItemButton,
        EuiHeaderLogo,
        EuiHeaderBreadcrumbs,
        EuiHeaderSectionsProp,
      },
      snippet: headerSnippet,
      demo: <Header />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Sections',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerSectionsSource,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can pass an array of objects to the{' '}
            <EuiCode>sections</EuiCode> prop that takes a key of{' '}
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
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Header links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerLinksSource,
        },
      ],
      text: (
        <>
          <p>
            In addition to the components mentioned prior, which lend themselves
            to more application style navigation patterns,{' '}
            <strong>EuiHeaderLinks</strong> and <strong>EuiHeaderLink</strong>{' '}
            supply the ability to inline a list of navigational or menu style
            links.
          </p>
          <p>
            <strong>EuiHeaderLinks</strong> comes with responsive functionality
            built-in which will convert the inline list of links to a popover
            list triggered by a <strong>EuiHeaderSectionItemButton</strong>. You
            can adjust at which breakpoints to switch to the popover display by
            passing your own array of named breakpoints to{' '}
            <EuiCode>popoverBreakpoints</EuiCode>.
          </p>
        </>
      ),
      props: {
        EuiHeaderLinks,
        EuiHeaderLink,
      },
      snippet: headerLinksSnippet,
      demo: <HeaderLinks />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Fixed header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerPositionSource,
        },
      ],
      text: (
        <>
          <p>
            Most consumers need a header that does not scroll away with the page
            contents. You can apply this display by applying the property{' '}
            <EuiCode language="ts">{'position="fixed"'}</EuiCode>. This will
            also add a class of <EuiCode>.euiBody--headerIsFixed</EuiCode> to
            the window body.
          </p>
          <p>
            You will then need to apply your own padding to this body class to
            afford for the header height. EUI supplies a helper mixin that also
            accounts for this height in flyouts and the collapsible nav. Simply
            add{' '}
            <EuiCode language="sass">@include euiHeaderAffordForFixed;</EuiCode>{' '}
            anywhere in your SASS.
          </p>
        </>
      ),
      snippet: [
        '<EuiHeader position="fixed" />',
        '@include euiHeaderAffordForFixed;',
      ],
      demo: <HeaderPosition />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Dark theme',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerDarkSource,
        },
      ],
      text: (
        <p>
          To make site-wide navigation more prominent,{' '}
          <strong>EuiHeader</strong> supports reversing the colors to dark theme
          with <EuiCode language="js">{'theme="dark"'}</EuiCode>. However, it
          only supports a <strong>limited set of children</strong> that will
          also shift their theme. These components include{' '}
          <strong>EuiHeaderLogo, EuiHeaderLink(s),</strong>{' '}
          <strong>EuiHeaderSectionItemButton</strong> and{' '}
          <strong>EuiSelectableTemplateSitewide</strong>. Any other content may
          not render correctly without custom configurations.
        </p>
      ),
      snippet: '<EuiHeader theme="dark" />',
      demo: <HeaderDark theme={lightColors} />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Portal content in the header',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAlertSource,
        },
      ],
      text: (
        <>
          <p>
            Use an <strong>EuiHeaderSectionItemButton</strong> to display
            additional information in <Link to="/layout/popover">popovers</Link>{' '}
            or <Link to="/layout/flyout">flyouts</Link>, such as a user profile
            or news feed. When using{' '}
            <Link to="/layout/flyout">
              <strong>EuiFlyout</strong>
            </Link>
            , be sure to wrap it in a{' '}
            <Link to="/utilities/portal">
              <strong>EuiPortal</strong>
            </Link>
            . When using an{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            in conjunction with a <strong>fixed</strong> header, be sure to add
            the <EuiCode>repositionOnScroll</EuiCode> prop to the popover.
          </p>
          <p>
            The example below shows how to incorporate{' '}
            <strong>EuiHeaderAlert</strong> components to show a list of updates
            inside a{' '}
            <Link to="/layout/flyout">
              <strong>EuiFlyout</strong>
            </Link>{' '}
            and a{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            .
          </p>
        </>
      ),
      props: {
        EuiHeaderAlert,
        EuiHeaderSectionItemButton,
      },
      snippet: headerAlertSnippet,
      demo: <HeaderAlert />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Header notifications',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerAnimateSource,
        },
      ],
      text: (
        <>
          <p>
            To alert or notify users about the additional information they are
            receiving, use the <strong>EuiHeaderSectionItemButton</strong>{' '}
            <EuiCode>notification</EuiCode> prop. You can pass a{' '}
            <EuiCode>node</EuiCode> that will render inside a{' '}
            <strong>EuiBadgeNotification</strong> or pass{' '}
            <EuiCode>true</EuiCode> to render a simple dot. You can also animate
            the button by calling the <EuiCode>euiAnimate()</EuiCode> method on
            the <strong>EuiHeaderSectionItemButton</strong>{' '}
            <EuiCode>ref</EuiCode>.
          </p>
        </>
      ),
      props: {
        EuiHeaderSectionItemButton,
      },
      snippet: headerAnimateSnippet,
      demo: <HeaderAnimate />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'Stacked headers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerStackedSource,
        },
      ],
      text: (
        <p>
          Stacking multiple headers provides a great way to separate global
          navigation concerns. However, the{' '}
          <EuiCode language="ts">{'position="fixed"'}</EuiCode> option will not
          be aware of the number of headers. If you do need fixed{' '}
          <strong>and</strong> stacked headers, you will need to apply the SASS
          helper mixin and pass in the correct height to afford for.
        </p>
      ),
      snippet: [
        `<EuiHeader theme="dark" position="fixed" />
<EuiHeader position="fixed" />`,
        '@include euiHeaderAffordForFixed($euiHeaderHeightCompensation * 2);',
      ],
      demo: <HeaderStacked />,
      demoPanelProps: {
        color: 'subdued',
      },
    },
    {
      title: 'The Elastic navigation pattern',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: headerElasticPatternSource,
        },
      ],
      text: (
        <>
          <h3>Putting it all together</h3>
          <p>
            The button below will launch a full screen example that includes two{' '}
            <strong>EuiHeaders</strong> with all the appropriate navigation
            pieces including{' '}
            <Link to="/navigation/collapsible-nav">
              <strong>EuiCollapsibleNav</strong>,
            </Link>{' '}
            <strong>EuiHeaderAlerts</strong>, user menu, deployment switcher,
            space selector, <strong>EuiHeaderBreadcrumbs</strong> and{' '}
            <strong>EuiHeaderLinks</strong> for app menu items.
          </p>
          <p>
            This is just a pattern and should be treated as such. Consuming
            applications will need to recreate the pattern according to their
            context and save the states as is appropriate to their data store.
          </p>
        </>
      ),
      fullScreen: {
        slug: 'elastic-pattern',
        demo: <HeaderElasticPattern theme={lightColors} />,
      },
    },
  ],
};
