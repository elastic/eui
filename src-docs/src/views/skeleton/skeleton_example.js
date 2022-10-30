import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSkeleton } from '../../../../src/components';

import { skeletonConfig } from './playground';

import Skeleton from './skeleton';
const skeletonSource = require('!!raw-loader!./skeleton');

const skeletonSnippet = '<EuiSkeleton type="rect" width="200px" height="20px" />';

export const SkeletonExample = {
  title: 'Skeleton',
  intro: (
    <p>
      The <strong>EuiSkeleton</strong> component is for display a placeholder preview of your content before the data gets loaded to provide a meaningful preview and avoid layout content shifts.
    </p>
  ),
  sections: [
    {
      title: 'Avatar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonSource,
        },
      ],
      text: (
        <p>
          The <strong>Avatar</strong> type display a circular avatar preview.
        </p>
      ),
      props: { EuiSkeleton },
      snippet: skeletonSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <Skeleton />
        </div>
      ),
      // playground: skeletonConfig,
    },
    {
      title: 'Text',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonSource,
        },
      ],
      text: (
        <p>
          The <strong>Text</strong> type display a variable number of text lines preview.
        </p>
      ),
      props: { EuiSkeleton },
      snippet: skeletonSnippet,
      demo: (
        <div className="guideDemo__highlightSkeleton">
          <Skeleton />
        </div>
      ),
      // playground: skeletonConfig,
    },
  ],
};
