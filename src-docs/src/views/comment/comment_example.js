import React from 'react';
import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';
import {
  EuiCode,
  EuiComment,
  EuiCommentList,
  EuiCallOut,
  EuiText,
} from '../../../../src/components';
import commentConfig from './playground';

import CommentList from './comment_list';
const commentListSource = require('!!raw-loader!./comment_list');
const commentListSnippet = `<EuiCommentList
  aria-label="Comment list example"
  comments={[
    {
      username: username,
      event: event,
      timestamp: timestamp,
      children: body,
    },
]}
/>`;

import Comment from './comment';
const commentSource = require('!!raw-loader!./comment');
const commentSnippet = `<EuiComment component="div" username="janed">
  {body}
</EuiComment>`;

import CommentEvent from './comment_event';
const commentEventSource = require('!!raw-loader!./comment_event');
const commentEventSnippet = [
  `<EuiCommentList aria-label="Comment type regular example">
  <EuiComment username="janed">
    {body}
  </EuiComment> 
</EuiCommentList>`,
  `<EuiCommentList aria-label="Comment type update example">
  <EuiComment type="update" username="janed" />
</EuiCommentList>
`,
  `<EuiCommentList aria-label="Comment type custom example">
  <EuiComment type="custom" username="janed">
    {custom}
  </EuiComment>
</EuiCommentList>
`,
];

import CommentAvatar from './comment_avatar';
const commentAvatarSource = require('!!raw-loader!./comment_avatar');
const commentAvatarSnippet = [
  `<EuiCommentList aria-label="Timeline icon example">
  <EuiComment username="janed">
    {body}
  </EuiComment>
</EuiCommentList>
`,
  `<EuiCommentList aria-label="Timeline icon example">
  <EuiComment timelineIcon="tag" username="janed" />
</EuiCommentList>
`,
  `<EuiCommentList aria-label="Timeline icon example">
  <EuiComment timelineIcon={avatar} username="janed">
    {body}
  </EuiComment>
</EuiCommentList>
`,
];

import CommentActions from './comment_actions';
const commentActionsSource = require('!!raw-loader!./comment_actions');
const commentActionsSnippet = `<EuiCommentList aria-label="Comment actions example">
  <EuiComment username="janed" actions={customActions}>
    {body}
  </EuiComment>
</EuiCommentList>`;

import CommentSystem from './comment_system';
const commentSystemSource = require('!!raw-loader!./comment_system');

export const CommentListExample = {
  title: 'Comment list',
  intro: (
    <EuiText>
      <p>
        The <strong>EuiCommentList</strong> is a timeline component built on top
        of{' '}
        <Link to="/display/timeline">
          <strong>EuiTimeline</strong>
        </Link>
        . It allows you to display comments or logging actions that either a
        user or a system has performed.
      </p>

      <EuiCallOut
        color="warning"
        iconType="accessibility"
        title={
          <>
            For accessibility, it is highly recommended to provide a descriptive{' '}
            <EuiCode>aria-label</EuiCode>, or a text node ID of an external
            label to the <EuiCode>aria-labelledby</EuiCode> prop of the{' '}
            <strong>EuiCommentList</strong>.
          </>
        }
      />
    </EuiText>
  ),
  sections: [
    {
      title: 'Basic comment list',
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
        <>
          <p>
            Use <strong>EuiComment</strong> to display comments. Each{' '}
            <strong>EuiComment</strong> has two parts: an{' '}
            <strong>avatar</strong> on the left and an <strong>event</strong> on
            the right.
          </p>
        </>
      ),
      props: { EuiComment },
      snippet: commentSnippet,
      demo: <Comment />,
      playground: commentConfig,
    },
    {
      title: 'Comment avatar',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentAvatarSource,
        },
      ],
      text: (
        <>
          <p>
            The avatar is a very important part of the comment and you should
            always show one:
          </p>
          <ol>
            <li>
              By default, each <strong>EuiComment</strong> shows an avatar with
              the initial letter of the <EuiCode>username</EuiCode>. It also
              uses the <EuiCode>username</EuiCode> for the avatar title
              attribute.
            </li>
            <li>
              If your <strong>EuiComment</strong> doesn&apos;t have a{' '}
              <EuiCode>username</EuiCode>, or if you don&apos;t want to use it
              for generating the title attribute and initials you can use the{' '}
              <EuiCode>avatarName</EuiCode> prop instead. (e.g you want to
              display the full name of the user instead of the{' '}
              <EuiCode>username</EuiCode>).
            </li>
            <li>
              You can also show an icon by passing to the{' '}
              <EuiCode>avatarIcon</EuiCode> any of the icon types that{' '}
              <Link to="/display/icons">
                <strong>EuiIcon</strong>
              </Link>{' '}
              supports. The icon will show inside a <EuiCode>subdued</EuiCode>{' '}
              avatar. Consider this option when showing a system update.
            </li>
            <li>
              You can further customize the timeline avatar by passing to the{' '}
              <EuiCode>EuiComment.avatarProps</EuiCode> any{' '}
              <Link to="/display/avatar">
                <strong>EuiAvatar</strong>
              </Link>{' '}
              prop.
            </li>
          </ol>
        </>
      ),
      props: { EuiComment },
      snippet: commentAvatarSnippet,
      demo: <CommentAvatar />,
    },
    {
      title: 'Comment event',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentEventSource,
        },
      ],
      text: (
        <>
          <p>
            The comment event can take different forms according to the props
            passed.
          </p>
          <ol>
            <li>
              <strong>Regular</strong>: An event with{' '}
              <EuiCode>children</EuiCode> and multiple metadata props (eg.
              username, timestamp). Use this layout to display user comments.
            </li>
            <li>
              <strong>Update</strong>: An event without{' '}
              <EuiCode>children</EuiCode>. Use this layout to display logging
              actions that either the user or the system has performed (e.g.
              “jsmith edited a case” or “kibanamachine added the review label”).
            </li>
            <li>
              <strong>Custom</strong>: An event with only a{' '}
              <EuiCode>children</EuiCode>. Use this layout to display custom
              components.
            </li>
          </ol>
        </>
      ),
      props: { EuiComment },
      snippet: commentEventSnippet,
      demo: <CommentEvent />,
    },
    {
      title: 'Comment event actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: commentActionsSource,
        },
      ],
      text: (
        <>
          <p>
            There are scenarios where you might want to allow the user to
            perform <EuiCode>actions</EuiCode> related to each comment. Some
            common <EuiCode>actions</EuiCode> include: editing, deleting,
            sharing and copying. To add custom <EuiCode>actions</EuiCode> to a
            comment, use the <EuiCode>actions</EuiCode>
            prop. These will be placed to the right of the metadata in the
            comment&apos;s header. We recommend using a{' '}
            <Link to="/navigation/button">
              <strong>EuiButtonIcon</strong>
            </Link>{' '}
            to trigger an action. When having multiple actions, consider
            grouping them in a nested menu system using a{' '}
            <Link to="/layout/popover">
              <strong>EuiPopover</strong>
            </Link>{' '}
            with a{' '}
            <Link to="/navigation/context-menu">
              <strong>EuiContextMenu</strong>
            </Link>
            .
          </p>
        </>
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
