import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTimeline,
  EuiTimelineItem,
  EuiTimelineItemEvent,
} from '../../../../src/components';

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
      props: { EuiTimeline, EuiTimelineItem, EuiTimelineItemEvent },
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
        <div>
          <p>
            Use <strong>EuiTimelineItem</strong> to display timeline items. Each{' '}
            <strong>EuiTimelineItem</strong> accepts two parts:{' '}
            <EuiCode>icon</EuiCode> on the left side and an{' '}
            <EuiCode>event</EuiCode> on the right side.
          </p>
        </div>
      ),
      props: { EuiTimelineItem },
      snippet: timelineItemSnippet,
      demo: <TimelineItem />,
    },
    {
      title: 'Timeline item event',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timelineItemEventSource,
        },
      ],
      text: (
        <div>
          <p>
            An event is basically the right side of the{' '}
            <strong>EuiTimelineItem</strong> and it&apos;s built on top of the{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>.
            </Link>{' '}
            Each event can have a <EuiCode>eventHeader</EuiCode>, a{' '}
            <EuiCode>eventBody</EuiCode> and <EuiCode>eventProps</EuiCode>:
          </p>
          <ul>
            <li>
              <EuiCode>eventHeader</EuiCode>: the most important part of the
              event (e.g. a title, username, metadata). All the content should
              be in one line. When no body is present the header vertically
              center aligns with the left side icon.
            </li>
            <li>
              <EuiCode>eventBody</EuiCode>: additional content. You can also use
              this prop to pass more complex components (e.g. editors, code
              blocks or any custom component).
            </li>
            <li>
              <EuiCode>eventProps</EuiCode>: additional props to customize the
              event panel. You can change the color, header color, and adjust
              the padding.
            </li>
          </ul>
        </div>
      ),
      props: { EuiTimelineItemEvent },
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
      props: { EuiTimeline, EuiTimelineItem, EuiTimelineItemEvent },
      demo: <TimelineComplex />,
    },
  ],
};
