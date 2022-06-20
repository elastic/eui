import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTimeline,
  EuiTimelineItem,
  EuiCallOut,
} from '../../../../src/components';
import timelineItemConfig from './playground';

import Timeline from './timeline';
const timelineSource = require('!!raw-loader!./timeline');
const timelineSnippet = `<EuiTimeline
  items={[
    {
      icon: icon,
      children: content,
    },
  ]}
/>`;

import TimelineItem from './timeline_item';
const timelineItemSource = require('!!raw-loader!./timeline_item');
const timelineItemSnippet = `<EuiTimelineItem icon={icon}>
  {content}
</EuiTimeline>`;

import TimelineItemEvent from './timeline_item_event';
const timelineItemEventSource = require('!!raw-loader!./timeline_item_event');
const timelineItemEventSnippet = `<EuiTimelineItem icon={icon}>
  <EuiSplitPanel.Outer color="transparent" hasBorder grow>
    <EuiSplitPanel.Inner color="subdued">
      <!-- Top panel content -->
    </EuiSplitPanel.Inner>
    <EuiHorizontalRule margin="none" />
    <EuiSplitPanel.Inner >
      <!-- Bottom panel content -->
    </EuiSplitPanel.Inner>
  </EuiSplitPanel.Outer>
</EuiTimelineItem>
`;

export const TimelineExample = {
  title: 'Timeline',
  isBeta: true,
  isNew: true,
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: timelineSource,
        },
      ],
      text: (
        <>
          <p>
            The <strong>EuiTimeline</strong> component standardizes the way a
            timeline thread is displayed. Pass an array of{' '}
            <strong>EuiTimelineItem</strong> objects and{' '}
            <strong>EuiTimeline</strong> will generate a timeline thread.
          </p>
          <p>
            This component allows you to create any type of timeline, but for
            more specific use cases you should consider:
          </p>
          <ul>
            <li>
              <Link to="/navigation/steps">
                <strong>EuiSteps</strong>
              </Link>
              : a timeline that allows you to present instructional content that
              must be conducted in a particular order and might contain progress
              indications.
            </li>
            <li>
              <Link to="/display/comment-list">
                <strong>EuiCommentList</strong>
              </Link>
              : a timeline that allows you to display comments or logging
              actions that either a user or a system has performed.
            </li>
          </ul>

          <EuiCallOut
            color="warning"
            iconType="accessibility"
            title={
              <>
                For accessibility, it is required to wrap your{' '}
                <strong>EuiTimelineItem</strong>&apos;s with a{' '}
                <strong>EuiTimeline</strong>. It is highly recommended to
                provide a descriptive <EuiCode>aria-label</EuiCode>, or a text
                node ID of an external label to the{' '}
                <EuiCode>aria-labelledby</EuiCode> prop of the{' '}
                <strong>EuiTimeline</strong>.
              </>
            }
          />
        </>
      ),
      props: { EuiTimeline, EuiTimelineItem },
      snippet: timelineSnippet,
      demo: <Timeline />,
    },
    {
      title: 'Timeline item',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: timelineItemSource,
        },
      ],
      text: (
        <>
          <p>
            Each <strong>EuiTimelineItem</strong> has two parts: an icon on the
            left side and an event on the right side. To create an item you need
            the following props:
          </p>
          <ul>
            <li>
              <EuiCode>icon</EuiCode>: main icon that appears on the left side.
              Can be passed as any <EuiCode>IconType</EuiCode> string or custom
              node (e.g.{' '}
              <Link to="/display/avatar">
                <strong>EuiAvatar</strong>
              </Link>
              ). It is recommended not to use an element larger than 40x40.
            </li>
            <li>
              <EuiCode>children</EuiCode>: any node as the event content.
            </li>
          </ul>
        </>
      ),
      props: { EuiTimelineItem },
      snippet: timelineItemSnippet,
      demo: <TimelineItem />,
      playground: timelineItemConfig,
    },
    {
      title: 'A timeline thread with multiple items',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: timelineItemEventSource,
        },
      ],
      text: (
        <>
          <p>
            You can create a timeline thread by rendering multiple{' '}
            <strong>EuiTimelineItem</strong> components in a{' '}
            <strong>EuiTimeline</strong>. Following this structure ensures that
            timeline styles are applied correctly and appropriate semantic
            elements are used to assist with screen readers.
          </p>
          <p>
            When passing an <EuiCode>icon</EuiCode> and{' '}
            <EuiCode>children</EuiCode> prop to each item, there are some design
            considerations to take into account:
          </p>
          <ul>
            <li>
              <EuiCode>icon</EuiCode>: use icons of the same size to create a
              better visual consistency.
            </li>
            <li>
              <EuiCode>children</EuiCode>: when your content is just one line of
              text, the recommendation is to use a a{' '}
              <Link to="/display/text">
                <strong>EuiText</strong>
              </Link>{' '}
              as a wrapper. For multi-line content consider using a{' '}
              <Link to="/layout/panel">
                <strong>EuiPanel</strong>
              </Link>{' '}
              or a{' '}
              <Link to="/layout/panel#split-panels">
                <strong>EuiSplitPanel</strong>
              </Link>{' '}
              instead. For other types of components like editors, the
              recommendation is to pass the children without any wrapper.
            </li>
          </ul>
          <p>
            The following example shows how to display multiple{' '}
            <strong>EuiTimelineItem</strong>s and how you can use a{' '}
            <strong>EuiSplitPanel</strong> as the content wrapper.
          </p>
        </>
      ),
      props: {
        EuiTimelineItem,
      },
      snippet: timelineItemEventSnippet,
      demo: <TimelineItemEvent />,
    },
  ],
};
