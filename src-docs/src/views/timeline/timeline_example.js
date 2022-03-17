import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiTimeline,
  EuiTimelineItem,
  EuiTimelineItemPanel,
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

import TimelineItemPanel from './timeline_item_panel';
const timelineItemPanelSource = require('!!raw-loader!./timeline_item_panel');
const timelineItemPanelSnippet = `<EuiTimelineItemPanel hasBorder header={header}>
  {body}
</EuiTimelineItemPanel>`;

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
          The <strong>EuiTimeline</strong> component is somehow an opinionated
          component that standardizes the way a timeline thread is displayed.
          But it gives the ability to add custom components and icons. Pass an
          array of <strong>EuiTimelineItem</strong> objects and{' '}
          <strong>EuiTimeline</strong> will generate a timeline thread.
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
            Use <strong>EuiTimelineItem</strong>to display timeline items. Each
            EuiTimelineItem accepts two props: <EuiCode>icon</EuiCode>icon and{' '}
            <EuiCode>children</EuiCode>. For the children, we recommend the
            usage of a{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>{' '}
            with <EuiCode>hasBorder</EuiCode> set to true or with color{' '}
            <EuiCode>{'"transparent"'}</EuiCode>. Try to avoid passing the color{' '}
            <EuiCode>{'"plain"'}</EuiCode>. This color adds a shadow that is not
            suitable for this component.
          </p>
        </div>
      ),
      props: { EuiTimelineItem },
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
            The <strong>EuiTimelineItemPanel</strong> is an opinionated
            component whose purpose is to display a panel that can have a header
            and body. It&apos;s built on top of the{' '}
            <Link to="/layout/panel">
              <strong>EuiPanel</strong>
            </Link>{' '}
            and it&apos;s the perfect building block to create any type os
            timelines.
          </p>
        </div>
      ),
      props: { EuiTimeline },
      snippet: timelineItemPanelSnippet,
      demo: <TimelineItemPanel />,
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
            This is an example of how to combine multiple{' '}
            <strong>EuiTimelineItem</strong> with{' '}
            <strong>EuiTimelinePanel</strong>.
          </p>
        </div>
      ),
      props: { EuiTimelineItemPanel },
      demo: <TimelineComplex />,
    },
  ],
};
