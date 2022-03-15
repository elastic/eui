import React from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiComment,
  EuiCommentList,
} from '../../../../src/components';
import commentConfig from './playground';

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');

import CommentTypes from './comment_types';
const commentTypesSource = require('!!raw-loader!./comment_types');

import CommentTypeUpdate from './comment_type_update';
const commentTypeUpdateSource = require('!!raw-loader!./comment_type_update');

import CommentTimelineIcons from './comment_timelineIcons';
const commentTimelineIconsSource = require('!!raw-loader!./comment_timelineIcons');

import CommentActions from './comment_actions';
const commentActionsSource = require('!!raw-loader!./comment_actions');

import CommentList from './comment_list';
const commentListSource = require('!!raw-loader!./comment_list');

import CommentSystem from './comment_system';
const commentSystemSource = require('!!raw-loader!./comment_system');

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
  `<EuiComment type="custom" username="janed">
  {custom}
</EuiComment>
`,
];

const commentTypeUpdateSnippet = [
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
      ],
      text: (
        <div>
          <p>
            Use <strong>EuiComment</strong> to display comments. Each{' '}
            <strong>EuiComment</strong> has two parts: a{' '}
            <EuiCode>timelineIcon</EuiCode> on the left and content on the
            right.
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
      ],
      text: (
        <div>
          <p>
            You can supply one of the following types with the default being{' '}
            <EuiCode>regular</EuiCode>:
          </p>
          <ul>
            <li>
              <EuiCode>regular</EuiCode>: displays a comment that a user has
              written. The content has a header with all the relevant metadata
              and a body.
            </li>
            <li>
              <EuiCode>update</EuiCode>: displays comments that generally do not
              have a body and are logging actions that either the user or the
              system has performed (e.g. “jsmith edited a case” or
              “kibanamachine added the review label”).
            </li>
            <li>
              <EuiCode>custom</EuiCode>: displays any custom content. Elements
              like <EuiCode>username</EuiCode>, <EuiCode>timestamp</EuiCode>,{' '}
              <EuiCode>event</EuiCode>, and <EuiCode>actions</EuiCode>{' '}
              won&apos;t show even if they are passed.
            </li>
          </ul>
        </div>
      ),
      props: { EuiComment },
      snippet: commentTypesSnippet,
      demo: <CommentTypes />,
    },
    {
      title: 'Comment type update ',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTypeUpdateSource,
        },
      ],
      text: (
        <div>
          <p>
            As mentioned in the section before, the <strong>EuiComment</strong>{' '}
            type <EuiCode>update</EuiCode> generally displays logging actions
            that either the user or the system has performed. Most of these
            actions are meant to be discrete. But when you want to make an
            action easier to scan in the timeline, consider using an icon by
            specifying <EuiCode>updateIcon</EuiCode>. For example, if the user
            added a tag use a <EuiCode>tag</EuiCode> icon.
          </p>
          <p>
            You can also use color by specifying the{' '}
            <EuiCode>updateColor</EuiCode>. The color should indicate the level
            of urgency. For example, if an alert was triggered and it is very
            urgent you can use the color <EuiCode>danger</EuiCode>.
          </p>
        </div>
      ),
      props: { EuiComment },
      snippet: commentTypeUpdateSnippet,
      demo: <CommentTypeUpdate />,
    },
    {
      title: 'Timeline icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentTimelineIconsSource,
        },
      ],
      text: (
        <div>
          <p>
            There are three ways to use <EuiCode>timelineIcon</EuiCode>:
          </p>
          <ol>
            <li>
              Use the defaults; it will show an avatar with the initial letter
              of the username.
            </li>
            <li>
              Pass a string with any of the icon types that{' '}
              <strong>EuiIcon</strong> supports and it will show in a circle.
              Consider this option when showing a system update.
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
    {
      title: 'A comment system',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentSystemSource,
        },
      ],
      text: (
        <>
          <p>
            The below example uses a list of <strong>EuiComments</strong>, a{' '}
            <Link to="/editors-syntax/markdown-editor">
              <strong>EuiMarkdownEditor</strong>
            </Link>
            , and a{' '}
            <Link to="/editors-syntax/markdown-format">
              <strong>EuiMarkdownFormat</strong>
            </Link>{' '}
            to create a simple comment system.
          </p>
          <ul>
            <li>
              Each comment renders in a <strong>EuiComment</strong>.
            </li>
            <li>
              We use the <strong>EuiMarkdownEditor</strong> to post the{' '}
              <EuiCode>EuiComment.children</EuiCode>. This means the content
              uses Markdown.
            </li>
            <li>
              When the new <strong>EuiComment</strong> is posted, we use the{' '}
              <strong>EuiMarkdownFormat</strong> to wrap the{' '}
              <EuiCode>EuiComment.children</EuiCode> and render the Markdown
              correctly.
            </li>
          </ul>
          <p>
            When dealing with asynchronous events like when adding a message we
            recommend setting the <strong>EuiMarkdownEditor</strong> to a{' '}
            <EuiCode>readOnly</EuiCode> state and the &quot;Add comment&quot;{' '}
            <strong>EuiButton</strong> to a <EuiCode>isLoading</EuiCode> state.
            This will ensure users understand that the content cannot be changed
            while the comment is being submitted.
          </p>
        </>
      ),
      props: { EuiCommentList, EuiComment },
      demo: <CommentSystem />,
    },
  ],
};
