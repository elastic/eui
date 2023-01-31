import React from 'react';

import { GuideSectionTypes } from '../../components';
import {
  EuiCode,
  EuiText,
  EuiSkeletonTitle,
  EuiSkeletonText,
  EuiSkeletonRectangle,
  EuiSkeletonCircle,
} from '../../../../src/components';

import {
  skeletonTextConfig,
  skeletonTitleConfig,
  skeletonCircleConfig,
  skeletonRectangleConfig,
} from './playground';

import SkeletonCircle from './skeleton_circle';
const skeletonCircleSource = require('!!raw-loader!./skeleton_circle');
const skeletonCircleSnippet = `<EuiSkeletonCircle size="m" isLoading={isLoading} contentAriaLabel="Avatar">
  <EuiAvatar size="s" name="Sally" />
</EuiSkeletonCircle>`;

import SkeletonText from './skeleton_text';
const skeletonTextSource = require('!!raw-loader!./skeleton_text');
const skeletonTextSnippet = `<EuiSkeletonText lines={3} size="m" isLoading={isLoading} contentAriaLabel="Example text">
  <EuiText size="m"><p>Example text</p></EuiText>
</EuiSkeletonText>`;

import SkeletonTitle from './skeleton_title';
const skeletonTitleSource = require('!!raw-loader!./skeleton_title');
const skeletonTitleSnippet = `<EuiSkeletonTitle size="l" isLoading={isLoading} contentAriaLabel="Example title">
  <EuiTitle><h1>Example title</h1></EuiTitle>
</EuiSkeletonTitle>`;

import SkeletonRectangle from './skeleton_rectangle';
const skeletonRectangleSource = require('!!raw-loader!./skeleton_rectangle');

const skeletonRectangleSnippet =
  '<EuiSkeletonRectangle width="200px" height="20px" borderRadius="m" />';

export const SkeletonExample = {
  title: 'Skeleton',
  intro: (
    <EuiText>
      <p>
        The <strong>EuiSkeleton</strong> components are placeholder components
        for content which haven&apos;t yet loaded. They provide a meaningful
        preview and avoid layout content shifts.
      </p>
    </EuiText>
  ),
  sections: [
    {
      title: 'Text',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: skeletonTextSource,
        },
      ],
      text: (
        <EuiText>
          <p>
            Use <strong>EuiSkeletonText</strong> to display a placeholder for
            multiple lines of text.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonText },
      snippet: skeletonTextSnippet,
      demo: <SkeletonText />,
      playground: skeletonTextConfig,
    },
    {
      title: 'Title',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonTitleSource,
        },
      ],
      text: (
        <EuiText>
          <p>
            Use <strong>EuiSkeletonTitle</strong> to display a placeholder for
            heading titles.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonTitle },
      snippet: skeletonTitleSnippet,
      demo: <SkeletonTitle />,
      playground: skeletonTitleConfig,
    },
    {
      title: 'Circle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonCircleSource,
        },
      ],
      text: (
        <EuiText>
          <p>
            Use <strong>EuiSkeletonCircle</strong> to display a circular
            preview, mainly for avatars.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonCircle },
      snippet: skeletonCircleSnippet,
      demo: <SkeletonCircle />,
      playground: skeletonCircleConfig,
    },
    {
      title: 'Rectangle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonRectangleSource,
        },
      ],
      text: (
        <EuiText>
          <p>
            <strong>EuiSkeletonRectangle</strong> allows you define a large and
            customizable shape via its <EuiCode>width</EuiCode>,{' '}
            <EuiCode>height</EuiCode>, and <EuiCode>borderRadius</EuiCode>{' '}
            props.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonRectangle },
      snippet: skeletonRectangleSnippet,
      demo: <SkeletonRectangle />,
      playground: skeletonRectangleConfig,
    },
  ],
};
