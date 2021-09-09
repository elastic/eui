import React from 'react';

import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiComment,
  EuiCommentList,
} from '../../../../src/components';
import commentConfig from './playground';

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

import CommentList from './comment_list';
const commentListSource = require('!!raw-loader!./comment_list');
const commentListHtml = renderToHtml(CommentList);

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
  `<EuiComment timelineIcon={avatar} username="janed">
  {body}
</EuiComment>
`,
];

const commentActionsSnippet = `<EuiComment username="janed" actions={customActions}>
  {body}
</EuiComment>`;

const commentListSnippet = `<EuiCommentList
  comments={[
    {
      username: username,
      event: event,
      timestamp: timestamp,
      children: body,
    },
]}
/>`;

export const CommentListExample = {
  title: 'Comment list',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentListSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: commentListHtml,
        },
      ],
      text: (
        <div>
          Use <strong>EuiCommentList</strong> to display a list of{' '}
          <strong>EuiComments</strong>. Pass an array of{' '}
          <strong>EuiComment</strong> objects and{' '}
          <strong>EuiCommentList</strong> will generate a comment thread.
        </div>
      ),
      props: { EuiCommentList, EuiComment },
      snippet: commentListSnippet,
      demo: <CommentList />,
    },
    {
      title: 'Comment',
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
            Use <strong>EuiComment</strong> to display comments. Each{' '}
            <strong>EuiComment</strong> has two parts: a{' '}
            <EuiCode>timelineIcon</EuiCode> on the left and content on the
            right. The <EuiCode>timelineIcon</EuiCode> provides a visual
            indication of the <EuiCode>type</EuiCode> of comment it is. For
            example, it can be an icon that represents what action was performed
            or it can be a user avatar. The content has a header with all the
            relevant metadata and a body.
          </p>
        </div>
      ),
      props: { EuiComment },
      snippet: commentSnippet,
      demo: <Comment />,
      playground: commentConfig,
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
            The default <EuiCode>type</EuiCode> of comment is
            <EuiCode>regular</EuiCode> and displays a comment that a user has
            written.
          </p>
          <p>
            Change the type to <EuiCode>update</EuiCode> to display comments
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
      title: 'Custom timeline icon',
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
              Use the defaults; a user icon inside a large container for
              <EuiCode>regular</EuiCode> comments; or a dot icon inside a small
              container for <EuiCode>update</EuiCode> comments.
            </li>
            <li>
              Pass a string with any of the icon types that{' '}
              <strong>EuiIcon</strong> supports and it will receive the default
              styling.
            </li>
            <li>
              Pass any other element (e.g.{' '}
              <Link to="/display/avatar">
                <strong>EuiAvatar</strong>
              </Link>
              ). It is recommended not to use an element larger than 40x40.
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
            can use{' '}
            <Link to="/navigation/button">
              <strong>EuiButtonIcon</strong>
            </Link>{' '}
            and for something more complex you can combine that with{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            and{' '}
            <Link to="/navigation/context-menu">
              <strong>EuiContextMenu</strong>
            </Link>
            .
          </p>
        </div>
      ),
      props: { EuiComment },
      snippet: commentActionsSnippet,
      demo: <CommentActions />,
    },
  ],
};
