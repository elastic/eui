import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiBreadcrumbs,
  EuiCode,
  EuiText,
  EuiCallOut,
} from '../../../../src/components';
import { BreadcrumbProps, BreadcrumbResponsiveMaxCount } from './props';

import { breadcrumbsConfig } from './playground';

import Breadcrumbs from './breadcrumbs';
const breadcrumbsSource = require('!!raw-loader!./breadcrumbs');

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
import ResponsiveCustom from './responsive_custom';
const responsiveCustomSource = require('!!raw-loader!./responsive_custom');

import Truncate from './truncate';
const truncateSource = require('!!raw-loader!./truncate');
import TruncateSingle from './truncate_single';
const truncateSingleSource = require('!!raw-loader!./truncate_single');

import Max from './max';
const maxSource = require('!!raw-loader!./max');

import Color from './color';
const colorSource = require('!!raw-loader!./color');

import PopoverContent from './popover_content';
const popoverContentSource = require('!!raw-loader!./popover_content');

const props = {
  EuiBreadcrumbs,
  EuiBreadcrumb: BreadcrumbProps,
  EuiBreadcrumbResponsiveMaxCount: BreadcrumbResponsiveMaxCount,
};

export const BreadcrumbsExample = {
  title: 'Breadcrumbs',
  intro: (
    <EuiText>
      <p>
        <strong>EuiBreadcrumbs</strong> let the user track their progress within
        and back out of a UX flow and work well when used in combination with{' '}
        <Link to="/layout/page-header">
          <strong>EuiPageHeader</strong>
        </Link>
        . They are meant to be used at lower page level flows, while{' '}
        <Link to="/layout/header">
          <strong>EuiHeaderBreadcrumbs</strong>
        </Link>{' '}
        should be used for application-wide navigation.
      </p>
      <p>
        See{' '}
        <Link to="/navigation/tabs/guidelines">
          <strong>EuiTabs guidelines</strong>
        </Link>{' '}
        if your application requires breadcrumbs and tabs on the same view.
      </p>
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: breadcrumbsSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiBreadcrumbs</strong> requires an array of{' '}
            <strong>EuiBreadcrumb</strong> objects as{' '}
            <EuiCode>breadcrumbs</EuiCode> and handles truncation, including
            middle-truncation in the case of many items, and mobile
            responsiveness. Each item accepts an <EuiCode>href</EuiCode> prop,
            though we recommend the last item represent the current page and
            therefore the link is unnecessary.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <>
                For accessibility, it is highly recommended to provide a
                descriptive <EuiCode>aria-label</EuiCode> for each set of
                breadcrumbs.
              </>
            }
          />
        </>
      ),
      props,
      playground: breadcrumbsConfig,
      snippet: `<EuiBreadcrumbs
  breadcrumbs={[
    {
      text: 'Breadcrumb 1',
      href: '#',
    },
    {
      text: 'Breadcrumb 2',
      href: '#',
    },
    {
      text: 'Current',
      href: '#',
    },
  ]}
/>
`,
      demo: <Breadcrumbs />,
      demoPanelProps: { color: 'subdued' },
    },
    {
      title: 'Limit the number of breadcrumbs',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: maxSource,
        },
      ],
      text: (
        <>
          <p>
            Use the <EuiCode>max</EuiCode> prop to collapse breadcrumbs beyond a
            certain number. The center breadcrumbs will collapse into a single
            item allowing the user to navigate these items from within a
            popover.
          </p>
        </>
      ),
      props,
      snippet: `<EuiBreadcrumbs
  max={4}
  breadcrumbs={breadcrumbs}
/>`,
      demo: <Max />,
    },
    {
      title: 'Truncate each breadcrumb',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: truncateSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiBreadcrumbs</strong> will truncate the full set by
            default, forcing it to a single line and setting a max width on all
            items except for the last. You can turn this off by setting{' '}
            <EuiCode language="ts">{'truncate={false}'}</EuiCode>.
          </p>
        </>
      ),
      props,
      demo: <Truncate />,
      snippet: [
        `<EuiBreadcrumbs
  truncate={true}
  breadcrumbs={breadcrumbs}
/>`,
      ],
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: truncateSingleSource,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can force truncation on single breadcrumb{' '}
            <strong>item</strong> by adding{' '}
            <EuiCode>{'truncate: true'}</EuiCode> to the object.
          </p>
        </>
      ),
      props,
      demo: <TruncateSingle />,
      snippet: [
        `<EuiBreadcrumbs
  truncate={false}
  breadcrumbs={[
    {
      text: 'Breadcrumb',
      truncate: true,
    }
  ]}
/>`,
      ],
    },
    {
      title: 'Responsive',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: responsiveSource,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiBreadcrumbs</strong> are <EuiCode>responsive</EuiCode> by
            default and will collapse breadcrumbs on narrower screens. Setting{' '}
            <EuiCode language="ts">{'responsive={false}'}</EuiCode> will keep
            all breadcrumbs visible at all screens sizes.
          </p>
        </>
      ),
      props,
      snippet: [
        `<EuiBreadcrumbs
  responsive={false}
  max={null}
  breadcrumbs={breadcrumbs}
/>`,
      ],
      demo: <Responsive />,
    },
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: responsiveCustomSource,
        },
      ],
      text: (
        <>
          <p>
            Alternatively, you can change number of breadcrumbs that show per
            breakpoint by passing a custom responsive object.
          </p>
        </>
      ),
      props,
      snippet: [
        `<EuiBreadcrumbs
  responsive={{
    xs: 2,
    s: 5,
  }}
  max={null}
  breadcrumbs={breadcrumbs}
/>`,
      ],
      demo: <ResponsiveCustom />,
    },
    {
      title: 'Popover content',
      text: (
        <>
          <p>
            If you want a breadcrumb that toggles a popover, e.g. for an account
            switcher, you can use the <EuiCode>popoverContent</EuiCode> prop for
            this purpose. <strong>EuiBreadcrumbs</strong> will automatically
            handle rendering a popover indicator and popover accessibility best
            practies for you. We recommend using components such as{' '}
            <Link to="/navigation/context-menu">
              <strong>EuiContextMenu</strong>
            </Link>{' '}
            or{' '}
            <Link to="/display/list-group">
              <strong>EuiListGroup</strong>
            </Link>{' '}
            for displaying popover options, or potentially{' '}
            <Link to="/forms/selectable">
              <strong>EuiSelectable</strong>
            </Link>{' '}
            if you have many items that require filtering.
          </p>
          <p>
            You may also pass <EuiCode>popoverProps</EuiCode> with almost any
            prop that{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            accepts, such as customizing <EuiCode>panelPaddingSize</EuiCode> or{' '}
            <EuiCode>anchorPosition</EuiCode>. However, props that affect
            popover state such as <EuiCode>closePopover</EuiCode>,{' '}
            <EuiCode>isOpen</EuiCode>, and <EuiCode>button</EuiCode> are not
            accepted as they are controlled automatically by{' '}
            <strong>EuiBreadcrumbs</strong>.
          </p>
          <p>
            If you need the ability to close the breadcrumb popover from within
            your popover content, <EuiCode>popoverContent</EuiCode> accepts a
            render function that will be passed a{' '}
            <EuiCode>closePopover</EuiCode> callback, which you can invoke to
            close the popover. See the Deployment breadcrumb below for example
            usage.
          </p>
          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <>
                Please note that creating a breadcrumb with a popover will
                nullify any passed <EuiCode>href</EuiCode> or{' '}
                <EuiCode>onClick</EuiCode> behavior, as the <em>only</em>{' '}
                interaction the breadcrumb should have at that point is the
                popover toggle.
              </>
            }
          ></EuiCallOut>
        </>
      ),
      props,
      demo: <PopoverContent />,
      snippet: `<EuiBreadcrumbs
  breadcrumbs={[
    {
      text: 'My account',
      popoverContent: <AccountSwitcher />,
      popoverProps: { panelPaddingSize: 's' },
    }
  ]}
/>`,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: popoverContentSource,
        },
      ],
    },
    {
      title: 'Color for emphasis',
      text: (
        <>
          <p>
            Each breadcrumb extends the color options from{' '}
            <Link to="/navigation/link">
              <strong>EuiLink</strong>
            </Link>{' '}
            when either an <EuiCode>href</EuiCode> or <EuiCode>onClick</EuiCode>{' '}
            is applied . You can change the default color of a breadcrumb to add
            emphasis or indicate state like <EuiCode>{"'danger'"}</EuiCode> for
            an error. However, use caution not to use color alone.
          </p>
          <p>
            Please also note that link colors cannot be overriden for{' '}
            <EuiCode>type={'"application"'}</EuiCode> breadcrumbs.
          </p>
        </>
      ),
      props,
      demo: <Color />,
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: colorSource,
        },
      ],
    },
  ],
};
