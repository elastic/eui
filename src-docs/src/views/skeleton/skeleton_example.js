import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';
import {
  EuiSkeletonRectProps,
  EuiSkeletonTextProps,
  EuiSkeletonCircleProps,
} from '../../../../src/components/EuiSkeleton';

import { skeletonConfig } from './playground';

import SkeletonCircle from './skeleton_circle';
const skeletonCircleSource = require('!!raw-loader!./skeleton_circle');

import SkeletonText from './skeleton_text';
const skeletonTextSource = require('!!raw-loader!./skeleton_text');

import SkeletonRect from './skeleton_rect';
const skeletonRectSource = require('!!raw-loader!./skeleton_rect');

const skeletonCircleSnippet = '<EuiSkeleton type="circle" size="m" />';
const skeletonTextSnippet = '<EuiSkeleton type="text" lines={3} />';
const skeletonRectSnippet = '<EuiSkeleton type="rect" width="200px" height="20px" />';

export const SkeletonExample = {
  title: 'Skeleton',
  intro: (
    <p>
      The <strong>EuiSkeleton</strong> it's a placeholder component for content which hasn't yet loaded,
      in order to provide a meaningful preview and avoid layout content shifts.
    </p>
  ),
  sections: [
    {
      title: 'Circle',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonCircleSource,
        },
      ],
      text: (
        <p>
          The <strong>Circle</strong> type display a circular preview basically for avatars.
        </p>
      ),
      props: { },
      snippet: skeletonCircleSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <SkeletonCircle />
        </div>
      ),
    },
    {
      title: 'Text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonTextSource,
        },
      ],
      text: (
        <p>
          The <strong>Text</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { },
      snippet: skeletonTextSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <SkeletonText />
        </div>
      ),
    },
    {
      title: 'Rect',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonRectSource,
        },
      ],
      text: (
        <p>
          The <strong>Text</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { },
      snippet: skeletonRectSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <SkeletonRect />
        </div>
      ),
    },
    {
      title: 'Button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonTextSource,
        },
      ],
      text: (
        <p>
          The <strong>Text</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { },
      snippet: skeletonTextSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <SkeletonText />
        </div>
      ),
    },
    {
      title: 'Logo',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonTextSource,
        },
      ],
      text: (
        <p>
          The <strong>Text</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { },
      snippet: skeletonTextSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <SkeletonText />
        </div>
      ),
    },
    {
      title: 'Icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonTextSource,
        },
      ],
      text: (
        <p>
          The <strong>Text</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { },
      snippet: skeletonTextSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <SkeletonText />
        </div>
      ),
      // playground: skeletonConfig,
    },
  ],
};
