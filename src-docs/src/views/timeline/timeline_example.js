import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTimeline,
  EuiTimelineItem,
} from '../../../../src/components';
import { EuiTimelineItemEventPanel } from './_props';

import Timeline from './timeline';
const timelineSource = require('!!raw-loader!./timeline');
const timelineSnippet = `<EuiTimeline
  timelines={[
    {
      icon: icon,
      children: body,
    },
]}
/>`;

import TimelineItem from './timeline_item';
const timelineItemSource = require('!!raw-loader!./timeline_item');
const timelineItemSnippet = `<EuiTimelineItem icon="user">
  {body}
</EuiTimeline>`;

import TimelineItemEvent from './timeline_item_event';
const timelineItemEventSource = require('!!raw-loader!./timeline_item_event');
const timelineItemEventSnippet = `<EuiTimelineItemEvent hasBorder header={header}>
  {body}
</EuiTimelineItemEvent>`;

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
      props: { EuiTimeline, EuiTimelineItem, EuiTimelineItemEventPanel },
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
              <EuiCode>header</EuiCode>: the most important part of an event
              (e.g. a title, username, metadata). The content should be in one
              line. When no <EuiCode>body</EuiCode> is passed it vertically
              center aligns with the icon.
            </li>
            <li>
              <EuiCode>body</EuiCode>: additional event content. You can also
              use this prop to pass more complex components (e.g. editors, code
              blocks or any custom component).
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
            An event is basically the right side of the{' '}
            <strong>EuiTimelineItem</strong> and it&apos;s built on top of the{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>
            . This example demonstrates how you can use{' '}
            <EuiCode>panelProps</EuiCode> to customize an event.
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
        EuiTimelineItemEventPanel,
        EuiTimelineItem,
      },
      demo: <TimelineComplex />,
    },
  ],
};
