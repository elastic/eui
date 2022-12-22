import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';
import {
  EuiSkeletonRectProps,
  EuiSkeletonTextProps,
  EuiSkeletonItemProps,
  EuiSkeletonCircleProps,
} from '../../../../src/components/EuiSkeleton';

import { skeletonConfig } from './playground';

import SkeletonCircle from './skeleton_circle';
const skeletonCircleSource = require('!!raw-loader!./skeleton_circle');

import SkeletonText from './skeleton_text';
const skeletonTextSource = require('!!raw-loader!./skeleton_text');

import SkeletonRect from './skeleton_rect';
const skeletonRectSource = require('!!raw-loader!./skeleton_rect');

import SkeletonItem from './skeleton_item';
const skeletonItemSource = require('!!raw-loader!./skeleton_item');

const skeletonCircleSnippet = '<EuiSkeletonCircle size="m" />';
const skeletonTextSnippet = '<EuiSkeletonText lines={3} />';
const skeletonRectSnippet = '<EuiSkeletonRect width="200px" height="20px" />';
const skeletonItemSnippet = '<EuiSkeletonItem width="200px" height="20px" />';

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
          The <strong>Circle</strong> type display a circular preview mainly for avatars.
        </p>
      ),
      props: { },
      snippet: skeletonCircleSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton__circle">
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
        <div className="guideDemo__highlightSkeleton__text">
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
          The <strong>Rect</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { },
      snippet: skeletonRectSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton__rect">
          <SkeletonRect />
        </div>
      ),
    },
    {
      title: 'Item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonItemSource,
        },
      ],
      text: (
        <p>
          The <strong>Item</strong> type display a.
        </p>
      ),
      props: { },
      snippet: skeletonItemSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton__item">
          <SkeletonItem />
        </div>
      ),
    },
  ],
};
