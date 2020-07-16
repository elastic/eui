import React from 'react';
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiBreadcrumbs } from '../../../../src/components';
import { BreadcrumbResponsiveMaxCount, BreadcrumbProps } from './props';

import Breadcrumbs from './breadcrumbs';
const breadcrumbsSource = require('!!raw-loader!./breadcrumbs');
const breadcrumbsHtml = renderToHtml(Breadcrumbs);

import Responsive from './responsive';
const responsiveSource = require('!!raw-loader!./responsive');
const responsiveHtml = renderToHtml(Responsive);

import Truncate from './truncate';
const truncateSource = require('!!raw-loader!./truncate');
const truncateHtml = renderToHtml(Truncate);

import Max from './max';
const maxSource = require('!!raw-loader!./max');
const maxHtml = renderToHtml(Max);

const breadcrumpProps = {
  EuiBreadcrumbs,
  EuiBreadcrumb: BreadcrumbProps,
  EuiBreadcrumbResponsiveMaxCount: BreadcrumbResponsiveMaxCount,
};

export const BreadcrumbsExample = {
  title: 'Breadcrumbs',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: breadcrumbsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: breadcrumbsHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiBreadcrumbs</strong> let the user track their progress
          within and back out of a UX flow. You can provide an{' '}
          <EuiCode>href</EuiCode> prop on any breadcrumb item that you wish to
          make clickable, including the last item, though we recommend the last
          item represent the current page and therefore the link is unnecessary.
          They work well within{' '}
          <Link to="/layout/page">
            <strong>EuiPageContentHeader</strong>
          </Link>{' '}
          but be careful not to use them within an app that also uses{' '}
          <Link to="/layout/header">
            <strong>EuiHeaderBreadcrumbs</strong>
          </Link>
          .
        </p>
      ),
      props: breadcrumpProps,
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
  ]}
  aria-label=""
/>
`,
      demo: <Breadcrumbs />,
    },
    {
      title: 'Limit the number of breadcrumbs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: maxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: maxHtml,
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
  aria-label=""
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
        {
          type: GuideSectionTypes.HTML,
          code: truncateHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>EuiBreadcrumbs</strong> will truncate the full set by
            default, forcing it to a single line and setting a max width on all
            items except for the last. You can turn this off by setting{' '}
            <EuiCode language="ts">{'truncate={false}'}</EuiCode>. You can also
            force truncation on single breadcrumb <strong>item</strong> by
            adding <EuiCode>{'truncate: true'}</EuiCode>.
          </p>
        </>
      ),
      props: breadcrumpProps,
      demo: <Truncate />,
      snippet: [
        `<EuiBreadcrumbs
  truncate={true}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
        `<EuiBreadcrumbs
  truncate={false}
  breadcrumbs={[
    {
      text: 'Breadcrumb',
      truncate: true,
    }
  ]}
  aria-label=""
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
        {
          type: GuideSectionTypes.HTML,
          code: responsiveHtml,
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
          <p>
            Alternatively, you can change number of breadcrumbs that show per
            breakpoint by passing a custom responsive object.
          </p>
        </>
      ),
      props: breadcrumpProps,
      snippet: [
        `<EuiBreadcrumbs
  responsive={false}
  max={null}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
        `<EuiBreadcrumbs
  responsive={{
    xs: 2,
    s: 5,
  }}
  max={null}
  breadcrumbs={breadcrumbs}
  aria-label=""
/>`,
      ],
      demo: <Responsive />,
    },
  ],
};
