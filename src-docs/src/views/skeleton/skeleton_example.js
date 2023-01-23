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

// import { skeletonConfig } from './playground';

import SkeletonCircle from './skeleton_circle';
const skeletonCircleSource = require('!!raw-loader!./skeleton_circle');

import SkeletonText from './skeleton_text';
const skeletonTextSource = require('!!raw-loader!./skeleton_text');

import SkeletonTitle from './skeleton_title';
const skeletonTitleSource = require('!!raw-loader!./skeleton_title');

import SkeletonRectangle from './skeleton_rectangle';
const skeletonRectangleSource = require('!!raw-loader!./skeleton_rectangle');

const skeletonCircleSnippet = '<EuiSkeletonCircle size="m" />';
const skeletonTextSnippet = '<EuiSkeletonText lines={3} size="m" />';
const skeletonTitleSnippet = '<EuiSkeletonTitle size="l" />';
const skeletonRectangleSnippet =
  '<EuiSkeletonRectangle width="200px" height="20px" borderRadius="m" />';

export const SkeletonExample = {
  title: 'Skeleton',
  intro: (
    <EuiText>
      <p>
        The <strong>EuiSkeleton</strong> it&apos;s a placeholder component for
        content which hasn&apos;t yet loaded, in order to provide a meaningful
        preview and avoid layout content shifts.
      </p>
    </EuiText>
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
        <EuiText>
          <p>
            Use the <strong>EuiSkeletonCircle</strong> to display a circular
            preview mainly for avatars.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonCircle },
      snippet: skeletonCircleSnippet,
      demo: <SkeletonCircle />,
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
        <EuiText>
          <p>
            Use the <strong>EuiSkeletonText</strong> to display a placeholder
            for multiple lines of text.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonText },
      snippet: skeletonTextSnippet,
      demo: <SkeletonText />,
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
            heading texts.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonTitle },
      snippet: skeletonTitleSnippet,
      demo: <SkeletonTitle />,
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
            The <strong>Rectangle</strong> type let you free to define whatever
            shape you want to mock with a skeleton by defining
            <EuiCode>width</EuiCode> <EuiCode>height</EuiCode>
            and <EuiCode>borderRadius</EuiCode>.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonRectangle },
      snippet: skeletonRectangleSnippet,
      demo: <SkeletonRectangle />,
    },
  ],
};
