import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiComment } from '../../../../src/components';

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');
const commentHtml = renderToHtml(Comment);

import CommentTypes from './comment_types';
const commentTypesSource = require('!!raw-loader!./comment_types');
const commentTypesHtml = renderToHtml(CommentTypes);

import CommentTimelineIcons from './comment_timelineIcons';
const commentTimelineIconsSource = require('!!raw-loader!./comment_timelineIcons');
const commentTimelineIconsHtml = renderToHtml(CommentTimelineIcons);

import CommentActions from './comment_actions';
const commentActionsSource = require('!!raw-loader!./comment_actions');
const commentActionsHtml = renderToHtml(CommentActions);

const commentSnippet = `<EuiComment username="janed">
  {body}
</EuiComment>`;

const commentTypesSnippet = [
  `<EuiComment username="janed">
  {body}
</EuiComment>
`,
  `<EuiComment type="update" username="janed" />
`,
  `<EuiComment type="update" username="janed">
  {body}
</EuiComment>
`,
];

const commentTimelineIconsSnippet = [
  `<EuiComment username="janed">
  {body}
</EuiComment>
`,
  `<EuiComment timelineIcon="tag" username="janed" />
`,
  `<EuiComment timelineIcon={
    <EuiAvatar
      name="Jane D"
    />
  } username="janed">
  {body}
</EuiComment>
`,
];

const commentActionsSnippet = `<EuiComment username="janed" actions={customActions}>
  {body}
</EuiComment>`;

export const CommentExample = {
  title: 'Comment',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use <strong>EuiComment</strong> for displaying comment threads with{' '}
            <strong>EuiCommentList</strong>. Each <strong>EuiComment</strong>{' '}
            has a header with the following parts: <EuiCode>username</EuiCode>,{' '}
            <EuiCode>event</EuiCode>, <EuiCode>timeStamp</EuiCode> and{' '}
            <EuiCode>actions</EuiCode>.
          </p>
          <ul>
            <li>
              <EuiCode>username</EuiCode> can display a small avatar or icon
              next to it.
            </li>
            <li>
              <EuiCode>timeStamp</EuiCode> receives a date in the format of the
              consumer&apos;s choice.
            </li>
            <li>
              There are two different types of comments,
              <EuiCode>regular</EuiCode> and <EuiCode>update</EuiCode> available
              through the <EuiCode>type</EuiCode> prop.{' '}
            </li>
            <li>
              <EuiCode>timelineIcon</EuiCode>s has default icons and styling for
              both types of comments. It can also be customized as needed.
            </li>
            <li>
              Use <EuiCode>children</EuiCode> to pass the body of the comment.
            </li>
          </ul>
        </div>
      ),
      props: { EuiComment },
      snippet: commentSnippet,
      demo: <Comment />,
    },
    {
      title: 'Comment types',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTypesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentTypesHtml,
        },
      ],
      text: (
        <div>
          <p>
            Use the default <EuiCode>type</EuiCode> of comment,{' '}
            <EuiCode>regular</EuiCode> to display comments that a user has
            written.
          </p>
          <p>
            Use comments of type <EuiCode>update</EuiCode> to display comments
            that generally do not have a body and are logging actions that
            either the user or the system has performed (e.g. &ldquo;jsmith
            edited a case&rdquo; or &ldquo;kibanamachine added the review
            label&rdquo;).
          </p>
        </div>
      ),
      props: { EuiComment },
      snippet: commentTypesSnippet,
      demo: <CommentTypes />,
    },
    {
      title: 'Custom timelineIcon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTimelineIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentTimelineIconsHtml,
        },
      ],
      text: (
        <div>
          <p>
            There are three ways to use <EuiCode>timelineIcon</EuiCode>:
          </p>
          <ol>
            <li>
              Use the defaults a) a user icon inside a 40x40 container for
              comments of type
              <EuiCode>regular</EuiCode> and b) a dot icon inside a 24x24
              container for comments of type <EuiCode>update</EuiCode>.
            </li>
            <li>
              Pass a string with any of the icon types that{' '}
              <strong>EuiIcon</strong> supports and it will receive the default
              styling.
            </li>
            <li>
              Pass any other element (e.g. <strong>EuiAvatar</strong>). It is
              recommended not to use an element larger that 40x40.
            </li>
          </ol>
        </div>
      ),
      props: { EuiComment },
      snippet: commentTimelineIconsSnippet,
      demo: <CommentTimelineIcons />,
    },
    {
      title: 'Actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentActionsHtml,
        },
      ],
      text: (
        <div>
          <p>
            To allow the user to perform actions from within a comment, use the{' '}
            <EuiCode>actions</EuiCode>prop. <EuiCode>actions</EuiCode> can be
            any element. For example, for something simple you can use{' '}
            <strong>EuiButtonIcon</strong> and for something more complex you
            can combine that with <strong>EuiPopover</strong> and{' '}
            <strong>EuiContextMenu</strong>.
          </p>
        </div>
      ),
      props: { EuiComment },
      snippet: commentActionsSnippet,
      demo: <CommentActions />,
    },
  ],
};
