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
            has two parts: a <EuiCode>timelineIcon</EuiCode> on the left and
            content on the right. The <EuiCode>timelineIcon</EuiCode> provides a
            visual indication of the <EuiCode>type</EuiCode> of comment it is.
            For example, it can be an icon that represents what action was
            performed or it can be a user avatar. The content has a header with
            all the relevant metadata and a body.
          </p>
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
            There are scenarios where you might want to allow the user to
            perform <EuiCode>actions</EuiCode> related to each comment. Some
            common <EuiCode>actions</EuiCode> include: editing, deleting,
            sharing and copying. To add custom <EuiCode>actions</EuiCode> to a
            comment, use the <EuiCode>actions</EuiCode>
            prop. These will be placed to the right of the metadata in the
            comment&apos;s header. You can use any element to display{' '}
            <EuiCode>actions</EuiCode>. For example, for something simple you
            can use <strong>EuiButtonIcon</strong> and for something more
            complex you can combine that with <strong>EuiPopover</strong> and{' '}
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
