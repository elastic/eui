import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiBreadcrumbs, EuiText } from '../../../../src/components';
import { BreadcrumbResponsiveMaxCount, BreadcrumbProps } from './props';

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
import { EuiCallOut } from '../../../../src/components/call_out';
const maxSource = require('!!raw-loader!./max');

const breadcrumpProps = {
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
    </EuiText>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
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
      props: breadcrumpProps,
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
          type: GuideSectionTypes.JS,
          code: maxSource,
        },
      ],
      text: (
        <>
          <p>
            Use the <EuiCode>max</EuiCode> prop to collapse breadcrumbs beyond a
            certain number. The center breadcrumbs will collpase into a single
            item allowing the user to navigate these items from within a
            popover.
          </p>
        </>
      ),
      props: breadcrumpProps,
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
          type: GuideSectionTypes.JS,
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
      props: breadcrumpProps,
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
          type: GuideSectionTypes.JS,
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
      props: breadcrumpProps,
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
          type: GuideSectionTypes.JS,
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
      props: breadcrumpProps,
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
          type: GuideSectionTypes.JS,
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
      props: breadcrumpProps,
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
  ],
};
