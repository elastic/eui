import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTimeline,
  EuiTimelineItem,
} from '../../../../src/components';

import Timeline from './timeline';
const timelineSource = require('!!raw-loader!./timeline');
const timelineSnippet = `<EuiTimeline
  timelines={[
    {
      icon: icon,
      children: content,
    },
]}
/>`;

import TimelineItem from './timeline_item';
const timelineItemSource = require('!!raw-loader!./timeline_item');
const timelineItemSnippet = `<EuiTimelineItem icon="user">
  {content}
</EuiTimeline>`;

import TimelineItemEvent from './timeline_item_event';
const timelineItemEventSource = require('!!raw-loader!./timeline_item_event');
const timelineItemEventSnippet = `<EuiTimelineItem icon="user">
  <EuiPanel paddingSize="none" color="transparent">
    <EuiText size="s">
      <p>
        <strong>Janet</strong> edited the dashboard 4 days ago
      </p>
    </EuiText>
  </EuiPanel>
</EuiTimeline>`;

import TimelineComplex from './timeline_complex';
const TimelineComplexSource = require('!!raw-loader!./timeline_complex');

export const TimelineExample = {
  title: 'Timeline',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timelineSource,
        },
      ],
      text: (
        <div>
          The <strong>EuiTimeline</strong> is a component that standardizes the
          way a timeline thread is displayed. But it gives the ability to add
          custom components and icons. Pass an array of{' '}
          <strong>EuiTimelineItem</strong> objects and{' '}
          <strong>EuiTimeline</strong> will generate a timeline thread.
        </div>
      ),
      props: { EuiTimeline, EuiTimelineItem },
      snippet: timelineSnippet,
      demo: <Timeline />,
    },
    {
      title: 'Timeline item',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timelineItemSource,
        },
      ],
      text: (
        <>
          <p>
            Use <strong>EuiTimelineItem</strong> to display timeline items. Each{' '}
            <strong>EuiTimelineItem</strong> has two parts: an icon on the left
            side and an event on the right side. To create an item you basically
            need the following props:
          </p>
          <ul>
            <li>
              <EuiCode>icon</EuiCode>: main icon that appears on the left side.
            </li>
            <li>
              <EuiCode>children</EuiCode>: event content. You can pass any node.
            </li>
          </ul>
        </>
      ),
      props: { EuiTimelineItem },
      snippet: timelineItemSnippet,
      demo: <TimelineItem />,
    },
    {
      title: 'Customizing an event',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timelineItemEventSource,
        },
      ],
      text: (
        <>
          <p>
            Although any node is allowed as a <EuiCode>children</EuiCode> the
            recommendation is to use a{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>{' '}
            or a{' '}
            <Link to="/layout/panel#split-panels">
              <strong>EuiSplitPanel</strong>
            </Link>{' '}
            when you content is text based. For other type of components like
            editors, the recommendation is to pass as a children without any
            wrapper.
          </p>
        </>
      ),
      snippet: timelineItemEventSnippet,
      demo: <TimelineItemEvent />,
    },
    {
      title: 'Complex example',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: TimelineComplexSource,
        },
      ],
      text: (
        <div>
          <p>
            This is an example of how you can customize and display multiple{' '}
            <strong>EuiTimelineItem</strong>.
          </p>
        </div>
      ),
      props: {
        EuiTimeline,
        EuiTimelineItem,
      },
      demo: <TimelineComplex />,
    },
  ],
};
