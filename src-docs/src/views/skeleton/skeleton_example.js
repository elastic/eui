import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import {
  EuiSkeletonTitle,
  EuiSkeletonText,
  EuiSkeletonRectangle,
  EuiSkeletonCircle,
  EuiSkeletonLoading,
  EuiScreenReaderLive,
  EuiText,
  EuiSpacer,
  EuiCallOut,
  EuiCode,
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
const skeletonRectangleSnippet = `<EuiSkeletonRectangle
  width="100%"
  height={500}
  borderRadius="m"
  isLoading={isLoading}
  contentAriaLabel="Example description"
>
  <EuiPanel />
</EuiSkeletonRectangle>`;

import SkeletonLoading from './skeleton_loading';
const skeletonLoadingSource = require('!!raw-loader!./skeleton_loading');
const skeletonLoadingSnippet = `<EuiSkeletonLoading
  isLoading={isLoading}
  contentAriaLabel="User data"
  loadingContent={
    <>
      <EuiSkeletonTitle />
      <EuiSkeletonText />
      <EuiSkeletonCircle />
      <EuiSkeletonRectangle />
    </>
  }
  loadedContent={
    <>
      {/* Equivalent loaded content */}
    </>
  }
/>`;

import SkeletonLiveProps from './skeleton_live_props';
const skeletonLivePropsSource = require('!!raw-loader!./skeleton_live_props');
const skeletonLivePropsSnippet = `<EuiSkeletonText
  announceLoadingStatus={true}
  announceLoadedStatus={false}
  ariaLiveProps={ariaLiveProps}
  contentAriaLabel="Example text"
/>`;

export const SkeletonExample = {
  title: 'Skeleton',
  intro: (
    <>
      <EuiText>
        <p>
          The <strong>EuiSkeleton</strong> components are placeholder components
          for content which has yet to load. They provide meaningful previews,
          avoid layout content shifts, and add accessible announcements to
          screen readers when content is done loading.
        </p>
      </EuiText>
      <EuiSpacer />
      <EuiCallOut
        iconType="accessibility"
        title={
          <>
            Using the <EuiCode>contentAriaLabel</EuiCode> prop
          </>
        }
      >
        <p>
          The <EuiCode>contentAriaLabel</EuiCode> prop should be used to help
          describe the type of content that is loading to screen reader users.
          If you do not provide a descriptive label and have have multiple
          loading skeletons on the page, screen reader users may hear a
          multitude of &ldquo;Loaded&rdquo; messages in a row, with no
          meaningful indication of what actually loaded.
        </p>
      </EuiCallOut>
    </>
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
    {
      title: 'Combining multiple skeletons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonLoadingSource,
        },
      ],
      text: (
        <EuiText>
          <p>
            <strong>EuiSkeletonLoading</strong> is a light wrapper around the{' '}
            <strong>EuiSkeleton</strong> components that handles loading
            accessibility and flipping between skeleton and loaded content.
          </p>
          <p>
            As you may have noticed in the previous demos, toggling multiple
            skeletons to their loaded state all at once triggers multiple queued
            screen reader announcements, which can be annoying to SR users.
          </p>
          <p>
            To circumvent this, use <strong>EuiSkeletonLoading</strong> to
            handle a single parent-level <EuiCode>isLoading</EuiCode> state.{' '}
            <strong>EuiSkeleton</strong> children passed to the{' '}
            <EuiCode>loadingContent</EuiCode> should not have their own{' '}
            <EuiCode>isLoading</EuiCode> props or children.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonLoading },
      snippet: skeletonLoadingSnippet,
      demo: <SkeletonLoading />,
    },
    {
      title: 'Customizing screen reader announcements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: skeletonLivePropsSource,
        },
      ],
      text: (
        <EuiText>
          <p>
            <strong>EuiSkeleton</strong> components assume that the page starts
            as loading and transitions to loaded, and the default screen reader
            experience is set up accordingly (
            <EuiCode>announceLoadedStatus={'{true}'}</EuiCode>).
          </p>
          <p>
            In scenarios where that is not the case (i.e., transitioning to
            loading), you can customize what statuses are announced to screen
            readers by setting <EuiCode>announceLoadingStatus</EuiCode> to true,
            or <EuiCode>announceLoadedStatus</EuiCode> to false. Submitting the
            below example announces a loading status, but not a loaded status.
          </p>
          <p>
            As an optional escape hatch, <EuiCode>ariaLiveProps</EuiCode> is
            also available and accepts any{' '}
            <Link to="/utilities/accessibility#screen-reader-live-region">
              <strong>EuiScreenReaderLive</strong>
            </Link>{' '}
            props.
          </p>
        </EuiText>
      ),
      props: { EuiSkeletonLoading, EuiScreenReaderLive },
      snippet: skeletonLivePropsSnippet,
      demo: <SkeletonLiveProps />,
    },
  ],
};
