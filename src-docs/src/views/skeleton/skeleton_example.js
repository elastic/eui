import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSkeleton } from '../../../../src/components';

import { skeletonConfig } from './playground';

import Skeleton from './skeleton';
const skeletonSource = require('!!raw-loader!./skeleton');

const skeletonSnippet = '<EuiSkeleton size="xs" />';

export const SkeletonExample = {
  title: 'Skeleton',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiSkeleton</strong> component is for...
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
