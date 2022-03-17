import React from 'react';
import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiTimeline } from '../../../../src/components';

import Timeline from './timeline';
const timelineSource = require('!!raw-loader!./timeline');
const timelineSnippet = `<EuiTimeline
  timelines={[
    {
      username: username,
      event: event,
      timestamp: timestamp,
      children: body,
    },
]}
/>`;

import TimelineItem from './timeline_item';
const timelineItemSource = require('!!raw-loader!./timeline_item');
const timelineItemSnippet = `<EuiTimeline username="janed">
  {body}
</EuiTimeline>`;

import TimelineItemPanel from './timeline_item_panel';
const timelineItemPanelSource = require('!!raw-loader!./timeline_item_panel');
const timelineItemPanelSnippet = `<EuiTimeline username="janed">
  {body}
</EuiTimeline>`;

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
          Use <strong>EuiTimeline</strong> to display a list of{' '}
          <strong>EuiTimelines</strong>. Pass an array of{' '}
          <strong>EuiTimeline</strong> objects and <strong>EuiTimeline</strong>{' '}
          will generate a timeline thread.
        </div>
      ),
      props: { EuiTimeline, EuiTimeline },
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
            Use <strong>EuiTimeline</strong> to display timelines. Each{' '}
            <strong>EuiTimeline</strong> has two parts: a{' '}
            <EuiCode>timelineIcon</EuiCode> on the left and content on the
            right.
          </p>
        </div>
      ),
      props: { EuiTimeline },
      snippet: timelineItemSnippet,
      demo: <TimelineItem />,
    },
    {
      title: 'Timeline item panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: timelineItemPanelSource,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>EuiTimeline</strong> to display timelines. Each{' '}
            <strong>EuiTimeline</strong> has two parts: a{' '}
            <EuiCode>timelineIcon</EuiCode> on the left and content on the
            right.
          </p>
        </div>
      ),
      props: { EuiTimeline },
      snippet: timelineItemPanelSnippet,
      demo: <TimelineItemPanel />,
    },
  ],
};
