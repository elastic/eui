import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTimeline,
  EuiTimelineItem,
} from '../../../../src/components';
import timelineItemConfig from './playground';

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
        <div>
          The <strong>EuiTimeline</strong> is a component that standardizes the
          way a timeline thread is displayed. Pass an array of{' '}
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
          type: GuideSectionTypes.TSX,
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
      title: 'A timeline thread with timeline items',
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
            <strong>EuiTimelineItem</strong>. Wrapping these components with a{' '}
            <strong>EuiTimeline</strong> is not required, but we recommend
            having all the <strong>EuiTimelineItem</strong> nested in the same
            container. This way, we ensure that timeline styles are applied
            correctly.
          </p>
          <p>
            Although any node is allowed as a <EuiCode>children</EuiCode> in a{' '}
            <strong>EuiTimelineItem</strong>, the recommendation is to use a{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>{' '}
            or a{' '}
            <Link to="/layout/panel#split-panels">
              <strong>EuiSplitPanel</strong>
            </Link>{' '}
            when your content is text-based. For other types of components like
            editors, the recommendation is to pass the{' '}
            <EuiCode>children</EuiCode> without any wrapper.
          </p>
          <p>
            The following example shows how to display multiple{' '}
            <strong>EuiTimelineItem</strong> and how you can use a{' '}
            <strong>EuiSplitPanel</strong> to customize an event.
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
